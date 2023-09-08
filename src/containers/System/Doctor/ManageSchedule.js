import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageSchedule.scss';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from '../../../store/actions';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment/moment';

class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lisDoctors: [],
            selectDoctor: {},
            currentDate: '',
            rangeTime: [],
        };
    }
    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.fetchAllScheduleTime();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
            this.setState({
                lisDoctors: dataSelect,
            });
        }
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            this.setState({
                rangeTime: this.props.allScheduleTime,
            });
        }
    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, i) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object);
            });
        }
        return result;
    };

    handleChangeSelect = async (selectedOption) => {
        await this.setState({
            selectDoctor: selectedOption,
        });
    };
    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0],
        });
    };
    render() {
        let { rangeTime } = this.state;
        let { language } = this.props;
        return (
            <div className="manage-schedule-container">
                <div className="m-s-title">
                    <FormattedMessage id="manage-schedule.title" />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-6 form-group">
                            <label>
                                {' '}
                                <FormattedMessage id="manage-schedule.choose-doctor" />{' '}
                            </label>
                            <Select
                                value={this.state.selectDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.lisDoctors}
                            />
                        </div>
                        <div className="col-6 form-group">
                            <label>
                                <FormattedMessage id="manage-schedule.choose-date" />{' '}
                            </label>
                            <DatePicker
                                onChange={this.handleOnChangeDatePicker}
                                className="form-control"
                                value={this.state.currentDate}
                                minDate={new Date()}
                            />
                        </div>
                        <div className="col-12 pick-hour-container">
                            {rangeTime &&
                                rangeTime.length > 0 &&
                                rangeTime.map((item, i) => {
                                    return (
                                        <button className="btn btn-schedule" key={i}>
                                            {language === LANGUAGES.VI
                                                ? item.valueVi
                                                : item.valueEn}
                                        </button>
                                    );
                                })}
                        </div>
                        <div className="col-12">
                            <button className="btn btn-primary btn-save-schedule">
                                <FormattedMessage id="manage-schedule.save" />{' '}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
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
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
