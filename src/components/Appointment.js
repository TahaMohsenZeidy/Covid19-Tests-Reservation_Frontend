import React from "react";

export class Appointment extends React.Component {
    render() {
        const {rdv, isFetching} = this.props;

        if(isFetching) {
            return(<div><i className="fas fa-spinner fa-spin"/></div>);
        }

        if(null === rdv){
            return (<div>No Such Appointment</div>);
        }
        return (
            <div>
                {rdv.patient}
            </div>
        )
    }
}