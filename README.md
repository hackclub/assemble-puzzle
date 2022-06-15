# Assemble Reveal Hunt

This is the final step in the clues leading to the Assemble reveal letter. Here's a brief walkthrough of all clues:

1. The black/white flashing text in the video signals a morse code pattern which translates to `g0ld3n` (watch it at 0.25x speed).
2. Open the ;-) PNG image in a text editor and scroll to the bottom, you’ll find the base64 string `U2FsdGVkX19lz81oH05ZO6Ye0idjNeC9rRsN0eQ5RnQKPxzyf3ygw+tb1SlLbWC0`.
3. This string is encrypted using AES-256 with OpenSSL’s key derivation. (We’re open to other ways to encrypt this that will be easier to figure out). Running `echo "U2FsdGVkX19lz81oH05ZO6Ye0idjNeC9rRsN0eQ5RnQKPxzyf3ygw+tb1SlLbWC0" | openssl enc -d -base64 -aes-256-cbc -k g0ld3n` should decrypt the string to https://shhhhhhhh.hackclub.dev/.
4. Enter any arbitrary password on this website and it will pass a JWT in the URL query string (very secure, we know). The trick here is to exploit JWT's `none` algorithm to grant the viewer access to the letter. You can do this by going to https://token.dev, pasting the JWT, changing `hasAccess` to `true` and `alg` to `none`. Then, paste the modified JWT (with the signature removed) back into the secret URL to access the letter.