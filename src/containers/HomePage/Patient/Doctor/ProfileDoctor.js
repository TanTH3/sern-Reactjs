import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../../../HomePage/HomeHeader';
import './ProfileDoctor.scss';
import { getDetailDoctorByIdService } from '../../../../services/userService';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../../utils';
import DoctorSchedule from './DoctorSchedule';
class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {},
            currentDoctorId: -1,
        };
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            this.setState({
                currentDoctorId: id,
            });
            let res = await getDetailDoctorByIdService(id);
            console.log(res);
            if (res && res.data.errCode === 0) {
                this.setState({
                    detailDoctor: res.data.data,
                });
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {}

    render() {
        console.log(this.state);
        let { language } = this.props;
        let { detailDoctor } = this.state;
        let nameVi = '',
            nameEn = '';
        if (detailDoctor && detailDoctor.positionData) {
            nameVi = `${detailDoctor.positionData.valueVi},${detailDoctor.lastName} ${detailDoctor.firstName}`;
            nameEn = `${detailDoctor.positionData.valueEn},${detailDoctor.firstName} ${detailDoctor.lastName}`;
        }
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className="doctor-detail-container">
                    <div className="intro-doctor">
                        <div
                            className="content-left"
                            style={{
                                backgroundImage: `url(${
                                    detailDoctor && detailDoctor.image ? detailDoctor.image : ''
                                })`,
                            }}
                        ></div>
                        <div className="content-right">
                            <div className="up">{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                            <div className="down">
                                {detailDoctor &&
                                    detailDoctor.Markdown &&
                                    detailDoctor.Markdown.description && (
                                        <span>{detailDoctor.Markdown.description}</span>
                                    )}
                            </div>
                        </div>
                    </div>
                    <div className="schedule-doctor">
                        <div className="content-left">
                            <DoctorSchedule doctorIdFromParent={this.state.currentDoctorId} />
                        </div>
                        <div className="content-right"></div>
                    </div>
                    <div className="detail-info-doctor">
                        {detailDoctor &&
                            detailDoctor.Markdown &&
                            detailDoctor.Markdown.contentHTML && (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: detailDoctor.Markdown.contentHTML,
                                    }}
                                ></div>
                            )}
                    </div>
                    <div className="comment-doctor"></div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
