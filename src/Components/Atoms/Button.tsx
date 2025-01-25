import React from "react";

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, type, disabled, className }) => {
    return (React.createElement("button", { onClick: onClick, type: type, disabled: disabled, className: `${className} bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer` }, children));
}

export default Button;