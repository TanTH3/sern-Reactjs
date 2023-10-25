import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../../HomeHeader';
import { getAllSpecialty } from '../../../../services/userService';
import './AllSpecialty.scss';

class AllSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: [],
        };
    }

    async componentDidMount() {
        let res = await getAllSpecialty();
        if (res && res.data.errCode === 0) {
            this.setState({
                dataSpecialty: res.data.data ? res.data.data : [],
            });
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }
    handleViewDetailSpecialty = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${item.id}`);
        }
    };
    render() {
        let { dataSpecialty } = this.state;
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className="all-specialty-container">
                    {dataSpecialty &&
                        dataSpecialty.length > 0 &&
                        dataSpecialty.map((item, i) => {
                            return (
                                <div
                                    className="section-customize specialty-child"
                                    key={i}
                                    onClick={() => this.handleViewDetailSpecialty(item)}
                                >
                                    <div className="outer-bg">
                                        <div
                                            className="bg-image section-specialty"
                                            style={{ backgroundImage: `url(${item.image})` }}
                                        />
                                        <div className="specialty-name">{item.name}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AllSpecialty);
