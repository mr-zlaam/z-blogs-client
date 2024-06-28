import { BACKEND_URI } from "@/config";
import axios from "axios";
const baseurl = BACKEND_URI;

export const API = axios.create({
  baseURL: baseurl,
});
