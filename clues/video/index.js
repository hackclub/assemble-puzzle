// Assemble clue video source
// @bashbaugh

import DotFilter from "./dotFilter.js";

const textStr = "#come-together";
const morseString = "--. ----- .-.. -.. ...-- -.";
// --. ----- .-.. -.. ...-- -.

window.WebFontConfig = {
  google: {
    families: ["Kdam Thmor Pro", "VT323"],
  },

  active() {
    setTimeout(() => init(), 2000);
  },
};

// Why is this not working from the HTML
(function () {
  const wf = document.createElement("script");
  wf.src = `${
    document.location.protocol === "https:" ? "https" : "http"
  }://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js`;
  wf.type = "text/javascript";
  wf.async = "true";
  const s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(wf, s);
})();

const app = new PIXI.Application({
  backgroundColor: 0xffffff,
  width: window.innerWidth,
  height: window.innerHeight,
});
document.body.appendChild(app.view);

const asciiFilter = new PIXI.filters.AsciiFilter();
const oldFilter = new PIXI.filters.OldFilmFilter({
  sepia: 0,
  vignette: 0.2,
  scratchWidth: 3,
});
const adjFilter = new PIXI.filters.AdjustmentFilter({
  saturation: 4,
  contrast: 2,
});
const zbFilter = new PIXI.filters.ZoomBlurFilter({
  strength: 0.05,
  center: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
});
const glitchFilter = new PIXI.filters.GlitchFilter({
  fillMode: 2,
  enabled: false,
});
const dotFilter = new DotFilter(0.7, 6);

asciiFilter.size = window.innerWidth;

const randInt = (min, max) => Math.floor(Math.random() * (max - min) + min);
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function init() {
  const c = new PIXI.Container();
  app.stage.addChild(c);

  // create some white text using the Snippet webfont
  const text = new PIXI.Text("", {
    fontFamily: "Kdam Thmor Pro",
    fontSize: 150,
    // fill: 0xf7ff19,
    fill: 0xffffff,
  });
  text.anchor.set(0.5);
  text.position.set(app.view.width / 2, app.view.height / 2);

  const sf = PIXI.Sprite.from("bay2.jpeg");
  sf.anchor.set(0.5);
  sf.position.set(app.view.width / 2, app.view.height / 2);

  c.addChild(sf);
  c.addChild(text);

  c.filters = [
    adjFilter,
    asciiFilter,
    dotFilter,
    oldFilter,
    zbFilter,
    glitchFilter,
    // rgbFilter
  ];

  const MORSE_UNIT = 150; // ms
  const signalMorse = async (currentIndex) => {
    const char = morseString[currentIndex];

    text.style.fill = 0xffffff;
    await delay(MORSE_UNIT);
    if (char !== " ") text.style.fill = 0;
    // else text.style.fill = Math.floor(Math.random() * 0xffffff);
    // else text.style.

    const pause = {
      ".": 1,
      "-": 5,
      " ": 10,
    };

    await delay(pause[char] * MORSE_UNIT);

    if (currentIndex < morseString.length - 1) {
      signalMorse(currentIndex + 1);
    } else {
      text.style.fill = 0xffffff;
      endTransmision();
    }
  };

  const glitch = () => {
    glitchFilter.slices = randInt(3, 10);
    glitchFilter.seed = Math.random();
    glitchFilter.refresh();
    setTimeout(glitch, randInt(20, 200));
  };

  const endTransmision = async () => {
    glitchFilter.enabled = true;

    glitch();

    await delay(1000);

    // glitchFilter.enabled = false
    app.stage.removeChild(c);
    app.renderer.backgroundColor = 0;
    const endText = new PIXI.Text("END TRANSMISSION", {
      fontFamily: "VT323",
      fontSize: 30,
      fill: 0xa1a1a1,
    });
    endText.position.set(10, 10);
    endText.visible = false;
    app.stage.addChild(endText);

    setInterval(() => {
      endText.visible = !endText.visible;
    }, 1000);
  };

  let textDone = false;

  app.ticker.add((delta) => {
    // text.rotation += 0.01;
    if (asciiFilter.size > 1) {
      asciiFilter.size -= asciiFilter.size / 100;
      zbFilter.strength += 0.0003;
      if (asciiFilter.size <= 1) {
        asciiFilter.enabled = false;
        zbFilter.strength = 0.02;
        setInterval(async () => {
          if (textDone) return;
          text.text = textStr.substring(0, text.text.length) + "_";
          if (text.text.length === textStr.length + 1) {
            textDone = true;

            await delay(1000);
            signalMorse(0);
          }
        }, 100); //200
      }
    } else {
      oldFilter.seed = Math.random();
    }
  });
}
