const API_URL =
  "http://10.129.103.230:5000/api/pot-money";


// GET TOKEN
const getToken = () => {
  return localStorage.getItem("token");
};


// GET CONTRIBUTIONS
export const getPotMoney =
  async () => {

    const response = await fetch(
      API_URL,
      {
        headers: {
          Authorization:
            `Bearer ${getToken()}`,
        },
      }
    );

    return response.json();
  };


// ADD CONTRIBUTION
export const addContributionApi =
  async (contribution) => {

    const response = await fetch(
      API_URL,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${getToken()}`,
        },

        body: JSON.stringify(
          contribution
        ),
      }
    );

    return response.json();
  };


// DELETE CONTRIBUTION
export const deleteContributionApi =
  async (id) => {

    const response = await fetch(
      `${API_URL}/${id}`,
      {
        method: "DELETE",

        headers: {
          Authorization:
            `Bearer ${getToken()}`,
        },
      }
    );

    return response.json();
  };