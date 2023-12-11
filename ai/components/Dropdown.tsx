import React, { useState } from 'react';

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item: any) => {
    // Handle item click logic here
    console.log(`Selected item: ${item}`);
    // Close the dropdown after item click (optional)
    setIsOpen(false);
  };

  return (
    <div className="relative text-black inline-block m-4">
      <button
        className="bg-gray-300 text-black font-semibold py-2 px-4 rounded inline-flex items-center"
        onClick={handleToggle}
      >
        <span className="mr-1">Menu</span>
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M10 12.36l-1.4 1.4L2 6.24l1.4-1.4L10 9.56l6.6-6.6L18 6.24 10 12.36z" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-48 bg-white border rounded-lg shadow-lg">
          <ul>
            <li className="py-2 px-4 cursor-pointer hover:bg-gray-200" onClick={() => handleItemClick('Item 1')}>
              Transaction explainer
            </li>
            <li className="py-2 px-4 cursor-pointer hover:bg-gray-200" onClick={() => handleItemClick('Item 2')}>
              Item 2
            </li>
            <li className="py-2 px-4 cursor-pointer hover:bg-gray-200" onClick={() => handleItemClick('Item 3')}>
              Item 3
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
