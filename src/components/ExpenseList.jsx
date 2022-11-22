import Item from "./ExpenseItem";
import { MdDelete } from "react-icons/md";

const ExpenseList = ({
  expenses,
  handleClearExpenses,
  handleEditItem,
  handleDeleteItem,
}) => {
  return (
    <>
      <ul className="list">
        {expenses.map((expense) => {
          return (
            <Item
              key={expense.id}
              expense={expense}
              handleEditItem={handleEditItem}
              handleDeleteItem={handleDeleteItem}
            />
          );
        })}
      </ul>
      {expenses.length > 0 && (
        <button className="btn" onClick={handleClearExpenses}>
          Clear Expenses <MdDelete className="btn-icon" />
        </button>
      )}
    </>
  );
};

export default ExpenseList;
