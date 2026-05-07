const API_URL =
  "https://roomease-production-6413.up.railway.app/api/users";


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