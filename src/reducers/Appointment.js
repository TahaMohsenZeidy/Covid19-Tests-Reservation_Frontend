import {RDV_ERROR, RDV_RECEIVED, RDV_REQUEST, RDV_UNLOAD} from "../actions/constants";

export default (state = {
  Rdv: null,
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
        Rdv: action.data,
        isFetching: false
      };
    case RDV_ERROR:
      return {
        ...state, 
        isFetching: false
      };
    case RDV_UNLOAD:
      return {
        ...state,
        isFetching: false,
        Rdv: null
      }
    default:
      return state;
  }
}