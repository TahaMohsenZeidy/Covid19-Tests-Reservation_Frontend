import React from 'react';
import { Link } from 'react-router-dom';
import timeago from 'timeago.js';

class AppointmentList extends React.Component {
    
    render() {
        const {rdv, isFetching} = this.props;

        if(isFetching) {
            return(<div><i className="fas fa-spinner fa-spin"/></div>);
        }

        if(null === rdv || 0 === rdv.length){
            return (
            <div class="card m-3">
                <div className="mx-auto m-4">
                    <img src={require('./images/no_app.PNG')} />
                </div>
                <div class="card-body text-center">
                    No Appointments booked for the moment, If you want to book a new Appointment You need to Have an Account.
                </div>
            </div>)
        }
        return (
            <div>
                {rdv && rdv.map(rdv => (
                    <div class="card text-center mt-4" key={rdv.id}>
                        <div class="card-header">
                            The Test Result Is: {rdv.result ? rdv.result : "Still Under Analysis" }
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Test Type: SARS - CoV - 2 PCR</h5>
                            <p class="card-text">Test Date: {timeago().format(rdv.date)}</p>
                            <Link to={`/rdvs/${rdv.id}`}>
                                <a href="#" class="btn btn-primary">More Details</a>
                            </Link>
                        </div>
                        <div class="card-footer text-muted">
                            Central Hospital
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

export default AppointmentList; 