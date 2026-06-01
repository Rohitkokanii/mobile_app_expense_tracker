export const sanitizeOnlyAlphabets = input => {
  if (input) {
    return input.replace(/[^a-zA-Z]/g, ''); // Removes everything except a-z and A-Z
  }
  return '';
};

export const sanitizeAlphabetsAndSpaces = input => {
  if (input) {
    return input.replace(/[^a-zA-Z ]/g, ''); // Allows only a-z, A-Z, and space
  }
  return '';
};
export const sanitizeInputEmail = input => {
  if (input) {
    // Allow only letters, numbers, dot (.), hyphen (-), and @
    let sanitizedInput = input.replace(/[^a-z0-9.@-]/gi, '');
    return sanitizedInput;
  }
};
export const sanitizeInputNumberRemoveWhiteSpace = input => {
  if (typeof input === 'number') {
    return String(input);
  }

  if (typeof input === 'string') {
    return input.replace(/\D/g, '').trim(); // Remove non-digit characters and spaces
  }

  return ''; // Return empty string for invalid input
};
export const sanitizeInputChar = input => {
  if (input) {
    return input.replace(/[^a-zA-Z\s]/g, ''); // Remove characters other than Marathi characters, a-z, A-Z, and space
  }
};

export const sanitizeInputNumber = input => {
  if (input) {
    const inputAsString = String(input); // Convert input to a string
    return inputAsString.replace(/\D/g, ''); // Remove non-digit characters
  }
};
