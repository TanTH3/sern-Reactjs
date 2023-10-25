import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';
import './DoctorInfoBooking.scss';
import { getProfileDoctorById } from '../../../../services/userService';
import { LANGUAGES } from '../../../../utils';
import _ from 'lodash';
import { Link } from 'react-router-dom';

class DoctorInfoBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {},
        };
    }

    async componentDidMount() {
        let data = await this.getInfoDoctor(this.props.doctorId);
        this.setState({
            dataProfile: data,
        });
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.doctorId !== prevProps.doctorId) {
            let data = await this.getInfoDoctor(this.props.doctorId);
            this.setState({
                dataProfile: data,
            });
        }
    }

    getInfoDoctor = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileDoctorById(id);
            if (res && res.data.errCode === 0) {
                result = res.data.data;
            }
        }
        return result;
    };

    renderTimeBooking = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ? dataTime.valueVi : dataTime.valueEn;

            let date =
                language === LANGUAGES.VI
                    ? moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
                    : moment
                          .unix(+dataTime.date / 1000)
                          .locale('en')
                          .format('ddd - DD/MM/YYY');
            return (
                <>
                    <div>
                        {time} - {date}
                    </div>
                    <div>
                        <FormattedMessage id="patient.booking-modal.priceBooking" />
                    </div>
                </>
            );
        }
    };

    render() {
        let { dataProfile } = this.state;
        let { language, isShowDescription, dataTime, isShowPrice, isShowLinkDetail, doctorId } =
            this.props;
        let nameVi = '',
            nameEn = '';
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`;
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
        }
        return (
            <div className="profile-doctor-container">
                <div className="intro-doctor">
                    <div
                        className="content-left"
                        style={{
                            backgroundImage: `url(${
                                dataProfile && dataProfile.image ? dataProfile.image : ''
                            })`,
                        }}
                    ></div>
                    <div className="content-right">
                        <Link to={`/profile-doctor/${doctorId}`} className="up">
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                        </Link>
                        <div className="down">
                            {isShowDescription === true ? (
                                <>
                                    {dataProfile &&
                                        dataProfile.Markdown &&
                                        dataProfile.Markdown.description && (
                                            <span>{dataProfile.Markdown.description}</span>
                                        )}
                                </>
                            ) : (
                                <>{this.renderTimeBooking(dataTime)}</>
                            )}
                        </div>
                    </div>
                </div>
                {isShowLinkDetail === true && (
                    <div className="view-detail-doctor">
                        <Link to={`/profile-doctor/${doctorId}`}>Xem thêm</Link>
                    </div>
                )}
                {isShowPrice && (
                    <div className="price">
                        <FormattedMessage id="patient.booking-modal.price" />

                        {dataProfile && dataProfile.Doctor_Info && language === LANGUAGES.VI && (
                            <NumberFormat
                                className="currency"
                                value={dataProfile.Doctor_Info.priceTypeData.valueVi}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'VNĐ'}
                            />
                        )}
                        {dataProfile && dataProfile.Doctor_Info && language === LANGUAGES.EN && (
                            <NumberFormat
                                className="currency"
                                value={dataProfile.Doctor_Info.priceTypeData.valueEn}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'$'}
                            />
                        )}
                    </div>
                )}
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
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorInfoBooking);
