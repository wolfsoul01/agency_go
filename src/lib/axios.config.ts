import axios from "axios";
const query = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default query;
