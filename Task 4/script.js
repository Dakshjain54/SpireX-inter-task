document.addEventListener('DOMContentLoaded', () => {
  // DOM ELEMENTS SELECTION
  // Header Elements
  const formTitle = document.getElementById('form-title');
  const formSubtitle = document.getElementById('form-subtitle');

  // Forms
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');

  // Switch Link & Text
  const switchBtn = document.getElementById('switch-btn');
  const switchText = document.getElementById('switch-text');

  // Login Inputs
  const loginEmail = document.getElementById('login-email');
  const loginPassword = document.getElementById('login-password');
  const loginBtn = document.getElementById('login-btn');

  // Signup Inputs
  const signupName = document.getElementById('signup-name');
  const signupEmail = document.getElementById('signup-email');
  const signupPhone = document.getElementById('signup-phone');
  const signupPassword = document.getElementById('signup-password');
  const signupConfirmPassword = document.getElementById('signup-confirm-password');
  const signupBtn = document.getElementById('signup-btn');

  // Password Strength Elements
  const strengthContainer = document.getElementById('strength-container');
  const strengthBar = document.getElementById('strength-bar');
  const strengthLabel = document.getElementById('strength-label');

  // Password Toggle Buttons
  const togglePasswordBtns = document.querySelectorAll('.toggle-password');

  // Success Modal
  const successModal = document.getElementById('success-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalMessage = document.getElementById('modal-message');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  // State Tracking
  let currentForm = 'login';
  // FORM SWITCHING LOGIC & ANIMATIONS
  switchBtn.addEventListener('click', () => {
    if (currentForm === 'login') {
      switchToSignup();
    } else {
      switchToLogin();
    }
  });

  function switchToSignup() {
    currentForm = 'signup';

    // Animate out Login Form
    loginForm.classList.add('slide-out-left');

    setTimeout(() => {
      loginForm.classList.remove('active', 'slide-out-left');
      loginForm.classList.add('hidden');

      // Update Header Text
      formTitle.textContent = 'Create Account';
      formSubtitle.textContent = 'Join us today! Enter your details below to get started.';

      // Update Switch Footer Link
      switchText.innerHTML = 'Already have an account? <button type="button" id="switch-btn" class="switch-link">Login</button>';
      rebindSwitchBtn();

      // Animate in Signup Form
      signupForm.classList.remove('hidden');
      signupForm.classList.add('active', 'slide-in-right');

      // Re-validate signup form state
      validateSignupForm();

      setTimeout(() => {
        signupForm.classList.remove('slide-in-right');
      }, 400);
    }, 250);
  }

  function switchToLogin() {
    currentForm = 'login';

    // Animate out Signup Form
    signupForm.classList.add('slide-out-right');

    setTimeout(() => {
      signupForm.classList.remove('active', 'slide-out-right');
      signupForm.classList.add('hidden');

      // Update Header Text
      formTitle.textContent = 'Welcome Back';
      formSubtitle.textContent = 'Please enter your credentials to access your account.';

      // Update Switch Footer Link
      switchText.innerHTML = 'Don\'t have an account? <button type="button" id="switch-btn" class="switch-link">Sign Up</button>';
      rebindSwitchBtn();

      // Animate in Login Form
      loginForm.classList.remove('hidden');
      loginForm.classList.add('active', 'slide-in-left');

      // Re-validate login form state
      validateLoginForm();

      setTimeout(() => {
        loginForm.classList.remove('slide-in-left');
      }, 400);
    }, 250);
  }

  function rebindSwitchBtn() {
    const newSwitchBtn = document.getElementById('switch-btn');
    if (newSwitchBtn) {
      newSwitchBtn.addEventListener('click', () => {
        if (currentForm === 'login') {
          switchToSignup();
        } else {
          switchToLogin();
        }
      });
    }
  }
  // SHOW / HIDE PASSWORD TOGGLE
  togglePasswordBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const targetInput = document.getElementById(targetId);
      const eyeIcon = btn.querySelector('.eye-icon');
      const eyeOffIcon = btn.querySelector('.eye-off-icon');

      if (targetInput.type === 'password') {
        targetInput.type = 'text';
        eyeIcon.classList.add('hidden');
        eyeOffIcon.classList.remove('hidden');
      } else {
        targetInput.type = 'password';
        eyeIcon.classList.remove('hidden');
        eyeOffIcon.classList.add('hidden');
      }
    });
  });
  // VALIDATION HELPER FUNCTIONS
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const digitsOnlyRegex = /^\d+$/;

  function setFieldValid(input, errorElement) {
    const wrapper = input.closest('.input-wrapper');
    wrapper.classList.remove('invalid');
    wrapper.classList.add('valid');
    if (errorElement) {
      errorElement.textContent = '';
      errorElement.classList.remove('visible');
    }
  }

  function setFieldInvalid(input, errorElement, message) {
    const wrapper = input.closest('.input-wrapper');
    wrapper.classList.remove('valid');
    wrapper.classList.add('invalid');
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.classList.add('visible');
    }
  }

  function resetFieldState(input, errorElement) {
    const wrapper = input.closest('.input-wrapper');
    wrapper.classList.remove('valid', 'invalid');
    if (errorElement) {
      errorElement.textContent = '';
      errorElement.classList.remove('visible');
    }
  }
  // LOGIN FORM VALIDATION
  function validateLoginEmail(showError = true) {
    const val = loginEmail.value.trim();
    const errorEl = document.getElementById('login-email-error');

    if (val === '') {
      if (showError) setFieldInvalid(loginEmail, errorEl, 'Email address is required.');
      return false;
    } else if (!emailRegex.test(val)) {
      if (showError) setFieldInvalid(loginEmail, errorEl, 'Please enter a valid email address.');
      return false;
    } else {
      setFieldValid(loginEmail, errorEl);
      return true;
    }
  }

  function validateLoginPassword(showError = true) {
    const val = loginPassword.value;
    const errorEl = document.getElementById('login-password-error');

    if (val === '') {
      if (showError) setFieldInvalid(loginPassword, errorEl, 'Password is required.');
      return false;
    } else if (val.length < 6) {
      if (showError) setFieldInvalid(loginPassword, errorEl, 'Password must be at least 6 characters.');
      return false;
    } else {
      setFieldValid(loginPassword, errorEl);
      return true;
    }
  }

  function validateLoginForm() {
    const isEmailValid = validateLoginEmail(false);
    const isPasswordValid = validateLoginPassword(false);

    loginBtn.disabled = !(isEmailValid && isPasswordValid);
    return isEmailValid && isPasswordValid;
  }

  // Event Listeners for Login Inputs
  loginEmail.addEventListener('input', () => {
    validateLoginEmail(true);
    validateLoginForm();
  });
  loginEmail.addEventListener('blur', () => {
    validateLoginEmail(true);
  });

  loginPassword.addEventListener('input', () => {
    validateLoginPassword(true);
    validateLoginForm();
  });
  loginPassword.addEventListener('blur', () => {
    validateLoginPassword(true);
  });
  // SIGNUP FORM VALIDATION
  function validateSignupName(showError = true) {
    const val = signupName.value.trim();
    const errorEl = document.getElementById('signup-name-error');

    if (val === '') {
      if (showError) setFieldInvalid(signupName, errorEl, 'Full name is required.');
      return false;
    } else if (val.length < 2) {
      if (showError) setFieldInvalid(signupName, errorEl, 'Name must be at least 2 characters.');
      return false;
    } else {
      setFieldValid(signupName, errorEl);
      return true;
    }
  }

  function validateSignupEmail(showError = true) {
    const val = signupEmail.value.trim();
    const errorEl = document.getElementById('signup-email-error');

    if (val === '') {
      if (showError) setFieldInvalid(signupEmail, errorEl, 'Email address is required.');
      return false;
    } else if (!emailRegex.test(val)) {
      if (showError) setFieldInvalid(signupEmail, errorEl, 'Please enter a valid email address.');
      return false;
    } else {
      setFieldValid(signupEmail, errorEl);
      return true;
    }
  }

  function validateSignupPhone(showError = true) {
    const val = signupPhone.value.trim();
    const errorEl = document.getElementById('signup-phone-error');

    if (val === '') {
      if (showError) setFieldInvalid(signupPhone, errorEl, 'Phone number is required.');
      return false;
    } else if (!digitsOnlyRegex.test(val)) {
      if (showError) setFieldInvalid(signupPhone, errorEl, 'Phone number should contain only digits.');
      return false;
    } else if (val.length < 7 || val.length > 15) {
      if (showError) setFieldInvalid(signupPhone, errorEl, 'Phone number must be 7 to 15 digits.');
      return false;
    } else {
      setFieldValid(signupPhone, errorEl);
      return true;
    }
  }

  function validateSignupPassword(showError = true) {
    const val = signupPassword.value;
    const errorEl = document.getElementById('signup-password-error');

    // Update Strength Indicator
    updatePasswordStrength(val);

    if (val === '') {
      if (showError) setFieldInvalid(signupPassword, errorEl, 'Password is required.');
      return false;
    } else if (val.length < 6) {
      if (showError) setFieldInvalid(signupPassword, errorEl, 'Password must be at least 6 characters.');
      return false;
    } else {
      setFieldValid(signupPassword, errorEl);
      return true;
    }
  }

  function validateSignupConfirmPassword(showError = true) {
    const val = signupConfirmPassword.value;
    const passVal = signupPassword.value;
    const errorEl = document.getElementById('signup-confirm-password-error');

    if (val === '') {
      if (showError) setFieldInvalid(signupConfirmPassword, errorEl, 'Please confirm your password.');
      return false;
    } else if (val !== passVal) {
      if (showError) setFieldInvalid(signupConfirmPassword, errorEl, 'Passwords do not match.');
      return false;
    } else {
      setFieldValid(signupConfirmPassword, errorEl);
      return true;
    }
  }

  function validateSignupForm() {
    const isNameValid = validateSignupName(false);
    const isEmailValid = validateSignupEmail(false);
    const isPhoneValid = validateSignupPhone(false);
    const isPasswordValid = validateSignupPassword(false);
    const isConfirmValid = validateSignupConfirmPassword(false);

    const isFormValid = isNameValid && isEmailValid && isPhoneValid && isPasswordValid && isConfirmValid;
    signupBtn.disabled = !isFormValid;
    return isFormValid;
  }

  // Event Listeners for Signup Inputs
  signupName.addEventListener('input', () => {
    validateSignupName(true);
    validateSignupForm();
  });
  signupName.addEventListener('blur', () => {
    validateSignupName(true);
  });

  signupEmail.addEventListener('input', () => {
    validateSignupEmail(true);
    validateSignupForm();
  });
  signupEmail.addEventListener('blur', () => {
    validateSignupEmail(true);
  });

  signupPhone.addEventListener('input', () => {
    validateSignupPhone(true);
    validateSignupForm();
  });
  signupPhone.addEventListener('blur', () => {
    validateSignupPhone(true);
  });

  signupPassword.addEventListener('input', () => {
    validateSignupPassword(true);
    if (signupConfirmPassword.value.length > 0) {
      validateSignupConfirmPassword(true);
    }
    validateSignupForm();
  });
  signupPassword.addEventListener('blur', () => {
    validateSignupPassword(true);
  });

  signupConfirmPassword.addEventListener('input', () => {
    validateSignupConfirmPassword(true);
    validateSignupForm();
  });
  signupConfirmPassword.addEventListener('blur', () => {
    validateSignupConfirmPassword(true);
  });
  // PASSWORD STRENGTH INDICATOR LOGIC
  function updatePasswordStrength(password) {
    if (!password) {
      strengthContainer.classList.remove('active');
      strengthContainer.className = 'strength-meter-container';
      return;
    }

    strengthContainer.classList.add('active');

    let score = 0;
    if (password.length >= 6) score += 1;
    if (password.length >= 10) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    strengthContainer.className = 'strength-meter-container active';

    if (password.length < 6 || score <= 2) {
      strengthContainer.classList.add('strength-weak');
      strengthLabel.textContent = 'Weak Password';
    } else if (score === 3 || score === 4) {
      strengthContainer.classList.add('strength-medium');
      strengthLabel.textContent = 'Medium Strength Password';
    } else {
      strengthContainer.classList.add('strength-strong');
      strengthLabel.textContent = 'Strong Password';
    }
  }
  // FORM SUBMISSION & SUCCESS POPUP
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateLoginForm()) {
      showSuccessModal('Login Successful!', `Welcome back, ${loginEmail.value}! You have successfully logged into your account.`);
    }
  });

  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateSignupForm()) {
      showSuccessModal('Account Created!', `Welcome aboard, ${signupName.value}! Your account has been created successfully.`);
    }
  });

  function showSuccessModal(title, message) {
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    successModal.classList.remove('hidden');
  }

  modalCloseBtn.addEventListener('click', () => {
    successModal.classList.add('hidden');
    resetAllForms();
  });

  // Close modal when clicking outside modal-card
  successModal.addEventListener('click', (e) => {
    if (e.target === successModal) {
      successModal.classList.add('hidden');
      resetAllForms();
    }
  });

  // Forgot password click alert
  const forgotLink = document.getElementById('forgot-password-link');
  if (forgotLink) {
    forgotLink.addEventListener('click', (e) => {
      e.preventDefault();
      const email = loginEmail.value.trim();
      if (email && emailRegex.test(email)) {
        showSuccessModal('Password Reset Sent!', `A password reset link has been sent to ${email}. Please check your inbox.`);
      } else {
        showSuccessModal('Reset Password', 'Please enter your registered email address in the Login form to receive a password reset link.');
      }
    });
  }

  function resetAllForms() {
    loginForm.reset();
    signupForm.reset();

    resetFieldState(loginEmail, document.getElementById('login-email-error'));
    resetFieldState(loginPassword, document.getElementById('login-password-error'));
    resetFieldState(signupName, document.getElementById('signup-name-error'));
    resetFieldState(signupEmail, document.getElementById('signup-email-error'));
    resetFieldState(signupPhone, document.getElementById('signup-phone-error'));
    resetFieldState(signupPassword, document.getElementById('signup-password-error'));
    resetFieldState(signupConfirmPassword, document.getElementById('signup-confirm-password-error'));

    updatePasswordStrength('');

    loginBtn.disabled = true;
    signupBtn.disabled = true;
  }
});
