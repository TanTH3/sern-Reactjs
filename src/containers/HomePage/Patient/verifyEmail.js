import React, { Component } from 'react';
import { connect } from 'react-redux';

import './verifyEmail.scss';
import HomeHeader from '../HomeHeader';
import { postVerifyBookAppointment } from '../../../services/userService';

class verifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            errCode: 0,
        };
    }

    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');
            let res = await postVerifyBookAppointment({
                token,
                doctorId,
            });

            if (res && res.data.errCode === 0) {
                this.setState({
                    statusVerify: true,
                });
            } else {
                this.setState({
                    statusVerify: true,
                    errCode: res && res.data.errCode ? res.data.errCode : -1,
                });
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }

    render() {
        let { statusVerify, errCode } = this.state;
        let { language } = this.props;
        return (
            <>
                <HomeHeader />
                <div className="verify-email-container">
                    {statusVerify === false ? (
                        <div>Loading data ...</div>
                    ) : (
                        <div>
                            {+errCode === 0 ? (
                                <div className="info-booking">Xác nhận lịch hẹn thành công</div>
                            ) : (
                                <div className="info-booking">
                                    Lịch hẹn không tồn tại hoặc đã được xác nhận
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </>
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
        // changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(verifyEmail);
