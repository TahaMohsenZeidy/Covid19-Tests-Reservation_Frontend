
import {
    PLACE_LIST_RECEIVED,
    PLACE_LIST_ERROR
  } from "../actions/constants";
  
  export default(state = {
    place: null,
  }, action) => {
    switch (action.type) {
      case PLACE_LIST_RECEIVED:
        state = {
          ...state,
          place: action.data['hydra:member'],
        };
        return state;
      case PLACE_LIST_ERROR:
        return {
          ...state,
          place: null
        };
      default:
        return state;
    }
  }