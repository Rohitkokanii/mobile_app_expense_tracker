export function validatePassword(password) {
  const errors = [];

  if (!password) {
    return 'Please Enter Password';
  } else {
    if (password.length < 8) {
      errors.push('at least 8 characters');
    }

    if (!/[A-Z]/.test(password)) {
      errors.push('one uppercase letter');
    }

    if (!/[a-z]/.test(password)) {
      errors.push('one lowercase letter');
    }

    if (!/[0-9]/.test(password)) {
      errors.push('one number');
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('one special character');
    }
  }

  if (errors.length > 0) {
    return 'Password must contain ' + errors.join(', ') + '.';
  }

  return false; // No errors
}

export function validatePhoneNumber(params, NoInputError, ValidError) {
  if (params) {
    const regex = /^\d{10}$/;
    if (regex.test(params)) {
      return false;
    } else {
      return ValidError || 'Please enter a valid contact number.';
    }
  } else {
    return NoInputError || 'Please enter your contact number.';
  }
}

export function validateName(params, NoInputError, ValidError) {
  if (params) {
    var regex = /^[\u0900-\u0965a-zA-Z\s]+$/;
    if (regex.test(params)) {
      return false;
    } else {
      return ValidError || 'Please Enter Valid Input!';
    }
  } else {
    return NoInputError || 'Please Enter Input!';
  }
}

export function validateNumber(params, Error2, Error1) {
  // console.warn({params,CurrentLanguage})
  if (params) {
    var regex = /^\d+$/;
    if (regex.test(params)) {
      return false;
    } else {
      return Error1 || 'Please Enter Valid Number!';
    }
  } else {
    return Error2 || 'Please Enter Valid Input!';
  }
}

export function validateFloatNumber(params, Error2, Error1) {
  if (params) {
    var regex = /^\d+(\.\d+)?$/; // Regex for floating point number
    if (regex.test(params)) {
      return false;
    } else {
      return Error1 || 'Please Enter a Valid Number!';
    }
  } else {
    return Error2 || 'Please Enter Valid Input!';
  }
}

export function validateAmount(params, Error2, Error1) {
  if (params === '') {
    return Error2 || 'Please Enter Valid Input!';
  } else if (isNaN(params) || params <= 0) {
    return Error1 || 'Amount should be greater than zero and a valid amount!';
  } else {
    return false;
  }
}

export function validateNumberGTO(params, Error2, Error1) {
  // console.warn({params,CurrentLanguage})
  if (params) {
    var regex = /^\d+$/;
    if (regex.test(params)) {
      if (params > 0) {
        return false;
      } else {
        return Error1 || 'Please Enter Valid Number!';
      }
    } else {
      return Error1 || 'Please Enter Valid Number!';
    }
  } else {
    return Error2 || 'Please Enter Valid Input!';
  }
}

export function validateEmail(params, NoInputError, ValidError) {
  if (params) {
    let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (regex.test(params)) {
      return false;
    } else {
      return ValidError || 'Please enter a valid email address.';
    }
  } else {
    return NoInputError || 'Please enter your email address.';
  }
}

export function validateAnyInput(params, ErrorMsg) {
  if (params) {
    return false;
  } else {
    return ErrorMsg || 'Please Enter Input!';
  }
}

export function validateSelectedOptions(params, Error) {
  if (params) {
    return false;
  } else {
    return Error || 'Please Select Date!';
  }
}

export function validateSelectedDatesOptions(date1, date2) {
  if (date1 && date2) {
    return false;
  } else {
    return 'Please Select Date Range!';
  }
}

export function validateIFSCCode(params, ErrorMsg) {
  const ifscRegex = /^[A-Za-z]{4}0[A-Za-z0-9]{6}$/;

  if (params) {
    if (ifscRegex.test(params)) {
      return false;
    } else {
      return 'Invalid IFSC code!';
    }
  } else {
    return ErrorMsg || 'Please Enter Input!';
  }
}
