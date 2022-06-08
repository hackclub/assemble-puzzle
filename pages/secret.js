const secret = require("jsonwebtoken");
const privateKey =
  "ginKjqrRLtrvEzgRs7s3dT5J70ZXTbb8j0EGJeCZrtH5Ekz4gyQQkNBVpExv";

export default function Secret({ jwt }) {
  let hasAccess = false;

  // remove period at the end of the jwt
  try {
    if (jwt.endsWith(".")) {
      jwt = jwt.slice(0, -1);
    }

    if (jwt.split(".").length <= 2) {
      if (JSON.parse(atob(jwt.split(".")[0])).alg == "none") {
        hasAccess = JSON.parse(atob(jwt.split(".")[1])).hasAccess;
      }
    } else {
      hasAccess = false;
    }
  } catch (err) {
    hasAccess = false;
  }

  if (hasAccess) {
    return (
      <div id="text-container">
        <h1>Assemble ✨</h1>
        <figure>
          <img src="./gzooks.jpeg" alt="The golden gate bridge at night" />
          <figcaption>📍 San Francisco, CA, July 29th-31st</figcaption>
        </figure>
        <p>
          Hello Hack Clubbers! We{`'`}re super excited to annouce that our event
          for this summer is going to be Assemble, an IRL hackathon in SF at
          Figma HQ???? Insert longer and more thoughtful message
        </p>
        <p className="signoff">
          – The Assemble Team (add signatures like zephyr)
        </p>
      </div>
    );
  } else {
    return (
      <div>
        <video
          autoPlay
          loop
          controls={false}
          id="myVideo"
          style={{
            height: "100vh",
            width: "100vw",
          }}
        >
          <source src="/dinoed.mp4" type="video/mp4" />
        </video>
      </div>
    );
  }
}

Secret.getInitialProps = async (context) => {
  const jwt = context.query.jwt || "";
  return { jwt };
};
