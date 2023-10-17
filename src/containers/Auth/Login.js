import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { handleLoginApi } from '../../services/userService';

import * as actions from '../../store/actions';
import './Login.scss';
// import { FormattedMessage } from 'react-intl';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: '',
        };
    }
    handleOnchangeUsername = (e) => {
        this.setState({
            username: e.target.value,
        });
    };
    handleOnchangePassword = (e) => {
        this.setState({
            password: e.target.value,
        });
    };
    handleLogin = async () => {
        this.setState({
            errMessage: '',
        });
        try {
            let data = await handleLoginApi(this.state.username, this.state.password);
            if (data && data.data.errCode !== 0) {
                this.setState({
                    errMessage: data.data.message,
                });
            }
            if (data && data.data.errCode === 0) {
                this.props.userLoginSuccessRedux(data.data.user);
            }
        } catch (e) {
            if (e.response) {
                if (e.response.data) {
                    this.setState({
                        errMessage: e.response.data.message,
                    });
                }
            }
        }
    };

    handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.keyCode === 13) {
            this.handleLogin();
        }
    };
    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword,
        });
    };

    render() {
        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 login-text">Login</div>
                        <div className="col-12 form-group login-input">
                            <label>Username:</label>
                            <input
                                onChange={(e) => this.handleOnchangeUsername(e)}
                                value={this.state.username}
                                type="text"
                                className="form-control"
                                placeholder="Enter your name"
                            />
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>Password:</label>
                            <div className="custom-password">
                                <input
                                    type={this.state.isShowPassword ? 'text' : 'password'}
                                    className="form-control"
                                    placeholder="Enter your password"
                                    onChange={(e) => this.handleOnchangePassword(e)}
                                    onKeyDown={(e) => this.handleKeyDown(e)}
                                />
                                <div
                                    className="show-hide-pass"
                                    onClick={() => this.handleShowHidePassword()}
                                >
                                    {this.state.isShowPassword ? (
                                        <i className="far fa-eye-slash"></i>
                                    ) : (
                                        <i className="far fa-eye"></i>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="col-12" style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className="col-12 ">
                            <button
                                className="login-btn"
                                onClick={() => {
                                    this.handleLogin();
                                }}
                            >
                                Login
                            </button>
                        </div>
                        <div className="col-12">
                            <span className="forgot-password">Forgot your password</span>
                        </div>
                        <div className="col-12 text-center mt-3">
                            <span>Or login with:</span>
                        </div>
                        <div className="col-12 login-social">
                            <i className="fab fa-google-plus icon-google"></i>
                            <i className="fab fa-facebook icon-facebook"></i>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccessRedux: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
