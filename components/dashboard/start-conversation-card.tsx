import React from "react";

interface CardProps {
  title: string;
  buttonText: string;
  onButtonClick: () => void;
}

const Card: React.FC<CardProps> = ({ title, buttonText, onButtonClick }) => {
  return (
    <div className="w-2/3 rounded overflow-hidden shadow-lg mb-5 bg-white">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">Team Name: {title}</div>
        <div className="text-end">
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={onButtonClick}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
