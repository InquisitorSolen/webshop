/* for sorting the products */
export const compare = (a, b) => {
  if (a.name === b.name) {
    if (a.type < b.type) {
      return -1;
    }
    if (a.type > b.type) {
      return 1;
    }
  } else {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
  }
  return 0;
};

export const compareUser = (a, b) => {
  if (a.familyName === b.familyName) {
    if (a.surname < b.surname) {
      return -1;
    }
    if (a.surname > b.surname) {
      return 1;
    }
  } else {
    if (a.familyName < b.familyName) {
      return -1;
    }
    if (a.familyName > b.familyName) {
      return 1;
    }
  }
  return 0;
};

export const numberWithSpaces = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};
