import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import { changeLanguageApp } from '../../store/actions';
import { withRouter } from 'react-router';

class HomeHeader extends Component {
    handleChangeLanguage = (language, isShowBanner) => {
        this.props.changeLanguageAppRedux(language);
    };
    returnHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`);
        }
    };
    render() {
        let language = this.props.language;
        console.log(this.props);
        return (
            <>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <i className="fas fa-bars"></i>
                            <div className="header-logo" onClick={() => this.returnHome()}></div>
                        </div>
                        <div className="center-content">
                            <div className="child-content">
                                <div>
                                    <b>
                                        <FormattedMessage id="home-header.speciality" />
                                    </b>
                                </div>
                                <div className="subs-title">
                                    <FormattedMessage id="home-header.searchdoctor" />
                                </div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <b>
                                        <FormattedMessage id="home-header.health-facility" />
                                    </b>
                                </div>
                                <div className="subs-title">
                                    <FormattedMessage id="home-header.select-room" />
                                </div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <b>
                                        <FormattedMessage id="home-header.doctor" />
                                    </b>
                                </div>
                                <div className="subs-title">
                                    <FormattedMessage id="home-header.select-doctor" />
                                </div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <b>
                                        <FormattedMessage id="home-header.fee" />
                                    </b>
                                </div>
                                <div className="subs-title">
                                    <FormattedMessage id="home-header.check-health" />
                                </div>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className="support">
                                <i className="fas fa-question-circle"></i>
                                <FormattedMessage id="home-header.support" />
                            </div>
                            <div
                                className={
                                    language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'
                                }
                            >
                                <span onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}>
                                    VI
                                </span>
                            </div>
                            <div
                                className={
                                    language === LANGUAGES.EN ? 'language-en active' : 'language-en'
                                }
                            >
                                <span onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}>
                                    En
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner === true && (
                    <div className="home-header-banner">
                        <div className="content-up">
                            <div className="title1">
                                <FormattedMessage id="banner.title1" />
                            </div>
                            <div className="title2">
                                <FormattedMessage id="banner.title2" />
                            </div>
                            <div className="search">
                                <i className="fas fa-search"></i>
                                <input type="text" />
                            </div>
                        </div>
                        <div className="content-down">
                            <div className="option">
                                <div className="option-child">
                                    <div className="icon-child">
                                        <i className="fas fa-hospital"></i>
                                    </div>
                                    <div className="text-child">
                                        <FormattedMessage id="banner.child1" />
                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child">
                                        <i className="fas fa-hospital"></i>
                                    </div>
                                    <div className="text-child">
                                        <FormattedMessage id="banner.child2" />
                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child">
                                        <i className="fas fa-hospital"></i>
                                    </div>
                                    <div className="text-child">
                                        <FormattedMessage id="banner.child3" />
                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child">
                                        <i className="fas fa-hospital"></i>
                                    </div>
                                    <div className="text-child">
                                        <FormattedMessage id="banner.child4" />
                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child">
                                        <i className="fas fa-hospital"></i>
                                    </div>
                                    <div className="text-child">
                                        <FormattedMessage id="banner.child5" />
                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child">
                                        <i className="fas fa-hospital"></i>
                                    </div>
                                    <div className="text-child">
                                        <FormattedMessage id="banner.child6" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
