import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: '',
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            gender: '',
            role: '',
            phoneNumber: '',
            position: '',
            avatar: '',

            action: '',
            userEditId: '',
        };
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux;
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
            });
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux;

            this.setState({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
            });
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositions = this.props.positionRedux;

            this.setState({
                positionArr: arrPositions,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '',
            });
        }

        if (prevProps.listUsers !== this.props.listUsers) {
            let arrGenders = this.props.genderRedux;
            let arrRoles = this.props.roleRedux;
            let arrPositions = this.props.positionRedux;
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '',
                phoneNumber: '',
                avatar: '',
                action: CRUD_ACTIONS.CREATE,
                previewImgURL: '',
            });
        }
    }

    handleOnchangeImage = async (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                avatar: base64,
            });
        }
    };

    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;

        this.setState({
            isOpen: true,
        });
    };

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
        let { action } = this.state;
        if (action === CRUD_ACTIONS.CREATE) {
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                gender: this.state.gender,
                roleId: this.state.role,
                phoneNumber: this.state.phoneNumber,
                positionId: this.state.position,
                avatar: this.state.avatar,
            });
        }
        if (action === CRUD_ACTIONS.EDIT) {
            this.props.editAUserRedux({
                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                gender: this.state.gender,
                roleId: this.state.role,
                phoneNumber: this.state.phoneNumber,
                positionId: this.state.position,
                avatar: this.state.avatar,
            });
        }
    };

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address'];
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('this input is required');
                break;
            }
        }
        return isValid;
    };

    onChangeInput = (e, id) => {
        let copyState = { ...this.state };
        copyState[id] = e.target.value;
        this.setState({
            ...copyState,
        });
    };

    handleEditUserFromParent = (user) => {
        console.log(user);
        let imageBase64 = '';
        if (user.image) {
            imageBase64 = Buffer.from(user.image, 'base64').toString('binary');
        }
        this.setState({
            email: user.email,
            password: 'HARDCODE',
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            gender: user.gender,
            role: user.roleId,
            phoneNumber: user.phoneNumber,
            position: user.positionId,
            avatar: '',
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id,
            previewImgURL: imageBase64,
        });
    };
    render() {
        let genders = this.state.genderArr;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;
        let currentLanguage = this.props.language;
        let isGetGenders = this.props.isLoadingGender;

        let {
            email,
            password,
            firstName,
            lastName,
            phoneNumber,
            address,
            gender,
            position,
            role,
            avatar,
        } = this.state;

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
                                <input
                                    className="form-control"
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        this.onChangeInput(e, 'email');
                                    }}
                                    disabled={
                                        this.state.action === CRUD_ACTIONS.EDIT ? true : false
                                    }
                                />
                            </div>
                            <div className="col-3">
                                <label> Password</label>
                                <input
                                    className="form-control"
                                    type="password"
                                    value={password}
                                    onChange={(e) => {
                                        this.onChangeInput(e, 'password');
                                    }}
                                    disabled={
                                        this.state.action === CRUD_ACTIONS.EDIT ? true : false
                                    }
                                />
                            </div>
                            <div className="col-3">
                                <label> first name</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => {
                                        this.onChangeInput(e, 'firstName');
                                    }}
                                />
                            </div>
                            <div className="col-3">
                                <label> last name</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => {
                                        this.onChangeInput(e, 'lastName');
                                    }}
                                />
                            </div>
                            <div className="col-3">
                                <label> phone number</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={phoneNumber}
                                    onChange={(e) => {
                                        this.onChangeInput(e, 'phoneNumber');
                                    }}
                                />
                            </div>
                            <div className="col-9">
                                <label> Address</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={address}
                                    onChange={(e) => {
                                        this.onChangeInput(e, 'address');
                                    }}
                                />
                            </div>
                            <div className="col-3">
                                <label> gender</label>
                                <select
                                    className="form-control"
                                    onChange={(e) => {
                                        this.onChangeInput(e, 'gender');
                                    }}
                                    value={gender}
                                >
                                    {genders &&
                                        genders.length > 0 &&
                                        genders.map((gender, i) => {
                                            return (
                                                <option key={i} value={gender.keyMap}>
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
                                <select
                                    className="form-control"
                                    onChange={(e) => {
                                        this.onChangeInput(e, 'role');
                                    }}
                                    value={role}
                                >
                                    {roles &&
                                        roles.length > 0 &&
                                        roles.map((item, i) => {
                                            return (
                                                <option key={i} value={item.keyMap}>
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
                                <select
                                    className="form-control"
                                    onChange={(e) => {
                                        this.onChangeInput(e, 'position');
                                    }}
                                    value={position}
                                >
                                    {positions &&
                                        positions.length > 0 &&
                                        positions.map((item, i) => {
                                            return (
                                                <option key={i} value={item.keyMap}>
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
                            <div className="col-12 my-3">
                                <button
                                    className={
                                        this.state.action === CRUD_ACTIONS.EDIT
                                            ? 'btn btn-warning'
                                            : 'btn btn-primary'
                                    }
                                    onClick={() => this.handleSaveUser()}
                                >
                                    {this.state.action === CRUD_ACTIONS.EDIT ? (
                                        <FormattedMessage id="manage-user.edit" />
                                    ) : (
                                        <FormattedMessage id="manage-user.save" />
                                    )}
                                </button>
                            </div>
                            <div className="col-12 mb-5">
                                <TableManageUser
                                    handleEditUserFromParent={this.handleEditUserFromParent}
                                    action={this.state.action}
                                />
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
        listUsers: state.admin.users,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        editAUserRedux: (data) => dispatch(actions.editAUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
