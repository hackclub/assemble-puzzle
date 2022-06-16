import { useEffect, useState } from "react";
import mdLetter from "../letter.md";
import ReactMarkdown from "react-markdown";
import Signature from "../components/signature";

const secret = require("jsonwebtoken");
const privateKey =
  "ginKjqrRLtrvEzgRs7s3dT5J70ZXTbb8j0EGJeCZrtH5Ekz4gyQQkNBVpExv";

const SIGNATURES = {
  belle: "bellesea",
  benjamin: "bashbaugh",
  charlie: "tetraoxygen",
  ella: "exu3",
  hugo: "Hugoyhu",
  ian: "YodaLightsabr",
  ishan: "quackduck",
  pranav: "pranavnt",
  sam: "sampoder",
};

// Use a custom renderer so that we can include image in Markdown and avoid anything being leaked
const renderers = {
  img: ({ alt, src, title }) => (
    <a href={`/${src}.jpeg`} className="decoration-none">
      <figure>
        {/* TODO: Add everyone's signature ontop of the photo */}
        <img src={`/${src}.png`} alt={alt} />
        <figcaption>{title}</figcaption>
      </figure>
    </a>
  ),
};

export default function Secret({ hasAccess, letterContent, signatures }) {
  // Doing this to avoid Next hydration error from md component, which shouldn't be happening
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);

  if (hasAccess) {
    return loaded ? (
      <div class="container">
        <img src="/golden_coast.png" class="bg" />
        <div id="text-container" class="shadow">
          <ReactMarkdown components={renderers} children={letterContent} />

          {Object.entries(signatures).map(([name, gh]) => (
            <Signature
              src={`signatures/${name}.png`}
              href={`https://github.com/${gh}`}
            />
          ))}
        </div>
      </div>
    ) : (
      "gadzooks"
    );
  } else {
    useEffect(() => {
      setTimeout(() => alert("ACCESS DENIED"), 0);
    }, []);

    return (
      <div class="vidContainer">
        <div>
          <video
            autoPlay
            loop
            controls={false}
            muted
            id="myVideo"
            style={{
              height: "100vh",
              width: "100vw",
            }}
          >
            <source src="/dinoed.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    );
  }
}

export function getServerSideProps(ctx) {
  let jwt = ctx.query.jwt || "";
  let hasAccess = false;
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

  return {
    props: {
      hasAccess,
      letterContent: hasAccess ? mdLetter : "",
      signatures: SIGNATURES,
    },
  };
}