import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8000/api", // altere para a URL da sua API
  headers: {
    "Content-type": "application/json"
  }
});