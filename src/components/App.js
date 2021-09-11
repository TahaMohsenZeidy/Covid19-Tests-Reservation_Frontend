import React from 'react';
import { Route, Switch } from 'react-router';
import AppointmentListContainer from './AppointmentListContainer';
import AppointmentContainer from './AppointmentContainer';
import AppointmentForm from './AppointmentForm';
import Header from './Header';
import LoginForm from './LoginForm';
import {requests} from "../agent";
import {connect} from "react-redux";
import { userProfileFetch, userSetId, userLogout } from "../actions/actions";
import RegistrationContainer from "./RegistrationContainer";
import WelcomeContainer from './WelcomeContainer';
import MedicalHistoryForm from './MedicalHistoryForm';
import PaymentForm from './PaymentForm';
import Admin from './Admin';
import Tester from './Tester';

const mapStateToProps = state => ({
    ...state.auth
  });

const mapDispatchToProps = {
  userProfileFetch, userSetId, userLogout
};

class App extends React.Component {

    constructor(props) {
        super(props);
        const token = window.localStorage.getItem('jwtToken');
    
        if (token) {
          requests.setToken(token);
        }
      }

    componentDidMount() {
      const userId = window.localStorage.getItem('userId');
      const { userSetId } = this.props;
  
      if (userId) {
        userSetId(userId);
      }
    }
 
    componentDidUpdate(prevProps) {
      const { userId, userData, userProfileFetch } = this.props;
      if (prevProps.userId !== userId && userId !== null && userData === null) {
        userProfileFetch(userId);
      }
    }

    render() {
      const {isAuthenticated, userData, userLogout, history} = this.props;
      return (
          <div>
              <Header isAuthenticated={isAuthenticated} userData={userData} logout={userLogout} histo={history.location.pathname}/>
              <Switch>
                  <Route path="/welcome" component={WelcomeContainer}/>
                  <Route path="/login" component={LoginForm}/>
                  <Route path="/medicalHistory" component={MedicalHistoryForm} />
                  <Route path="/appointment-form" component={AppointmentForm}/>
                  <Route path="/rdvs/:id" component={AppointmentContainer}/>
                  <Route path="/register" component={RegistrationContainer}/>
                  <Route path="/pay" component={PaymentForm}/>
                  <Route path="/admin" component={Admin}/>
                  <Route path="/tester" component={Tester}/>
                  <Route path="/" component={AppointmentListContainer}/>
              </Switch>
          </div>
      )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);