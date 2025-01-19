"use strict";
const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

//
// Music
const songs = [
  {
    name: "jacinto-1",
    displayName: "Electric Chill Machine",
    artist: "shady",
  },
  {
    name: "jacinto-2",
    displayName: "Seven Nation Army (Remix)",
    artist: "shady",
  },
  {
    name: "jacinto-3",
    displayName: "Goodnight, Disco Queen",
    artist: "shady",
  },
  {
    name: "metric-1",
    displayName: "Front Row (Remix)",
    artist: "Metric/Jacinto Design",
  },
];

//

let isPlaying = false;
let currentSong = 0;

// Functions
// ---------------------------

function load(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

function playSong() {
  music.play();
  isPlaying = true;
  playBtn.className = "fas fa-pause main-button";
}

function pauseSong() {
  music.pause();
  isPlaying = false;
  playBtn.className = "fas fa-play main-button";
}

function nextSong() {
  if (currentSong >= songs.length - 1) {
    currentSong = 0;
  } else {
    currentSong++;
  }

  load(songs[currentSong]);
  playSong();
}

function prevSong() {
  if (currentSong <= 0) {
    currentSong = songs.length - 1;
  } else {
    currentSong--;
  }

  load(songs[currentSong]);
  playSong();
}

// updating the progress bar

function updateProgressBar(e) {
  if (isPlaying) {
    const { currentTime, duration } = e.srcElement;
    progress.style.width = `${(currentTime * 100) / duration}%`;
    // duration in Minuets

    let durationMinuets = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);

    //  adding the 0 if seconds are less than 10
    if (durationSeconds < 10) durationSeconds = `0${durationSeconds}`;
    // adding the formatted duration to DOM
    if (durationSeconds)
      durationEl.textContent = `${durationMinuets}:${durationSeconds}`;

    // current time
    let currentTimeMinuets = Math.floor(currentTime / 60);
    let currentTimeSeconds = Math.floor(currentTime % 60);

    //  adding the 0 if seconds are less than 10
    if (currentTimeSeconds < 10) currentTimeSeconds = `0${currentTimeSeconds}`;
    // adding the formatted currentTime to DOM
    if (currentTimeSeconds)
      currentTimeEl.textContent = `${currentTimeMinuets}:${currentTimeSeconds}`;
  }
}
// Event Listeners
// ------------------------------------

playBtn.addEventListener("click", () => {
  if (!isPlaying) {
    playSong();
  } else {
    pauseSong();
  }
});

nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);
music.addEventListener("timeupdate", updateProgressBar);

progressContainer.addEventListener("click", function (e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  music.currentTime = (clickX / width) * music.duration;
});

music.addEventListener("ended", nextSong);

// on load functions

load(songs[currentSong]);
