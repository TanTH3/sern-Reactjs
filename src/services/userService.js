import axios from '../axios';

const handleLoginApi = (email, password) => {
    return axios.post('/api/login', { email, password });
};

const getAllUsers = (id) => {
    return axios.get(`/api/get-all-users?id=${id}`);
};

const createNewUserService = (data) => {
    console.log('check data', data);
    return axios.post('/api/create-new-user', data);
};

const deleteUserService = (id) => {
    return axios.delete('/api/delete-user', { data: { id } });
};
const editUserService = (data) => {
    return axios.post('/api/edit-user', data);
};

const getAllCodeService = (inputType) => {
    return axios.get(`/api/all-code?type=${inputType}`);
};

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`);
};

const getAllDoctorsService = () => {
    return axios.get(`/api/get-all-doctors`);
};
const saveDetailDoctorService = (data) => {
    return axios.post(`/api/save-info-doctors`, data);
};
const getDetailDoctorByIdService = (id) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${id}`);
};

const saveBulkScheduleDoctor = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data);
};

const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`);
};

const getExtraInfoDoctorByIdService = (doctorId) => {
    return axios.get(`/api/get-extra-info-doctor-by-id?doctorId=${doctorId}`);
};

const getProfileDoctorById = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};

const postPatientBookAppointment = (data) => {
    return axios.post(`/api/patient-book-appointment`, data);
};
const postVerifyBookAppointment = (data) => {
    return axios.post(`/api/verify-book-appointment`, data);
};
const createNewSpecialty = (data) => {
    return axios.post(`/api/create-new-specialty`, data);
};
const getAllSpecialty = () => {
    return axios.get(`/api/get-specialty`);
};
const getDetailSpecialtyById = (data) => {
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`);
};
export {
    handleLoginApi,
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeService,
    getTopDoctorHomeService,
    getAllDoctorsService,
    saveDetailDoctorService,
    getDetailDoctorByIdService,
    saveBulkScheduleDoctor,
    getScheduleDoctorByDate,
    getExtraInfoDoctorByIdService,
    getProfileDoctorById,
    postPatientBookAppointment,
    postVerifyBookAppointment,
    createNewSpecialty,
    getAllSpecialty,
    getDetailSpecialtyById,
};
