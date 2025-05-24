export default function ExpenseList({ expenses, onDelete, onEdit }) {
  return (
    <ul className="space-y-3 max-h-80 overflow-y-auto">
      {expenses.map((expense) => (
        <li
          key={expense.id}
          className="bg-[#2E3A59] rounded-xl p-4 flex justify-between items-center"
        >
          <div>
            <h4 className="font-semibold text-lg">{expense.title}</h4>
            <p
              className={`${
                parseFloat(expense.amount) >= 0
                  ? "text-green-400"
                  : "text-red-400"
              } font-mono`}
            >
              ${parseFloat(expense.amount).toFixed(2)}
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(expense)}
              className="text-yellow-400 hover:text-yellow-300"
            >
              ✏️
            </button>
            <button
              onClick={() => onDelete(expense.id)}
              className="text-red-400 hover:text-red-300"
            >
              🗑️
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
