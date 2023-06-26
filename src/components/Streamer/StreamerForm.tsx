import React, {useState} from 'react';
import {StreamerEntity, Status} from 'types';
import './StreamerForm.css';
import {Dropdown, Option} from "../Dropdown/Dropdown";
import {getPlatformIcon} from "../../utils/getPlatformIcon";
import {options} from "../../utils/options";
import {Link} from "react-router-dom";
import {Button} from "../Button/Button";

export type StreamerFormProps = {
    initialValues: StreamerEntity;
    onSubmit?: (values: StreamerEntity, reset: () => void) => void | Promise<void>;
    actionType: Status;
    votes?: React.ReactNode;
    streamerId?: string;
};

export const StreamerForm = ({initialValues, onSubmit, actionType, votes, streamerId}: StreamerFormProps) => {
    const [values, setValues] = useState<StreamerEntity>(() => initialValues);
    const [selectedOption, setSelectedOption] = useState<any>(null);

    const onItemClick = (option: Option) => {
        setSelectedOption(option);
        handleChange('platform', option.value);
    }

    const reset: () => void = () => {
        setValues(initialValues);
    };

    const handleChange: (field: keyof StreamerEntity, value: string) => void = (field, value) => {
        setValues(localValues => ({
            ...localValues,
            [field]: value
        }));
    };

    return (
        <>
            <td className={`td_streamer_name ${actionType !== Status.Add ? 'center-text' : ''}`} colSpan={1}>
                {actionType === Status.Add ? <h2 className="center-text">Name</h2> : ''}
                {actionType === Status.Add ?
                    <label htmlFor="name">
                        Enter the streamer's name on the specified streaming platform
                    </label>
                    : ''}
                {actionType === Status.Add ?
                    <input
                        placeholder="What is the name of the streamer?"
                        className="input_streamer_name"
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={values.name}
                        onChange={(event) => handleChange('name', event.target.value)}
                    />
                    : <h2 className="h2_streamer_name">{values.name}</h2>}
            </td>
            <td className={`td_streaming_platform ${actionType !== Status.Add ? 'center-text' : ''}`} colSpan={1}>
                {actionType === Status.Add ? <h2 className="center-text">Platform</h2> : ''}
                {actionType === Status.Add ?
                    <label htmlFor="">
                        Select the platform this streamer is broadcasting on
                    </label>
                    : ''}
                {actionType === Status.Add ?
                    <Dropdown placeholder="Select..." options={options} onItemClick={onItemClick}/>
                    : (
                        <div>
                            {getPlatformIcon(values.platform)} {values.platform}
                        </div>)}
            </td>
            <td className="td_streamer_description" colSpan={1}>
                {actionType === Status.Add ? <h2 className="center-text">Description</h2> : ''}
                {actionType === Status.Add ?
                    <label htmlFor="description">
                        Please provide some information about this streamer
                    </label>
                    : ''}
                {actionType === Status.Add ?
                    <textarea
                        placeholder="Streamer description"
                        className="textarea_streamer_description"
                        name="description"
                        id="description"
                        required
                        value={values.description}
                        onChange={(event) => handleChange('description', event.target.value)}
                    />
                    : <Link to={`/streamer/${streamerId}`}><Button>Details</Button></Link>
                }
            </td>
            <td colSpan={1}>
                {actionType === Status.Add ? (
                    <Button className="button_add_streamer" onClick={() => onSubmit ? onSubmit(values, reset) : ''}>Add streamer</Button>
                ) : (
                    <div>{votes}</div>
                )}
            </td>
        </>
    );
};