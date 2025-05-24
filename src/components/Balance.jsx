export default function Balance({ expenses }) {
  const amounts = expenses
    .map((exp) => parseFloat(exp.amount))
    .filter((a) => !isNaN(a)); // NaN larni chiqarib tashlaydi

  const income = amounts
    .filter((a) => a > 0)
    .reduce((acc, a) => acc + a, 0)
    .toFixed(2);

  const outcome = amounts
    .filter((a) => a < 0)
    .reduce((acc, a) => acc + a, 0)
    .toFixed(2);

  const balance = amounts.reduce((acc, a) => acc + a, 0).toFixed(2);

  return (
    <div className="bg-[#2E3A59] text-white rounded-xl p-5 text-center mb-4">
      <h2 className="text-xl font-bold">Current Balance</h2>
      <p className="text-3xl my-2">${balance}</p>
      <div className="flex justify-around text-sm">
        <div className="text-green-400">Income: ${income}</div>
        <div className="text-red-400">Outcome: ${Math.abs(outcome)}</div>
      </div>
    </div>
  );
}
