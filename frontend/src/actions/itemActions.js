// item list
import {
  ITEM_LIST_REQUEST,
  ITEM_LIST_SUCCESS,
  ITEM_LIST_FAIL,
} from "../constants/itemConstants";

// item details
import {
  ITEM_DETAIL_REQUEST,
  ITEM_DETAIL_SUCCESS,
  ITEM_DETAIL_FAIL,
} from "../constants/itemConstants";
import { ITEM_API_URL } from "../constants/apiConstants";
import axios from "axios";

export const listItems = () => async (dispatch) => {
  try {
    dispatch({ type: ITEM_LIST_REQUEST });

    const { data } = await axios({
      method: "get",
      baseURL: ITEM_API_URL,
      url: "/",
    });

    dispatch({
      type: ITEM_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ITEM_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listItemDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: ITEM_DETAIL_REQUEST });

    const { data } = await axios({
      method: "get",
      baseURL: ITEM_API_URL,
      url: `/${id}`,
    });

    dispatch({
      type: ITEM_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ITEM_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
