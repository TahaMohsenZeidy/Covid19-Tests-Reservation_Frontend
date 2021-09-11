import { SubmissionError } from "redux-form";
import { requests } from "../agent";
import { APP_ADD, IMAGE_UPLOADED, IMAGE_UPLOAD_ERROR, IMAGE_UPLOAD_REQUEST, MEDICAL_FORM_UNLOAD, PLACE_LIST_RECEIVED, RDV_ERROR, RDV_LIST_ADD, RDV_LIST_ERROR, RDV_LIST_RECEIVED, RDV_LIST_REQUEST, RDV_RECEIVED, RDV_REQUEST, RDV_UNLOAD, SYMPTOMES_ADD, TRAVEL_ADD, USER_CONFIRMATION_SUCCESS, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_PROFILE_ERROR, USER_PROFILE_RECEIVED, USER_PROFILE_REQUEST, USER_REGISTER_COMPLETE, USER_REGISTER_SUCCESS, USER_SET_ID } from "./constants";


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

export const RdvListFetch = (id) => {
    return (dispatch) => {
        dispatch(RdvListRequest());
        return requests.get(`/patients/${id}/rdvs`).then(response => dispatch(RdvListRecieved(response)))
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
          // throw new SubmissionError(parseApiErrors(error));
          throw new SubmissionError({
            _error: 'email or identifer is already used, try loggin in instead'
          })
        });
    }
  };

  export const symptomesAdded = (sympId) => {
    window.localStorage.removeItem("sympId");
    window.localStorage.setItem("sympId" ,sympId);
    return {
      type: SYMPTOMES_ADD,
      sympId
    }
  };

  export const symptomesAdd = (cold, cough, fatigue, diarrhea, bleeding, headache, musclepain, vomiting, hardbreathing, abdominalpain, massgathering, casecontact, fever) => {
    return (dispatch) => {
      return requests.post('/symptomes', {cold, cough, fatigue, diarrhea, bleeding, headache, musclepain, vomiting, hardbreathing, abdominalpain, massgathering, casecontact, fever}, false)
        .then(response => dispatch(symptomesAdded(response.id)))
        .catch(error => {
          throw new SubmissionError({
            _error: 'not valid symptomes'
          })
        });
    }
  };

  export const travelAdded = (travelId) => {
    window.localStorage.removeItem("travelId");
    window.localStorage.setItem("travelId" ,travelId);
    return {
      type: TRAVEL_ADD,
      travelId
    }
  };

  export const travelAdd = (flydate, destination) => {
    return (dispatch) => {
      return requests.post('/travel', {flydate, destination})
      .then(response => dispatch(travelAdded(response.id)))
      .catch(error => {
        throw new SubmissionError({
          _error: 'not valid symptomes'
        })
      });
    }
  }

  export const placeListRecieved = (data) => {
    const place = [];
    for (let i = 0; i < data.length; i++) {
      place.push(data[i].name);
    }
    window.localStorage.setItem("places", place);
  };
  
export const placeListError = (error) => ({
    type: RDV_LIST_ERROR,
    error
});

export const placeListFetch = () => {
    return (dispatch) => {
        return requests.get(`/places`)
        .then(response => dispatch(placeListRecieved(response['hydra:member'])))
        .catch(error => dispatch(placeListError(error)));
    }
};

export const AppAdded = (appId) => {
  return {
    type: APP_ADD,
    appId
  }
};

export const addRdv = (symp, travel, place) =>{
  console.log(symp, travel, place);
  return (dispatch) => {
    return requests.post('/rdvs', {"symptomes": symp, "travel": travel,"place": place})
    .then(response => dispatch(AppAdded(response.id)))
    .catch(error => {
      throw new SubmissionError({
        _error: 'not valid RDV'
      })
    });
  }
}

export const imageUploaded = (data) => {
  return {
    type: IMAGE_UPLOADED,
    image: data
  }
};

export const imageUploadRequest = () => {
  return {
    type: IMAGE_UPLOAD_REQUEST,
  }
};

export const imageUploadError = () => {
  return {
    type: IMAGE_UPLOAD_ERROR,
  }
};

export const imageUpload = (file) => {
  return (dispatch) => {
    dispatch(imageUploadRequest());
    return requests.upload('/images', file)
      .then(response => dispatch(imageUploaded(response)))
      .catch(() => dispatch(imageUploadError))
  }
};

export const medicalHistoryAdd = (disease, medecine1, medecine2, images = []) => {
  return (dispatch) => {
    return requests.post(
      '/medical_histories',
      {
        disease,
        medecine1,
        medecine2,
        patient: "/api/patients/344",
        images: images.map(image => `/api/images/${image.id}`)
      }
    ).catch((error) => {
      if (401 === error.response.status) {
        return dispatch(userLogout());
      } else if (403 === error.response.status) {
        throw new SubmissionError({
          _error: 'You do not have rights to do that!'
        });
      }
      throw new SubmissionError({
        _error: 'Invalid Response'
      });
    })
  }
};

export const medHistFormUnload = () => ({
  type: MEDICAL_FORM_UNLOAD
});