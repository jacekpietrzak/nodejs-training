const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

const issueToken = (user) => {
  // ustalamy nasz payload (informacje ktore chcemy dodatkowo zawrzec w tokenie) te informacje beda jawne. Dobra praktyka jest aby zawierac tutaj tylko id.
  const payload = {
    id: user._id,
  };

  //tworzymy (podpisujemy) token uzywajac metody jwt
  const token = jwt.sign(payload, jwtSecret, { expiresIn: "1h" });

  // zwracamy token
  return token;
};

module.exports = { issueToken };
