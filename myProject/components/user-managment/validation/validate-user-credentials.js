
//email validation
function ValidateEmail(email) {
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.value.match(mailformat)) {
        return true;
    }
    else {
        return false;
    }
}

//email validation
function ValidatePassword(password) {
    if ((password.length)<=6) {
        return true
    }
    else {
        return false;
    }
}
module.exports = { ValidateEmail,ValidatePassword };

