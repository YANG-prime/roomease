import {
  useEffect,
  useState,
} from "react";

import Sidebar from "../components/Sidebar";

import {
  getChores,
  addChoreApi,
  updateChoreApi,
  deleteChoreApi,
} from "../api/choreApi";

import {
  getMyGroupApi,
} from "../api/groupApi";

function Chores() {

  const [chores,
    setChores] =
    useState([]);

  const [members,
    setMembers] =
    useState([]);

  const [task,
    setTask] =
    useState("");

  const [assignedTo,
    setAssignedTo] =
    useState("");

  const [deadline,
    setDeadline] =
    useState("");

  // FETCH CHORES
  const fetchChores =
    async () => {

      try {

        const data =
          await getChores();

        setChores(data);

      } catch (error) {

        console.log(error);

      }
    };

  // FETCH MEMBERS
  const fetchMembers =
    async () => {

      try {

        const group =
          await getMyGroupApi();

        if (
          group?.members
        ) {

          setMembers(
            group.members
          );

        }

      } catch (error) {

        console.log(error);

      }
    };

  // LOAD DATA
  useEffect(() => {

    const loadData =
      async () => {

        await fetchChores();

        await fetchMembers();

      };

    loadData();

  }, []);

  // ADD CHORE
  const addChore =
    async () => {

      if (
        !task ||
        !assignedTo ||
        !deadline
      ) {

        return;

      }

      try {

        await addChoreApi({
          task,
          assignedTo,
          deadline,
        });

        setTask("");

        setAssignedTo("");

        setDeadline("");

        fetchChores();

      } catch (error) {

        console.log(error);

      }
    };

  // TOGGLE COMPLETE
  const toggleComplete =
    async (
      id,
      completed
    ) => {

      try {

        await updateChoreApi(
          id,
          {
            completed:
              !completed,
          }
        );

        fetchChores();

      } catch (error) {

        console.log(error);

      }
    };

  // DELETE CHORE
  const deleteChore =
    async (id) => {

      try {

        await deleteChoreApi(
          id
        );

        fetchChores();

      } catch (error) {

        console.log(error);

      }
    };

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="flex-1 p-4 md:p-10">

        <h1 className="text-4xl font-bold mb-8">
          Chores
        </h1>

        {/* ADD CHORE FORM */}
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-md overflow-x-auto mb-8">

          <h2 className="text-2xl font-bold mb-6">
            Add Chore
          </h2>

          <div className="grid grid-cols-4 gap-4">

            {/* TASK */}
            <input
              type="text"
              placeholder="Task"
              value={task}
              onChange={(e) =>
                setTask(
                  e.target.value
                )
              }
              className="border p-3 rounded-xl"
            />

            {/* MEMBER SELECT */}
            <select
              value={assignedTo}
              onChange={(e) =>
                setAssignedTo(
                  e.target.value
                )
              }
              className="border p-3 rounded-xl"
            >

              <option value="">
                Select Member
              </option>

              {members.map(
                (member) => (

                  <option
                    key={
                      member._id
                    }
                    value={
                      member._id
                    }
                  >
                    {member.name}
                  </option>

                )
              )}

            </select>

            {/* DEADLINE */}
            <input
              type="date"
              value={deadline}
              onChange={(e) =>
                setDeadline(
                  e.target.value
                )
              }
              className="border p-3 rounded-xl"
            />

            {/* BUTTON */}
            <button
              type="button"
              onClick={
                addChore
              }
              className="bg-blue-600 text-white rounded-xl hover:bg-blue-700"
            >
              Add
            </button>

          </div>

        </div>

        {/* CHORES TABLE */}
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-md overflow-x-auto overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b text-left">

                <th className="pb-4">
                  Task
                </th>

                <th className="pb-4">
                  Assigned To
                </th>

                <th className="pb-4">
                  Deadline
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

              {chores.length === 0 ? (

                <tr>

                  <td
                    colSpan="5"
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
                      className="border-b"
                    >

                      <td className="py-4">
                        {chore.task}
                      </td>

                      <td>
                        {
                          chore
                            .assignedTo
                            ?.name
                        }
                      </td>

                      <td>
                        {chore.deadline}
                      </td>

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

                      <td className="flex gap-3 py-3">

                        <button
                          type="button"
                          onClick={() =>
                            toggleComplete(
                              chore._id,
                              chore.completed
                            )
                          }
                          className={`px-4 py-2 rounded-lg text-white ${
                            chore.completed
                              ? "bg-yellow-500 hover:bg-yellow-600"
                              : "bg-green-500 hover:bg-green-600"
                          }`}
                        >
                          {chore.completed
                            ? "Undo"
                            : "Done"}
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            deleteChore(
                              chore._id
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

export default Chores;