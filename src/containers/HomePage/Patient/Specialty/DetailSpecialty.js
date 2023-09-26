import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';
import HomeHeader from '../../HomeHeader';
import './DetailSpecialty.scss';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import DoctorInfoBooking from '../Doctor/DoctorInfoBooking';
import { getDetailSpecialtyById, getAllCodeService } from '../../../../services/userService';
import _ from 'lodash';
import { LANGUAGES } from '../../../../utils';

class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailSpecialty: {},
            listProvince: [],
        };
    }

    async componentDidMount() {
        if (this.props.match && this.props.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetailSpecialtyById({
                id,
                location: 'ALL',
            });

            let resProvince = await getAllCodeService('PROVINCE');

            if (res && res.data.errCode === 0 && resProvince.data.errCode === 0) {
                let data = res.data.data;
                let arrDoctorId = [];
                if (data && !_.isEmpty(res.data.data)) {
                    let arr = data.doctorSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map((item) => {
                            arrDoctorId.push(item.doctorId);
                        });
                    }
                }

                this.setState({
                    dataDetailSpecialty: res.data.data,
                    arrDoctorId,
                    listProvince: resProvince.data.data,
                });
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }

    handleOnChangeSelect = (e) => {
        console.log(e.target.value);
    };

    render() {
        let { arrDoctorId, dataDetailSpecialty, listProvince } = this.state;
        let { language } = this.props;
        return (
            <div className="detail-specialty-container">
                <HomeHeader />
                <div className="detail-specialty-body">
                    <div className="description-specialty">
                        {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) && (
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: dataDetailSpecialty.descriptionHTML,
                                }}
                            ></div>
                        )}
                    </div>
                    <div className="search-sp-doctor">
                        <select
                            onChange={(e) => {
                                this.handleOnChangeSelect(e);
                            }}
                        >
                            {listProvince &&
                                listProvince.length > 0 &&
                                listProvince.map((item, i) => {
                                    return (
                                        <option key={i} value={item.keyMap}>
                                            {language === LANGUAGES.VI
                                                ? item.valueVi
                                                : item.valueEn}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>
                    {arrDoctorId &&
                        arrDoctorId.length > 0 &&
                        arrDoctorId.map((item, i) => {
                            return (
                                <div className="each-doctor" key={i}>
                                    <div className="dt-content-left">
                                        <div className="profile-doctor">
                                            <DoctorInfoBooking
                                                doctorId={item}
                                                isShowDescription={true}
                                            />
                                        </div>
                                    </div>
                                    <div className="dt-content-right">
                                        <div className="doctor-schedule">
                                            <DoctorSchedule doctorIdFromParent={item} />
                                        </div>
                                        <div className="doctor-extra-info">
                                            <DoctorExtraInfo doctorIdFromParent={item} />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);