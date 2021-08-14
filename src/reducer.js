import { combineReducers } from "redux";
import Appointment from "./reducers/Appointment";
import AppointmentList from "./reducers/AppointmentList";

export default combineReducers({
    AppointmentList,
    Appointment
  });