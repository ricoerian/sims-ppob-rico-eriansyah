import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
}

const Card = ({ children }: CardProps) => {
  return (
    <div className="flex m-auto mt-6 bg-white w-[50rem] rounded shadow-md">
        {children}
    </div>
  );
}

export default Card;