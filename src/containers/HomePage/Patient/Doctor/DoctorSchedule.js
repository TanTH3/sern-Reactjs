import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../../../HomePage/HomeHeader';
import moment from 'moment';
import localization from 'moment/locale/vi';
import './DoctorSchedule.scss';
import { getScheduleDoctorByDate } from '../../../../services/userService';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../../utils';
import BookingModal from './Modal/BookingModal';

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvailableTime: [],
            isOpenModal: false,
            dataScheduleTimeModal: {},
        };
    }

    async componentDidMount() {
        let { language } = this.props;
        let allDays = this.getArrDays(language);
        this.setState({
            allDays,
        });
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    getArrDays = (language) => {
        let allDays = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Hôm nay - ${ddMM}`;
                    object.label = today;
                } else {
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/YY');
                    object.label = this.capitalizeFirstLetter(labelVi);
                }
            } else {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Today - ${ddMM}`;
                    object.label = today;
                } else {
                    object.label = moment(new Date())
                        .add(i, 'days')
                        .locale('en')
                        .format('ddd - DD/YY');
                }
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf('day');
            console.log(object);
            allDays.push(object);
        }
        return allDays;
    };

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            let allDays = this.getArrDays(this.props.language);
            this.setState({
                allDays,
            });
        }
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let allDays = this.getArrDays(this.props.language);
            let res = await getScheduleDoctorByDate(
                this.props.doctorIdFromParent,
                allDays[0].value,
            );
            this.setState({
                allAvailableTime: res.data.data ? res.data.data : [],
            });
        }
    }

    handleOnChangeSelect = async (e) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent;
            let date = e.target.value;
            let res = await getScheduleDoctorByDate(doctorId, date);
            console.log(res);
            if (res && res.data.errCode === 0) {
                this.setState({
                    allAvailableTime: res.data.data ? res.data.data : [],
                });
            }
        }
    };

    handleClickScheduleTime = (time) => {
        this.setState({
            isOpenModal: true,
            dataScheduleTimeModal: time,
        });
    };

    handleCloseModal = () => {
        this.setState({
            isOpenModal: false,
        });
    };

    render() {
        let { allDays, allAvailableTime, isOpenModal, dataScheduleTimeModal } = this.state;
        let { language } = this.props;
        return (
            <>
                <div className="doctor-schedule-container">
                    <div className="all-schedule">
                        <select onChange={(e) => this.handleOnChangeSelect(e)}>
                            {allDays &&
                                allDays.length > 0 &&
                                allDays.map((item, i) => {
                                    return (
                                        <option value={item.value} key={i}>
                                            {item.label}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>
                    <div className="all-available-time">
                        <div className="text-calendar">
                            <i className="fas fa-calendar-alt">
                                <span>
                                    <FormattedMessage id="patient.detail-doctor.schedule" />
                                </span>
                            </i>
                        </div>
                        <div className="time-content">
                            {allAvailableTime && allAvailableTime.length > 0 ? (
                                <>
                                    {' '}
                                    <div className="time-content-btns">
                                        {allAvailableTime.map((item, i) => {
                                            let timeDisplay =
                                                language === LANGUAGES.VI
                                                    ? item.timeTypeData.valueVi
                                                    : item.timeTypeData.valueEn;
                                            return (
                                                <button
                                                    key={i}
                                                    className={
                                                        language === LANGUAGES.VI
                                                            ? 'btn-vie'
                                                            : 'btn-en'
                                                    }
                                                    onClick={() =>
                                                        this.handleClickScheduleTime(item)
                                                    }
                                                >
                                                    {timeDisplay}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    <div className="book-free">
                                        <span>
                                            <FormattedMessage id="patient.detail-doctor.choose" />
                                            <i className="far fa-hand-point-up" />
                                            <FormattedMessage id="patient.detail-doctor.book-free" />
                                        </span>
                                    </div>
                                </>
                            ) : (
                                <div className="no-schedule">
                                    <FormattedMessage id="patient.detail-doctor.no-schedule" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <BookingModal
                    isOpenModal={isOpenModal}
                    closeBookingClose={this.handleCloseModal}
                    dataTime={dataScheduleTimeModal}
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
