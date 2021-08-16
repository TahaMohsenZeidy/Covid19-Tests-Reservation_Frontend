import {
    RDV_LIST_REQUEST,
    RDV_LIST_ADD,
    RDV_LIST_RECEIVED,
    RDV_LIST_ERROR
  } from "../actions/constants";
  
  export default(state = {
    rdv: null,
    isFetching: false,
  }, action) => {
    switch (action.type) {
      case RDV_LIST_REQUEST:
        state = {
          ...state,
          isFetching: true,
        };
        console.log(state);
        return state;
      case RDV_LIST_RECEIVED:
        state = {
          ...state,
          rdv: action.data['hydra:member'],
          isFetching: false
        };
        console.log(state);
        return state;
      case RDV_LIST_ERROR:
        return {
          ...state,
          isFetching: false,
          rdv: null
        };
      case RDV_LIST_ADD:
        state = {
          ...state,
          rdv: state.rdv ? state.rdv.concat(action.data) : state.rdv
        };
        console.log(state);
        return state;
      default:
        return state;
    }
  }