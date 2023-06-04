import { useEffect, useRef, useState } from "react";
import { GoChevronUp, GoChevronDown } from "react-icons/go";

function Dropdown({ options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const divElement = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (!divElement.current) {
        return;
      }
      if (!divElement.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handler, true);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  const handleClick = () => {
    setIsOpen((currentIsOpen) => !currentIsOpen);
  };

  const handleOptionClick = (selectedOption) => {
    setIsOpen(false);
    onChange(selectedOption);
  };
  const renderedOptions = options.map((option) => {
    return (
      <div
        className="hover:bg-zinc-300 rounded cursor-pointer px-5 py-3"
        onClick={() => handleOptionClick(option)}
        key={option.value}
      >
        {option.label}
      </div>
    );
  });
  return (
    <div className="px-5 py-3 text-stone-500 bg-stone-200 rounded-xl mb-5 w-5/6 shadow-base">
      <div
        className="flex flex-row justify-between items-center text-lg"
        onClick={handleClick}
      >
        {value.label || "Select one"}
        {isOpen ? (
          <GoChevronUp className="font-semibold" />
        ) : (
          <GoChevronDown className="font-semibold" />
        )}
      </div>
      {isOpen && renderedOptions}
    </div>
  );
}

export default Dropdown;
