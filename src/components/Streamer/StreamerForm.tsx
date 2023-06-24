import React, {useState} from 'react';
import {StreamerEntity, Status} from 'types';
import './StreamerForm.css';
import {Dropdown, Option} from "../Dropdown/Dropdown";
import {Votes} from "../Votes/Votes";
import {getPlatformIcon} from "../../utils/getPlatformIcon";

export type StreamerFormProps = {
    initialValues: StreamerEntity;
    onSubmit?: (values: StreamerEntity, reset: () => void) => void | Promise<void>;
    actionType: Status;
};

export const StreamerForm = ({initialValues, onSubmit, actionType}: StreamerFormProps) => {
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

    const options = [
        {value: "Twitch", label: "Twitch"},
        {value: "YouTube", label: "YouTube"},
        {value: "TikTok", label: "TikTok"},
        {value: "Kick", label: "Kick"},
        {value: "Rumble", label: "Rumble"},
    ]

    return (
        <>
            <td className="td_streamer_name" colSpan={1}>
                {actionType === Status.Add ?
                    <label htmlFor="">
                        Enter the streamer's name on the specified streaming platform
                    </label>
                    : ''}
                {actionType === Status.Add ?
                    <input
                        placeholder="What is the name of the streamer?"
                        className="input_streamer_name"
                        type="text"
                        name="name"
                        required
                        value={values.name}
                        onChange={(event) => handleChange('name', event.target.value)}
                    />
                    : <p>{values.name}</p>}
            </td>
            <td className="td_streaming_platform" colSpan={1}>
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
            <td colSpan={1}>
                {actionType === Status.Add ? (

                    <button className="button_add_streamer" type='button' onClick={() => onSubmit ? onSubmit(values, reset) : ''}>Add streamer
                    </button>
                ) : (
                    <Votes/>
                )}
            </td>


        </>
    );
};