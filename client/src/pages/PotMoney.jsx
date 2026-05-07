import {
  useEffect,
  useState,
} from "react";

import Sidebar from "../components/Sidebar";

import {
  getPotMoney,
  addContributionApi,
  deleteContributionApi,
} from "../api/potMoneyApi";

function PotMoney() {

  const [contributions, setContributions] =
    useState([]);

  const [amount, setAmount] =
    useState("");

  const [note, setNote] =
    useState("");

  // FETCH CONTRIBUTIONS
  const fetchContributions =
    async () => {

      try {

        const data =
          await getPotMoney();

        setContributions(data);

      } catch (error) {

        console.log(error);

      }
    };

  // LOAD DATA
  useEffect(() => {

    const loadData =
      async () => {

        await fetchContributions();

      };

    loadData();

  }, []);

  // ADD CONTRIBUTION
  const addContribution =
    async () => {

      if (!amount || !note) {
        return;
      }

      try {

        await addContributionApi({
          amount,
          note,
        });

        setAmount("");
        setNote("");

        fetchContributions();

      } catch (error) {

        console.log(error);

      }
    };

  // DELETE CONTRIBUTION
  const deleteContribution =
    async (id) => {

      try {

        await deleteContributionApi(
          id
        );

        fetchContributions();

      } catch (error) {

        console.log(error);

      }
    };

  // TOTAL MONEY
  const totalMoney =
    contributions.reduce(
      (total, item) =>
        total + Number(item.amount),
      0
    );

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="flex-1 p-4 md:p-10">

        <h1 className="text-4xl font-bold mb-8">
          Pot Money
        </h1>

        {/* TOTAL CARD */}
        <div className="bg-green-500 text-white p-8 rounded-2xl shadow-md mb-8">

          <h2 className="text-2xl mb-2">
            Total Pot Money
          </h2>

          <p className="text-5xl font-bold">
            ₱{totalMoney}
          </p>

        </div>

        {/* ADD CONTRIBUTION */}
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-md overflow-x-auto mb-8">

          <h2 className="text-2xl font-bold mb-6">
            Add Contribution
          </h2>

          <div className="grid grid-cols-3 gap-4">

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
              type="text"
              placeholder="Note"
              value={note}
              onChange={(e) =>
                setNote(e.target.value)
              }
              className="border p-3 rounded-xl"
            />

            <button
              type="button"
              onClick={addContribution}
              className="bg-blue-600 text-white rounded-xl hover:bg-blue-700"
            >
              Add
            </button>

          </div>

        </div>

        {/* CONTRIBUTION TABLE */}
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-md overflow-x-auto overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b text-left">

                <th className="pb-4">
                  Amount
                </th>

                <th className="pb-4">
                  Note
                </th>

                <th className="pb-4">
                  Date
                </th>

                <th className="pb-4">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {contributions.length ===
              0 ? (

                <tr>

                  <td
                    colSpan="4"
                    className="text-center py-10 text-gray-500"
                  >
                    No contributions yet.
                  </td>

                </tr>

              ) : (

                contributions.map(
                  (item) => (

                    <tr
                      key={item._id}
                      className="border-b"
                    >

                      <td className="py-4">
                        ₱{item.amount}
                      </td>

                      <td>
                        {item.note}
                      </td>

                      <td>
                        {new Date(
                          item.createdAt
                        ).toLocaleDateString()}
                      </td>

                      <td>

                        <button
                          type="button"
                          onClick={() =>
                            deleteContribution(
                              item._id
                            )
                          }
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  )
                )

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default PotMoney;