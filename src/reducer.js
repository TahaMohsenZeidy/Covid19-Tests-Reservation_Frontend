import { combineReducers } from "redux";
import Appointment from "./reducers/Appointment";
import AppointmentList from "./reducers/AppointmentList";
import { reducer as formReducer } from "redux-form";
import auth from "./reducers/auth";
import { routerReducer } from "react-router-redux";

export default combineReducers({
    AppointmentList,
    Appointment,
    auth,
    router: routerReducer,
    form: formReducer
  });