import { useEffect, useState } from "react";
import { db, ref, set, onValue, remove, update } from "./firebase";
import { v4 as uuidv4 } from "uuid";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Balance from "./components/Balance";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [editExpense, setEditExpense] = useState(null);

  useEffect(() => {
    const expensesRef = ref(db, "expenses");
    onValue(expensesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loaded = Object.values(data);
        setExpenses(loaded.reverse());
      } else {
        setExpenses([]);
      }
    });
  }, []);

  const addOrUpdateExpense = (expense) => {
    if (expense.id) {
      update(ref(db, `expenses/${expense.id}`), expense);
      setEditExpense(null);
    } else {
      const newExpense = { ...expense, id: uuidv4() };
      set(ref(db, `expenses/${newExpense.id}`), newExpense);
    }
  };

  const deleteExpense = (id) => {
    remove(ref(db, `expenses/${id}`));
  };

  const startEdit = (expense) => {
    setEditExpense(expense);
  };

  const income = expenses
    .filter((e) => parseFloat(e.amount) > 0)
    .reduce((acc, e) => acc + parseFloat(e.amount), 0);

  const outcome = expenses
    .filter((e) => parseFloat(e.amount) < 0)
    .reduce((acc, e) => acc + Math.abs(parseFloat(e.amount)), 0);

  const data = [
    { name: "Income", value: income },
    { name: "Outcome", value: outcome },
  ];

  const COLORS = ["#4CAF50", "#F44336"];

  return (
    <div className="min-h-screen bg-[#0D1B2A] p-4 flex items-center justify-center">
      <div className="w-full max-w-6xl bg-[#1B263B] text-white rounded-3xl shadow-2xl grid grid-cols-1 md:grid-cols-4 overflow-hidden gap-6 p-8">
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold mb-6 text-[#E0E1DD]">
            PayTrack 💸
          </h1>
          <Balance expenses={expenses} />
          <ExpenseForm onSave={addOrUpdateExpense} editExpense={editExpense} />
        </div>

        <div className="bg-[#415A77] p-6 rounded-xl">
          <h2 className="text-2xl font-semibold mb-4 text-[#E0E1DD]">
            History
          </h2>
          <ExpenseList
            expenses={expenses}
            onDelete={deleteExpense}
            onEdit={startEdit}
          />
        </div>

        <div className="bg-[#2A3A4C] rounded-xl p-6 text-center">
          <h2 className="text-2xl font-semibold mb-4 text-[#E0E1DD]">
            Summary
          </h2>
          <PieChart width={250} height={250}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>

          <div className="mt-6 text-left text-[#E0E1DD]">
            <h3 className="font-semibold mb-2">Totals:</h3>
            <p>
              Income:{" "}
              <span className="text-green-400">${income.toFixed(2)}</span>
            </p>
            <p>
              Outcome:{" "}
              <span className="text-red-400">${outcome.toFixed(2)}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
