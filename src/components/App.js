import React from 'react';
import { Route, Switch } from 'react-router';
import AppointmentListContainer from './AppointmentListContainer';
import AppointmentContainer from './AppointmentContainer'
import Header from './header';
import LoginForm from './LoginForm';

class App extends React.Component {

    render() {
        return (
            <div>
                <Header/>
                <Switch>
                    <Route path="/login" component={LoginForm}/>
                    <Route path="/rdvs/:id" component={AppointmentContainer}/>
                    <Route path="/" component={AppointmentListContainer}/>
                </Switch>
            </div>
        )
    }
}

export default App; 