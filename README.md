# Assemble Reveal Hunt

This codebase is the last few steps in a treasure hunt leading to the Assemble reveal letter. Here's a brief walkthrough of all steps in the treasure hunt:

1. [A video](https://www.youtube.com/watch?v=QDrtD3UMA-s) (currently hosted on YT for this README) will be posted on @hackclub's twitter and in the #announcements channel by @orpheus
    - The video mentions `#redacted` which is a Slack channel that we'll trigger @orpheus creates (TODO: we have to do this manually)
    - The video flashes `#redacted` in morse code that translates to `g0ld3n`
1. Users will go to #redacted in slack and find an image posted by @orpheus: ![](assets/openssl.png) _(openssl.png)_.
    - The image's exif data says `cat`
    - If you run `cat openssl.png`, the last line includes a base64 string
1. After getting the clues above, users can run `echo $BASE_64_STRING | openssl enc -d -base64 -aes-256-cbc -k g0ld3n` to get the result `https://shhhhhhhh.hackclub.dev/`
1. Enter any (or no) password on this website and it will pass a JWT in the URL query string (intentionally insecure). The trick here is to exploit JWT's `none` algorithm to grant the viewer access to the letter. You can do this by going to https://token.dev, pasting the JWT, changing `hasAccess` to `true` and `alg` to `none`. Then, paste the modified JWT (with the signature removed) back into the secret URL to access the letter.