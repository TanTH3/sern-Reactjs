import React, { Component } from 'react';
import { connect } from 'react-redux';

class About extends Component {
    render() {
        return (
            <div className="section-share section-about">
                <div className="section-about-header">Truyền thông nói gì</div>
                <div className="section-about-content">
                    <div className="content-left">
                        <iframe
                            width="100%"
                            height="400px"
                            src="https://www.youtube.com/embed/FyDQljKtWnI?si=mwExZCIQ5oGt2ez7"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen
                        ></iframe>
                    </div>
                    <div className="content-right">
                        <div>
                            BookingCare là Nền tảng Y tế chăm sóc sức khỏe toàn diện cung cấp nền
                            tảng công nghệ giúp bệnh nhân dễ dàng lựa chọn dịch vụ y tế từ mạng lưới
                            bác sĩ chuyên khoa giỏi, phòng khám/ bệnh viện uy tín với thông tin đã
                            xác thực và đặt lịch nhanh chóng.
                        </div>
                        <div>
                            <span>
                                Chúng tôi hiểu rằng, người bệnh xứng đáng được lựa chọn dịch vụ y tế
                                chất lượng cao, như là:
                            </span>
                            <ul>
                                <li>Đi khám đúng bác sĩ với vấn đề của mình</li>
                                <li>Khám với bác sĩ chuyên khoa giỏi</li>
                                <li>
                                    Thông tin bác sĩ đã được xác thực rõ ràng từ chuyên khoa, quá
                                    trình đào tạo, kinh nghiệm công tác
                                </li>
                                <li>
                                    Cơ sở y tế tiện nghi, giá cả dịch vụ hợp lý, công khai minh bạch
                                </li>
                                <li>Trang thiết bị y tế hiện đại, hỗ trợ chẩn đoán chính xác</li>
                                <li>Giảm thiểu thời gian chờ đợi, xếp hàng</li>
                                <li>Đặt lịch khám đơn giản, bất kỳ lúc nào, ở đâu.</li>
                            </ul>
                        </div>
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
