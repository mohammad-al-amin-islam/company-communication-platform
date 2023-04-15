import React from "react";
import { BsMessenger, BsMicrosoftTeams } from "react-icons/bs";

interface CardProps {
  title: string;
  buttonText: string;
  onButtonClick: () => void;
}

const Card: React.FC<CardProps> = ({ title, buttonText, onButtonClick }) => {
  return (
    <div className="card hover:scale-105 hover:translate-x-4 duration-500">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-cyan-700 flex items-center"><BsMicrosoftTeams className="mr-1" />Team Name: <span className="font-normal text-rose-700">{title}</span></div>
        <div className="flex justify-end">
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center"
            onClick={onButtonClick}
          >
            <BsMessenger className="mr-2"/>
            {buttonText} 
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
