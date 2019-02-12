import React from "react";
import { Bar } from "react-chartjs-2";
import moment from "moment";

const last12Months = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const today = new Date();
  const orderedMonths = [];
  let month = today.getMonth() + 1;

  for (let i = 0; i < 12; i++) {
    orderedMonths.push(months[month]);
    month === 11 ? (month = 0) : month++;
  }

  return orderedMonths;
};

const processBills = bills => {
  const oneYearAgo = moment().subtract(1, "years");
  const months = last12Months();
  const monthsWithValues = new Array(12).fill(0);

  // for (const month of monthsWithValues) {
  //   monthsWithValues[month] = 0;
  // }

  for (const bill of bills) {
    if (moment(bill.date).isSameOrBefore(oneYearAgo)) {
      continue;
    }
    const monthName = moment(bill.date).format("MMMM");
    const indexOfMonth = months.indexOf(monthName);
    monthsWithValues[indexOfMonth] += parseInt(bill.amount);
  }

  return monthsWithValues;
};

export default props => {
  const data = {
    labels: last12Months(),
    datasets: [
      {
        label: "Bills",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: processBills(props.bills)
      }
    ]
  };

  return (
    <div>
      <Bar data={data} />
    </div>
  );
};
