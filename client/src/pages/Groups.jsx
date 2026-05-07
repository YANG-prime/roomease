import {
  useEffect,
  useState,
} from "react";

import Sidebar from "../components/Sidebar";

import {
  createGroupApi,
  joinGroupApi,
  getPendingRequests,
  approveMemberApi,
  getMyGroupApi,
  removeMemberApi,
} from "../api/groupApi";

function Groups() {

  const [groupName,
    setGroupName] =
    useState("");

  const [groupId,
    setGroupId] =
    useState("");

  const [groupPassword,
    setGroupPassword] =
    useState("");

  const [showPassword,
    setShowPassword] =
    useState(false);

  const [message,
    setMessage] =
    useState("");

  const [pendingRequests,
    setPendingRequests] =
    useState([]);

  const [myGroup,
    setMyGroup] =
    useState(null);

  // FETCH PENDING REQUESTS
  const fetchPendingRequests =
    async () => {

      try {

        const data =
          await getPendingRequests();

        setPendingRequests(
          Array.isArray(data)
            ? data
            : []
        );

      } catch (error) {

        console.log(error);

        setPendingRequests([]);

      }
    };

  // FETCH MY GROUP
  const fetchMyGroup =
    async () => {

      try {

        const data =
          await getMyGroupApi();

        setMyGroup(data);

      } catch (error) {

        console.log(error);

      }
    };

  // LOAD DATA
  useEffect(() => {

    const loadData =
      async () => {

        await fetchPendingRequests();

        await fetchMyGroup();

      };

    loadData();

  }, []);

  // CREATE GROUP
  const createGroup =
    async () => {

      try {

        const data =
          await createGroupApi({
            name: groupName,

            groupId,

            password:
              groupPassword,
          });

        setMessage(
          data.message
        );

        fetchMyGroup();

      } catch (error) {

        console.log(error);

      }
    };

  // JOIN GROUP
  const joinGroup =
    async () => {

      try {

        const data =
          await joinGroupApi({
            groupId,

            password:
              groupPassword,
          });

        setMessage(
          data.message
        );

      } catch (error) {

        console.log(error);

      }
    };

  // APPROVE MEMBER
  const approveMember =
    async (userId) => {

      try {

        await approveMemberApi(
          userId
        );

        fetchPendingRequests();

        fetchMyGroup();

      } catch (error) {

        console.log(error);

      }
    };

  // REMOVE MEMBER
  const removeMember =
    async (userId) => {

      try {

        await removeMemberApi(
          userId
        );

        fetchMyGroup();

      } catch (error) {

        console.log(error);

      }
    };

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="flex-1 p-4 md:p-10">

        <h1 className="text-4xl font-bold mb-8">
          Groups
        </h1>

        {/* GROUP FORM */}
        <div className="bg-white p-8 rounded-2xl shadow-md max-w-xl mb-8">

          <h2 className="text-2xl font-bold mb-6">
            Create or Join Group
          </h2>

          <div className="flex flex-col gap-5">

            <input
              type="text"
              placeholder="Group Name"
              value={groupName}
              onChange={(e) =>
                setGroupName(
                  e.target.value
                )
              }
              className="border p-3 rounded-xl"
            />

            <input
              type="text"
              placeholder="Group ID"
              value={groupId}
              onChange={(e) =>
                setGroupId(
                  e.target.value
                )
              }
              className="border p-3 rounded-xl"
            />

            {/* PASSWORD */}
            <div className="relative">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Group Password"
                value={groupPassword}
                onChange={(e) =>
                  setGroupPassword(
                    e.target.value
                  )
                }
                className="border p-3 rounded-xl w-full pr-16"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-4 top-3 text-sm text-gray-500 hover:text-gray-700"
              >
                {showPassword
                  ? "Hide"
                  : "Show"}
              </button>

            </div>

            <div className="flex gap-4">

              <button
                type="button"
                onClick={
                  createGroup
                }
                className="flex-1 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
              >
                Create Group
              </button>

              <button
                type="button"
                onClick={
                  joinGroup
                }
                className="flex-1 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700"
              >
                Join Group
              </button>

            </div>

            {message && (

              <p className="text-center text-green-600 font-semibold">

                {message}

              </p>

            )}

          </div>

        </div>

        {/* MY GROUP */}
        {myGroup && (

          <div className="bg-white p-8 rounded-2xl shadow-md max-w-xl mb-8">

            <h2 className="text-2xl font-bold mb-6">
              My Group
            </h2>

            <div className="flex flex-col gap-3">

              <p>
                <span className="font-bold">
                  Group Name:
                </span>{" "}
                {myGroup.name}
              </p>

              <p>
                <span className="font-bold">
                  Group ID:
                </span>{" "}
                {myGroup.groupId}
              </p>

              <p>
                <span className="font-bold">
                  Owner:
                </span>{" "}
                {myGroup.owner?.name}
              </p>

              <p>
                <span className="font-bold">
                  Total Members:
                </span>{" "}
                {myGroup.members?.length}
              </p>

            </div>

            {/* MEMBERS */}
            <div className="mt-6">

              <h3 className="text-xl font-bold mb-4">
                Members
              </h3>

              <div className="flex flex-col gap-3">

                {myGroup.members?.map(
                  (member) => (

                    <div
                      key={member._id}
                      className="border p-4 rounded-xl flex justify-between items-center"
                    >

                      <div>

                        <p className="font-semibold">
                          {member.name}
                        </p>

                        <p className="text-sm text-gray-500">
                          {member.email}
                        </p>

                      </div>

                      <div className="flex items-center gap-3">

                        {myGroup.owner?._id ===
                        member._id && (

                          <span className="text-blue-600 font-bold">
                            Owner
                          </span>

                        )}

                        {myGroup.owner?._id ===
                        JSON.parse(
                          localStorage.getItem(
                            "user"
                          )
                        )?._id &&

                        myGroup.owner?._id !==
                        member._id && (

                          <button
                            type="button"
                            onClick={() =>
                              removeMember(
                                member._id
                              )
                            }
                            className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600"
                          >
                            Remove
                          </button>

                        )}

                      </div>

                    </div>

                  )
                )}

              </div>

            </div>

          </div>

        )}

        {/* PENDING REQUESTS */}
        <div className="bg-white p-8 rounded-2xl shadow-md max-w-xl">

          <h2 className="text-2xl font-bold mb-6">
            Pending Requests
          </h2>

          {pendingRequests.length === 0 ? (

            <p className="text-gray-500">
              No pending requests.
            </p>

          ) : (

            <div className="flex flex-col gap-4">

              {pendingRequests.map(
                (user) => (

                  <div
                    key={user._id}
                    className="flex justify-between items-center border p-4 rounded-xl"
                  >

                    <div>

                      <p className="font-bold">
                        {user.name}
                      </p>

                      <p className="text-sm text-gray-500">
                        {user.email}
                      </p>

                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        approveMember(
                          user._id
                        )
                      }
                      className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700"
                    >
                      Approve
                    </button>

                  </div>

                )
              )}

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default Groups;