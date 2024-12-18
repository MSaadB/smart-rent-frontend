const VALIDATOR_TYPE_REQUIRE = "REQUIRE";
const VALIDATOR_TYPE_MINLENGTH = "MINLENGTH";
const VALIDATOR_TYPE_MAXLENGTH = "MAXLENGTH";
const VALIDATOR_TYPE_MIN = "MIN";
const VALIDATOR_TYPE_MAX = "MAX";
const VALIDATOR_TYPE_EMAIL = "EMAIL";
const VALIDATOR_TYPE_FILE = "FILE";
const VALIDATOR_TYPE_YESNO = "YESNO";
const VALIDATOR_TYPE_PROPERTY_TYPE = "PROPERTY_TYPE";

export const VALIDATOR_REQUIRE = () => ({ type: VALIDATOR_TYPE_REQUIRE });
export const VALIDATOR_FILE = () => ({ type: VALIDATOR_TYPE_FILE });
export const VALIDATOR_MINLENGTH = (val) => ({
  type: VALIDATOR_TYPE_MINLENGTH,
  val: val,
});
export const VALIDATOR_MAXLENGTH = (val) => ({
  type: VALIDATOR_TYPE_MAXLENGTH,
  val: val,
});
export const VALIDATOR_MIN = (val) => ({ type: VALIDATOR_TYPE_MIN, val: val });
export const VALIDATOR_MAX = (val) => ({ type: VALIDATOR_TYPE_MAX, val: val });
export const VALIDATOR_EMAIL = () => ({ type: VALIDATOR_TYPE_EMAIL });
export const VALIDATOR_FUTURE_DATE = () => ({
  type: "FUTURE_DATE",
});
export const VALIDATOR_URL = () => ({
  type: "URL",
});

export const VALIDATOR_PHONE = () => ({
  type: "PHONE",
});

export const VALIDATOR_PASSWORD = () => ({
  type: "PASSWORD",
});

export const VALIDATOR_YESNO = () => ({ type: VALIDATOR_TYPE_YESNO });
export const VALIDATOR_PROPERTY_TYPE = () => ({
  type: VALIDATOR_TYPE_PROPERTY_TYPE,
});

export const validate = (value, validators) => {
  let isValid = true;
  for (const validator of validators) {
    if (validator.type === VALIDATOR_TYPE_REQUIRE) {
      isValid = isValid && value.trim().length > 0;
    }
    if (validator.type === VALIDATOR_TYPE_MINLENGTH) {
      isValid = isValid && value.trim().length >= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MAXLENGTH) {
      isValid = isValid && value.trim().length <= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MIN) {
      isValid = isValid && +value >= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MAX) {
      isValid = isValid && +value <= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_EMAIL) {
      isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
    }
    if (validator.type === "FUTURE_DATE") {
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      isValid = isValid && selectedDate > today;
    }
    if (validator.type === "URL") {
      const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
      isValid = isValid && urlPattern.test(value);
    }
    if (validator.type === "PHONE") {
      const phoneRegex = /^\d{10}$/;
      isValid = isValid && phoneRegex.test(value);
    }
    if (validator.type === "PASSWORD") {
      const passwordRegexUpper = /[A-Z]/;
      const passwordRegexNumber = /[0-9]/;
      const minLength = 8;

      isValid =
        isValid &&
        value.length >= minLength &&
        passwordRegexUpper.test(value) &&
        passwordRegexNumber.test(value);
    }
    if (validator.type === VALIDATOR_TYPE_YESNO) {
      isValid = isValid && (value.toLowerCase() === "yes" || value.toLowerCase() === "no");
    }
    if (validator.type === VALIDATOR_TYPE_PROPERTY_TYPE) {
      const validTypes = ["room", "basement", "apartment", "house"];
      isValid = isValid && validTypes.includes(value.toLowerCase());
    }
  }
  return isValid;
};