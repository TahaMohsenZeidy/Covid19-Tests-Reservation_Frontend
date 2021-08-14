import {RDV_ERROR, RDV_RECEIVED, RDV_REQUEST, RDV_UNLOAD} from "../actions/constants";

export default (state = {
  post: null,
  isFetching: false
}, action) => {
  switch (action.type) {
    case RDV_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case RDV_RECEIVED:
      return {
        ...state,
        post: action.data,
        isFetching: false
      };
    case RDV_ERROR:
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
}