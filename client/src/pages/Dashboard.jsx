import {
  useEffect,
  useState,
} from "react";

import Sidebar from "../components/Sidebar";

import {
  getChores,
} from "../api/choreApi";

function Dashboard() {

  const [chores,
    setChores] =
    useState([]);

  // FETCH CHORES
  const fetchChores =
    async () => {

      try {

        const data =
          await getChores();

        setChores(
          Array.isArray(data)
            ? data
            : []
        );

      } catch (error) {

        console.log(error);

        setChores([]);

      }
    };

  // LOAD DATA
  useEffect(() => {

    const loadChores =
      async () => {

        await fetchChores();

      };

    loadChores();

  }, []);

  // STATS
  const pendingChores =
    chores.filter(
      (chore) =>
        !chore.completed
    ).length;

  const completedChores =
    chores.filter(
      (chore) =>
        chore.completed
    ).length;

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="flex-1 p-4 md:p-10">

        <h1 className="text-3xl md:text-4xl font-bold mb-8">
          Dashboard
        </h1>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          {/* PENDING */}
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-md overflow-x-auto hover:shadow-lg hover:scale-105 transition-all duration-200">

            <h2 className="text-gray-500 mb-2">
              Pending Chores
            </h2>

            <p className="text-4xl font-bold text-yellow-500">
              {pendingChores}
            </p>

          </div>

          {/* COMPLETED */}
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-md overflow-x-auto hover:shadow-lg hover:scale-105 transition-all duration-200">

            <h2 className="text-gray-500 mb-2">
              Completed Chores
            </h2>

            <p className="text-4xl font-bold text-green-500">
              {completedChores}
            </p>

          </div>

          {/* TOTAL */}
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-md overflow-x-auto hover:shadow-lg hover:scale-105 transition-all duration-200">

            <h2 className="text-gray-500 mb-2">
              Total Chores
            </h2>

            <p className="text-4xl font-bold text-blue-600">
              {chores.length}
            </p>

          </div>

        </div>

        {/* RECENT CHORES */}
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-md overflow-x-auto">

          <h2 className="text-2xl font-bold mb-6">
            Recent Chores
          </h2>

          <table className="w-full min-w-[600px]">

            <thead>

              <tr className="text-left border-b">

                <th className="pb-3">
                  Task
                </th>

                <th className="pb-3">
                  Assigned To
                </th>

                <th className="pb-3">
                  Deadline
                </th>

                <th className="pb-3">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {chores.length === 0 ? (

                <tr>

                  <td
                    colSpan="4"
                    className="text-center py-10 text-gray-500"
                  >
                    No chores yet.
                  </td>

                </tr>

              ) : (

                chores.map(
                  (chore) => (

                    <tr
                      key={
                        chore._id
                      }
                      className="border-b hover:bg-gray-50 transition-all duration-200"
                    >

                      {/* TASK */}
                      <td className="py-4">
                        {chore.task}
                      </td>

                      {/* ASSIGNED USER */}
                      <td>
                        {
                          chore
                            .assignedTo
                            ?.name
                        }
                      </td>

                      {/* DEADLINE */}
                      <td>
                        {chore.deadline}
                      </td>

                      {/* STATUS */}
                      <td
                        className={`font-semibold ${
                          chore.completed
                            ? "text-green-500"
                            : "text-yellow-500"
                        }`}
                      >
                        {chore.completed
                          ? "Completed"
                          : "Pending"}
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

export default Dashboard;