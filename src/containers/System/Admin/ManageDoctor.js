import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.scss';
import Select from 'react-select';
import { LANGUAGES, CRUD_ACTIONS } from '../../../utils';
import { getDetailDoctorByIdService } from '../../../services/userService';

const option = [
    { value: 'chocolate', label: 'chocolate' },
    { value: 'strawberry', label: 'strawberry' },
    { value: 'vanilla', label: 'vanilla' },
];

const mdParser = new MarkdownIt();

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            listDoctor: [],
            hasOldData: false,

            listPrice: [],
            listPayment: [],
            listProvince: [],
            listClinic: [],
            listSpecialty: [],

            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedClinic: '',
            selectedSpecialty: '',

            nameClinic: '',
            addressClinic: '',
            note: '',
            clinicId: '',
            specialtyId: '',
        };
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.getAllRequiredDoctorInfo();
    }

    buildDataInputSelect = (inputData, type) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            if (type === 'USER') {
                inputData.map((item, i) => {
                    let object = {};
                    let labelVi = `${item.lastName} ${item.firstName}`;
                    let labelEn = `${item.firstName} ${item.lastName}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push(object);
                });
            }
            if (type === 'PRICE') {
                inputData.map((item, i) => {
                    let object = {};
                    let labelVi = `${item.valueVi} `;
                    let labelEn = `${item.valueEn} USD`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                });
            }
            if (type === 'PAYMENT' || type === 'PROVINCE') {
                inputData.map((item, i) => {
                    let object = {};
                    let labelVi = `${item.valueVi} `;
                    let labelEn = `${item.valueEn} `;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                });
            }

            if (type === 'SPECIALTY') {
                inputData.map((item, i) => {
                    let object = {};
                    object.label = item.name;
                    object.value = item.id;
                    result.push(object);
                });
            }
            if (type === 'CLINIC') {
                inputData.map((item, i) => {
                    let object = {};
                    object.label = item.name;
                    object.value = item.id;
                    result.push(object);
                });
            }
        }
        return result;
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USER');
            this.setState({
                listDoctor: dataSelect,
            });
        }
        if (prevProps.language !== this.props.language) {
            let { resPayment, resPrice, resProvince, resSpecialty, resClinic } =
                this.props.allRequiredDoctorInfo;
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
            let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY');
            let dataSelectClinic = this.buildDataInputSelect(resClinic, 'CLINIC');
            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listSpecialty: dataSelectSpecialty,
                listClinic: dataSelectClinic,
            });
        }

        if (prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo) {
            let { resPayment, resPrice, resProvince, resSpecialty, resClinic } =
                this.props.allRequiredDoctorInfo;
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
            let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY');
            let dataSelectClinic = this.buildDataInputSelect(resClinic, 'CLINIC');

            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listSpecialty: dataSelectSpecialty,
                listClinic: dataSelectClinic,
            });
        }
    }

    handleGetData = () => {
        this.props.getDetailDoctorById(this.state.currentId);
        if (this.props.detailDoctor.Markdown) {
            this.setState({
                contentMarkdown: this.props.detailDoctor.Markdown.contentMarkdown,
                contentHTML: this.props.detailDoctor.Markdown.contentHTML,
                description: this.props.detailDoctor.Markdown.description,
            });
        }
    };

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        });
    };
    handleSaveContentMarkdown = () => {
        let { hasOldData } = this.state;
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            selectedSpecialty: this.state.selectedSpecialty.value,
            selectedClinic: this.state.selectedClinic.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
            clinicId:
                this.state.selectedClinic && this.state.selectedClinic.value
                    ? this.state.selectedClinic.value
                    : '',
            specialtyId: this.state.selectedSpecialty.value,
        });
    };
    handleChangeSelect = async (selectedOption) => {
        this.setState({
            selectedOption,
        });
        let { listPayment, listPrice, listProvince, listSpecialty, listClinic } = this.state;
        let res = await getDetailDoctorByIdService(selectedOption.value);
        console.log(res);
        if (res && res.data.data.Markdown) {
            let markdown = res.data.data.Markdown;
            let selectedPrice = '',
                selectedPayment = '',
                selectedProvince = '',
                selectedSpecialty = '',
                selectedClinic = '',
                specialtyId = '',
                provinceId = '',
                priceId = '',
                paymentId = '',
                clinicId = '',
                nameClinic = '',
                addressClinic = '',
                note = '';
            let doctor_info = res.data.data.Doctor_Info;
            if (res.data.data.Doctor_Info) {
                priceId = doctor_info.priceId;
                paymentId = doctor_info.paymentId;
                provinceId = doctor_info.provinceId;
                clinicId = doctor_info.clinicId;
                nameClinic = doctor_info.nameClinic;
                addressClinic = doctor_info.addressClinic;
                specialtyId = doctor_info.specialtyId;
                note = doctor_info.note;

                selectedPayment = listPayment.find((item) => {
                    return item && item.value === paymentId;
                });
                selectedPrice = listPrice.find((item) => {
                    return item && item.value === priceId;
                });
                selectedProvince = listProvince.find((item) => {
                    return item && item.value === provinceId;
                });
                selectedSpecialty = listSpecialty.find((item) => {
                    return item && item.value === specialtyId;
                });
                selectedClinic = listClinic.find((item) => {
                    return item && item.value === clinicId;
                });
            }

            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,

                selectedPrice,
                selectedPayment,
                selectedProvince,
                selectedSpecialty,
                selectedClinic,
                nameClinic,
                addressClinic,
                note,
            });
        } else {
            this.setState({
                contentMarkdown: '',
                contentHTML: '',
                description: '',
                hasOldData: false,
                nameClinic: '',
                addressClinic: '',
                note: '',

                selectedPrice: '',
                selectedPayment: '',
                selectedProvince: '',
                selectedSpecialty: '',
                selectedClinic: '',
            });
        }
    };

    handleOnChangeSelectDoctorInfo = async (selectedOption, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state };
        stateCopy[stateName] = selectedOption;
        this.setState({
            ...stateCopy,
        });
    };

    handleOnChangeText = (e, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = e.target.value;
        this.setState({
            ...stateCopy,
        });
    };

    render() {
        let { hasOldData } = this.state;

        return (
            <div className="manage-doctor-container">
                <div className="manage-doctor-title">
                    <FormattedMessage id="admin.manage-doctor.title" />
                </div>
                <div className="more-info">
                    <div className="content-left form-group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.select-doctor" />
                        </label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctor}
                            placeholder={
                                <FormattedMessage id="admin.manage-doctor.select-doctor" />
                            }
                        />
                    </div>
                    <div className="content-right">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.intro" />
                        </label>
                        <textarea
                            className="form-control"
                            rows="4"
                            onChange={(e) => this.handleOnChangeText(e, 'description')}
                            value={this.state.description}
                        ></textarea>
                    </div>
                </div>
                <div className="more-info-extra row">
                    <div className="col-4 form-group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.price" />
                        </label>
                        <Select
                            options={this.state.listPrice}
                            value={this.state.selectedPrice}
                            onChange={this.handleOnChangeSelectDoctorInfo}
                            placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
                            name="selectedPrice"
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.payment" />
                        </label>
                        <Select
                            options={this.state.listPayment}
                            value={this.state.selectedPayment}
                            onChange={this.handleOnChangeSelectDoctorInfo}
                            placeholder={<FormattedMessage id="admin.manage-doctor.payment" />}
                            name="selectedPayment"
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.province" />
                        </label>
                        <Select
                            options={this.state.listProvince}
                            value={this.state.selectedProvince}
                            onChange={this.handleOnChangeSelectDoctorInfo}
                            placeholder={<FormattedMessage id="admin.manage-doctor.province" />}
                            name="selectedProvince"
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.nameClinic" />
                        </label>
                        <input
                            className="form-control"
                            onChange={(e) => this.handleOnChangeText(e, 'nameClinic')}
                            value={this.state.nameClinic}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.addressClinic" />
                        </label>
                        <input
                            className="form-control"
                            onChange={(e) => this.handleOnChangeText(e, 'addressClinic')}
                            value={this.state.addressClinic}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.note" />
                        </label>
                        <input
                            className="form-control"
                            onChange={(e) => this.handleOnChangeText(e, 'note')}
                            value={this.state.note}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-4 form-group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.specialty" />
                        </label>
                        <Select
                            value={this.state.selectedSpecialty}
                            options={this.state.listSpecialty}
                            placeholder={<FormattedMessage id="admin.manage-doctor.specialty" />}
                            onChange={this.handleOnChangeSelectDoctorInfo}
                            name="selectedSpecialty"
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.select-clinic" />
                        </label>
                        <Select
                            value={this.state.selectedClinic}
                            options={this.state.listClinic}
                            placeholder={
                                <FormattedMessage id="admin.manage-doctor.select-doctor" />
                            }
                            onChange={this.handleOnChangeSelectDoctorInfo}
                            name="selectedClinic"
                        />
                    </div>
                </div>
                <div className="manage-doctor-editor">
                    <MdEditor
                        style={{ height: '300px' }}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button
                    onClick={() => this.handleSaveContentMarkdown()}
                    className={
                        hasOldData === true ? 'save-content-doctor' : 'create-content-doctor'
                    }
                >
                    {hasOldData === true ? (
                        <span>
                            <FormattedMessage id="admin.manage-doctor.save" />
                        </span>
                    ) : (
                        <span>
                            <FormattedMessage id="admin.manage-doctor.add" />
                        </span>
                    )}
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
        getAllRequiredDoctorInfo: () => dispatch(actions.getAllRequiredDoctorInfo()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
