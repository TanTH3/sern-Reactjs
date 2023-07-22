import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllUsers } from '../../services/userService';
import './UserManage.scss';
import ModalUser from './ModalUser';

class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: [],
            isOpen: false,
        };
    }

    state = {};

    async componentDidMount() {
        let response = await getAllUsers('ALL');
        if (response && response.data.errCode === 0) {
            console.log('get user from nodejs:', response);
            this.setState({
                userData: response.data.user,
            });
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpen: true,
        });
    };
    toggleUser = () => {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    };
    render() {
        let arrUser = this.state.userData;
        return (
            <div className="users-container">
                <ModalUser
                    isOpen={this.state.isOpen}
                    toggleUser={this.toggleUser}
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
                                                <button>Edit</button>
                                                <button>Delete</button>
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
