import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import './DoctorSchedule.scss';
import { getScheduleDoctorByDate } from '../../../../services/userService';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../../utils';
import BookingModal from './Modal/BookingModal';
import { isEqual, range } from 'lodash';
import * as actions from '../../../../store/actions';

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvailableTime: [],
            isOpenModal: false,
            dataScheduleTimeModal: {},
            rangeTime: [],
            time: '',
        };
    }

    async componentDidMount() {
        await this.props.fetchAllScheduleTime();
        let { language } = this.props;
        let allDays = this.getArrDays(language);
        let data = this.props.allScheduleTime;

        if (this.props.doctorIdFromParent) {
            let res = await getScheduleDoctorByDate(
                this.props.doctorIdFromParent,
                allDays[0].value,
            );
            this.setState({
                allAvailableTime: res.data.data ? res.data.data : [],
            });
        }
        this.setState({
            allDays,
        });

        if (data && data.length > 0) {
            data = data.map((item) => ({
                ...item,
                isSelected: false,
                doctorId: this.props.doctorIdFromParent,
                date: allDays[0].value,
            }));
        }
        this.setState({
            rangeTime: data,
        });
        this.handleCheckAvailableDay();
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
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
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
                        .format('ddd - DD/MM');
                }
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf('day');
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
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime;
            let allDays = this.getArrDays(this.props.language);

            if (data && data.length > 0) {
                data = data.map((item) => ({
                    ...item,
                    isSelected: false,
                    doctorId: this.props.doctorIdFromParent,
                    date: allDays[0].value,
                }));
            }
            this.setState({
                rangeTime: data,
            });
        }
    }

    handleOnChangeSelect = async (e) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent;
            let date = e.target.value;
            let res = await getScheduleDoctorByDate(doctorId, date);
            if (res && res.data.errCode === 0) {
                this.setState({
                    allAvailableTime: res.data.data ? res.data.data : [],
                });
            }
        }
        let data = this.props.allScheduleTime;
        let allDays = this.getArrDays(this.props.language);

        if (data && data.length > 0) {
            data = data.map((item) => ({
                ...item,
                date: e.target.value,
            }));
        }
        this.setState({
            rangeTime: data,
        });
        this.handleCheckAvailableDay();
    };

    handleClickScheduleTime = (time) => {
        this.setState({
            isOpenModal: true,
            dataScheduleTimeModal: time,
        });
        console.log(time);
    };
    handleCheckAvailableDay = () => {
        let rangeTime = this.state.rangeTime;
        console.log(rangeTime);
        let allAvailableTime = this.state.allAvailableTime;
        for (let i = 0; i < rangeTime.length; i++) {
            for (let x = 0; x < allAvailableTime.length; x++) {
                if (rangeTime[i].keyMap === allAvailableTime[x].timeType) {
                    rangeTime.splice(i, 1);
                }
            }
        }
        console.log(rangeTime);

        this.setState({
            rangeTime,
        });
    };
    handleCloseModal = () => {
        this.setState({
            isOpenModal: false,
        });
    };

    render() {
        let { allDays, allAvailableTime, isOpenModal, dataScheduleTimeModal, rangeTime } =
            this.state;
        let { language } = this.props;
        console.log(allAvailableTime, 123);
        console.log(rangeTime, 1223);
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
                            {rangeTime && rangeTime.length > 0 ? (
                                <>
                                    <div className="time-content-btns">
                                        {rangeTime.map((item, i) => {
                                            let timeDisplay =
                                                language === LANGUAGES.VI
                                                    ? item.valueVi
                                                    : item.valueEn;
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
                    rangeTime={rangeTime}
                    handleCheckAvailableDay={this.handleCheckAvailableDay}
                />
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allScheduleTime: state.admin.allScheduleTime,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
