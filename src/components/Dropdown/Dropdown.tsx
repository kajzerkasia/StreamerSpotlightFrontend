import React, { useEffect, useState } from "react";
import "./Dropdown.css";
import {ArrowDownIcon} from "../ArrowDownIcon/ArrowDownIcon";
import {getPlatformIcon} from "../../utils/getPlatformIcon";

export interface Option {
    label: string;
    value: string;
}

interface DropdownProps {
    placeholder: string;
    options: Option[];
    onItemClick: (option: Option) => void;
}

export const Dropdown = ({ placeholder, options, onItemClick }: DropdownProps) => {
    const [showMenu, setShowMenu] = useState(false);
    const [selectedValue, setSelectedValue] = useState<Option | null>(null);

    useEffect(() => {
        const handler = () => setShowMenu(false);

        window.addEventListener("click", handler);
        return () => {
            window.removeEventListener("click", handler);
        };
    }, []);

    const handleInputClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        setShowMenu(!showMenu);
    };

    const getDisplay = () => {
        if (selectedValue) {
            return (
                <>
                    {getPlatformIcon(selectedValue.value)} {selectedValue.label}
                </>
            );
        }
        return placeholder;
    };

    const isSelected = (option: Option) => {
        if (!selectedValue) {
            return false;
        }
        return selectedValue.value === option.value;
    };

    return (
        <div className={`dropdown-container ${showMenu ? "show-menu" : ""}`}>
            <div onClick={handleInputClick} className="dropdown-input">
                <div className={`dropdown-selected-value ${!selectedValue ? "placeholder" : ""}`}>
                    {getDisplay()}
                </div>
                <div className="dropdown-tools">
                    <div className="dropdown-tool">
                        <ArrowDownIcon />
                    </div>
                </div>
            </div>
            <div className={`dropdown-menu ${showMenu ? "show" : ""}`} onClick={(e) => e.stopPropagation()}>
                {options.map((option) => (
                    <div
                        onClick={() => {
                            onItemClick(option);
                            setSelectedValue(option);
                            setShowMenu(false);
                        }}
                        key={option.value}
                        className={`dropdown-item ${isSelected(option) ? "selected" : ""}`}
                    >
                        <>
                            {getPlatformIcon(option.value)} {option.label}
                        </>
                    </div>
                ))}
            </div>
        </div>
    );
};
