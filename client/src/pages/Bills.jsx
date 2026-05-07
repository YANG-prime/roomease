import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";

import {
  getBills,
  addBillApi,
  updateBillApi,
  deleteBillApi,
} from "../api/billApi";

function Bills() {

  const [bills, setBills] = useState([]);

  const [title, setTitle] = useState("");
  const [amount, setAmount] =
    useState("");
  const [dueDate, setDueDate] =
    useState("");

  // FETCH BILLS
  const fetchBills = async () => {

    try {

      const data = await getBills();

      setBills(data);

    } catch (error) {

      console.log(error);

    }
  };

  // LOAD BILLS
  useEffect(() => {

    const loadBills = async () => {

      await fetchBills();

    };

    loadBills();

  }, []);

  // ADD BILL
  const addBill = async () => {

    if (
      !title ||
      !amount ||
      !dueDate
    ) {
      return;
    }

    try {

      await addBillApi({
        title,
        amount,
        dueDate,
      });

      setTitle("");
      setAmount("");
      setDueDate("");

      fetchBills();

    } catch (error) {

      console.log(error);

    }
  };

  // TOGGLE PAID
  const togglePaid = async (
    id,
    paid
  ) => {

    try {

      await updateBillApi(id, {
        paid: !paid,
      });

      fetchBills();

    } catch (error) {

      console.log(error);

    }
  };

  // DELETE BILL
  const deleteBill = async (id) => {

    try {

      await deleteBillApi(id);

      fetchBills();

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="flex-1 p-4 md:p-10">

        <h1 className="text-4xl font-bold mb-8">
          Bills
        </h1>

        {/* ADD BILL FORM */}
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-md overflow-x-auto mb-8">

          <h2 className="text-2xl font-bold mb-6">
            Add Bill
          </h2>

          <div className="grid grid-cols-4 gap-4">

            <input
              type="text"
              placeholder="Bill Title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className="border p-3 rounded-xl"
            />

            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) =>
                setAmount(e.target.value)
              }
              className="border p-3 rounded-xl"
            />

            <input
              type="date"
              value={dueDate}
              onChange={(e) =>
                setDueDate(e.target.value)
              }
              className="border p-3 rounded-xl"
            />

            <button
              type="button"
              onClick={addBill}
              className="bg-blue-600 text-white rounded-xl hover:bg-blue-700"
            >
              Add
            </button>

          </div>

        </div>

        {/* BILLS TABLE */}
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-md overflow-x-auto overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b text-left">

                <th className="pb-4">
                  Bill
                </th>

                <th className="pb-4">
                  Amount
                </th>

                <th className="pb-4">
                  Due Date
                </th>

                <th className="pb-4">
                  Status
                </th>

                <th className="pb-4">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {bills.length === 0 ? (

                <tr>

                  <td
                    colSpan="5"
                    className="text-center py-10 text-gray-500"
                  >
                    No bills yet.
                  </td>

                </tr>

              ) : (

                bills.map((bill) => (

                  <tr
                    key={bill._id}
                    className="border-b"
                  >

                    <td className="py-4">
                      {bill.title}
                    </td>

                    <td>
                      ₱{bill.amount}
                    </td>

                    <td>
                      {bill.dueDate}
                    </td>

                    <td
                      className={`font-semibold ${
                        bill.paid
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {bill.paid
                        ? "Paid"
                        : "Unpaid"}
                    </td>

                    <td className="flex gap-3 py-3">

                      <button
                        type="button"
                        onClick={() =>
                          togglePaid(
                            bill._id,
                            bill.paid
                          )
                        }
                        className={`px-4 py-2 rounded-lg text-white ${
                          bill.paid
                            ? "bg-yellow-500 hover:bg-yellow-600"
                            : "bg-green-500 hover:bg-green-600"
                        }`}
                      >
                        {bill.paid
                          ? "Undo"
                          : "Paid"}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          deleteBill(
                            bill._id
                          )
                        }
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Bills;