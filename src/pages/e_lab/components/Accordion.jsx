import React, { useState } from 'react';
import AccordionItem from './AccordionItem';

const Accordion = ({ labs }) => {
    // console.log(labs, {labs});
  const [openAccordion, setOpenAccordion] = useState("Description");

  const accordionContent = {
    "Description": <p className="text-black">{labs.description}</p>,
    "I/O Format": <p className="text-black">{labs.io_format}</p>,
    "Constraints": <p className="text-black">{labs.constraints}</p>,
    "Sample I/O": <p className="text-black">{labs.io_sample}</p>, // Assuming labs.sample_io exists
    "Pseudo Code": (
      <pre className="text-black">
        <code>{labs.pseudo_code}</code>
      </pre>
    ),// Assuming labs.pseudo_code exists
  };

  return (
    <div className="font-bold">
      <div className="flex h-11 w-full items-center pt-2 pb-2 bg-gray-100">
        {Object.keys(accordionContent).map((title) => (
          <AccordionItem
            key={title}
            title={title}
            isOpen={openAccordion}
            setIsOpen={setOpenAccordion}
          />
        ))}
      </div>
      <div className="flex px-2 py-4 h-[calc(100vh-94px)] overflow-y-auto bg-white">
        <div className="w-full">
          <div className="flex space-x-4">
            <div className="flex-1 mr-2 text-md text-black font-medium">
              {labs.name}{" "}
            </div>
          </div>
          <div className="mt-4">
            <div className="example-card">
              <pre>
                <strong className="text-black">
                  {accordionContent[openAccordion]}{" "}
                </strong>
                <br />
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
