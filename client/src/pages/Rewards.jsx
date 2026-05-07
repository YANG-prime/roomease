import {
  useEffect,
  useState,
} from "react";

import Sidebar from "../components/Sidebar";

function Rewards() {

  const [users,
    setUsers] =
    useState([]);

  // FETCH USERS
  const fetchUsers =
    async () => {

      try {

        const response =
          await fetch(
            "http://10.129.103.230:5000/api/users",
            {
              headers: {
                Authorization:
                  `Bearer ${localStorage.getItem(
                    "token"
                  )}`,
              },
            }
          );

        const data =
          await response.json();

        // SORT BY POINTS
        const sortedUsers =
          data.sort(
            (a, b) =>
              b.rewardPoints -
              a.rewardPoints
          );

        setUsers(
          sortedUsers
        );

      } catch (error) {

        console.log(error);

      }
    };

  useEffect(() => {

  const loadUsers =
    async () => {

      await fetchUsers();

    };

  loadUsers();

}, []);

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="flex-1 p-4 md:p-10">

        <h1 className="text-4xl font-bold mb-8">
          Rewards Leaderboard
        </h1>

        <div className="bg-white p-8 rounded-2xl shadow-md">

          <div className="flex flex-col gap-4">

            {users.length === 0 ? (

              <p className="text-gray-500">
                No users found.
              </p>

            ) : (

              users.map(
                (
                  user,
                  index
                ) => (

                  <div
                    key={user._id}
                    className="flex justify-between items-center border p-5 rounded-xl"
                  >

                    <div>

                      <p className="font-bold text-lg">

                        {index === 0 &&
                          "🥇 "}

                        {index === 1 &&
                          "🥈 "}

                        {index === 2 &&
                          "🥉 "}

                        {user.name}

                      </p>

                      <p className="text-gray-500 text-sm">
                        {user.email}
                      </p>

                    </div>

                    <div className="text-2xl font-bold text-blue-600">

                      {user.rewardPoints}
                      pts

                    </div>

                  </div>

                )
              )

            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Rewards;