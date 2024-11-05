import axios from "axios";

const baseURL = "https://the-costume-room-api.onrender.com";

export const login = async (email, password) => {
  const response = await axios.post(`${baseURL}/tcr/users/login`, {
    email: email.value,
    password: password.value,
  });
  return response.data;
}

export const getAllUsers = async (token) => {
  const response = await axios.get(`${baseURL}/tcr/admin/users`, {
    headers: {
      Authorization: `${token}`,
},})
  return response.data;
};

export const addUser = async (token, user) => {
  const response = await axios.post(`${baseURL}/tcr/admin/add-user`, {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    expiryDate: user.expiryDate,
  },
    {
      headers: {
        Authorization: `${token}`
      },
    });
  return response.data;
};
