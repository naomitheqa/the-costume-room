import axios from "axios";

const baseURL = "https://the-costume-room-api.onrender.com";

export const login = async (email, password) => {
  const response = await axios.post(`${baseURL}/tcr/users/login`, {
    email: email.value,
    password: password.value,
  });
  return response.data;
}
