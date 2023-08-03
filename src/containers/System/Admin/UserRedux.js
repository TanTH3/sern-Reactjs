import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
        };
    }

    async componentDidMount() {
        try {
            let res = await getAllCodeService('position');
            if (res && res.errCode === 0) {
                this.setState({
                    genderArr: res.data,
                });
            }
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        console.log(this.state);
        let genders = this.state.genderArr;
        let currentLanguage = this.props.language;
        return (
            <div className="user-redux-container">
                <div className="title">User Redux</div>
                <div className="user-redux-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">Them moi</div>
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
                                    <option>Choose...</option>
                                    <option>...</option>
                                </select>
                            </div>
                            <div className="col-3">
                                <label> Position</label>
                                <select className="form-control">
                                    <option>Choose...</option>
                                    <option>...</option>
                                </select>
                            </div>
                            <div className="col-3">
                                <label> Image</label>
                                <input className="form-control" type="file"></input>
                            </div>
                            <div className="col-12">
                                <button className="btn btn-primary">Save</button>
                            </div>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
