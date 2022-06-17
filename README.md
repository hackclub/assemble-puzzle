# The Assemble Puzzle

<img width="1109" alt="Screenshot 2022-06-17 at 9 31 27 AM" src="https://user-images.githubusercontent.com/39828164/174321304-c79edc6f-6e9f-437f-b154-eadc86a52047.png">

This summer (2022), we'll kick off a new renaissance by returning in-person high-school hackathons to San Francisco and consequently the rest of the world. Learn more here.

Before the big announcement, however, we created a treasure hunt that would lead to the Assemble reveal letter. In this repository we run through why we created the puzzle, how we created the puzzle, how the puzzle can be solved and a post-mortem on the puzzle's success as a launch tool.

###### Does open source organising work interest you? Keep an eye out on the `#ship` Slack channel as we open source more of Assemble.

## Why We Created The Puzzle

Launches are a big part of every summer event. For example, to announce 2021's Zephyr [we hosted a community call](https://youtu.be/wQebTjTyF7M) and to announce 2020's Summer of Making [we premiered this kickoff video](https://www.youtube.com/watch?v=aDxMvyTbFl8). For 2022, we choose to make a puzzle for these five reasons:

1. **Encourage collaboration.** Hackathons are of course a collaborative event, so why not get participants working together before the event event starts? Once we'd released the puzzle, Hack Clubbers immediately got to work together on solving it together. That was amazing to see!

2. **Create a community feel.** As Hack Clubbers worked together on the puzzle, `#lounge` came alive! The channel had 7.5 times the average amount of daily messages sent in it (measured over the past three months) on that day.

3. **Build long-lasting "hype".** It took about three hours for the first person to solve the puzzle. Then people kept working it for the next twenty-four hours. That's a lot longer than a five-minute video and made sure hackers kept talking about the event for hours.

4. **Have fun!** Ultimately, hackathons are meant to be fun. And so are puzzles which makes the two a perfect match!

## How We Created The Puzzle

## How You Can Solve The Puzzle

This codebase is the last few steps in a treasure hunt leading to the Assemble reveal letter. Here's a brief walkthrough of all steps in the treasure hunt:

1. [A video](https://www.youtube.com/watch?v=QDrtD3UMA-s) (currently hosted on YT for this README) will be posted on @hackclub's twitter and in the #announcements channel by @orpheus
    - The video mentions `#redacted` which is a Slack channel that we'll trigger @orpheus creates (TODO: we have to do this manually)
    - The video flashes `#redacted` in morse code that translates to `g0ld3n`
1. Users will go to #redacted in slack and find an image posted by @orpheus: ![](assets/openssl.png) _(openssl.png)_.
    - The image's exif data says `cat`
    - If you run `cat openssl.png`, the last line includes a base64 string
1. After getting the clues above, users can run `echo $BASE_64_STRING | openssl enc -d -base64 -aes-256-cbc -k g0ld3n` to get the result `https://shhhhhhhh.hackclub.dev/`
1. Enter any (or no) password on this website and it will pass a JWT in the URL query string (intentionally insecure). The trick here is to exploit JWT's `none` algorithm to grant the viewer access to the letter. You can do this by going to https://token.dev, pasting the JWT, changing `hasAccess` to `true` and `alg` to `none`. Then, paste the modified JWT (with the signature removed) back into the secret URL to access the letter.

The final URL with unlocked JWT token is [here](https://shhhhhhhh.hackclub.dev/secret?jwt=eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJoYXNBY2Nlc3MiOnRydWUsImlhdCI6MTY1NTMxODI5NH0)

## Post-Mortem
