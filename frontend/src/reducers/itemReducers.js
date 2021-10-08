// item list
import {
  ITEM_LIST_REQUEST,
  ITEM_LIST_SUCCESS,
  ITEM_LIST_FAIL,
} from "../constants/itemConstants";

// item detail
import {
  ITEM_DETAIL_REQUEST,
  ITEM_DETAIL_SUCCESS,
  ITEM_DETAIL_FAIL,
} from "../constants/itemConstants";

export const itemListReducer = (state = { items: [] }, action) => {
  switch (action.type) {
    case ITEM_LIST_REQUEST:
      return { isLoading: true, items: [] };
    case ITEM_LIST_SUCCESS:
      return { isLoading: false, items: action.payload };
    case ITEM_LIST_FAIL:
      return { isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export const itemDetailReducer = (
  state = { item: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case ITEM_DETAIL_REQUEST:
      return { isLoading: true, ...state };
    case ITEM_DETAIL_SUCCESS:
      return { isLoading: false, item: action.payload };
    case ITEM_DETAIL_FAIL:
      return { isLoading: false, error: action.payload };
    default:
      return state;
  }
};
