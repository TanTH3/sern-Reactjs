import React, { Component } from 'react';
import { connect } from 'react-redux';

class HomeFooter extends Component {
    render() {
        return (
            <div className="home-footer">
                <p>
                    &copy; 2023 TanTH3. More info find me
                    <a
                        target="_blank"
                        href="https://www.facebook.com/phamthanhtan.21"
                        style={{ marginLeft: '5px' }}
                    >
                        here
                    </a>
                </p>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
