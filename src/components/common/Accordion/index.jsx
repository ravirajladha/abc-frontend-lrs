import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AccordionItem } from '@/components/common';

const Accordion = ({ items }) => {
  const [openAccordion, setOpenAccordion] = useState(items[0].title);

  return (
    <div className="font-bold">
      <div className="flex w-full items-center pt-2 pb-2">
        {items.map((item) => (
          <AccordionItem
            key={item.title}
            title={item.title}
            isOpen={openAccordion}
            setIsOpen={setOpenAccordion}
          />
        ))}
      </div>
      <div className="flex px-2 py-4 h-[calc(200vh-94px)]  bg-white">
        <div className="w-full">
          {items.map(
            (item) =>
              openAccordion === item.title && (
                <div key={item.title} className="mt-4">
                  <div className="example-card">
                    {/* <pre> */}
                      <strong className="text-black">{item.content}</strong>
                      <br />
                    {/* </pre> */}
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

Accordion.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
    })
  ).isRequired,
};

export default Accordion;
