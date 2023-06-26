import React, {HTMLAttributes, PropsWithChildren} from "react";
import './Button.css';

interface Props extends HTMLAttributes<HTMLButtonElement>, PropsWithChildren {
    customClasses?: string;
    status?: "active" | "disabled";
}

export const Button = ({
                           className,
                           children,
                           customClasses = "",
                           status = "active",
                           ...rest
                       }: Props) => {
    return (
        <button
            {...rest}
            className={`button ${[status]} ${customClasses}`}
        >
            {children}
        </button>
    );
};