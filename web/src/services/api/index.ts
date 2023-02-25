import { Axios } from "axios";

const requisicaoApi = new Axios({
  baseURL: "http://localhost:7070",
  headers: {
    "Content-Type": "application/json",
  },
  responseType: "json",
});

export { requisicaoApi };
