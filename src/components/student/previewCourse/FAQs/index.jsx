import React from 'react';
import { Accordion } from 'react-bootstrap';
const index = () => {
  const faqs = [
    {
      title: 'title 1',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo amet aspernatur, aperiam quibusdam voluptatem vel incidunt, voluptatibus ipsum nobis vero pariatur at? Magnam ipsam enim earum',
    },
    {
      title: 'title 2',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo amet aspernatur, aperiam quibusdam voluptatem vel incidunt, voluptatibus ipsum nobis vero pariatur at? Magnam ipsam enim earum',
    },
    {
      title: 'title 3',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo amet aspernatur, aperiam quibusdam voluptatem vel incidunt, voluptatibus ipsum nobis vero pariatur at? Magnam ipsam enim earum',
    },
    {
      title: 'title 4',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo amet aspernatur, aperiam quibusdam voluptatem vel incidunt, voluptatibus ipsum nobis vero pariatur at? Magnam ipsam enim earum',
    },
  ];
  return (
    <div className="">
      <h2 className="fw-700 font-sm mb-3 mt-1 pl-1 text-black my-4">FAQs</h2>

      <Accordion defaultActiveKey={0}>
        {faqs.map((faq, index) => (
          <Accordion.Item eventKey={index} key={index} className="">
            <Accordion.Header className="bg-lightgreen shadow-md p-4 font-xss fw-600 rounded mb-1">
              {faq.title}
            </Accordion.Header>
            <Accordion.Body className="bg-grey p-4 font-xsss fw-500 text-black">
              {faq.description}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default index;
