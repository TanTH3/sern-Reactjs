import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../../HomeHeader';
import { getAllClinic } from '../../../../services/userService';
import './AllClinic.scss';

class AllClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataClinics: [],
        };
    }

    async componentDidMount() {
        let res = await getAllClinic();
        if (res && res.data.errCode === 0) {
            this.setState({
                dataClinics: res.data.data ? res.data.data : [],
            });
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }
    handleViewDetailClinic = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${item.id}`);
        }
    };
    render() {
        let { dataClinics } = this.state;
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className="all-clinic-container">
                    {dataClinics &&
                        dataClinics.length > 0 &&
                        dataClinics.map((item, i) => {
                            return (
                                <div
                                    className="section-customize clinic-child"
                                    key={i}
                                    onClick={() => this.handleViewDetailClinic(item)}
                                >
                                    <div className="outer-bg">
                                        <div
                                            className="bg-image section-medical-facility"
                                            style={{ backgroundImage: `url(${item.image})` }}
                                        />
                                        <div className="clinic-name">{item.name}</div>
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AllClinic);
