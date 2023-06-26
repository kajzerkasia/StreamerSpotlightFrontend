import React, {HTMLAttributes, PropsWithChildren} from "react";
import './Button.css';

interface Props extends HTMLAttributes<HTMLButtonElement>, PropsWithChildren {
    status?: "active" | "disabled";
}

export const Button = ({
                           className,
                           children,
                           status = "active",
                           ...rest
                       }: Props) => {
    return (
        <button
            {...rest}
            className={`button ${[status]}`}
        >
            {children}
        </button>
    );
};