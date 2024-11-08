import React, { useState } from "react";

const App = () => {
  const [balance, setBalance] = useState(10000);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [history, setHistory] = useState([]);

  const withdraw = (amount) => {
    if (balance - amount < 1) {
      window.alert("ไม่สามารถถอนเงินเกินจำนวนที่มีอยู่ในบัญชีได้");
    }  else {
      setBalance(balance - amount);
      recordTransaction(amount);
    }
  };

  const customWithdraw = () => {
    const amount = parseInt(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      window.alert("กรุณากรอกจำนวนเงินที่ถูกต้อง");
    } else {
      withdraw(amount);
      setWithdrawAmount("");
    }
  };

  const recordTransaction = (amount) => {
    const newTransaction = {
      amount,
      remainingBalance: balance - amount,
    };
    setHistory([newTransaction, ...history]);
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen font-prompt">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h1 className="text-2xl font-semibold mb-4">ระบบถอนเงิน</h1>
            <h2 className="font-semibold  mb-6">
            ยอดเงินคงเหลือ: <span>{balance}</span> บาท
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {[100, 500, 1000, 5000].map((amount) => (
                  <button
                    key={amount}
                    className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                    onClick={() => withdraw(amount)}
                  >
                    {amount} บาท
                  </button>
                ))}
              </div>

              <div className="items-center">
                <h2 className="font-semibold mb-4">จำนวนเงินที่ต้องการจะถอน</h2>
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  placeholder="กรอกจำนวนเงิน"
                  className="border border-gray-300 rounded-lg py-2 px-4 w-full mr-2 mb-4"
                />
                <button
                  className="w-full bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-800"
                  onClick={customWithdraw}
                >
                  ถอนเงิน
                </button>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">ประวัติการถอนเงิน</h3>
            <ul className="space-y-2">
              {history.length > 0 ? (
                history.map((transaction, index) => (
                  <li key={index} className="text-gray-700">
                    ถอนเงิน {transaction.amount} บาท | ยอดคงเหลือ: {transaction.remainingBalance} บาท
                  </li>
                ))
              ) : (
                <li className="text-gray-500">ยังไม่มีประวัติการถอนเงิน</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
