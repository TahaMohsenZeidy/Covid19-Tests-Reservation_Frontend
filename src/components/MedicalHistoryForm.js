import React from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {Redirect} from "react-router";
import {renderField} from "../form";
import ImageUpload from "./ImageUpload";
import { ImageBrowser } from "./ImageBrowser";
import { medHistFormUnload, medicalHistoryAdd } from "../actions/actions"
import { IMAGE_DELETED, IMAGE_DELETE_REQUEST } from "../actions/constants";
import { requests } from "../agent";

const mapDispatchToProps = {
    medicalHistoryAdd,
    medHistFormUnload,
    imageDelete
};

const mapStateToProps = state => ({
    userData: state.auth.userData,
    ...state.medicalHistoryForm
});

var his = null;

class MedicalHistoryForm extends React.Component {

    // componentDidMount(){
    //     const {history} = this.props;
    //     his = history;
    // }

    goToAppointment(){
        // his.push('/');
    }

    onSubmit(values){
        const {medicalHistoryAdd, reset, history, images, userData} = this.props;
        console.log(userData);
        return medicalHistoryAdd(values.disease, values.med1, values.med2, images)
        .then( ()=>{
            reset();
            history.push('/');
        });
    }

    componentWillUnmount() {
        this.props.medHistFormUnload();
    }

    render(){
        const {submitting, handleSubmit, error, images, imageReqInProgress, imageDelete} = this.props;
        return(
            <div class="card">
                {error && <div className="alert alert-danger">{error}</div>} 
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <img class="card-img-top" src={require('./images/history.PNG')} alt="Card image cap"/>
                <div class="card-body text-center">
                    <p class="font-weight-bold text-center">Input Your Medical History Here Or Just Leave Empty.</p>
                    <div class="form-row">
                        <div class="form-group col-md-4">
                            <Field name="disease" label="Disease" type="text" component={renderField} />
                        </div>
                        <div class="form-group col-md-4">
                            <Field name="med1" label="Medcine 1" type="text" component={renderField} />
                        </div>
                        <div class="form-group col-md-4">
                            <Field name="med2" label="Medecine 2" type="text" component={renderField} />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-12">
                            <label for="exampleFormControlFile1">Blood Test, Radiology ...</label>
                            <ImageUpload />
                            {/* <ImageBrowser images={images} deleteHandler={imageDelete} isLocked={imageReqInProgress} /> */}
                        </div>
                    </div>
                    <button type="submit" disabled={submitting || imageReqInProgress} class="btn btn-light btn-primary m-3">Add Medical History</button>
                    <button type="button" class="btn btn-primary m-3" onClick={this.goToAppointment} >Skip</button>
                </div>
                </form>
            </div>
        )
    }
}

export default reduxForm({
    form: 'MedicalHistoryForm'
  })(connect(null, mapDispatchToProps)(MedicalHistoryForm));

  export const imageDeleteRequest = () => {
    return {
      type: IMAGE_DELETE_REQUEST,
    }
  };
  
  export const imageDelete = (id) => {
    return (dispatch) => {
      dispatch(imageDeleteRequest());
      return requests.delete(`/images/${id}`)
        .then(() => dispatch(imageDeleted(id)));
    }
  };
  
  export const imageDeleted = (id) => {
    return {
      type: IMAGE_DELETED,
      imageId: id
    }
  };