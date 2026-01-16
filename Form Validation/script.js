const form = document.getElementById('registrationForm');
const formMessage = document.getElementById('formMessage');

const fullname = document.getElementById('fullName');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('conformPassword');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('conformPasswordError');

// Validate a full name

function validateName(){
    const name = fullname.value.trim();
    if (name === ''){
        return 'Name is required.';
    }
    if (name.length < 2){
        return 'Name must be at aleast 2 character long.'
    }
    return ''; // no error
}
function validateEmail(){
    const emailValue = email.value.trim();
    if (emailValue === ' '){
        return 'there must be value inserted';
    }
  
    return '';
}

function validatePassword(){
    const passwordValue = password.value;
    if (passwordValue === ''){
        return 'Password can not be empty';
    }
    if (passwordValue.length < 8){
        return 'weak password, password must be atleast 8 chars long';
    }
    return '';

}

function validateConfirmPassword(){
    const confirmPasswordValue = confirmPassword.value;
    const passwordValue = password.value;
    if (confirmPasswordValue === ''){
        return 'please confirm password';
    }
    if (confirmPasswordValue !==  passwordValue){
        return ' password do not match'
    }
    return '';
}

function showError(inputField, errorElement, message){
    errorElement.textContent = message;
    inputField.classList.add('invalid');
    inputField.classList.remove('valid');
}

function showSuccess(inputField, errorElement){
    errorElement.textContent = '';
    inputField.classList.add('valid');
    inputField.classList.remove('invalid');
}

// real time validation

fullname.addEventListener('input', ()=>{
    const errorMsg = validateName();
    if (errorMsg){
        showError(fullname, nameError, errorMsg);
        
    }
    else{
        showSuccess(fullname, nameError)
    }
});

// realtime validation for password 

password.addEventListener('input', ()=>{
    const errorMsg = validatePassword();

    const confirmErrorMsg = validateConfirmPassword();
    if (errorMsg){
        showError(password, passwordError, errorMsg);
    }else{
        showSuccess(password, passwordError);
    }

    if (confirmPassword.value){
        if(confirmErrorMsg){
            showError(confirmPassword, confirmPasswordError, confirmErrorMsg);
        }else{
            showSuccess(confirmPassword, confirmPasswordError);
        }
    }
}
);

email.addEventListener('input', ()=>{
    const errorMsg = validateEmail();
    if (errorMsg){
        showError(email, emailError, errorMsg);
    }else{
        showSuccess(email, emailError);
    }
    
});

form.addEventListener('submit', function(event){
    event.preventDefault();

    const nameErrorMsg = validateName();
    const emailErrorMsg = validateEmail();
    const passwordErrorMsg = validatePassword();
    const confirmPasswordErrorMsg = validateConfirmPassword();

    if(nameErrorMsg) showError(fullname, nameError, nameErrorMsg);
    else showSuccess(fullname, nameError)

    if (emailErrorMsg) showError(email, emailError, emailErrorMsg);
    else showSuccess(email, emailError);

    if (passwordErrorMsg) showError(password, passwordError, passwordErrorMsg);
    else showSuccess(password, passwordError);

    if (confirmPasswordErrorMsg) showError(confirmPassword, confirmPasswordError, confirmPasswordErrorMsg);
    else showSuccess(confirmPassword, confirmPasswordError);

    const isFormValid = !nameErrorMsg && !passwordErrorMsg && !confirmPasswordErrorMsg;

    if (isFormValid){
        formMessage.textContent = 'Registration successful!';
        formMessage.className = 'success';
    
        console.log('Form Data:',{
            name:  fullname.value,
            email: email.value,
            password: password.value

    });
}else{
    formMessage.textContent = 'please fix the errors above';
    formMessage.className ='error';
}


});
