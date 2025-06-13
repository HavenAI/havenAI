export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!email.trim()) {
        return 'Email is required';
    }
    if(!emailRegex.test(email)) {
        return 'Enter a valid email address';
    }
    return '';
}

export const validatePassword = (password) => {
    if(!password.trim()) {
        return 'Password is required'; 
    }
    if(password.length < 6) {
        return 'Password must be at least 8 characters'; 
    }
    return '';
}

export const validateConfirmPassword = (password, confirmPassword) => {
    if(!confirmPassword.trim()) {
        return 'Please Confirm your password'; 
    }
    if(password !== confirmPassword) {
        return 'Passwords do not match';
    }
    return '';
}