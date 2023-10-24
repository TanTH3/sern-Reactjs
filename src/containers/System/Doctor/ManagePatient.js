import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManagePatient.scss';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from '../../../store/actions';
import { CRUD_ACTIONS, LANGUAGES, dateFormat } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment/moment';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { getAllPatientForDoctor, postSendRemedy } from '../../../services/userService';
import RemedyModal from './RemedyModal';
import LoadingOverlay from 'react-loading-overlay';

class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpenModal: false,
            dataModal: {},
            isShowLoading: false,
        };
    }
    componentDidMount() {
        this.getDataPatient();
    }

    getDataPatient = async () => {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formatDate = new Date(currentDate).getTime();
        let res = await getAllPatientForDoctor({
            doctorId: user.id,
            date: formatDate,
        });
        if (res && res.data.errCode === 0) {
            this.setState({
                dataPatient: res.data.data,
            });
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {}

    handleOnChangeDatePicker = (date) => {
        this.setState(
            {
                currentDate: date[0],
            },
            async () => {
                await this.getDataPatient();
            },
        );
    };

    handleBtnConfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName,
            date: item.date,
        };
        console.log(item);
        this.setState({
            isOpenModal: true,
            dataModal: data,
        });
    };

    closeRemedyModal = () => {
        this.setState({
            isOpenModal: false,
            dataModal: {},
        });
    };

    sendRemedy = async (dataChild) => {
        let { dataModal } = this.state;
        this.setState({
            isShowLoading: true,
        });

        let res = await postSendRemedy({
            email: dataChild.email,
            imgBase64: dataChild.imgBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            date: dataModal.date,
            language: this.props.language,
            patientName: dataModal.patientName,
        });
        if (res && res.data.errCode === 0) {
            this.setState({
                isShowLoading: false,
            });
            toast.success('Send Remedy succeeds');
            this.closeRemedyModal();
            await this.getDataPatient();
        } else {
            this.setState({
                isShowLoading: false,
            });
            toast.error('Something wrongs ...');
        }
    };

    render() {
        let { dataPatient, isOpenModal, dataModal } = this.state;
        let { language } = this.props;
        return (
            <>
                <LoadingOverlay active={this.state.isShowLoading} spinner text="Loading">
                    <div className="manage-patient-container">
                        <div className="m-p-title">Quản lí bệnh nhân</div>
                        <div className="manage-patient-body row">
                            <div className="col-4 form-group">
                                <label>Chọn ngày khám</label>
                                <DatePicker
                                    onChange={this.handleOnChangeDatePicker}
                                    className="form-control"
                                    value={this.state.currentDate}
                                />
                            </div>
                            <div className="col-12 table-manage-patient">
                                <table style={{ width: '100%' }}>
                                    <tbody>
                                        <tr>
                                            <th>STT</th>
                                            <th>Thời gian</th>
                                            <th>Học và tên</th>
                                            <th>Địa chỉ</th>
                                            <th>Giới tính</th>
                                            <th>Actions</th>
                                        </tr>

                                        {dataPatient && dataPatient.length > 0 ? (
                                            dataPatient.map((item, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td>{i + 1}</td>
                                                        <td>{item.timeTypeDataPatient.valueVi}</td>
                                                        <td>{item.patientData.firstName}</td>
                                                        <td>{item.patientData.address}</td>
                                                        <td>
                                                            {item.patientData.genderData.valueVi}
                                                        </td>
                                                        <td>
                                                            <button
                                                                className="mp-btn-confirm"
                                                                onClick={() =>
                                                                    this.handleBtnConfirm(item)
                                                                }
                                                            >
                                                                Xác nhận
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <tr>no data</tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <RemedyModal
                        isOpenModal={isOpenModal}
                        dataModal={dataModal}
                        closeRemedyModal={this.closeRemedyModal}
                        sendRemedy={this.sendRemedy}
                    />
                </LoadingOverlay>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        allDoctors: state.admin.allDoctors,
        user: state.user.userInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
