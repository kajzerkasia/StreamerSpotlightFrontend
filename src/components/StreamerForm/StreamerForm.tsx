import React, { useEffect, useState } from "react";
import { StreamerEntity, Status } from "types";
import { Link } from "react-router-dom";
import { Dropdown, Option } from "../Dropdown/Dropdown";
import { getPlatformIcon } from "../../utils/getPlatformIcon";
import { Button } from "../Button/Button";
import { CustomModal } from "../CustomModal/CustomModal";
import { options } from "../../utils/options";
import { validateForm } from "../../utils/validateForm";
import {
  descriptionField,
  descriptionText,
} from "../../utils/streamerDescriptionTexts";
import { confirmationText, text } from "../../utils/streamerFormTexts";
import { IconContext } from "react-icons";
import { TbAlertTriangle } from "react-icons/tb";
import "./StreamerForm.css";

export type StreamerFormProps = {
  initialValues: StreamerEntity;
  onSubmit?: (
    values: StreamerEntity,
    reset: () => void
  ) => void | Promise<void>;
  actionType: Status;
  votes?: React.ReactNode;
  streamerId?: string;
  streamersList: StreamerEntity[];
};

export const StreamerForm = ({
  initialValues,
  onSubmit,
  actionType,
  votes,
  streamerId,
  streamersList,
}: StreamerFormProps) => {
  const [values, setValues] = useState<StreamerEntity>(() => initialValues);
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormValid, setFormValid] = useState(false);
  const [errors, setErrors] = useState<Partial<StreamerEntity>>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>(
    {}
  );
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  useEffect(() => {
    const newErrors = validateForm(values, touchedFields, streamersList);

    const filteredErrors = Object.values(newErrors).filter(
      (error) => typeof error === "string"
    ) as string[];

    setErrors(newErrors);

    const isValid =
      filteredErrors.length === 0 &&
      Object.values(values).every((value) => value !== "");
    setFormValid(isValid);
  }, [values, touchedFields, streamersList]);

  const onItemClick = (option: Option) => {
    setSelectedOption(option);
    handleChange("platform", option.value);
  };

  const reset: () => void = () => {
    setValues(initialValues);
    setTouchedFields({});
    setErrors({});
    setFormValid(false);
  };

  const handleChange: (field: keyof StreamerEntity, value: string) => void = (
    field,
    value
  ) => {
    setValues((localValues) => ({
      ...localValues,
      [field]: value,
    }));
    setTouchedFields((prevTouchedFields) => ({
      ...prevTouchedFields,
      [field]: true,
    }));
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openErrorModal = () => {
    setIsErrorModalOpen(true);
  };

  const closeErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  const renderNameSection = () => {
    const isNameTouched = touchedFields["name"];

    if (actionType === Status.Add) {
      return (
        <>
          <h2 className="center_text larger_font">Name</h2>
          <label htmlFor="name">
            Enter the streamer's name on the specified streaming platform
          </label>
          <div className="input_wrapper">
            <input
              placeholder="What is the name of the streamer?"
              className={`input_streamer_name ${
                isNameTouched && !values.name ? "error" : ""
              }`}
              type="text"
              id="name"
              name="name"
              required
              value={values.name}
              onChange={(event) => handleChange("name", event.target.value)}
            />
            {isNameTouched && !values.name && (
              <div className="error-message">Name is required</div>
            )}
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>
        </>
      );
    } else {
      return <h2 className="h2_streamer_name">{values.name}</h2>;
    }
  };

  const renderPlatformSection = () => {
    const isPlatformTouched = touchedFields["platform"];

    if (actionType === Status.Add) {
      return (
        <>
          <h2 className="center_text larger_font">Platform</h2>
          <label htmlFor="">
            Select the platform this streamer is broadcasting on
          </label>
          <Dropdown
            placeholder="Select..."
            options={options}
            onItemClick={onItemClick}
          />
          {isPlatformTouched && !values.platform && (
            <div className="error-message">Platform is required</div>
          )}
          {errors.platform && (
            <div className="error-message">{errors.platform}</div>
          )}
        </>
      );
    } else {
      return (
        <div>
          {getPlatformIcon(values.platform)} {values.platform}
        </div>
      );
    }
  };

  const renderDescriptionSection = () => {
    const isDescriptionTouched = touchedFields["description"];

    if (actionType === Status.Add) {
      return (
        <>
          <h2 className="center_text larger_font">Description</h2>
          <label htmlFor="description">
            Please provide some information about this streamer
          </label>
          <div>
            <Button onClick={openModal}>Add description</Button>
            <CustomModal
              className="custom_modal"
              isOpen={isModalOpen}
              onRequestClose={closeModal}
              onConfirm={closeModal}
              onCancel={closeModal}
              text={descriptionField}
              content={
                <>
                  <textarea
                    placeholder="Please provide some information about this streamer"
                    className={`textarea_streamer_description ${
                      isDescriptionTouched && !values.description ? "error" : ""
                    }`}
                    name="description"
                    id="description"
                    required
                    value={values.description}
                    onChange={(event) =>
                      handleChange("description", event.target.value)
                    }
                  />
                  {isDescriptionTouched && !values.description && (
                    <div className="error-message-description">
                      Description is required
                    </div>
                  )}
                </>
              }
              confirmationText={descriptionText}
              error={isDescriptionTouched && errors.description}
            />
          </div>
        </>
      );
    } else {
      return (
        <Link to={`/streamer/${streamerId}`}>
          <Button>Details</Button>
        </Link>
      );
    }
  };

  const renderActionButton = () => {
    if (actionType === Status.Add) {
      return (
        <Button
          className={`button_add_streamer ${
            isFormValid &&
            Object.keys(touchedFields).length === Object.keys(values).length &&
            !isModalOpen &&
            "neon_animation"
          }`}
          onClick={() => {
            if (isFormValid) {
              if (onSubmit) {
                onSubmit(values, reset);
              }
            } else {
              openErrorModal();
            }
          }}
        >
          Add streamer
        </Button>
      );
    } else {
      return <div className="div_votes">{votes}</div>;
    }
  };

  return (
    <>
      <td className="td_streamer_name center_text" colSpan={1}>
        {renderNameSection()}
      </td>
      <td className="td_streaming_platform center_text" colSpan={1}>
        {renderPlatformSection()}
      </td>
      <td className="td_streamer_description center_text" colSpan={1}>
        {renderDescriptionSection()}
      </td>
      <td className="div_last_td_container" colSpan={1}>
        {renderActionButton()}
      </td>
      {actionType === Status.Add ? (
        <td className="additional_td">
          <p>Votes</p>
        </td>
      ) : null}
      <CustomModal
        className="custom_modal small_modal"
        isOpen={isErrorModalOpen}
        onRequestClose={closeErrorModal}
        onConfirm={closeErrorModal}
        text={text}
        content={
            <IconContext.Provider value={{ className: "icon_modal_alert" }}>
              <TbAlertTriangle />
            </IconContext.Provider>
        }
        confirmationText={confirmationText}
      />
    </>
  );
};
