// importujemy filesystem
const fs = require("fs").promises;

// Sprawdzamy czy folder istnieje
const isExist = (path) => {
  // fs daje metode access czyli wejdz, sprawdz
  return (
    fs
      .access(path)
      // jesli istnieje to zwroc true
      .then(() => true)
      // jesli nie istnieje to zwroc false
      .catch(() => false)
  );
};

// jesli folder nie istnieje to go tworzymy
const createFolderIfNotExist = async (path) => {
  if (!(await isExist(path))) {
    await fs.mkdir(path);
  }
};

module.exports = {
  createFolderIfNotExist,
};
