import React, { useState, useEffect } from "react";

import "./App.css";
import AddCat from "./components/AddCat";
import Navbar from "./components/Navbar";
import BillsTable from "./components/BillsTable";
import Chart from "./components/Chart";
import AddBill from "./components/AddBill";

const App = () => {
  const [shouldShowAddCat, setShouldShowAddCat] = useState(true);
  const [shouldShowAddBill, setShouldShowAddBill] = useState(false);
  const [categories, setCategories] = useState([]);
  const [bills, setBills] = useState([]);

  const addCategory = category => {
    const updatedCategories = [...(categories || []), category];
    setCategories(updatedCategories);
    setShouldShowAddCat(false);
    localStorage.setItem("categories", JSON.stringify(updatedCategories));
  };

  const addBill = (amount, category, date) => {
    const bill = { amount, category, date };
    const updatedBills = [...(bills || []), bill];
    setBills(updatedBills);
    setShouldShowAddBill(false);
    localStorage.setItem("bills", JSON.stringify(updatedBills));
  };

  const showAddCat = () => {
    setShouldShowAddCat(true);
  };

  const showAddBill = () => {
    setShouldShowAddBill(true);
  };

  const removeBill = index => {
    let updatedBills = [...bills];
    updatedBills = updatedBills
      .slice(0, index)
      .concat(updatedBills.slice(index + 1, updatedBills.length));
    setBills(updatedBills);
    localStorage.setItem("bills", JSON.stringify(updatedBills));
  };

  useEffect(() => {
    const categoriesInLocalStorage = JSON.parse(
      localStorage.getItem("categories")
    );
    const billsInLocalStorage = JSON.parse(localStorage.getItem("bills"));

    setCategories(categoriesInLocalStorage);
    setBills(billsInLocalStorage);

    if (!categoriesInLocalStorage) {
      setShouldShowAddCat(true);
    } else {
      setShouldShowAddCat(false);
    }
  }, []);

  return (
    <div className="App ">
      {shouldShowAddCat ? (
        <AddCat onSubmit={addCategory} />
      ) : shouldShowAddBill ? (
        <AddBill onSubmit={addBill} categories={categories} />
      ) : (
        <div className="">
          <Navbar categories={categories} showAddCat={showAddCat} />
          <div className="container mx-auto text-center flex">
            <div className="w-1/2 flex justify-center ">
              <BillsTable
                bills={bills}
                showAddBill={showAddBill}
                removeBill={removeBill}
              />
            </div>

            <div className="w-1/2">
              <Chart />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
