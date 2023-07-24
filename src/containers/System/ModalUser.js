import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { emitter } from '../../utils/emitter';

class ModalUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        };
        this.listenToEmitter();
    }

    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
            });
        });
    }
    componentDidMount() {}
    toggle = () => {
        this.props.toggleUser();
    };
    handleOnChangeInput = (e, id) => {
        let copyState = { ...this.state };
        copyState[id] = e.target.value;
        this.setState({
            ...copyState,
        });
    };
    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for (var i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter:' + arrInput[i]);
                break;
            }
        }
        return isValid;
    };
    handleAddNewUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            this.props.createNewUser(this.state);
        }
    };
    handleEditUser = () => {
        const editArr = this.state;
        editArr.id = this.props.currentIdEdit;
        this.props.editUser(editArr);
    };
    render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={() => this.toggle()} className={'abcClassName'} size="lg">
                <ModalHeader toggle={() => this.toggle()}></ModalHeader>
                <ModalBody>
                    <div className="container">
                        <div className="row">
                            {this.props.isCreate && (
                                <div className="form-row">
                                    <div className="form-group col-6">
                                        <label htmlFor="inputEmail4">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            placeholder="Email"
                                            onChange={(e) => this.handleOnChangeInput(e, 'email')}
                                            value={this.state.email}
                                        />
                                    </div>
                                    <div className="form-group col-6">
                                        <label htmlFor="inputPassword4">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            placeholder="Password"
                                            onChange={(e) => this.handleOnChangeInput(e, 'password')}
                                            value={this.state.password}
                                        />
                                    </div>
                                </div>
                            )}
                            <div className="form-row">
                                <div className="form-group col-6">
                                    <label htmlFor="inputEmail4">First name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="firstName"
                                        placeholder="Email"
                                        onChange={(e) => this.handleOnChangeInput(e, 'firstName')}
                                        value={this.state.firstName}
                                    />
                                </div>
                                <div className="form-group col-6">
                                    <label htmlFor="inputPassword4">Last name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="lastName"
                                        placeholder="Password"
                                        onChange={(e) => this.handleOnChangeInput(e, 'lastName')}
                                        value={this.state.lastName}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputAddress">Address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="address"
                                    placeholder="1234 Main St"
                                    onChange={(e) => this.handleOnChangeInput(e, 'address')}
                                    value={this.state.address}
                                />
                            </div>
                            {this.props.isCreate && (
                                <div className="form-row">
                                    <div className="form-group col-4">
                                        <label htmlFor="inputCity">Phone number</label>
                                        <input type="text" className="form-control" name="phoneNumber" />
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label htmlFor="inputState">Gender</label>
                                        <select name="gender" className="form-control">
                                            <option>Choose...</option>
                                            <option value="1">Male</option>
                                            <option value="0">Female</option>
                                        </select>
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label htmlFor="inputState">Role</label>
                                        <select name="role" className="form-control">
                                            <option>Choose...</option>
                                            <option value="R1">Admin</option>
                                            <option value="R2">Doctor</option>
                                            <option value="R3">Patient</option>
                                        </select>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    {this.props.isCreate ? (
                        <Button color="primary" onClick={() => this.handleAddNewUser()}>
                            Create new
                        </Button>
                    ) : (
                        <Button color="primary" onClick={() => this.handleEditUser()}>
                            Save change
                        </Button>
                    )}
                    <Button color="secondary" onClick={() => this.toggle()}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
