import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
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
    }
    componentDidMount() {}
    toggle = () => {
        this.props.toggleUser();
    };
    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                className={'abcClassName'}
                size="lg"
            >
                <ModalHeader toggle={() => this.toggle()}></ModalHeader>
                <ModalBody>
                    <div className="container">
                        <div className="row">
                            <div className="form-row">
                                <div className="form-group col-6">
                                    <label for="inputEmail4">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        placeholder="Email"
                                    />
                                </div>
                                <div className="form-group col-6">
                                    <label for="inputPassword4">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        placeholder="Password"
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-6">
                                    <label for="inputEmail4">First name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="firstName"
                                        placeholder="Email"
                                    />
                                </div>
                                <div className="form-group col-6">
                                    <label for="inputPassword4">
                                        Last name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="lastName"
                                        placeholder="Password"
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label for="inputAddress">Address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="address"
                                    placeholder="1234 Main St"
                                />
                            </div>
                            <div className="form-row">
                                <div className="form-group col-4">
                                    <label for="inputCity">Phone number</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="phoneNumber"
                                    />
                                </div>
                                <div className="form-group col-md-4">
                                    <label for="inputState">Gender</label>
                                    <select
                                        name="gender"
                                        className="form-control"
                                    >
                                        <option selected>Choose...</option>
                                        <option value="1">Male</option>
                                        <option value="0">Female</option>
                                    </select>
                                </div>
                                <div className="form-group col-md-4">
                                    <label for="inputState">Role</label>
                                    <select
                                        name="role"
                                        className="form-control"
                                    >
                                        <option selected>Choose...</option>
                                        <option value="R1">Admin</option>
                                        <option value="R2">Doctor</option>
                                        <option value="R3">Patient</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.toggle()}>
                        Create new
                    </Button>
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
