export function pwCheck(password) {
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
    return true;
  }
  if (!/[a-z]/.test(password)) {
    return true;
  }
  if (!/[A-Z]/.test(password)) {
    return true;
  }
  if (!/\d/.test(password)) {
    return true;
  }
  if (!specialChars.test(password)) {
    return true;
  }
  return false;
}

export function asciify(name) {
  const combining = /[\u0300-\u036F]/g;
  const asciiName = name
    .replace(/\s/g, "")
    .normalize("NFKD")
    .replace(combining, "");
  return asciiName;
}
