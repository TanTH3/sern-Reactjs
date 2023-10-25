import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../../HomeHeader';
import './DetailClinic.scss';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import DoctorInfoBooking from '../Doctor/DoctorInfoBooking';
import { getDetailClinicById, getAllCodeService } from '../../../../services/userService';
import _ from 'lodash';

class DetailClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailSpecialty: {},
        };
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetailClinicById({
                id,
            });

            if (res && res.data.errCode === 0) {
                let data = res.data.data;
                let arrDoctorId = [];
                if (data && !_.isEmpty(res.data.data)) {
                    let arr = data.doctorClinic;
                    if (arr && arr.length > 0) {
                        arr.map((item) => {
                            arrDoctorId.push(item.doctorId);
                        });
                    }
                }

                this.setState({
                    dataDetailSpecialty: res.data.data,
                    arrDoctorId,
                });
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }

    handleOnChangeSelect = async (e) => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetailClinicById({
                id,
            });

            if (res && res.data.errCode === 0) {
                let data = res.data.data;
                let arrDoctorId = [];
                if (data && !_.isEmpty(res.data.data)) {
                    let arr = data.doctorClinic;
                    if (arr && arr.length > 0) {
                        arr.map((item) => {
                            arrDoctorId.push(item.doctorId);
                        });
                    }
                }

                this.setState({
                    dataDetailSpecialty: res.data.data,
                    arrDoctorId,
                });
            }
        }
    };

    render() {
        let { arrDoctorId, dataDetailSpecialty, listProvince } = this.state;

        return (
            <div className="detail-specialty-container">
                <HomeHeader />
                <div className="detail-specialty-body">
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
                                                isShowLinkDetail={true}
                                                isShowPrice={false}
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
                    <div className="description-specialty">
                        {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) && (
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: dataDetailSpecialty.data.descriptionHTML,
                                }}
                            ></div>
                        )}
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
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
