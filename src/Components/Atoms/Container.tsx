import React, { ReactNode, HTMLAttributes } from 'react';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode;
}

const Container = ({ className, children, ...props }: ContainerProps) => {
    return (React.createElement("div", Object.assign({className: `w-[94%] p-3 m-auto ${className}`}, props), children));
}

export default Container;