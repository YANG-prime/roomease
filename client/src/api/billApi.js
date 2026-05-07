const API_URL =
  "http://10.129.103.230:5000/api/bills";


// GET TOKEN
const getToken = () => {
  return localStorage.getItem("token");
};


// GET BILLS
export const getBills = async () => {

  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.json();
};


// ADD BILL
export const addBillApi = async (bill) => {

  const response = await fetch(API_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",

      Authorization: `Bearer ${getToken()}`,
    },

    body: JSON.stringify(bill),
  });

  return response.json();
};


// UPDATE BILL
export const updateBillApi = async (
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


// DELETE BILL
export const deleteBillApi = async (
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