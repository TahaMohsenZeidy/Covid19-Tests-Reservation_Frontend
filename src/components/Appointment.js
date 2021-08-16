import React from "react";

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
                {Rdv.result}
            </div>
        )
    }
}

export default Appointment;