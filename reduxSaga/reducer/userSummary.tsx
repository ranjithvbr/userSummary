import {
  GET_USER_SUCCESS,
  POST_USER_SUCCESS,
  PUT_USER_SUCCESS,
  DELETE_USER_SUCCESS,
} from "../constants";

type actionParams = {
  type: string,
  payload: any
}

const userSummaryReducer = (state = [], action: actionParams) => {
  const { type, payload } = action;
  switch (type) {
    case GET_USER_SUCCESS:
      return {
        ...state,
        user: payload,
      };
    case POST_USER_SUCCESS:
      return {
        ...state,
        addUser: payload.data,
      };
    case PUT_USER_SUCCESS:
      return {
        ...state,
        putUser: payload.data,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        deleterUser: payload.data,
      };
    default:
      return state;
  }
};

export default userSummaryReducer;
