/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";

// TODO:
// Allow more than one activeCategory:
// SEE Navbar.js

import "./App.css";
import AddCat from "./components/AddCat";
import Navbar from "./components/Navbar";
import BillsTable from "./components/BillsTable";
import Chart from "./components/Chart";
import AddBill from "./components/AddBill";
import RemoveCat from "./components/RemoveCat";

const App = () => {
  const [categories, setCategories] = useState([]);
  const [bills, setBills] = useState([]);
  const [shouldShowAddCat, setShouldShowAddCat] = useState(true);
  // const [activeCategories, setActiveCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState();

  // const showAddCat = () => {
  //   setShouldShowAddCat(true);
  // };

  // const hideAddCat = () => {
  //   setShouldShowAddCat(false);
  // };

  // filters activeBills from bills by returning bills with category matching activeCategory
  const activeBills = () => {
    return bills
      .filter(bill =>
        activeCategory || activeCategory === 0
          ? bill.category === categories[activeCategory]
          : true
      )
      .sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1));
  };

  // adds category to Navbar; if there are no categories, shows AddCat component
  const addCategory = category => {
    const updatedCategories = [...(categories || []), category];
    setCategories(updatedCategories);

    localStorage.setItem("categories", JSON.stringify(updatedCategories));
  };

  // adds bill to bills and returns to BillsTable view
  const addBill = (amount, category, date) => {
    const bill = { amount, category, date };

    const updatedBills = [...(bills || []), bill];
    setBills(updatedBills);

    localStorage.setItem("bills", JSON.stringify(updatedBills));
  };

  // removes a bill from bills
  const removeBill = index => {
    let updatedBills = [...activeBills()];

    updatedBills = updatedBills
      .slice(0, index)
      .concat(updatedBills.slice(index + 1, updatedBills.length));
    setBills(updatedBills);
    localStorage.setItem("bills", JSON.stringify(updatedBills));
  };

  const removeCategory = key => {
    const updatedCategories = categories.filter((_, i) => {
      return i !== key;
    });
    setCategories(updatedCategories);

    localStorage.setItem("categories", JSON.stringify(updatedCategories));
  };

  // sets activeCateogry
  const setNewActiveCategory = index => {
    // setActiveCategories([...activeCategories], index)
    setActiveCategory(index);
  };

  // reads from localStorage on mount
  useEffect(() => {
    const categoriesInLocalStorage =
      JSON.parse(localStorage.getItem("categories")) || [];
    const billsInLocalStorage = JSON.parse(localStorage.getItem("bills")) || [];

    setCategories(categoriesInLocalStorage);
    setBills(billsInLocalStorage);
  }, []);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route
            path="/add-category"
            exact
            render={props => (
              <AddCat
                {...props}
                categories={categories}
                onSubmit={addCategory}
              />
            )}
          />

          <Route
            path="/add-bill"
            exact
            render={props => (
              <AddBill {...props} onSubmit={addBill} categories={categories} />
            )}
          />

          <Route
            path="/remove-category"
            exact
            render={props => (
              <div>
                <RemoveCat
                  handleRemove={removeCategory}
                  categories={categories}
                />
                <div className="container mx-auto text-center flex">
                  <div className="w-1/2 flex justify-center ">
                    <BillsTable bills={activeBills()} removeBill={removeBill} />
                  </div>

                  <div className="w-1/2">
                    <Chart bills={activeBills()} />
                  </div>
                </div>
              </div>
            )}
          />
          {console.log("length" + categories.length)}
          <Route
            render={props =>
              categories.length > 0 ? (
                <div className="">
                  <Navbar
                    categories={categories}
                    activeCategory={activeCategory}
                    setNewActiveCategory={setNewActiveCategory}
                  />
                  <div className="container mx-auto text-center flex">
                    <div className="w-1/2 flex justify-center ">
                      <BillsTable
                        bills={activeBills()}
                        removeBill={removeBill}
                      />
                    </div>

                    <div className="w-1/2">
                      <Chart bills={activeBills()} />
                    </div>
                  </div>
                </div>
              ) : (
                <Redirect to="/add-category" />
              )
            }
          />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
