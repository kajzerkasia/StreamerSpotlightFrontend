import React, {useState} from 'react';
import {StreamerEntity, Status} from 'types';
import {TbPlus, TbCheck} from "react-icons/tb";
import {IconContext} from "react-icons";
import './StreamerForm.css';

export type StreamerFormProps = {
    initialValues: StreamerEntity;
    onSubmit: (values: StreamerEntity, reset: () => void) => void | Promise<void>;
    actionType: Status;
};

export const StreamerForm = ({initialValues, onSubmit, actionType}: StreamerFormProps) => {
    const [values, setValues] = useState<StreamerEntity>(() => initialValues);

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
            <td className="td_streamer_name" colSpan={2}>
                <input
                    placeholder="What is the name of the streamer?"
                    className="input_streamer_name"
                    type="text"
                    name="name"
                    required
                    value={values.name}
                    onChange={(event) => handleChange('name', event.target.value)}
                />
                <label htmlFor="name"></label>
            </td>
            <td className="td_streaming_platform" colSpan={2}>
                <input
                    placeholder="What is the streaming platform of this streamer?"
                    className="input_streaming_platform"
                    type="text"
                    name="platform"
                    required
                    value={values.platform}
                    onChange={(event) => handleChange('platform', event.target.value)}
                />
                <label htmlFor="platform"></label>
            </td>
            <td>
                <IconContext.Provider value={{className: 'react-icons'}}>
                    <button type='button' onClick={() => onSubmit(values, reset)}>{actionType === Status.Add ? <TbPlus/> : <TbCheck/>}</button>
                </IconContext.Provider>
            </td>
        </>
    );
};