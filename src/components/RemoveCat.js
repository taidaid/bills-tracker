import React from "react";

export default props => {
  const handleRemove = index => {
    props.handleRemove(index);
  };

  // extricates styling
  const liStyle = "p-4 inline uppercase font-black cursor-pointer";

  return (
    <ul className="list-reset inline flex justify-center border-b-4 mb-0">
      <li className={liStyle + " bg-grey-dark"}>Remove Category</li>
      {// maps through categories and displays in Navbar
      props.categories ? (
        props.categories.map((category, index) => {
          return (
            <li
              className={liStyle + " hover:bg-grey-light"}
              key={index}
              // set background-color based on activeCategory, clicking Navbar element that matches activeCategory, empties activeCategory
              onClick={() => {
                handleRemove(index);
              }}
            >
              {category}
            </li>
          );
        })
      ) : (
        <li>No categories</li>
      )}
    </ul>
  );
};
