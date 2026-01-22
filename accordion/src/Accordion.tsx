import { useState } from "react";

interface AccordionItem {
  id: number | string;
  title: string;
  content: string;
}

interface AccordionProps {
  data: AccordionItem[];
  multipleOpen?: boolean;
  initialOpenIds?: (number | string)[];
}

const Accordion = ({
  data,
  multipleOpen = false,
  initialOpenIds = [],
}: AccordionProps) => {
  // Store only the IDs of open items for better state management
  const [openIds, setOpenIds] = useState<(number | string)[]>(initialOpenIds);

  const toggleItem = (id: number | string) => {
    setOpenIds((prev) => {
      const isOpen = prev.includes(id);

      if (multipleOpen) {
        // Toggle the clicked ID in/out of the array
        return isOpen ? prev.filter((itemId) => itemId !== id) : [...prev, id];
      } else {
        // Only allow one ID at a time (or none if clicking the same one)
        return isOpen ? [] : [id];
      }
    });
  };

  return (
    <div className="accordion w-full max-w-md rounded-lg overflow-hidden border border-zinc-700 divide-y divide-zinc-700">
      {data.map((item) => {
        const isOpen = openIds.includes(item.id);

        return (
          <div key={item.id} className="accordion-item flex flex-col">
            <button
              onClick={() => toggleItem(item.id)}
              aria-expanded={isOpen}
              aria-controls={`content-${item.id}`}
              className="w-full p-4 flex items-center justify-between bg-zinc-800 hover:bg-zinc-700 transition-colors cursor-pointer text-left"
            >
              <span className="font-medium text-zinc-100">{item.title}</span>
              <span
                className={`transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              >
                ▼
              </span>
            </button>

            <div
              id={`content-${item.id}`}
              role="region"
              className={`
                grid transition-all ease-in-out duration-300
                ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}
          `}
            >
              <div className="overflow-hidden bg-zinc-900">
                <div className="p-4 text-zinc-400">{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
