import React from "react";

interface ImageProps {
    src: string;
    alt: string;
    className?: string;
}

const Image: React.FC<ImageProps> = ({ src, alt, className, ...props }) => {
    return (React.createElement("img", Object.assign({ src: src, alt: alt, className: className }, props)));
};

export default Image;