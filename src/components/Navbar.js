import React from "react";

export default props => {
  const triggerShowAddCat = () => {
    props.showAddCat();
  };
  return (
    <ul className="list-reset inline flex justify-center border-b-4 mb-0">
      {props.categories ? (
        props.categories.map((category, index) => {
          return (
            <li
              className="p-4 inline bg-grey-lighter hover:bg-grey-light uppercase font-black cursor-pointer"
              key={index}
            >
              {category}
            </li>
          );
        })
      ) : (
        <li>No categories</li>
      )}
      <li
        className="p-4 inline bg-grey-lighter hover:bg-grey-light uppercase font-black cursor-pointer"
        onClick={triggerShowAddCat}
      >
        +
      </li>
    </ul>
  );
};
