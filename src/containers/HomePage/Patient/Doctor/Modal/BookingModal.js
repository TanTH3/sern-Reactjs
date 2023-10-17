import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment, { lang } from 'moment';
import { FormattedMessage } from 'react-intl';
import { Modal } from 'reactstrap';
import './BookingModal.scss';
import _ from 'lodash';
import DoctorInfoBooking from '../DoctorInfoBooking';
import DatePicker from '../../../../../components/Input/DatePicker';
import * as actions from '../../../../../store/actions';
import { LANGUAGES } from '../../../../../utils';
import Select from 'react-select';
import {
    postPatientBookAppointment,
    getDetailDoctorByIdService,
} from '../../../../../services/userService';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            selectedGender: '',
            doctorId: '',
            genders: [],
            timeType: '',
            isShowLoading: false,
        };
    }

    async componentDidMount() {
        this.props.getGenders();
    }

    buildDataGender = (data) => {
        let result = [];
        let language = this.props.language;
        if (data && data.length > 0) {
            data.map((item) => {
                let object = {};
                object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                object.value = item.keyMap;
                result.push(object);
            });
        }
        return result;
    };
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genders),
            });
        }
        if (this.props.genders !== prevProps.genders) {
            this.setState({
                genders: this.buildDataGender(this.props.genders),
            });
        }
        if (this.props.dataTime !== prevProps.dataTime) {
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                let doctorId = this.props.dataTime.doctorId;
                let timeType = this.props.dataTime.keyMap;
                this.setState({
                    doctorId,
                    timeType,
                });
            }
        }
    }

    handleOnChangeInput = (e, id) => {
        let valueInput = e.target.value;
        let stateCopy = { ...this.state };
        stateCopy[id] = valueInput;
        this.setState({
            ...stateCopy,
        });
    };

    handleOnchangeDatePicker = (date) => {
        this.setState({
            birthday: date[0],
        });
    };
    handleChangeSelect = (selectedOption) => {
        this.setState({
            selectedGender: selectedOption,
        });
    };

    handleConfirmBooking = async () => {
        this.setState({
            isShowLoading: true,
        });
        this.props.handleCheckAvailableDay();
        let date = new Date(this.state.birthday).getTime();
        let timeString = this.buildTimeBooking(this.props.dataTime);
        let doctorName = this.buildDoctorName(this.props.dataTime);
        let res = await postPatientBookAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: this.props.dataTime.date,
            birthday: date,
            selectedGender: this.state.selectedGender.value,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString,
            doctorName,
        });
        this.setState({
            isShowLoading: false,
        });
        if (res && res.data.errCode === 0) {
            toast.success('Booking a new appointment succeed!');
            this.props.closeBookingClose();
        } else {
            toast.error('Booking a new appointment error!');
        }
        let { rangeTime } = this.props;
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map((item) => {
                if (item.id === this.props.dataTime.id) item.isSelected = true;
                return item;
            });
        }
    };

    buildTimeBooking = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ? dataTime.valueVi : dataTime.valueEn;

            let date =
                language === LANGUAGES.VI
                    ? moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
                    : moment
                          .unix(+dataTime.date / 1000)
                          .locale('en')
                          .format('ddd - MM/DD/YYYY');

            return `${time} - ${date}`;
        }
        return '';
    };

    buildDoctorName = async (dataTime) => {
        let dataDoctor = await getDetailDoctorByIdService(dataTime.doctorId);

        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let name =
                language === LANGUAGES.VI
                    ? `${dataDoctor.data.data.lastName} ${dataDoctor.data.data.firstName}`
                    : `${dataDoctor.data.data.firstName} ${dataDoctor.data.data.lastName}`;

            return name;
        }
        return '';
    };
    render() {
        let { isOpenModal, closeBookingClose, dataTime } = this.props;
        let doctorId = '';
        if (dataTime && !_.isEmpty(dataTime)) {
            doctorId = dataTime.doctorId;
        }

        return (
            <>
                <LoadingOverlay active={this.state.isShowLoading} spinner text="Loading">
                    <Modal
                        isOpen={isOpenModal}
                        className={'booking-modal-container'}
                        size="lg"
                        centered
                    >
                        <div className="booking-modal-content">
                            <div className="booking-modal-header">
                                <span className="left">
                                    <FormattedMessage id="patient.booking-modal.title" />
                                </span>
                                <span className="right" onClick={closeBookingClose}>
                                    <i className="fas fa-times" />
                                </span>
                            </div>
                            <div className="booking-modal-body">
                                <div className="doctor-info">
                                    <DoctorInfoBooking
                                        doctorId={doctorId}
                                        isShowDescription={false}
                                        dataTime={dataTime}
                                        isShowLinkDetail={false}
                                        isShowPrice={false}
                                    />
                                </div>
                                <div className="price"></div>
                                <div className="row">
                                    <div className="col-6 form-group">
                                        <label>
                                            <FormattedMessage id="patient.booking-modal.fullName" />
                                        </label>
                                        <input
                                            className="form-control"
                                            value={this.state.fullName}
                                            onChange={(e) =>
                                                this.handleOnChangeInput(e, 'fullName')
                                            }
                                        />
                                    </div>
                                    <div className="col-6 form-group">
                                        <label>
                                            <FormattedMessage id="patient.booking-modal.phoneNumber" />
                                        </label>
                                        <input
                                            className="form-control"
                                            value={this.state.phoneNumber}
                                            onChange={(e) =>
                                                this.handleOnChangeInput(e, 'phoneNumber')
                                            }
                                        />
                                    </div>
                                    <div className="col-6 form-group">
                                        <label>
                                            <FormattedMessage id="patient.booking-modal.email" />
                                        </label>
                                        <input
                                            className="form-control"
                                            value={this.state.email}
                                            onChange={(e) => this.handleOnChangeInput(e, 'email')}
                                        />
                                    </div>
                                    <div className="col-6 form-group">
                                        <label>
                                            <FormattedMessage id="patient.booking-modal.address" />
                                        </label>
                                        <input
                                            className="form-control"
                                            value={this.state.address}
                                            onChange={(e) => this.handleOnChangeInput(e, 'address')}
                                        />
                                    </div>
                                    <div className="col-6 form-group">
                                        <label>
                                            <FormattedMessage id="patient.booking-modal.reason" />
                                        </label>
                                        <input
                                            className="form-control"
                                            value={this.state.reason}
                                            onChange={(e) => this.handleOnChangeInput(e, 'reason')}
                                        />
                                    </div>

                                    <div className="col-6 form-group">
                                        <label>
                                            <FormattedMessage id="patient.booking-modal.birthday" />
                                        </label>
                                        <DatePicker
                                            className="form-control"
                                            value={this.state.birthday}
                                            onChange={this.handleOnchangeDatePicker}
                                        />
                                    </div>
                                    <div className="col-6 form-group">
                                        <label>
                                            <FormattedMessage id="patient.booking-modal.gender" />
                                        </label>
                                        <Select
                                            options={this.state.genders}
                                            value={this.state.selectedGender}
                                            onChange={this.handleChangeSelect}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="booking-modal-footer">
                                <button
                                    className="btn-booking-confirm"
                                    onClick={() => this.handleConfirmBooking()}
                                >
                                    <FormattedMessage id="patient.booking-modal.btnConfirm" />
                                </button>
                                <button className="btn-booking-cancel" onClick={closeBookingClose}>
                                    <FormattedMessage id="patient.booking-modal.btnCancel" />
                                </button>
                            </div>
                        </div>
                    </Modal>
                </LoadingOverlay>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenders: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
