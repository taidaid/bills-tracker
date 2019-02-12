import React, { useState, useEffect } from "react";

import "./App.css";
import AddCat from "./components/AddCat";
import Navbar from "./components/Navbar";
import BillsTable from "./components/BillsTable";
import Chart from "./components/Chart";
import AddBill from "./components/AddBill";
import RemoveCat from "./components/RemoveCat";

const App = () => {
  const [shouldShowAddCat, setShouldShowAddCat] = useState(true);
  const [shouldShowAddBill, setShouldShowAddBill] = useState(false);
  const [shouldShowRemoveCat, setShouldShowRemoveCat] = useState(false);
  const [categories, setCategories] = useState([]);
  const [bills, setBills] = useState([]);
  const [activeCategory, setActiveCategory] = useState();

  // filters activeBills from bills by returning bills with category matching activeCategory
  const activeBills = () => {
    return bills
      .filter(bill =>
        activeCategory ? bill.category === activeCategory : true
      )
      .sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1));
  };

  // adds category to Navbar; if there are no categories, shows AddCat component
  const addCategory = category => {
    const updatedCategories = [...(categories || []), category];
    setCategories(updatedCategories);
    setShouldShowAddCat(false);
    localStorage.setItem("categories", JSON.stringify(updatedCategories));
  };

  // adds bill to bills and returns to BillsTable view
  const addBill = (amount, category, date) => {
    const bill = { amount, category, date };
    const updatedBills = [...(bills || []), bill];
    setBills(updatedBills);
    setShouldShowAddBill(false);
    localStorage.setItem("bills", JSON.stringify(updatedBills));
  };

  // toggles the AddCat component view
  const showAddCat = () => {
    setShouldShowAddCat(true);
  };

  const showRemoveCat = () => {
    setShouldShowRemoveCat(true);
  };

  // toggles te AddBill component view
  const showAddBill = () => {
    setShouldShowAddBill(true);
  };

  // removes a bill from bills
  const removeBill = index => {
    let updatedBills = [...bills];
    updatedBills = updatedBills
      .slice(0, index)
      .concat(updatedBills.slice(index + 1, updatedBills.length));
    setBills(updatedBills);
    localStorage.setItem("bills", JSON.stringify(updatedBills));
  };

  const removeCategory = key => {
    let updatedCategories = categories.filter((_, index) => {
      return index !== key;
    });
    setCategories(updatedCategories);
    setShouldShowRemoveCat(false);
    localStorage.setItem("categories", JSON.stringify(updatedCategories));
  };

  // sets activeCateogry
  const setNewActiveCategory = index => {
    setActiveCategory(index);
  };

  // reads from localStorage on mount
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
      {// determines if AddCat view is shown
      shouldShowAddCat ? (
        <AddCat onSubmit={addCategory} />
      ) : // determines if AddBill view is shown
      shouldShowAddBill ? (
        <AddBill onSubmit={addBill} categories={categories} />
      ) : shouldShowRemoveCat ? (
        <div>
          <RemoveCat handleRemove={removeCategory} categories={categories} />
          <div className="container mx-auto text-center flex">
            <div className="w-1/2 flex justify-center ">
              <BillsTable
                bills={activeBills()}
                showAddBill={showAddBill}
                removeBill={removeBill}
              />
            </div>

            <div className="w-1/2">
              <Chart bills={activeBills()} />
            </div>
          </div>
        </div>
      ) : (
        // if neither AddCat now AddBill views are shown, Navbar, BillsTable, and Chart view is shown
        <div className="">
          <Navbar
            categories={categories}
            showAddCat={showAddCat}
            showRemoveCat={showRemoveCat}
            activeCategory={activeCategory}
            setNewActiveCategory={setNewActiveCategory}
          />
          <div className="container mx-auto text-center flex">
            <div className="w-1/2 flex justify-center ">
              <BillsTable
                bills={activeBills()}
                showAddBill={showAddBill}
                removeBill={removeBill}
              />
            </div>

            <div className="w-1/2">
              <Chart bills={activeBills()} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
