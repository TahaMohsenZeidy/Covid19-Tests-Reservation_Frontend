import React from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {Redirect} from "react-router";
import {canWriteAppointment} from "../apiUtils";
import {renderField} from "../form";
import {symptomesAdd, placeListFetch, travelAdd, addRdv} from "../actions/actions";


const mapStateToProps = state => ({
    userData: state.auth.userData
});

const mapDispatchToProps = {
    symptomesAdd, 
    travelAdd,
    addRdv,
    placeListFetch
};

class AppointmentForm extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props);
        this.props.placeListFetch();
        this.state = { country: 'Tunisia',time: 'choose time' , places: window.localStorage.getItem('places').split(",") };
        this.handleCountryChange = this.handleCountryChange.bind(this);
        this.handlePlaceChange = this.handlePlaceChange.bind(this)
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.submitAppointment = this.submitAppointment.bind(this)
    }

    handleCountryChange(event) {
        this.setState({country: event.target.value});
    }

    handlePlaceChange(event) {
        
    }

    handleTimeChange(event) {
        this.setState({time: event.target.value});
    }

    onSymptomesSubmit (values){
        this.displayTravel();
    }

    onTravelSubmit(values){
        values['destination'] = this.state.country;
        this.displayPlace();
        return this.props.travelAdd(values['flydate'], values['destination']);
    }

    displayTravel(){
        document.getElementById('tr').style.display="block";
        document.getElementById('as').disabled = true;
        var cold = document.getElementById("cold1").checked
        var cough = document.getElementById("cough1").checked
        var fatigue = document.getElementById("fat1").checked
        var diarrhea = document.getElementById("diar1").checked
        var bleeding = document.getElementById("bleed1").checked
        var headache = document.getElementById("head1").checked
        var musclepain = document.getElementById("mp1").checked
        var vomiting = document.getElementById("vom1").checked
        var hardbreathing = document.getElementById("hb1").checked
        var abdominalpain = document.getElementById("ap1").checked
        var massgathering = document.getElementById("mg1").checked
        var casecontact = document.getElementById("cc1").checked
        var fever = document.getElementById("fev1").checked
        return this.props.symptomesAdd(cold, cough, fatigue, diarrhea, bleeding, headache, musclepain, vomiting, hardbreathing, abdominalpain, massgathering, casecontact, fever ? 38 : 36)
    }
    displayPlace(){
        document.getElementById('pl').style.display = "block";
        document.getElementById('adt').disabled = true;
        document.getElementById('skip').disabled = true;
        this.setState({places: window.localStorage.getItem('places')});
    }

    submitAppointment(){
        console.log(window.localStorage.getItem('sympId'), window.localStorage.getItem('travelId'));
        this.props.history.push("/pay");
        return this.props.addRdv("/api/symptomes/" + window.localStorage.getItem('sympId'), "/api/travel/" + window.localStorage.getItem('travelId'), "/api/places/416")
    }

    render(){
        var places = window.localStorage.getItem('places').split(",");
        const {handleSubmit, addRdv, history} = this.props;

        if (!canWriteAppointment(this.props.userData)) {
            return <Redirect to="/login"/>
        }
        return (
            <div class="text-center m-3">
                <form onSubmit={handleSubmit(this.onSymptomesSubmit.bind(this))}>
                <div class="card">
                    <div class="card-body text-center">
                        <p class="font-weight-bold">Let's Start With Your Symptomes</p>
                        <img src={require('./images/symp.jpg')} />
                        <div class="container">
                            <div class="row">
                                <div class="col-sm text-center">
                                Feeling Cold: &nbsp;
                                    <div class="custom-control custom-radio custom-control-inline">
                                        <input type="radio" id="cold1" name="cold1" class="custom-control-input"/>
                                        <label class="custom-control-label" for="cold1">Yes</label>
                                    </div>
                                    <div class="custom-control custom-radio custom-control-inline">
                                        <input type="radio" id="cold2" name="cold1" class="custom-control-input"/>
                                        <label class="custom-control-label" for="cold2">No</label>
                                    </div>
                                </div>
                                <div class="col-sm">
                                Intense Cough: &nbsp;
                                    <div class="custom-control custom-radio custom-control-inline">
                                        <input type="radio" id="cough1" name="cough1" class="custom-control-input" />
                                        <label class="custom-control-label" for="cough1">Yes</label>
                                    </div>
                                    <div class="custom-control custom-radio custom-control-inline">
                                        <input type="radio" id="cough2" name="cough1" class="custom-control-input"/>
                                        <label class="custom-control-label" for="cough2">No</label>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm">
                                Intense Fatigue: &nbsp;
                                    <div class="custom-control custom-radio custom-control-inline">
                                        <input type="radio" id="fat1" name="fat1" class="custom-control-input"/>
                                        <label class="custom-control-label" for="fat1">Yes</label>
                                    </div>
                                    <div class="custom-control custom-radio custom-control-inline">
                                        <input type="radio" id="fat2" name="fat1" class="custom-control-input"/>
                                        <label class="custom-control-label" for="fat2">No</label>
                                    </div>
                                </div>
                                <div class="col-sm">
                                Having Diarrhea: &nbsp;
                                    <div class="custom-control custom-radio custom-control-inline">
                                        <input type="radio" id="diar1" name="diar1" class="custom-control-input"/>
                                        <label class="custom-control-label" for="diar1">Yes</label>
                                    </div>
                                    <div class="custom-control custom-radio custom-control-inline">
                                        <input type="radio" id="diar2" name="diar1" class="custom-control-input"/>
                                        <label class="custom-control-label" for="diar2">No</label>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm">
                                Having Bleeding: &nbsp;
                                    <div class="custom-control custom-radio custom-control-inline">
                                        <input type="radio" id="bleed1" name="bleed1" class="custom-control-input"/>
                                        <label class="custom-control-label" for="bleed1">Yes</label>
                                    </div>
                                    <div class="custom-control custom-radio custom-control-inline">
                                        <input type="radio" id="bleed2" name="bleed1" class="custom-control-input"/>
                                        <label class="custom-control-label" for="bleed2">No</label>
                                    </div>
                                </div>
                                <div class="col-sm">
                                Having Headache: &nbsp;
                                    <div class="custom-control custom-radio custom-control-inline">
                                        <input type="radio" id="head1" name="head1" class="custom-control-input"/>
                                        <label class="custom-control-label" for="head1">Yes</label>
                                    </div>
                                    <div class="custom-control custom-radio custom-control-inline">
                                        <input type="radio" id="head2" name="head1" class="custom-control-input"/>
                                        <label class="custom-control-label" for="head2">No</label>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm">
                                Muscle Pain: &nbsp;
                                    <div class="custom-control custom-radio custom-control-inline">
                                        <input type="radio" id="mp1" name="mp1" class="custom-control-input"/>
                                        <label class="custom-control-label" for="mp1">Yes</label>
                                    </div>
                                    <div class="custom-control custom-radio custom-control-inline">
                                        <input type="radio" id="mp2" name="mp1" class="custom-control-input"/>
                                        <label class="custom-control-label" for="mp2">No</label>
                                    </div>
                                </div>
                                <div class="col-sm">
                                Intense Vomiting: &nbsp;
                                    <div class="custom-control custom-radio custom-control-inline">
                                        <input type="radio" id="vom1" name="vom1" class="custom-control-input"/>
                                        <label class="custom-control-label" for="vom1">Yes</label>
                                    </div>
                                    <div class="custom-control custom-radio custom-control-inline">
                                        <input type="radio" id="vom2" name="vom1" class="custom-control-input"/>
                                        <label class="custom-control-label" for="vom2">No</label>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm">
                                Hard Breathing: &nbsp;
                                    <div class="custom-control custom-radio custom-control-inline">
                                        <input type="radio" id="hb1" name="hb1" class="custom-control-input"/>
                                        <label class="custom-control-label" for="hb1">Yes</label>
                                    </div>
                                    <div class="custom-control custom-radio custom-control-inline">
                                        <input type="radio" id="hb2" name="hb1" class="custom-control-input"/>
                                        <label class="custom-control-label" for="hb2">No</label>
                                    </div>
                                </div>
                                <div class="col-sm">
                                Abdominal Pain: &nbsp;
                                    <div class="custom-control custom-radio custom-control-inline">
                                        <input type="radio" id="ap1" name="ap1" class="custom-control-input"/>
                                        <label class="custom-control-label" for="ap1">Yes</label>
                                    </div>
                                    <div class="custom-control custom-radio custom-control-inline">
                                        <input type="radio" id="ap2" name="ap1" class="custom-control-input"/>
                                        <label class="custom-control-label" for="ap2">No</label>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm">
                                Mass Gathering: &nbsp;
                                    <div class="custom-control custom-radio custom-control-inline">
                                        <input type="radio" id="mg1" name="mg1" class="custom-control-input"/>
                                        <label class="custom-control-label" for="mg1">Yes</label>
                                    </div>
                                    <div class="custom-control custom-radio custom-control-inline">
                                        <input type="radio" id="mg2" name="mg1" class="custom-control-input"/>
                                        <label class="custom-control-label" for="mg2">No</label>
                                    </div>
                                </div>
                                <div class="col-sm">
                                Covid contact: &nbsp;
                                    <div class="custom-control custom-radio custom-control-inline">
                                        <input type="radio" id="cc1" name="cc1" class="custom-control-input"/>
                                        <label class="custom-control-label" for="cc1">Yes</label>
                                    </div>
                                    <div class="custom-control custom-radio custom-control-inline">
                                        <input type="radio" id="cc2" name="cc1" class="custom-control-input"/>
                                        <label class="custom-control-label" for="cc2">No</label>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm">
                                Do You Have Any Fever Above 38°C: &nbsp;
                                    <div class="custom-control custom-radio custom-control-inline">
                                        <input type="radio" id="fev1" name="fev1" class="custom-control-input"/>
                                        <label class="custom-control-label" for="fev1">Yes</label>
                                    </div>
                                    <div class="custom-control custom-radio custom-control-inline">
                                        <input type="radio" id="fev2" name="fev1" class="custom-control-input"/>
                                        <label class="custom-control-label" for="fev2">No</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="submit" id="as" class="btn btn-primary m-3">Add Symptomes</button>
                    </div>
                </div>
                </form>
                <form onSubmit={handleSubmit(this.onTravelSubmit.bind(this))}> 
                <div id="tr" class="card" style={{display: 'none' }}>
                    <div class="card-body text-center">
                        <p class="font-weight-bold">Information About Your Travel</p>
                        <img src={require('./images/travel.PNG')} />
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <Field name="flydate" label="Fligh Date" type="date" component={renderField} />
                            </div>
                            <div class="form-group col-md-6">
                                <label>Destination</label>
                                <select id="inputState" class="form-control" value={this.state.country} onChange={this.handleCountryChange} >
                                <option value="Afghanistan">Afghanistan</option> 
                                <option value="Albania">Albania</option> 
                                <option value="Algeria">Algeria</option> 
                                <option value="American Samoa">American Samoa</option> 
                                <option value="Andorra">Andorra</option> 
                                <option value="Angola">Angola</option> 
                                <option value="Anguilla">Anguilla</option> 
                                <option value="Antarctica">Antarctica</option> 
                                <option value="Antigua and Barbuda">Antigua and Barbuda</option> 
                                <option value="Argentina">Argentina</option> 
                                <option value="Armenia">Armenia</option> 
                                <option value="Aruba">Aruba</option> 
                                <option value="Australia">Australia</option> 
                                <option value="Austria">Austria</option> 
                                <option value="Azerbaijan">Azerbaijan</option> 
                                <option value="Bahamas">Bahamas</option> 
                                <option value="Bahrain">Bahrain</option> 
                                <option value="Bangladesh">Bangladesh</option> 
                                <option value="Barbados">Barbados</option> 
                                <option value="Belarus">Belarus</option> 
                                <option value="Belgium">Belgium</option> 
                                <option value="Belize">Belize</option> 
                                <option value="Benin">Benin</option> 
                                <option value="Bermuda">Bermuda</option> 
                                <option value="Bhutan">Bhutan</option> 
                                <option value="Bolivia">Bolivia</option> 
                                <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option> 
                                <option value="Botswana">Botswana</option> 
                                <option value="Bouvet Island">Bouvet Island</option> 
                                <option value="Brazil">Brazil</option> 
                                <option value="British Indian Ocean Territory">British Indian Ocean Territory</option> 
                                <option value="Brunei Darussalam">Brunei Darussalam</option> 
                                <option value="Bulgaria">Bulgaria</option> 
                                <option value="Burkina Faso">Burkina Faso</option> 
                                <option value="Burundi">Burundi</option> 
                                <option value="Cambodia">Cambodia</option> 
                                <option value="Cameroon">Cameroon</option> 
                                <option value="Canada">Canada</option> 
                                <option value="Cape Verde">Cape Verde</option> 
                                <option value="Cayman Islands">Cayman Islands</option> 
                                <option value="Central African Republic">Central African Republic</option> 
                                <option value="Chad">Chad</option> 
                                <option value="Chile">Chile</option> 
                                <option value="China">China</option> 
                                <option value="Christmas Island">Christmas Island</option> 
                                <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option> 
                                <option value="Colombia">Colombia</option> 
                                <option value="Comoros">Comoros</option> 
                                <option value="Congo">Congo</option> 
                                <option value="Congo, The Democratic Republic of The">Congo, The Democratic Republic of The</option> 
                                <option value="Cook Islands">Cook Islands</option> 
                                <option value="Costa Rica">Costa Rica</option> 
                                <option value="Cote D'ivoire">Cote D'ivoire</option> 
                                <option value="Croatia">Croatia</option> 
                                <option value="Cuba">Cuba</option> 
                                <option value="Cyprus">Cyprus</option> 
                                <option value="Czech Republic">Czech Republic</option> 
                                <option value="Denmark">Denmark</option> 
                                <option value="Djibouti">Djibouti</option> 
                                <option value="Dominica">Dominica</option> 
                                <option value="Dominican Republic">Dominican Republic</option> 
                                <option value="Ecuador">Ecuador</option> 
                                <option value="Egypt">Egypt</option> 
                                <option value="El Salvador">El Salvador</option> 
                                <option value="Equatorial Guinea">Equatorial Guinea</option> 
                                <option value="Eritrea">Eritrea</option> 
                                <option value="Estonia">Estonia</option> 
                                <option value="Ethiopia">Ethiopia</option> 
                                <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option> 
                                <option value="Faroe Islands">Faroe Islands</option> 
                                <option value="Fiji">Fiji</option> 
                                <option value="Finland">Finland</option> 
                                <option value="France">France</option> 
                                <option value="French Guiana">French Guiana</option> 
                                <option value="French Polynesia">French Polynesia</option> 
                                <option value="French Southern Territories">French Southern Territories</option> 
                                <option value="Gabon">Gabon</option> 
                                <option value="Gambia">Gambia</option> 
                                <option value="Georgia">Georgia</option> 
                                <option value="Germany">Germany</option> 
                                <option value="Ghana">Ghana</option> 
                                <option value="Gibraltar">Gibraltar</option> 
                                <option value="Greece">Greece</option> 
                                <option value="Greenland">Greenland</option> 
                                <option value="Grenada">Grenada</option> 
                                <option value="Guadeloupe">Guadeloupe</option> 
                                <option value="Guam">Guam</option> 
                                <option value="Guatemala">Guatemala</option> 
                                <option value="Guinea">Guinea</option> 
                                <option value="Guinea-bissau">Guinea-bissau</option> 
                                <option value="Guyana">Guyana</option> 
                                <option value="Haiti">Haiti</option> 
                                <option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option> 
                                <option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option> 
                                <option value="Honduras">Honduras</option> 
                                <option value="Hong Kong">Hong Kong</option> 
                                <option value="Hungary">Hungary</option> 
                                <option value="Iceland">Iceland</option> 
                                <option value="India">India</option> 
                                <option value="Indonesia">Indonesia</option> 
                                <option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option> 
                                <option value="Iraq">Iraq</option> 
                                <option value="Ireland">Ireland</option> 
                                <option value="Israel">Israel</option> 
                                <option value="Italy">Italy</option> 
                                <option value="Jamaica">Jamaica</option> 
                                <option value="Japan">Japan</option> 
                                <option value="Jordan">Jordan</option> 
                                <option value="Kazakhstan">Kazakhstan</option> 
                                <option value="Kenya">Kenya</option> 
                                <option value="Kiribati">Kiribati</option> 
                                <option value="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</option> 
                                <option value="Korea, Republic of">Korea, Republic of</option> 
                                <option value="Kuwait">Kuwait</option> 
                                <option value="Kyrgyzstan">Kyrgyzstan</option> 
                                <option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option> 
                                <option value="Latvia">Latvia</option> 
                                <option value="Lebanon">Lebanon</option> 
                                <option value="Lesotho">Lesotho</option> 
                                <option value="Liberia">Liberia</option> 
                                <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option> 
                                <option value="Liechtenstein">Liechtenstein</option> 
                                <option value="Lithuania">Lithuania</option> 
                                <option value="Luxembourg">Luxembourg</option> 
                                <option value="Macao">Macao</option> 
                                <option value="North Macedonia">North Macedonia</option> 
                                <option value="Madagascar">Madagascar</option> 
                                <option value="Malawi">Malawi</option> 
                                <option value="Malaysia">Malaysia</option> 
                                <option value="Maldives">Maldives</option> 
                                <option value="Mali">Mali</option> 
                                <option value="Malta">Malta</option> 
                                <option value="Marshall Islands">Marshall Islands</option> 
                                <option value="Martinique">Martinique</option> 
                                <option value="Mauritania">Mauritania</option> 
                                <option value="Mauritius">Mauritius</option> 
                                <option value="Mayotte">Mayotte</option> 
                                <option value="Mexico">Mexico</option> 
                                <option value="Micronesia, Federated States of">Micronesia, Federated States of</option> 
                                <option value="Moldova, Republic of">Moldova, Republic of</option> 
                                <option value="Monaco">Monaco</option> 
                                <option value="Mongolia">Mongolia</option> 
                                <option value="Montserrat">Montserrat</option> 
                                <option value="Morocco">Morocco</option> 
                                <option value="Mozambique">Mozambique</option> 
                                <option value="Myanmar">Myanmar</option> 
                                <option value="Namibia">Namibia</option> 
                                <option value="Nauru">Nauru</option> 
                                <option value="Nepal">Nepal</option> 
                                <option value="Netherlands">Netherlands</option> 
                                <option value="Netherlands Antilles">Netherlands Antilles</option> 
                                <option value="New Caledonia">New Caledonia</option> 
                                <option value="New Zealand">New Zealand</option> 
                                <option value="Nicaragua">Nicaragua</option> 
                                <option value="Niger">Niger</option> 
                                <option value="Nigeria">Nigeria</option> 
                                <option value="Niue">Niue</option> 
                                <option value="Norfolk Island">Norfolk Island</option> 
                                <option value="Northern Mariana Islands">Northern Mariana Islands</option> 
                                <option value="Norway">Norway</option> 
                                <option value="Oman">Oman</option> 
                                <option value="Pakistan">Pakistan</option> 
                                <option value="Palau">Palau</option> 
                                <option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option> 
                                <option value="Panama">Panama</option> 
                                <option value="Papua New Guinea">Papua New Guinea</option> 
                                <option value="Paraguay">Paraguay</option> 
                                <option value="Peru">Peru</option> 
                                <option value="Philippines">Philippines</option> 
                                <option value="Pitcairn">Pitcairn</option> 
                                <option value="Poland">Poland</option> 
                                <option value="Portugal">Portugal</option> 
                                <option value="Puerto Rico">Puerto Rico</option> 
                                <option value="Qatar">Qatar</option> 
                                <option value="Reunion">Reunion</option> 
                                <option value="Romania">Romania</option> 
                                <option value="Russian Federation">Russian Federation</option> 
                                <option value="Rwanda">Rwanda</option> 
                                <option value="Saint Helena">Saint Helena</option> 
                                <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option> 
                                <option value="Saint Lucia">Saint Lucia</option> 
                                <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option> 
                                <option value="Saint Vincent and The Grenadines">Saint Vincent and The Grenadines</option> 
                                <option value="Samoa">Samoa</option> 
                                <option value="San Marino">San Marino</option> 
                                <option value="Sao Tome and Principe">Sao Tome and Principe</option> 
                                <option value="Saudi Arabia">Saudi Arabia</option> 
                                <option value="Senegal">Senegal</option> 
                                <option value="Serbia and Montenegro">Serbia and Montenegro</option> 
                                <option value="Seychelles">Seychelles</option> 
                                <option value="Sierra Leone">Sierra Leone</option> 
                                <option value="Singapore">Singapore</option> 
                                <option value="Slovakia">Slovakia</option> 
                                <option value="Slovenia">Slovenia</option> 
                                <option value="Solomon Islands">Solomon Islands</option> 
                                <option value="Somalia">Somalia</option> 
                                <option value="South Africa">South Africa</option> 
                                <option value="South Georgia and The South Sandwich Islands">South Georgia and The South Sandwich Islands</option> 
                                <option value="Spain">Spain</option> 
                                <option value="Sri Lanka">Sri Lanka</option> 
                                <option value="Sudan">Sudan</option> 
                                <option value="Suriname">Suriname</option> 
                                <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option> 
                                <option value="Swaziland">Swaziland</option> 
                                <option value="Sweden">Sweden</option> 
                                <option value="Switzerland">Switzerland</option> 
                                <option value="Syrian Arab Republic">Syrian Arab Republic</option> 
                                <option value="Taiwan, Province of China">Taiwan, Province of China</option> 
                                <option value="Tajikistan">Tajikistan</option> 
                                <option value="Tanzania, United Republic of">Tanzania, United Republic of</option> 
                                <option value="Thailand">Thailand</option> 
                                <option value="Timor-leste">Timor-leste</option> 
                                <option value="Togo">Togo</option> 
                                <option value="Tokelau">Tokelau</option> 
                                <option value="Tonga">Tonga</option> 
                                <option value="Trinidad and Tobago">Trinidad and Tobago</option> 
                                <option value="Tunisia">Tunisia</option> 
                                <option value="Turkey">Turkey</option> 
                                <option value="Turkmenistan">Turkmenistan</option> 
                                <option value="Turks and Caicos Islands">Turks and Caicos Islands</option> 
                                <option value="Tuvalu">Tuvalu</option> 
                                <option value="Uganda">Uganda</option> 
                                <option value="Ukraine">Ukraine</option> 
                                <option value="United Arab Emirates">United Arab Emirates</option> 
                                <option value="United Kingdom">United Kingdom</option> 
                                <option value="United States">United States</option> 
                                <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option> 
                                <option value="Uruguay">Uruguay</option> 
                                <option value="Uzbekistan">Uzbekistan</option> 
                                <option value="Vanuatu">Vanuatu</option> 
                                <option value="Venezuela">Venezuela</option> 
                                <option value="Viet Nam">Viet Nam</option> 
                                <option value="Virgin Islands, British">Virgin Islands, British</option> 
                                <option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option> 
                                <option value="Wallis and Futuna">Wallis and Futuna</option> 
                                <option value="Western Sahara">Western Sahara</option> 
                                <option value="Yemen">Yemen</option> 
                                <option value="Zambia">Zambia</option> 
                                <option value="Zimbabwe">Zimbabwe</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <button type="submit" id="adt" class="btn btn-primary m-3">Add Travel Details</button>
                    <button type="button" id="skip" onClick={this.displayPlace} class="btn btn-primary m-3">Skip</button>

                </div>
                </form>
                
                <div id="pl" style={{display: 'none' }}>
                    <div class="card">
                        <div class="card-body text-center">
                            <p class="font-weight-bold">Information About Date And Place</p>
                            <img src={require('./images/place.PNG')} />
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label>Hospitals</label>
                                    <select className="form-control" onChange={this.handlePlaceChange}>
                                    {places.map(function(place){
                                            return (<option > {place}</option>);
                                    })}
                                    </select>
                                </div>
                                <div class="form-group col-md-6">
                                    <label>Times</label>
                                    <select value="select time" value={this.state.time} className="form-control" onChange={this.handleTimeChange}>
                                        <option value="time1">13:09:00 2021-05-24</option>
                                        <option value="time2">23:11:00 2021-12-31</option>
                                        <option value="time3">04:04:00 2021-09-23</option>
                                        <option value="time4">18:05:00 2021-10-05</option>
                                    </select>
                                </div>
                            </div>
                            <button type="button" onClick={ () => this.submitAppointment() } class="btn btn-primary">Add New Appointment</button>
                        </div>
                    </div>
                </div>
                <div class="w-25 h-100 p-3">
                </div>
            </div>
        );
    }
}

export default reduxForm({
  form: 'AppointmentForm'
})(connect(mapStateToProps, mapDispatchToProps)(AppointmentForm))