import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
}

const Card = ({ children }: CardProps) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex bg-white w-[50rem] rounded shadow-md">
        {children}
      </div>
    </div>
  );
}

export default Card;
