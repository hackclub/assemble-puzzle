import { useEffect } from 'react'

const secret = require("jsonwebtoken");
const privateKey =
  "ginKjqrRLtrvEzgRs7s3dT5J70ZXTbb8j0EGJeCZrtH5Ekz4gyQQkNBVpExv";

export default function Secret({ jwt }) {
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
  if (hasAccess) {
    return (
      <div id="text-container" class="shadow">
        <a href="./gzooks.jpeg" className='decoration-none'>
          <figure>
            {/* TODO: Add everyone's signature ontop of the photo */}
            <img src="./gadzooks.png" alt="The Golden Gate Bridge at night." />
            <figcaption>📍 San Francisco, CA</figcaption>
          </figure>
        </a>
        <p>
          Dear Hack Clubber,
        </p>
        <p>
          You found us, haven’t you? You probably had to poke around to get
          here. Maybe you saw the bug immediately. Maybe it took some time.
          Perhaps you even had help from someone.
        </p>
        <p>
          Now that you’ve made it please don’t spoil the fun! You can share
          that you got our message and our postcard above, but the content of
          this letter is just between us.  If you still want to be involved, you
          should offer a hand in the Slack and share your wisdom with someone
          looking for help to also reach this page.
        </p>
        <p>
          With that out of the way, we’re super excited to share some news with
          you: we're organizing Assemble, <strong>an IRL hackathon in San
          Francisco from 5th-7th of August</strong>. Around 150 attendees will
          join us– fellow Hack Clubbers, new high schoolers outside the
          community, and <a href="https://hackclub.com/amas#past-amas">some
          previous AMA guests</a>.
        </p>
        <p>We're still locking in the final logistics before we share this
        publicly, so stay tuned for the official post going out in the{' '}
        <a href="https://app.slack.com/client/T0266FRGM/C0266FRGT">#announcements</a> channel late next week.</p>
        <p>
          Thank you so much for finding us. We’ll be in touch,
        </p>
        <p>
          - The Assemble Team
        </p>
      </div>
    );
  } else {
    useEffect(() => {
      setTimeout(() => alert("ACCESS DENIED"), 200)
    }, [])
    
    return (
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
    );
  }
}

Secret.getInitialProps = async (context) => {
  const jwt = context.query.jwt || "";
  return { jwt };
};
