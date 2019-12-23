/* 

https://www.codewars.com/kata/regex-validate-pin-code/javascript

ATM machines allow 4 or 6 digit PIN codes and PIN codes cannot contain anything but exactly 4 digits or exactly 6 digits.
If the function is passed a valid PIN string, return true, else return false.

*/

// MY SOLUTION

function validatePIN(pin) {
  if (pin.length == 4 || pin.length == 6) {
    if (/^\d*$/.test(pin)) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions

// OTHER SOLUTION

function validatePIN(pin) {
  return /^(\d{4}|\d{6})$/.test(pin);
}
// or
const validatePIN = pin => /^(\d{4}$|\d{6}$)/.test(pin);
// solution which use full regex syntax

// ^ : Matches the beginning of input. If the multiline flag is set to true, it also matches immediately after a line break character.
// {n} : Matches exactly "n" occurrences of the preceding expression. "n" must be a positive integer.
// x|y : Matches "x", or "y" (if there is no match for "x").
// $ : Matches the end of input. If the multiline flag is set to true, also matches immediately before a line break character.

function validatePIN(pin) {
  var pinlen = pin.length;
  var isCorrectLength = pinlen == 4 || pinlen == 6;
  var hasOnlyNumbers = pin.match(/^\d+$/);

  if (isCorrectLength && hasOnlyNumbers) {
    return true;
  }

  return false;
}
// Readable

function validatePIN(pin) {
  return (pin.length == 4 || pin.length == 6) && parseInt(pin) == pin;
}
// .parseInt()
