const API_URL =
  "http://10.129.103.230:5000/api/chores";


// GET TOKEN
const getToken = () => {
  return localStorage.getItem("token");
};


// GET CHORES
export const getChores = async () => {

  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.json();
};


// ADD CHORE
export const addChoreApi = async (chore) => {

  const response = await fetch(API_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",

      Authorization: `Bearer ${getToken()}`,
    },

    body: JSON.stringify(chore),
  });

  return response.json();
};


// UPDATE CHORE
export const updateChoreApi = async (
  id,
  updatedData
) => {

  const response = await fetch(
    `${API_URL}/${id}`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${getToken()}`,
      },

      body: JSON.stringify(updatedData),
    }
  );

  return response.json();
};


// DELETE CHORE
export const deleteChoreApi = async (
  id
) => {

  const response = await fetch(
    `${API_URL}/${id}`,
    {
      method: "DELETE",

      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response.json();
};