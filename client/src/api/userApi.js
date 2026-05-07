const API_URL =
  "http://10.129.103.230:5000/api/users";


// GET TOKEN
const getToken = () => {
  return localStorage.getItem("token");
};


// GET CURRENT USER
export const getCurrentUser =
  async () => {

    const response = await fetch(
      `${API_URL}/me`,
      {
        headers: {
          Authorization:
            `Bearer ${getToken()}`,
        },
      }
    );

    return response.json();
  };