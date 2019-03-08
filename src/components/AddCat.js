/* eslint-disable no-unused-vars */
import React, { useState } from "react";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";

export default props => {
  const [category, setCategory] = useState("");

  const handleChange = e => {
    setCategory(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!category) {
      alert("Please enter a category!");
      return;
    }
    props.history.push("/dashboard");
    props.onSubmit(category);
  };

  return (
    <form
      className="h-100 w-full flex items-center justify-center text-center font-sans"
      onSubmit={handleSubmit}
    >
      <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div className="mb-4">
          <h1 className="text-grey-darkest">Enter a bills category</h1>
          <p className="ml-2">E.g. 'Electricity', 'Internet', or 'Rent'</p>
        </div>
        <div className="flex mt-4">
          <input
            className={` shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker`}
            placeholder="Add category"
            value={category}
            onChange={handleChange}
            autoFocus
          />
          {category ? (
            <button onClick={handleSubmit}>
              <Link
                to="/dashboard"
                className="flex-no-shrink ml-2 p-2 border-2 rounded bg-teal text-white border-teal hover:text-white hover:bg-teal"
              >
                Add
              </Link>
            </button>
          ) : (
            <button
              className="flex-no-shrink ml-2 p-2 border-2 rounded bg-grey-light text-white border-grey cursor-default"
              onClick={handleSubmit}
            >
              Add
            </button>
          )}

          <Link
            to="/dashboard"
            onClick={() =>
              !props.categories.length
                ? alert("Please enter a category!")
                : null
            }
          >
            <button
              className="flex-no-shrink ml-2 p-2 border-2 rounded bg-teal text-white border-teal hover:text-white hover:bg-teal"
              type="button"
            >
              Cancel
            </button>
          </Link>
        </div>
      </div>
    </form>
  );
};
