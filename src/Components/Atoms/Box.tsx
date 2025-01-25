import React, { ReactNode, HTMLAttributes } from 'react';

interface BoxProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

const Box = ({ children, ...props }: BoxProps) => {
    return (React.createElement("div", Object.assign({}, props), children));
}

export default Box;