import axios from "axios";

export const BASE_URL = 'http://localhost:8080/GradeManagement/';

export const courseAPIs = {
    'getCourse': '/api/v1/courses/search'
}

export const studentAPIs = {
    'createStudents': '/api/v1/students',
    'getStudents': '/api/v1/students/search'
}

export const authAPIs = {
    'login': '/api/v1/auth/token',
    'current-user': '/api/v1/auth/currentUser'
}

export default axios.create({
    baseURL: BASE_URL
});