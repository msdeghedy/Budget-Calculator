import "./App.css";
import { useState, useEffect } from "react";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import Alert from "./components/Alert";
import uuid from "../node_modules/uuid/dist/v4";
import { MdDangerous } from "react-icons/md";

const initialExpenses = localStorage.getItem("expenses")
  ? JSON.parse(localStorage.getItem("expenses"))
  : [];

function App() {
  // **************************** state values ******************
  //all expense, add expense
  const [expenses, setExpenses] = useState(initialExpenses);
  //single expense
  const [charge, setCharge] = useState("");
  //single amount
  const [amount, setAmount] = useState("");
  //alert
  const [alert, setAlert] = useState({ show: false });
  //edit
  const [edit, setEdit] = useState(false);

  // **************************** lOCAL STORAGE  ******************

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  // **************************** functionality ******************
  const handleCharge = (e) => {
    setCharge(e.target.value);
  };
  const handleAmount = (e) => {
    setAmount(+e.target.value);
  };

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (charge && amount > 0) {
      const singleExpense = { id: uuid(), charge, amount };
      setExpenses((prev) => [...prev, singleExpense]);
      setAmount("");
      setCharge("");
      handleAlert({ type: "success", text: "Charge added successfully" });
      edit && setEdit(false);
    } else {
      //handle alert call
      handleAlert({
        type: "danger",
        text: `Charge can't be empty value and amount should be a value bigger than 0!`,
      });
    }
  };

  const handleClearExpenses = () => {
    setExpenses([]);
  };

  const handleEditItem = (chargeToEdit, amountToEdit, idToEdit) => {
    if (charge || amount) {
      handleAlert({
        type: "danger",
        text: "please complete or delete you current editing expense",
      });
      return;
    }
    setEdit(true);
    setCharge(chargeToEdit);
    setAmount(amountToEdit);
    setExpenses((prev) => prev.filter((expense) => expense.id !== idToEdit));
  };

  const handleDeleteItem = (id) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
    handleAlert({
      type: "success",
      text: "Expense deleted successfully!",
    });
  };

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}

      <h1>Budget calculator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleCharge={handleCharge}
          handleAmount={handleAmount}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <ExpenseList
          expenses={expenses}
          handleClearExpenses={handleClearExpenses}
          handleEditItem={handleEditItem}
          handleDeleteItem={handleDeleteItem}
        />
      </main>
      <h1>
        total spending:{" "}
        <span className="total">
          $
          {expenses.length > 0
            ? expenses.reduce((acc, cur) => (acc += cur.amount), 0)
            : 0}
        </span>
      </h1>
    </>
  );
}

export default App;
