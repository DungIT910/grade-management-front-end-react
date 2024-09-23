export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Cú pháp email cơ bản
    return regex.test(email) && email.endsWith('@ou.edu.vn');
};

export const validateConfirmPassword = (password, confirmPassword) => {
    return password === confirmPassword;
};
