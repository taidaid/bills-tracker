import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// TODO: Allow more than one activeCategory

export default props => {
  // updates activeCategory
  const setNewActiveCategory = index => {
    props.setNewActiveCategory(index);
  };

  // extricates styling
  const liStyle =
    "p-4 inline hover:bg-grey-light uppercase font-black cursor-pointer";

  return (
    <ul className="list-reset inline flex justify-center border-b-4 mb-0">
      <li
        // set background-color based on activeCategory
        className={
          liStyle +
          (props.activeCategory === "" || props.activeCategory === undefined
            ? " bg-grey-dark"
            : " bg-grey-lighter")
        }
        // empties activeCategory so default 'All' category is used
        onClick={() => setNewActiveCategory("")}
      >
        All
      </li>
      {// maps through categories and displays in Navbar
      props.categories ? (
        props.categories.map((category, index) => {
          return (
            <li
              className={
                liStyle +
                (props.activeCategory === index
                  ? " bg-grey-dark"
                  : " bg-grey-lighter")
              }
              key={index}
              // set background-color based on activeCategory, clicking Navbar element that matches activeCategory, empties activeCategory
              onClick={() => {
                if (props.activeCategory === index) {
                  setNewActiveCategory("");
                } else {
                  setNewActiveCategory(index);
                }
              }}
            >
              {category}
            </li>
          );
        })
      ) : (
        <li>No categories</li>
      )}
      <Link
        to="./add-category"
        className={liStyle}
        style={{ textDecoration: "none", color: "black" }}
      >
        <li className={liStyle}>+</li>
      </Link>
      <Link
        to="./remove-category"
        className={liStyle}
        style={{ textDecoration: "none", color: "black" }}
      >
        <li className={liStyle}>-</li>
      </Link>
    </ul>
  );
};
