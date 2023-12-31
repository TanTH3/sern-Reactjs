import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux';
import { ToastContainer } from 'react-toastify';
import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';
import { path } from '../utils';
import Home from '../routes/Home';
import Login from './Auth/Login';
import System from '../routes/System';
import HomePage from './HomePage/HomePage.js';
import ProfileDoctor from './HomePage/Patient/Doctor/ProfileDoctor';
import CustomScrollbars from '../components/CustomScrollbars';
import Doctor from '../routes/Doctor';
import VerifyEmail from './HomePage/Patient/verifyEmail';
import DetailSpecialty from './HomePage/Patient/Specialty/DetailSpecialty';
import DetailClinic from './HomePage/Patient/Clinic/DetailClinic';
import AllDoctor from './HomePage/Patient/Doctor/AllDoctor';
import AllClinic from './HomePage/Patient/Clinic/AllClinic';
import AllSpecialty from './HomePage/Patient/Specialty/AllSpecialty';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyCRxi99ewvJXJ4P0UMR8zkXXahxLIX3vOI',
    authDomain: 'tanth-bookingcare.firebaseapp.com',
    projectId: 'tanth-bookingcare',
    storageBucket: 'tanth-bookingcare.appspot.com',
    messagingSenderId: '394018197952',
    appId: '1:394018197952:web:e8e0806c6fbd455d36f825',
    measurementId: 'G-5JCRBTDVNL',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

class App extends Component {
    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">
                        <div className="content-container">
                            <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                                <Switch>
                                    <Route path={path.HOME} exact component={Home} />
                                    <Route
                                        path={path.LOGIN}
                                        component={userIsNotAuthenticated(Login)}
                                    />
                                    <Route
                                        path={path.SYSTEM}
                                        component={userIsAuthenticated(System)}
                                    />
                                    <Route
                                        path={path.DOCTOR}
                                        component={userIsAuthenticated(Doctor)}
                                    />

                                    <Route path={path.HOMEPAGE} component={HomePage} />
                                    <Route path={path.PROFILE_DOCTOR} component={ProfileDoctor} />
                                    <Route
                                        path={path.DETAIL_SPECIALTY}
                                        component={DetailSpecialty}
                                    />
                                    <Route path={path.DETAIL_CLINIC} component={DetailClinic} />
                                    <Route path={path.ALL_DOCTOR} component={AllDoctor} />
                                    <Route path={path.ALL_CLINIC} component={AllClinic} />
                                    <Route path={path.ALL_SPECIALTY} component={AllSpecialty} />
                                    <Route
                                        path={path.VERIFY_EMAIL_BOOKING}
                                        component={VerifyEmail}
                                    />
                                </Switch>
                            </CustomScrollbars>
                        </div>

                        <ToastContainer
                            position="top-right"
                            autoClose={4000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        />
                    </div>
                </Router>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
