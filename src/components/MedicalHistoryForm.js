import React from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {Redirect} from "react-router";
import {renderField} from "../form";

const mapDispatchToProps = {

};


class MedicalHistoryForm extends React.Component {
    render(){
        return(
            <div class="card">
                <img class="card-img-top" src={require('./images/history.PNG')} alt="Card image cap"/>
                <div class="card-body text-center">
                    <p class="font-weight-bold text-center">Input Your Medical History Here Or Just Leave Empty.</p>
                    <div class="form-row">
                        <div class="form-group col-md-4">
                            <label >Disease</label>
                            <input type="text" class="form-control" />
                        </div>
                        <div class="form-group col-md-2">
                            <label >Medecine 1</label>
                            <input type="text" class="form-control" />
                        </div>
                        <div class="form-group col-md-2">
                            <label >Medecine 2</label>
                            <input type="text" class="form-control" />
                        </div>
                        <div class="form-group col-md-4">
                            <label for="exampleFormControlFile1">Blood Test, Radiology ...</label>
                            <input type="file" class="form-control-file" id="exampleFormControlFile1"/>
                        </div>
                    </div>
                    <button type="button" class="btn btn-light btn-primary m-3">Add Medical History</button>
                    <button type="button" class="btn btn-primary m-3">Skip</button>
                </div>
            </div>
        )
    }
}

export default reduxForm({
    form: 'MedicalHistoryForm'
  })(connect(null, mapDispatchToProps)(MedicalHistoryForm));