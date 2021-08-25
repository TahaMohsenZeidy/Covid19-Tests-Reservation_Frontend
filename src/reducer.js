import { combineReducers } from "redux";
import Appointment from "./reducers/Appointment";
import AppointmentList from "./reducers/AppointmentList";
import { reducer as formReducer } from "redux-form";
import auth from "./reducers/auth";
import { routerReducer } from "react-router-redux";
import registration from "./reducers/registration";

export default combineReducers({
    AppointmentList,
    Appointment,
    auth,
    registration,
    router: routerReducer,
    form: formReducer
  });