import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
} from '../../services/userService';
import './UserManage.scss';
import ModalUser from './ModalUser';
import { emitter } from '../../utils/emitter';

class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: [],
            isOpen: false,
            isCreate: false,
            currentIdEdit: '',
        };
    }

    async componentDidMount() {
        await this.getAllUserFromReact();
    }

    getAllUserFromReact = async () => {
        let response = await getAllUsers('ALL');
        if (response && response.data.errCode === 0) {
            this.setState({
                userData: response.data.user,
            });
        }
    };

    handleAddNewUser = () => {
        this.setState({
            isOpen: true,
            isCreate: true,
        });
    };

    toggleUser = () => {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    };
    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            if (response && response.data.errCode !== 0) {
                alert(response.data.errMessage);
            } else {
                await this.getAllUserFromReact();
                this.toggleUser();
                emitter.emit('EVENT_CLEAR_MODAL_DATA');
            }
        } catch (e) {}
    };

    editUser = async (data) => {
        try {
            let res = await editUserService(data);
            if (res && res.data.errCode === 0) {
                await this.getAllUserFromReact();
                this.toggleUser();
                emitter.emit('EVENT_CLEAR_MODAL_DATA');
            } else {
                alert(res.data.errMessage);
            }
        } catch (e) {}
    };
    handleDeleteUser = async (user) => {
        try {
            let res = await deleteUserService(user.id);
            if (res && res.data.errCode === 0) {
                await this.getAllUserFromReact();
            } else {
                alert(res.data.errMessage);
            }
        } catch (e) {}
    };
    handleEditUser = (user) => {
        this.setState({
            isOpen: true,
            isCreate: false,
            currentIdEdit: user.id,
        });
    };
    render() {
        let arrUser = this.state.userData;
        return (
            <div className="users-container">
                <ModalUser
                    isCreate={this.state.isCreate}
                    isOpen={this.state.isOpen}
                    toggleUser={this.toggleUser}
                    createNewUser={this.createNewUser}
                    editUser={this.editUser}
                    currentIdEdit={this.state.currentIdEdit}
                />
                <div className="title text-center">Manage </div>
                <div className="mx-1">
                    <button
                        className="btn btn-primary px-3"
                        onClick={() => this.handleAddNewUser()}
                    >
                        Add new users
                    </button>
                </div>
                <div className="users-table mt-3 mx-1">
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>
                            {arrUser &&
                                arrUser.map((user, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{user.email}</td>
                                            <td>{user.firstName}</td>
                                            <td>{user.lastName}</td>
                                            <td>{user.address}</td>
                                            <td>
                                                <button onClick={() => this.handleEditUser(user)}>
                                                    Edit
                                                </button>
                                                <button onClick={() => this.handleDeleteUser(user)}>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
