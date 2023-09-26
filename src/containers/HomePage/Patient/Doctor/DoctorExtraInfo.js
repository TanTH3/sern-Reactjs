import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../../../HomePage/HomeHeader';
import moment from 'moment';
import localization from 'moment/locale/vi';
import './DoctorExtraInfo.scss';
import { getExtraInfoDoctorByIdService } from '../../../../services/userService';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../../utils';
import NumberFormat from 'react-number-format';

class DoctorExtraInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetail: false,
            extraInfo: {},
        };
    }

    async componentDidMount() {
        if (this.props.doctorIdFromParent) {
            let res = await getExtraInfoDoctorByIdService(this.props.doctorIdFromParent);
            if (res && res.data.errCode === 0) {
                this.setState({
                    extraInfo: res.data.data,
                });
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            console.log(this.props.doctorIdFromParent);
            let res = await getExtraInfoDoctorByIdService(this.props.doctorIdFromParent);
            console.log(res);
            if (res && res.data.errCode === 0) {
                this.setState({
                    extraInfo: res.data.data,
                });
            }
        }
    }

    handleShowHideDetail = (status) => {
        this.setState({
            isShowDetail: status,
        });
    };

    render() {
        let { isShowDetail, extraInfo } = this.state;
        let { language } = this.props;
        return (
            <div className="doctor-extra-info-container">
                <div className="content-up">
                    <div className="text-address">
                        <FormattedMessage id="patient.extra-info-doctor.text-address" />
                    </div>
                    <div className="name-clinic">
                        {extraInfo && extraInfo.nameClinic ? extraInfo.nameClinic : ''}
                    </div>
                    <div className="detail-address">
                        {extraInfo && extraInfo.addressClinic ? extraInfo.addressClinic : ''}
                    </div>
                </div>
                <div className="content-down">
                    {isShowDetail === false && (
                        <div className="show-info">
                            <FormattedMessage id="patient.extra-info-doctor.price" />
                            {extraInfo && extraInfo.priceTypeData && language === LANGUAGES.VI && (
                                <NumberFormat
                                    className="currency"
                                    value={extraInfo.priceTypeData.valueVi}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'VNĐ'}
                                />
                            )}
                            {extraInfo && extraInfo.priceTypeData && language === LANGUAGES.EN && (
                                <NumberFormat
                                    className="currency"
                                    value={extraInfo.priceTypeData.valueEn}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'$'}
                                />
                            )}
                            <span
                                className="detail"
                                onClick={() => this.handleShowHideDetail(true)}
                            >
                                <FormattedMessage id="patient.extra-info-doctor.detail" />
                            </span>
                        </div>
                    )}
                    {isShowDetail === true && (
                        <>
                            <div className="title-price">
                                <FormattedMessage id="patient.extra-info-doctor.price" />
                            </div>
                            <div className="detail-info">
                                <div className="price">
                                    <span className="left">
                                        <FormattedMessage id="patient.extra-info-doctor.price" />
                                    </span>
                                    <span className="right">
                                        {extraInfo &&
                                            extraInfo.priceTypeData &&
                                            language === LANGUAGES.VI && (
                                                <NumberFormat
                                                    className="currency"
                                                    value={extraInfo.priceTypeData.valueVi}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix={'VNĐ'}
                                                />
                                            )}
                                        {extraInfo &&
                                            extraInfo.priceTypeData &&
                                            language === LANGUAGES.EN && (
                                                <NumberFormat
                                                    className="currency"
                                                    value={extraInfo.priceTypeData.valueEn}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix={'$'}
                                                />
                                            )}
                                    </span>
                                </div>
                                <div className="note">
                                    {extraInfo && extraInfo.note ? extraInfo.note : ''}
                                </div>
                            </div>
                            <div className="payment">
                                <FormattedMessage id="patient.extra-info-doctor.payment" />
                                {extraInfo && extraInfo.priceTypeData && language === LANGUAGES.VI
                                    ? extraInfo.paymentTypeData.valueVi
                                    : ''}
                                {extraInfo && extraInfo.priceTypeData && language === LANGUAGES.EN
                                    ? extraInfo.paymentTypeData.valueEn
                                    : ''}
                            </div>
                            <div className="hide-price">
                                <span onClick={() => this.handleShowHideDetail(false)}>
                                    <FormattedMessage id="patient.extra-info-doctor.hide-price" />
                                </span>
                            </div>
                        </>
                    )}
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
        // changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
