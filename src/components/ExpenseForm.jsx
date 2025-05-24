import { useState, useEffect } from "react";

export default function ExpenseForm({ onSave, editExpense }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (editExpense) {
      setTitle(editExpense.title);
      setAmount(editExpense.amount);
    }
  }, [editExpense]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount) return;

    const expenseData = {
      title,
      amount,
      id: editExpense ? editExpense.id : null,
    };

    onSave(expenseData);
    setTitle("");
    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Expense Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-3 rounded-xl bg-[#2E3A59] text-white placeholder-gray-400"
      />
      <input
        type="number"
        placeholder="Amount (+ for income, - for outcome)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-3 rounded-xl bg-[#2E3A59] text-white placeholder-gray-400"
      />
      <button
        type="submit"
        className="w-full bg-[#00B4D8] hover:bg-[#0096C7] p-3 rounded-xl text-white font-semibold"
      >
        {editExpense ? "Update" : "Add"}
      </button>
    </form>
  );
}
