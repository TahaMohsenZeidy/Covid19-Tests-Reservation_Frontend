import { SubmissionError } from "redux-form";
import { requests } from "../agent";
import {parseApiErrors} from "../apiUtils";
import { RDV_ERROR, RDV_LIST_ADD, RDV_LIST_ERROR, RDV_LIST_RECEIVED, RDV_LIST_REQUEST, RDV_RECEIVED, RDV_REQUEST, RDV_UNLOAD, USER_CONFIRMATION_SUCCESS, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_PROFILE_ERROR, USER_PROFILE_RECEIVED, USER_PROFILE_REQUEST, USER_REGISTER_COMPLETE, USER_REGISTER_SUCCESS, USER_SET_ID } from "./constants";


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
        .catch(error => dispatch(RdvListError(error)));
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

export const RdvUnload = (data) => ({
    type: RDV_UNLOAD,
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

export const userLoginSuccess = (token, userId) => {
  return {
    type: USER_LOGIN_SUCCESS,
    token,
    userId
  }
};

export const userLoginAttempt = (email, identifier) => {
    return (dispatch) => {
      return requests.post('/login_check', {email, identifier}, false).then(
        response => dispatch(userLoginSuccess(response.token, response.userId))
      ).catch(() => {
        throw new SubmissionError({
            _error: 'email or identifer is invalid'
          })
      });
    }
  };

  export const userProfileRequest = () => {
    return {
      type: USER_PROFILE_REQUEST
    }
  };

  export const userProfileReceived = (userId, userData) => {
    return {
      type: USER_PROFILE_RECEIVED,
      userData,
      userId
    }
  };

  export const userProfileError = () => {
    return {
      type: USER_PROFILE_ERROR,
    }
  };

  export const userConfirmationSuccess = () => {
    return {
      type: USER_CONFIRMATION_SUCCESS
    }
  };

  export const userRegisterComplete = () => {
    return {
      type: USER_REGISTER_COMPLETE
    }
  };

  export const userConfirm = (confirmationToken) => {
    return (dispatch) => {
      return requests.post('/patients/confirm', {confirmationToken}, false)
        .then(() => dispatch(userConfirmationSuccess()))
        .catch(error => {
          throw new SubmissionError({
            _error: 'Confirmation token is invalid'
          });
        });
    }
  };

  export const userSetId = (userId) => {
    return {
      type: USER_SET_ID,
      userId
    }
  };
  
  export const userLogout = () => {
    return {
      type: USER_LOGOUT
    }
  };

  export const userProfileFetch = (userId) => {
    return (dispatch) => {
      dispatch(userProfileRequest());
      return requests.get(`/patients/${userId}`, true).then(response => dispatch(userProfileReceived(userId, response)))
      .catch(error => dispatch(RdvError(error)));
    }
  };

  export const userRegisterSuccess = () => {
    return {
      type: USER_REGISTER_SUCCESS
    }
  };

  export const userRegister = (firstname, lastname, identifier, birthdate, nationality, email, address, gsm, age, gender) => {
    return (dispatch) => {
      return requests.post('/patients', {firstname, lastname, identifier, birthdate, nationality, email, address, gsm, age, gender}, false)
        .then(() => dispatch(userRegisterSuccess()))
        .catch(error => {
          throw new SubmissionError(parseApiErrors(error));
        });
    }
  };