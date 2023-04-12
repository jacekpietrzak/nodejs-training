const sum = (a, b) => {
  // powinno byc to realizowane poprzez rzucanie bledow i wyjatkow jak tu ponizej
  if (!a || !b) {
    // console.error("Both arguments need to be provided");
    throw "Both arguments need to be provided";
    // return false;
  }

  // tutaj realizowalismy to poprzez zwracanie false - zeby pokazac matcher toBe
  if (Array.isArray(a) || Array.isArray(b)) {
    console.error("Array provided as argument");
    return false;
  }

  if (typeof a === "string" || typeof b === "string") {
    console.error("String provided as argument");
    return false;
  }

  if (a + b > 10) {
    return (a + b) * 2;
  } else {
    return a + b;
  }
};

module.exports = sum;
