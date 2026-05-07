const API_URL =
  "http://10.129.103.230:5000/api/groups";


// GET TOKEN
const getToken = () => {

  return localStorage.getItem(
    "token"
  );

};


// CREATE GROUP
export const createGroupApi =
  async (groupData) => {

    const response =
      await fetch(
        `${API_URL}/create`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${getToken()}`,
          },

          body: JSON.stringify(
            groupData
          ),
        }
      );

    return response.json();
  };


// JOIN GROUP
export const joinGroupApi =
  async (groupData) => {

    const response =
      await fetch(
        `${API_URL}/join`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${getToken()}`,
          },

          body: JSON.stringify(
            groupData
          ),
        }
      );

    return response.json();
  };


// GET MY GROUP
export const getMyGroupApi =
  async () => {

    const response =
      await fetch(
        `${API_URL}/my-group`,
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return response.json();
  };


// GET PENDING REQUESTS
export const getPendingRequests =
  async () => {

    const response =
      await fetch(
        `${API_URL}/pending`,
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return response.json();
  };


// APPROVE MEMBER
export const approveMemberApi =
  async (userId) => {

    const response =
      await fetch(
        `${API_URL}/approve/${userId}`,
        {
          method: "PUT",

          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return response.json();
  };


// REMOVE MEMBER
export const removeMemberApi =
  async (userId) => {

    const response =
      await fetch(
        `${API_URL}/remove/${userId}`,
        {
          method: "PUT",

          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return response.json();
  };