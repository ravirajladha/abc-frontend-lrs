import React from 'react';

const AccordionItem = ({ title, isOpen, setIsOpen }) => {
  return (
    <div className="inline-block items-center mr-10 ml-10 gap-2">
      <button
        className={` rounded-t-[5px] flex-grow text-left py-2 px-4 focus:outline-none border border-gray-300 ${
          isOpen === title
            ? "bg-gray-100"
            : "bg-white text-gray-700 hover:bg-gray-200"
        }`}
        onClick={() => setIsOpen(title)}
      >
        {title}
      </button>
      {isOpen === title && (
        <div className="p-1 bg-gray-800 text-white">{/* children will go here if needed */}</div>
      )}
    </div>
  );
};

export default AccordionItem;
