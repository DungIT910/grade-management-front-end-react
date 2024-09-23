import axios from "axios";

export const BASE_URL = 'http://localhost:8080/GradeManagement/';

export const endpoints = {
    'courses': '/api/v1/courses',
    'subjects': '/api/v1/subjects',
}

export const studentAPIs = {
    'register': '/api/v1/students'
}

export const authAPIs = {
    'login': '/api/v1/auth/token',
    'current-user': '/api/v1/auth/currentUser'
}

export default axios.create({
    baseURL: BASE_URL
});