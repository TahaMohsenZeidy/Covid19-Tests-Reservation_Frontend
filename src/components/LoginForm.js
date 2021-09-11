import React from 'react';
import {reduxForm, Field} from 'redux-form';
import {renderField} from "../form";
import {connect} from 'react-redux';
import {userLoginAttempt} from '../actions/actions.js'


const mapStateToProps = state => ({
  ...state.auth
});

const mapDispatchToProps = {
    userLoginAttempt
};

class LoginForm extends React.Component {
    
  componentDidUpdate(prevProps) {
    if (prevProps.token !== this.props.token) {
      this.props.history.push('/');
    }
  }
  
  onSubmit (values){
        return this.props.userLoginAttempt(
            values.email,
            values.identifier
        );
    }

  render() {
    const {handleSubmit, error} = this.props;
    return (
      <div className="text-center">
        <div className="mx-auto m-4">
          <img src={require('./images/login.jpg')} />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <div class="form-group">
                <Field name="email" label="Email Adress" type="text" component={renderField} />
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
                <Field name="identifier" label="Identifier" type="password" component={renderField} />
            </div>
            <div class="form-check  p-3">
              
            </div>
            <button type="submit" class="btn btn-primary">Log In</button>
        </form>
      </div>
    )
  }
}
export default reduxForm({
    form: 'LoginForm'
  })(connect(mapStateToProps, mapDispatchToProps)(LoginForm));