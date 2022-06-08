const jwt = require("jsonwebtoken");
const privateKey =
  "ginKjqrRLtrvEzgRs7s3dT5J70ZXTbb8j0EGJeCZrtH5Ekz4gyQQkNBVpExv";

export default function handler(req, res) {
  let password = req.query.password;
  let token;
  let hasAccess = false;
  if (password === "assemble") {
    token = jwt.sign(
      {
        hasAccess: true,
      },
      privateKey
    );
    hasAccess = true;
  } else {
    token = jwt.sign(
      {
        hasAccess: false,
      },
      privateKey
    );
  }
  res.body = { token, hasAccess };
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(res.body);
}
