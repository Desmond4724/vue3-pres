import axios from "axios";
const baseURL = 'https://reqres.in/api'

export const http = axios.create({
  baseURL
})