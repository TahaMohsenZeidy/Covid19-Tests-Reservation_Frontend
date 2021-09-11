import React from "react";
import {reduxForm} from "redux-form";
import {connect} from "react-redux";


var his = null;

const mapDispatchToProps = {

};

class PaymentForm extends React.Component {
    
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        const {history} = this.props;
        his = history;
    }

    goToAppointment(){
        his.push('/');
    }

    render(){
        return(
            <div class="container">
                <div class="row">
                    <div class="col-md-4"></div>
                    <div class="col-md-4">
                    <script src="https://js.stripe.com/v2/" type="text/javascript"></script>
                    <form accept-charset="UTF-8" action="/" class="require-validation" data-cc-on-file="false" data-stripe-publishable-key="pk_bQQaTxnaZlzv4FnnuZ28LFHccVSaj" id="payment-form" method="post"><div><input name="utf8" type="hidden" value="✓"/><input name="_method" type="hidden" value="PUT"/><input name="authenticity_token" type="hidden" value="qLZ9cScer7ZxqulsUWazw4x3cSEzv899SP/7ThPCOV8="/></div>
                        <div class="form-row">
                        <div class="col-xs-4 form-group required">
                            <label class="control-label">Name on Card</label>
                            <input class="form-control" size="4" type="text"/>
                        </div>
                        </div>
                        <div class="form-row">
                        <div class="col-xs-12 form-group card required">
                            <label class="control-label">Card Number</label>
                            <input autocomplete="off" class="form-control card-number" size="20" type="text"/>
                        </div>
                        </div>
                        <div class="form-row">
                        <div class="col-xs-4 form-group cvc required">
                            <label class="control-label">CVC</label>
                            <input autocomplete="off" class="form-control card-cvc" placeholder="ex. 311" size="4" type="text"/>
                        </div>
                        <div class="col-xs-4 form-group expiration required">
                            <label class="control-label">Expiration</label>
                            <input class="form-control card-expiry-month" placeholder="MM" size="2" type="text"/>
                        </div>
                        <div class="col-xs-4 form-group expiration required">
                            <label class="control-label">&nbsp;</label>
                            <input class="form-control card-expiry-year" placeholder="YYYY" size="4" type="text"/>
                        </div>
                        </div>
                        <div class="form-row">
                        <div class="col-md-12">
                            <div class="form-control total btn btn-info">
                            Total:
                            <span class="amount">$300</span>
                            </div>
                        </div>
                        </div>
                        <div class="form-row">
                        <div class="col-md-12 form-group">
                            <button class="form-control btn btn-primary submit-button" onClick={this.goToAppointment}>Pay »</button>
                        </div>
                        </div>
                        <div class="form-row">
                        </div>
                    </form>
                    </div>
                    <div class="col-md-4"></div>
                </div>
            </div>
        )
    }
}

export default reduxForm({
    form: 'PaymentForm'
  })(connect(null, mapDispatchToProps)(PaymentForm));