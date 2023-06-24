import React, {useState} from 'react';
import {StreamerEntity, Status} from 'types';
import {TbPlus, TbCheck, TbBrandTwitch, TbBrandYoutube, TbBrandTiktok, TbBrandKick} from "react-icons/tb";
import {IconContext} from "react-icons";
import './StreamerForm.css';

export type StreamerFormProps = {
    initialValues: StreamerEntity;
    onSubmit: (values: StreamerEntity, reset: () => void) => void | Promise<void>;
    actionType: Status;
};

export const StreamerForm = ({initialValues, onSubmit, actionType}: StreamerFormProps) => {
    const [values, setValues] = useState<StreamerEntity>(() => initialValues);
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
    };

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
                {/*<input*/}
                {/*    placeholder="What is the streaming platform of this streamer?"*/}
                {/*    className="input_streaming_platform"*/}
                {/*    type="text"*/}
                {/*    name="platform"*/}
                {/*    required*/}
                {/*    value={values.platform}*/}
                {/*    onChange={(event) => handleChange('platform', event.target.value)}*/}
                {/*/>*/}
                <div className="dropdown">
                    <button onClick={handleOpen}>Select</button>
                    {open ? (
                        <ul className="menu">
                            <li className="menu-item">
                                <IconContext.Provider value={{className: 'react-icons'}}>
                                    <button><TbBrandTwitch/> Twitch</button>
                                </IconContext.Provider>
                            </li>
                            <li className="menu-item">
                                <IconContext.Provider value={{className: 'react-icons'}}>
                                    <button><TbBrandYoutube/> YouTube</button>
                                </IconContext.Provider>
                            </li>
                            <li className="menu-item">
                                <IconContext.Provider value={{className: 'react-icons'}}>
                                    <button><TbBrandTiktok/> TikTok</button>
                                </IconContext.Provider>
                            </li>
                            <li className="menu-item">
                                <IconContext.Provider value={{className: 'react-icons'}}>
                                    <button><TbBrandKick/> Kick</button>
                                </IconContext.Provider>
                            </li>
                            <li className="menu-item">
                                <button><img className="rumble" src="../../assets/rumble_logo.png" alt=""></img>Rumble</button>
                            </li>
                        </ul>
                    ) : null}
                </div>
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