import { Howl, Howler } from "howler";

export function initSounds() {
  let sounds = [
    "./public/1.mp3",
    "./public/2.mp3",
    "./public/3.mp3",
    "./public/4.mp3",
    "./public/5.mp3",
    "./public/6.mp3",
    "./public/7.mp3",
  ];
  let howls = {};
  for (let i = 0; i < sounds.length; i++) {
    howls[i] = new Howl({
      src: [sounds[i]],
    });
  }

  Howler.volume(0.2);
  return howls;
}

export function onHoverSound(howls, index) {
  howls[Math.floor(Math.random() * sounds.length)].play();
}

export default { initSounds };
