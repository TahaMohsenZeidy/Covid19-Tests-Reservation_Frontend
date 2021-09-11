import React from "react";
import QRCode from "react-qr-code";

export class Appointment extends React.Component {

    render() {
        const {Rdv, isFetching} = this.props;
        if(isFetching) {
            return(<div><i className="fas fa-spinner fa-spin"/></div>);
        }

        if(null === Rdv){
            return (<div>No Such Appointment</div>);
        }
        return (
            <div>
                <h1 class="text-center">{(Rdv.result) ? Rdv.result.charAt(0).toUpperCase() + Rdv.result.slice(1) : "Still Waiting For Result" } Test</h1>
                <div class="row">
                    <div class="col-sm-6 mt-3">
                        <div class="card">
                        <div class="card-body">
                            <h4 class="card-title">Patient</h4>
                            <p class="card-text"><span class="font-weight-bold">Full Name:</span> {Rdv.patient.firstname + " " + Rdv.patient.lastname}</p>
                            <p class="card-text"><span class="font-weight-bold">Birth Date:</span> {new Date(Rdv.patient.birthdate).toDateString()}</p>
                            <p class="card-text"><span class="font-weight-bold">Adress:</span> {Rdv.patient.address}</p>
                            <p class="card-text"><span class="font-weight-bold">Age:</span> {Rdv.patient.age}</p>
                            <p class="card-text"><span class="font-weight-bold">Gender:</span> {Rdv.patient.gender}</p>
                        </div>
                        </div>
                    </div>
                    <div class="col-sm-6 mt-3">
                        <div class="card">
                        <div class="card-body">
                            <h4 class="card-title">Symptomes</h4>
                            <p class="card-text"><span class="font-weight-bold">Cough:</span> {Rdv.symptomes.cough ? (<span>yes</span>): (<span>no</span>)}</p>
                            <p class="card-text"><span class="font-weight-bold">Fatigue:</span> {Rdv.symptomes.fatigue ? (<span>yes</span>): (<span>no</span>)}</p>
                            <p class="card-text"><span class="font-weight-bold">Fever:</span> {Rdv.symptomes.fever ? (<span>yes</span>): (<span>no</span>)}</p>
                            <p class="card-text"><span class="font-weight-bold">Hard Breathing:</span> {Rdv.symptomes.hard_breathing ? (<span>yes</span>): (<span>no</span>)}</p>
                            <p class="card-text"><span class="font-weight-bold">Mass Gathering:</span> {Rdv.symptomes.massGathering ? (<span>yes</span>): (<span>no</span>)}</p>
                        </div>
                        </div>
                    </div>
                    <div class="col-sm-6 mt-3">
                        <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Place</h5>
                            <p class="card-text"><span class="font-weight-bold">Country: </span> {Rdv.place.country}</p>
                            <p class="card-text"><span class="font-weight-bold">Name: </span> {Rdv.place.name}</p>
                        </div>
                        </div>
                    </div>
                    <div class="col-sm-6 mt-3">
                        <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Travel</h5>
                            <p class="card-text"><span class="font-weight-bold">Destination: </span> {Rdv.travel.destination}</p>
                            <p class="card-text"><span class="font-weight-bold">Fly Date: </span> {Rdv.travel.fly_date}</p>
                        </div>
                        </div>
                    </div>
                </div>

                <div class="card w-100 mt-4 p-3" style={{display: Rdv.result ? 'block' :'none' }}>
                    <div class="card-img-top d-flex align-items-center bg-light">
                        <div>
                            <QRCode value={Rdv.id.toString()} />
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Proof of Vaccination</h5>
                            <p class="card-text"><span class="font-weight-bold">Agent: </span> SARS-COV-19 </p>
                            <p class="card-text"><span class="font-weight-bold">Dose Type: </span> C19-mRNA </p>
                            <p class="card-text"><span class="font-weight-bold">Dose Date: </span> {Rdv.date} </p>
                            <p class="card-text"><span class="font-weight-bold">Dose Brand: </span> Comirnaty </p>
                            <p class="card-text"><span class="font-weight-bold">MAH: </span> Pfizer: OY </p>
                            <p class="card-text"><span class="font-italic">Certificate Issued: </span> {new Date(new Date().setDate(new Date().getDate()+5)).getFullYear()} </p>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Appointment;