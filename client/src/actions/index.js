import axios from "axios";
import { FETCH_USER } from "./types";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const putUser = async (id, data) => {
  console.log(process.env.REACT_APP_QUERYKEY);
  await axios.put(
    `/api/users/${id}/?key=${process.env.REACT_APP_QUERYKEY}`,
    data
  );
  //console.log({ type: PUT_USER, payload: res.data });
};
