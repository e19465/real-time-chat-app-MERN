const otpGenerator = require("otp-generator");
const { v4: uuidv4 } = require("uuid");

const generateOtp = (num) => {
  return otpGenerator.generate(num, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });
};

const passwordStrengthChecker = (password) => {
  // 1. at least 8 characters
  // 2. at least 1 numeric character
  // 3. at least 1 lowercase letter
  // 4. at least 1 uppercase letter
  // 5. at least 1 special character
  // 6. no whitespace
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.*\s).{8,}$/;
  return regex.test(password);
};

const normalizeEmail = (email) => {
  if (!email || typeof email !== "string") {
    throw new Error("Invalid email");
  }

  let [localPart, domainPart] = email.trim().split("@");

  if (!localPart || !domainPart) {
    throw new Error("Invalid email format");
  }

  domainPart = domainPart.toLowerCase();

  // Apply Gmail-specific rules
  if (domainPart === "gmail.com" || domainPart === "googlemail.com") {
    localPart = localPart.split("+")[0]; // Remove everything after '+'
    localPart = localPart.replace(/\./g, ""); // Remove dots
    domainPart = "gmail.com"; // Standardize domain
  }

  return `${localPart}@${domainPart}`;
};

const getUniqueId = () => {
  return uuidv4();
};

module.exports = {
  generateOtp,
  passwordStrengthChecker,
  normalizeEmail,
  getUniqueId,
};
