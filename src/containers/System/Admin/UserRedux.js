import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions';
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: '',
            isOpen: false,
        };
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                genderArr: this.props.genderRedux,
            });
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            this.setState({
                roleArr: this.props.roleRedux,
            });
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            this.setState({
                positionArr: this.props.positionRedux,
            });
        }
    }

    handleOnchangeImage = (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
            });
        }
    };

    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;

        this.setState({
            isOpen: true,
        });
    };

    render() {
        console.log(this.state);
        let genders = this.state.genderArr;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;
        let currentLanguage = this.props.language;
        let isGetGenders = this.props.isLoadingGender;

        return (
            <div className="user-redux-container">
                <div className="title">User Redux</div>
                <div className="user-redux-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">Them moi</div>
                            <div className="col-12">
                                {isGetGenders === true ? 'Loading genders' : ''}
                            </div>
                            <div className="col-3">
                                <label> Email</label>
                                <input className="form-control" type="email"></input>
                            </div>
                            <div className="col-3">
                                <label> Password</label>
                                <input className="form-control" type="password"></input>
                            </div>
                            <div className="col-3">
                                <label> first name</label>
                                <input className="form-control" type="text"></input>
                            </div>
                            <div className="col-3">
                                <label> last name</label>
                                <input className="form-control" type="text"></input>
                            </div>
                            <div className="col-3">
                                <label> phone number</label>
                                <input className="form-control" type="text"></input>
                            </div>
                            <div className="col-9">
                                <label> Address</label>
                                <input className="form-control" type="text"></input>
                            </div>
                            <div className="col-3">
                                <label> gender</label>
                                <select className="form-control">
                                    <option>Choose...</option>
                                    {genders &&
                                        genders.length > 0 &&
                                        genders.map((gender, i) => {
                                            return (
                                                <option key={i}>
                                                    {currentLanguage === LANGUAGES.VI
                                                        ? gender.valueVi
                                                        : gender.valueEn}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                            <div className="col-3">
                                <label> Role</label>
                                <select className="form-control">
                                    {roles &&
                                        roles.length > 0 &&
                                        roles.map((item, i) => {
                                            return (
                                                <option key={i}>
                                                    {currentLanguage === LANGUAGES.VI
                                                        ? item.valueVi
                                                        : item.valueEn}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                            <div className="col-3">
                                <label> Position</label>
                                <select className="form-control">
                                    {positions &&
                                        positions.length > 0 &&
                                        positions.map((item, i) => {
                                            return (
                                                <option key={i}>
                                                    {currentLanguage === LANGUAGES.VI
                                                        ? item.valueVi
                                                        : item.valueEn}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                            <div className="col-3">
                                <label> Image</label>
                                <div className="preview-img-container">
                                    <input
                                        id="previewImg"
                                        type="file"
                                        hidden
                                        onChange={(e) => this.handleOnchangeImage(e)}
                                    />

                                    <label className="label-upload" htmlFor="previewImg">
                                        Tai anh <i className="fas fa-upload" />
                                    </label>
                                    <div
                                        className="preview-image"
                                        style={{
                                            backgroundImage: `url(${this.state.previewImgURL})`,
                                        }}
                                        onClick={() => {
                                            this.openPreviewImage();
                                        }}
                                    ></div>
                                </div>
                            </div>
                            <div className="col-12">
                                <button className="btn btn-primary">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.isOpen === true && (
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        roleRedux: state.admin.roles,
        positionRedux: state.admin.positions,
        isLoadingGender: state.admin.isLoadingGender,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
