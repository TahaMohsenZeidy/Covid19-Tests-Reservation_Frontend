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
            return (<div>No Appointments booked.</div>)
        }
        return (
            <div>
                {rdv && rdv.map(rdv => (
                    <div class="card text-center mt-4" key={rdv.id}>
                        <div class="card-header">
                            The Test Result Is: {rdv.result}
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