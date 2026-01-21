import { useState } from "react";

interface AccordionProps {
  data: { id: number; title: string; content: string; open: boolean }[];
  multipleOpen?: boolean;
}

const Accordion = ({ data, multipleOpen = false }: AccordionProps) => {
  const [accordionData, setAccordionData] = useState(data);

  const handleToggle = (id: number) => {
    setAccordionData((prev) => {
      return prev.map((a) => (a.id === id ? { ...a, open: !a.open } : a));
    });
  };

  return (
    <div className="accordion w-full max-w-md rounded overflow-hidden divide-y-1 divide divide-indigo-100">
      {accordionData.map((item) => (
        <div key={item.id} className="accordion-item">
          <div className="accordion-header bg-zinc-800">
            <button
              className="w-full p-2 flex items-center justify-between cursor-pointer"
              onClick={() => handleToggle(item.id)}
            >
              <span>{item.title}</span>
              <span>{">"}</span>
            </button>
          </div>
          <div
            className={`
            grid transition-all ease-in-out duration-500
            ${!item.open ? "grid-rows-[0fr]" : "grid-rows-[1fr]"}
          `}
          >
            <div className="overflow-hidden bg-zinc-800">
              <p className="p-4 pt-0">{item.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
