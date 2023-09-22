import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

class About extends Component {
    render() {
        return (
            <div className="section-share section-about">
                <div className="section-about-header">Truyen thong noi gi</div>
                <div className="section-about-content">
                    <div className="content-left">
                        <iframe
                            width="100%"
                            height="400px"
                            src="https://www.youtube.com/embed/cupV7zcVWS8?si=L8vZEh2FMiIV9iTc"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen
                        ></iframe>
                    </div>
                    <div className="content-right">
                        Ngày nay có rất nhiều vấn đề sức khỏe tâm thần của trẻ em được quan tâm, một
                        trong số đó không thể không nhắc đến , hay gọi chính xác là rối loạn phổ tự
                        kỷ, vốn là một rối loạn tâm sinh lý gây ra khiếm khuyết trong phát triển về
                        khả năng hành vi và hòa nhập xã hội, khiến trẻ mất nhiều cơ hội học tập và
                        kết bạn, từ đó giảm khả năng tư duy, học hỏi.
                    </div>
                </div>
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
    return {
        // changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
