import React from 'react';
import Appointment from './Appointment';
import {RdvFetch, RdvUnload} from '../actions/actions.js';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  ...state.Appointment
});

const mapDispatchToProps = {
  RdvFetch,
  RdvUnload
}

class AppointmentContainer extends React.Component {

  componentDidMount() {
    this.props.RdvFetch(this.props.match.params.id);
  } 

  componentWillUnmount() {
    this.props.RdvUnload();
  }

  render(){
    const {isFetching, Rdv} = this.props;
    return(<Appointment isFetching={isFetching} Rdv={Rdv} />);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentContainer);