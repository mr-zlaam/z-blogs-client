import { BACKEND_URI } from "@/config";
import API from "axios";
const baseurl = BACKEND_URI;

export const axios = API.create({
  baseURL: baseurl,
});
