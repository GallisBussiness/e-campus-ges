import axios from "axios";
import { env } from "../env";
const Api = axios.create({
    baseURL: env.baseServerURL,
  })
export default Api;