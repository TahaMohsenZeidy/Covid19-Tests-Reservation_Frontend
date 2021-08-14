import React from 'react';
import {RdvFetch} from '../actions/actions.js';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  ...state.rdv
});

const mapDispatchToProps = {
  RdvFetch
}

class AppointmentContainer extends React.Component {
  componentDidMount() {
    console.log(this.props.match.params.id);
    this.props.RdvFetch(this.props.match.params.id);
  } 

  render(){
      return(
          <div>
              Hello From RDV !
          </div>
      )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentContainer);