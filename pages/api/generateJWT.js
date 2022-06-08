const jwt = require("jsonwebtoken");
const privateKey =
  "ginKjqrRLtrvEzgRs7s3dT5J70ZXTbb8j0EGJeCZrtH5Ekz4gyQQkNBVpExv";

export default function handler(req, res) {
  let password = req.query.password;
  let token;

  if (
    password ===
    "assemble is a hackathon in SF this summer for 150 hack clubbers and you totally should do it"
  ) {
    token = jwt.sign(
      {
        hasAccess: true,
      },
      privateKey
    );
  } else {
    token = jwt.sign(
      {
        hasAccess: false,
      },
      privateKey
    );
  }

  res.body = { token };
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(res.body);
}
