import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageClinic.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from '../../../utils';
import { toast } from 'react-toastify';
import { createNewClinic } from '../../../services/userService';

const mdParser = new MarkdownIt();

class ManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            address: '',
        };
    }

    handleOnchangeInput = (e, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = e.target.value;
        this.setState({
            ...stateCopy,
        });
    };

    handleEditChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text,
        });
    };

    handleOnchangeImage = async (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64,
            });
        }
    };

    handleSaveNewClinic = async () => {
        let res = await createNewClinic(this.state);
        if (res && res.data.errCode === 0) {
            toast.success('Add new specialty succeed');
            this.setState({
                name: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
                address: '',
            });
        } else {
            toast.error('Add new specialty error');
            console.log(res);
        }
    };
    async componentDidMount() {}

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }

    render() {
        let { isShowDetail, extraInfo } = this.state;
        let { language } = this.props;
        return (
            <div className="manage-specialty-container">
                <div className="ms-title">Quản lí chuyên khoa</div>
                <div className="add-new-specialty row">
                    <div className="col-6 form-group">
                        <label>Tên chuyên khoa</label>
                        <input
                            className="form-control"
                            type="text"
                            value={this.state.name}
                            onChange={(e) => this.handleOnchangeInput(e, 'name')}
                        />
                    </div>
                    <div className="col-6 form-group">
                        <label>Địa chỉ</label>
                        <input
                            className="form-control"
                            type="text"
                            value={this.state.address}
                            onChange={(e) => this.handleOnchangeInput(e, 'address')}
                        />
                    </div>
                    <div className="col-6 form-group">
                        <label>ảnh chuyên khoa</label>
                        <input
                            className="form-control-file"
                            type="file"
                            onChange={(e) => this.handleOnchangeImage(e)}
                        />
                    </div>
                    <div className="col-12">
                        <MdEditor
                            style={{ height: '600px' }}
                            renderHTML={(text) => mdParser.render(text)}
                            onChange={this.handleEditChange}
                            value={this.state.descriptionMarkdown}
                        />
                    </div>
                    <div className="col-12">
                        <button
                            className="btn-save-specialty"
                            onClick={() => this.handleSaveNewClinic()}
                        >
                            Save
                        </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
