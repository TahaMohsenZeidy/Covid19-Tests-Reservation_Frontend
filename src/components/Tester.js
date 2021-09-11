import React from "react";
import {connect} from "react-redux";
import {reduxForm} from "redux-form";

const mapDispatchToProps = {

};

var his = null;

class Tester extends React.Component {
    
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        const {history} = this.props;
        his = history;
    }

    goToAdmin(){
        his.push('/admin');
    }

    render(){
        return(
            <form>
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
            </div>
            <button onClick={this.goToAdmin} type="submit" class="btn btn-primary">Submit</button>
            </form>
        )
    }
}

export default reduxForm({
    form: 'Tester'
  })(connect(null, mapDispatchToProps)(Tester));