import React, { useState } from "react";
import DatePicker from "react-datepicker";
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";

export default props => {
  const [date, setDate] = useState(new Date());
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState(props.categories[0]);

  const handleChangeDate = date => {
    setDate(date);
  };

  const handleChangeCategory = e => {
    setCategory(e.target.value);
  };

  const handleChangeAmount = e => {
    setAmount(parseInt(e.target.value, 10));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!amount) {
      alert("Please enter an amount!");
      return;
    }
    props.history.push("/dashboard");
    props.onSubmit(amount, category || props.categories[0], date);
  };

  return (
    <form
      className="h-100 w-full flex items-center justify-center font-sans"
      onSubmit={handleSubmit}
    >
      <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div className="mb-4">
          <h1 className="text-grey-darkest">Enter a bills category</h1>
          <p className="ml-2">E.g. 'Electricity', 'Internet', or 'Rent'</p>
        </div>

        <div className="flex mt-4">
          <DatePicker selected={date} onChange={handleChangeDate} />
          <input
            className={` shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker`}
            placeholder="Amount"
            value={amount}
            onChange={handleChangeAmount}
            autoFocus
          />
          <select onChange={handleChangeCategory}>
            {props.categories
              ? props.categories.map((value, index) => {
                  return (
                    <option key={index} value={value}>
                      {value}
                    </option>
                  );
                })
              : ""}
          </select>
        </div>
        {amount ? (
          <button onClick={handleSubmit}>
            <Link
              className="flex-no-shrink ml-2 p-2 border-2 rounded bg-teal text-white border-teal hover:text-white hover:bg-teal"
              to="/dashboard"
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

        <Link to="/dashboard">
          <button
            className="flex-no-shrink ml-2 p-2 border-2 rounded bg-teal text-white border-teal hover:text-white hover:bg-teal"
            type="button"
          >
            Cancel
          </button>
        </Link>
      </div>
    </form>
  );
};
