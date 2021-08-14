import {requests} from "../agent";
import { RDV_ERROR, RDV_LIST_ADD, RDV_LIST_ERROR, RDV_LIST_RECEIVED, RDV_LIST_REQUEST, RDV_RECEIVED, RDV_REQUEST } from "./constants";


export const RdvListRequest = () => ({
    type: RDV_LIST_REQUEST,
});

export const RdvListError = (error) => ({
    type: RDV_LIST_ERROR,
    error
});

export const RdvListRecieved = (data) => ({
    type: RDV_LIST_RECEIVED,
    data
});

export const RdvListFetch = () => {
    return (dispatch) => {
        dispatch(RdvListRequest());
        return requests.get('/rdvs').then(response => dispatch(RdvListRecieved(response)))
        .catch(error => dispatch(RdvListFetch(error)));
    }
};

export const RdvRequest = () => ({
    type: RDV_REQUEST,
});

export const RdvError = (error) => ({
    type: RDV_ERROR,
    error
});

export const RdvRecieved = (data) => ({
    type: RDV_RECEIVED,
    data
});

export const RdvFetch = (id) => {
    return (dispatch) => {
        dispatch(RdvRequest());
        return requests.get(`/rdvs/${id}`).then(response => dispatch(RdvRecieved(response)))
        .catch(error => dispatch(RdvError(error)));
    }
}

export const RdvListAdd = () => ({
    type: RDV_LIST_ADD,
    data: {
        id: Math.floor(Math.random() *100 +3),
        date: 'a newly added appointment'
    }
});