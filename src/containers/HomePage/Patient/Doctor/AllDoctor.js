import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../../HomeHeader';
import { LANGUAGES } from '../../../../utils';
import * as actions from '../../../../store/actions';
import './AllDoctor.scss';

class AllDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctors: [],
        };
    }

    async componentDidMount() {
        this.props.loadTopDoctors();
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                arrDoctors: this.props.topDoctorsRedux,
            });
        }
    }
    handleViewDetailDoctor = (doctor) => {
        if (this.props.history) {
            this.props.history.push(`/profile-doctor/${doctor.id}`);
        }
    };
    render() {
        let { arrDoctors } = this.state;
        let { language } = this.props;
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className="all-doctor-container">
                    {arrDoctors &&
                        arrDoctors.length > 0 &&
                        arrDoctors.map((item, i) => {
                            let imageBase64 = '';
                            if (item.image) {
                                imageBase64 = Buffer.from(item.image, 'base64').toString('binary');
                            }
                            let nameVi = `${item.positionData.valueVi} ${item.lastName} ${item.firstName}`;
                            let nameEn = `${item.positionData.valueEn} ${item.firstName} ${item.lastName}`;
                            return (
                                <div
                                    className="section-customize"
                                    key={i}
                                    onClick={() => this.handleViewDetailDoctor(item)}
                                >
                                    <div className="customize-border">
                                        <div className="outer-bg">
                                            <div
                                                className="bg-image section-outstanding-doctor"
                                                style={{
                                                    backgroundImage: `url(${imageBase64})`,
                                                }}
                                            />
                                            <div className="position text-center">
                                                <div>
                                                    {language === LANGUAGES.VI ? nameVi : nameEn}
                                                </div>
                                                <div>{item.Doctor_Info.Specialty.name}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        topDoctorsRedux: state.admin.allDoctors,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchAllDoctors()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllDoctor);
