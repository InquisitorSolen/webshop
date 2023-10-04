export default function pwCheck(password) {
  /* pw must contain:
   *Length 8
   *Uppercase
   *Lowercase
   *Number
   *Special char
   */

  // eslint-disable-next-line no-useless-escape
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  if (!(password.length >= 8)) {
    return "A jelszónak legalább 8 karakter hosszúságúnak kell lennie!";
  }
  if (!/[a-z]/.test(password)) {
    return "A jelszónak tartalmaznia kell kis betüt";
  }
  if (!/[A-Z]/.test(password)) {
    return "A jelszónak tartalmaznia kell nagy betüt";
  }
  if (!/\d/.test(password)) {
    return "A jelszónak tartalmaznia kell számot";
  }
  if (!specialChars.test(password)) {
    return "A jelszónak tartalmaznia kell speciális karaktert";
  }
  return false;
}
