import React, {useState} from 'react';
import {StreamerEntity, Status} from 'types';
import {TbPlus, TbCheck, TbBrandTwitch, TbBrandYoutube, TbBrandTiktok, TbBrandKick} from "react-icons/tb";
import {IconContext} from "react-icons";
import './StreamerForm.css';
import {Dropdown, Option} from "../Dropdown/Dropdown";
import {Votes} from "../Votes/Votes";

export type StreamerFormProps = {
    initialValues: StreamerEntity;
    onSubmit: (values: StreamerEntity, reset: () => void) => void | Promise<void>;
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
            <td className="td_streamer_name">
                {actionType === Status.Add ?
                    <label htmlFor="">
                        Enter the streamer's name on the specified streaming platform.
                    </label>
                    : ''}
                <input
                    placeholder="What is the name of the streamer?"
                    className="input_streamer_name"
                    type="text"
                    name="name"
                    required
                    value={values.name}
                    onChange={(event) => handleChange('name', event.target.value)}
                />
            </td>
            <td className="td_streaming_platform">
                {actionType === Status.Add ?
                    <label htmlFor="">
                        Select the platform on which this streamer is broadcasting from the drop-down list.
                    </label>
                    : ''}
                {actionType === Status.Add ?
                    <Dropdown placeholder="Select..." options={options} onItemClick={onItemClick}/>
                    : <p>{values.platform}</p>}
            </td>
            <td>
                {actionType === Status.Add ? (

                    <button className="button" type='button' onClick={() => onSubmit(values, reset)}>Add streamer to the list
                    </button>
                ) : (
                    <Votes/>
                )}
            </td>


        </>
    );
};