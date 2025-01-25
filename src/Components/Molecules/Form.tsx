import React, { ReactNode, FormHTMLAttributes } from "react";

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
    children: ReactNode;
}

const Form: React.FC<FormProps> = ({ children, ...props }) => {
    return (React.createElement("form", Object.assign({}, props), children));
}

export default Form;