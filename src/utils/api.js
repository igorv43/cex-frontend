import axios from "axios";
import APIURL from "../config";
export default axios.create({
  baseURL: APIURL,
});
