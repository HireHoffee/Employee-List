import axios from "axios";

const api = axios.create({
  baseURL: "https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
