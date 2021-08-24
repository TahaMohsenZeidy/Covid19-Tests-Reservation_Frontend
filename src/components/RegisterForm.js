import React from "react";
import {Field, reduxForm} from "redux-form";
import {renderField} from "../form";
import {connect} from "react-redux";
import {userRegister} from "../actions/actions";

// const mapDispatchToProps = {
//   userRegister
// };

class RegisterForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {termsAccepted: false};
//   }

//   onSubmit(values) {
//     return this.props.userRegister(...Object.values(values))
//       .then(() => {
//         this.props.reset();
//       });
//   }

//   onTermsAcceptedClick(e) {
//     this.setState(prevState => ({termsAccepted: !prevState.termsAccepted}));
//   }

  render() {
    const {handleSubmit} = this.props;
    return (
      <div>
          <form>
            <div class="form-row">
              <div class="form-group col-md-6">
                <Field name="firstname" label="First Name" type="text" component={renderField} />
              </div>
              <div class="form-group col-md-6">
                <Field name="lastname" label="Last Name" type="text" component={renderField} />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <Field name="birthdate" label="Date Of Birth" type="date" component={renderField} />
              </div>
              <div class="form-group col-md-6">
                <Field name="nationality" label="Nationality" type="text" component={renderField} />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <Field name="address" label="Address" type="text" component={renderField} />
              </div>
              <div class="form-group col-md-6">
                <Field name="age" label="Age" type="number" component={renderField} />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="inputCity">City</label>
                <input type="text" class="form-control" id="inputCity"/>
              </div>
              <div class="form-group col-md-4">
                <label for="inputState">State</label>
                <select id="inputState" class="form-control">
                  <option selected>Choose...</option>
                  <option>...</option>
                </select>
              </div>
              <div class="form-group col-md-2">
                <label for="inputZip">Zip</label>
                <input type="text" class="form-control" id="inputZip"/>
              </div>
            </div>
            <div class="form-group">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="gridCheck"/>
                <label class="form-check-label" for="gridCheck">
                  Check me out
                </label>
              </div>
            </div>
            <button type="submit" class="btn btn-primary">Sign in</button>
          </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'RegisterForm'
})(RegisterForm);