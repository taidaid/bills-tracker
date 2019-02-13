import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default props => {
  const handleRemove = index => {
    props.handleRemove(index);
  };

  // extricates styling
  const liStyle =
    "p-4 inline uppercase font-black cursor-pointer hover:bg-grey-light";

  return (
    <ul className="list-reset inline flex justify-center border-b-4 mb-0">
      <li className={liStyle + " bg-grey-dark"}>Remove Category</li>
      {// maps through categories and displays in Navbar
      props.categories ? (
        props.categories.map((category, index) => {
          return (
            <Link
              to="./dashboard"
              key={index}
              className={liStyle}
              style={{ textDecoration: "none", color: "black" }}
            >
              <li
                className={liStyle}
                // set background-color based on activeCategory, clicking Navbar element that matches activeCategory, empties activeCategory
                onClick={() => {
                  handleRemove(index);
                }}
              >
                {category}
              </li>
            </Link>
          );
        })
      ) : (
        <li>No categories</li>
      )}
      <Link to="./dashboard" style={{ textDecoration: "none", color: "black" }}>
        <button className={liStyle}>
          <li className={liStyle}>-</li>
        </button>
      </Link>
    </ul>
  );
};
