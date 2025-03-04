
function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function validateMobileNumber(mobileNumber) {
    const re = /^\d{10}$/;
    return re.test(mobileNumber);
}

function validateFullName(fullName) {
    const re = /^[a-zA-Z ]{2,30}$/;
    return re.test(fullName);
}

function validateRole(role) {
    const roles = ['user', 'admin'];
    return roles.includes(role);
}

function validatePassword(password) {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    return re.test(password);
}

module.exports = {
    validateEmail,
    validateMobileNumber,
    validateFullName,
    validateRole,
    validatePassword
};