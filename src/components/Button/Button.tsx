import React, { HTMLAttributes } from "react";
import "./Button.css";
import { Link, LinkProps } from "react-router-dom";

type ButtonProps = {
    status?: "active" | "disabled";
} & (HTMLAttributes<HTMLButtonElement> | LinkProps);

export const Button = ({ className, children, status = "active", ...rest }: ButtonProps) => {
    const isLink = "to" in rest;

    if (isLink) {
        const { to, ...linkProps } = rest as LinkProps;
        return (
            <Link className={`button ${status} ${className}`} to={to} {...linkProps}>
                {children}
            </Link>
        );
    }

    return (
        <button className={`button ${status} ${className}`} {...(rest as HTMLAttributes<HTMLButtonElement>)}>
            {children}
        </button>
    );
};