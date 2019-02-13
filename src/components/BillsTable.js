import React from "react";
import Moment from "react-moment";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

//TODO
// remove button is not working correctly

export default props => {
  const removeBill = index => {
    props.removeBill(index);
  };

  return (
    <table className="table border w-full">
      <thead className="bg-blue text-white">
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Amount</th>
          <th scope="col">Category</th>
          <th scope="col" />
        </tr>
      </thead>
      <tbody>
        <tr className="p-4 bg-blue-lighter text-center">
          <td colSpan="4">
            <button>
              <Link to="/add-bill" className="hover:text-white text-black">
                Add new
              </Link>
            </button>
          </td>
        </tr>

        {props.bills.map((bill, index) => {
          if (index % 2 === 0) {
            return (
              <tr className="p4" key={index}>
                <td className="p-2 w-1/3">
                  <Moment format="MMM D YYYY">{bill.date}</Moment>
                </td>
                <td className="p-2 w-1/3">${bill.amount}</td>
                <td className="p-2 w-1/3">{bill.category}</td>
                <td
                  className="cursor-pointer"
                  onClick={() => removeBill(index)}
                >
                  X
                </td>
              </tr>
            );
          } else {
            return (
              <tr className="p4 bg-blue-lightest" key={index}>
                <td className="p-2 w-1/3">
                  <Moment format="MMM D YYYY">{bill.date}</Moment>
                </td>
                <td className="p-2 w-1/3">${bill.amount}</td>
                <td className="p-2 w-1/3">{bill.category}</td>
                <td
                  className="cursor-pointer"
                  onClick={() => removeBill(index)}
                >
                  X
                </td>
              </tr>
            );
          }
        })}
      </tbody>
    </table>
  );
};
