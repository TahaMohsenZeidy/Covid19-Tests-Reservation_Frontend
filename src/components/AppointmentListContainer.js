import React from 'react';
import AppointmentList from './AppointmentList';
import { RdvListFetch } from "../actions/actions";
import { connect } from 'react-redux';

const mapStateToProps = state =>({
    ...state.AppointmentList
});

const mapDispatchToProps = {
    RdvListFetch
};

class AppointmentListContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.RdvListFetch(window.localStorage.getItem('userId'));
    }

    render() {
        const {rdv, isFetching} = this.props;
        return (<AppointmentList rdv = {rdv} isFetching = {isFetching} />);
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AppointmentListContainer); 