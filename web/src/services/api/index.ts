import { Axios } from "axios";

const requisicaoApi = new Axios({
  baseURL: "http://localhost:6060",
  headers: {
    "Content-Type": "application/json",
  },
  responseType: "json",
});

export { requisicaoApi };
