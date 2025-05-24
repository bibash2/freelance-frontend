import axios from "axios";
import { browser } from '$app/environment';
const token = browser ? localStorage.getItem("token") : null;
console.log(token)
export const freelanceAxios = axios.create({
    baseURL:"http://localhost:9000/api",
    headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
    }
})
