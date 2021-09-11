import React from 'react';

var histo = {}

export default class WelcomeContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {history} = this.props;
        histo = history;
    }

    componentWillUnmount() {
    }
    
    onPatientClick(){
        console.log("direction patient");
        histo.push("/")
    }

    onTesterClick(){
        console.log("direction tester");
        histo.push("/tester")
    }
    render() {
        return (
            <main role="main">
                <section class="jumbotron text-center">
                    <div class="container">
                    <h1 class="jumbotron-heading">All Your Tests In One Place</h1>
                    <p class="lead text-muted">The Number One Covid-19 Testing Platform, Just Make An Account Type Your Symptomes And Get Yourself An Appointment Either For Flight Or Regular Covid Diagnostic Test.</p>
                    <p>
                        <button onClick={this.onPatientClick} type="button" class="btn btn-lg btn-outline-secondary">You Are A Patient</button>
                        <button onClick={this.onTesterClick} type="button" class="btn btn-lg btn-outline-secondary">You Are A Tester</button>
                    </p>
                    </div>
                </section>

                <div class="album py-5 bg-light">
                    <div class="container">
                    <div class="row">
                        <div class="col-md-4">
                        <div class="card mb-4 box-shadow">
                            <img src={require('./images/test.jpg')} class="img-responsive"/>
                            <div class="card-body">
                            <p class="card-text">Tests are available that can test for current infection or past infection. A viral test tells you if you have a current infection.</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                </div>
                                <small class="text-muted">regular tests</small>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div class="col-md-4">
                        <div class="card mb-4 box-shadow">
                            <img src={require('./images/plane.jpg')} class="img-responsive"/>
                            <div class="card-body">
                            <p class="card-text">We provide air passengers traveling from a foreign country to get tested no more than 3 days before their flight departs</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                </div>
                                <small class="text-muted">tests for flights</small>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div class="col-md-4">
                        <div class="card mb-4 box-shadow">
                            <img src={require('./images/pass.jpg')} class="img-responsive"/>
                            <div class="card-body">
                            <p class="card-text">Certificate is for vaccinated against Covid-19, recently had a negative PCR test or recently recovered from Covid-19</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                </div>
                                <small class="text-muted">sanitary passport</small>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </main>
        );
    }
}