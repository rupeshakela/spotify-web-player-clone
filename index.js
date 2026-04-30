// 1. Playlist Data
const songs = [
    { name: "Daylight", artist: "David Kushner", path: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", img: "card3img.jpeg" },
    { name: "Top 50 Global", artist: "Spotify", path: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", img: "card1img.jpeg" },
    { name: "Trending Now", artist: "Viral Artist", path: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", img: "card2img.jpeg" }
];

let songIndex = 0;
let isPlaying = false;
let audioElement = new Audio(songs[songIndex].path);

// 2. Select Elements
const playBtn = document.querySelector('img[src*="player_icon3"]'); // Main Play Icon
const prevBtn = document.querySelector('img[src*="player_icon2"]');
const nextBtn = document.querySelector('img[src*="player_icon4"]');
const progressBar = document.querySelector('.progress-bar');
const volumeBar = document.querySelector('.rupesh');
const currTimeVal = document.querySelectorAll('.curr-time')[0];
const totalTimeVal = document.querySelectorAll('.curr-time')[1];

// UI Update Elements
const albumImg = document.querySelector('.album img');
const songTitle = document.querySelector('.box-c2');
const artistName = document.querySelector('.box-c3');

// 3. Play/Pause Function
function togglePlay() {
    if (audioElement.paused) {
        audioElement.play();
        playBtn.style.transform = "scale(1.2)"; // Chota sa animation effect
        playBtn.style.opacity = "1";
    } else {
        audioElement.pause();
        playBtn.style.transform = "scale(1)";
        playBtn.style.opacity = "0.8";
    }
}

playBtn.addEventListener('click', togglePlay);

// 4. Update Progress Bar & Time
audioElement.addEventListener('timeupdate', () => {
    // Range bar update
    const progress = (audioElement.currentTime / audioElement.duration) * 100;
    progressBar.value = progress || 0;

    // Current time text update
    let mins = Math.floor(audioElement.currentTime / 60);
    let secs = Math.floor(audioElement.currentTime % 60);
    if (secs < 10) secs = `0${secs}`;
    currTimeVal.innerText = `${mins}:${secs}`;

    // Total duration text update
    if (audioElement.duration) {
        let totalMins = Math.floor(audioElement.duration / 60);
        let totalSecs = Math.floor(audioElement.duration % 60);
        if (totalSecs < 10) totalSecs = `0${totalSecs}`;
        totalTimeVal.innerText = `${totalMins}:${totalSecs}`;
    }
});

// 5. Seek Logic (Gaane ko drag karke aage badhana)
progressBar.addEventListener('input', () => {
    audioElement.currentTime = (progressBar.value * audioElement.duration) / 100;
});

// 6. Volume Control
volumeBar.addEventListener('input', () => {
    audioElement.volume = volumeBar.value / 100;
});

// 7. Next & Previous Logic
function changeSong(next = true) {
    if (next) {
        songIndex = (songIndex + 1) % songs.length;
    } else {
        songIndex = (songIndex - 1 + songs.length) % songs.length;
    }
    
    audioElement.src = songs[songIndex].path;
    songTitle.innerText = songs[songIndex].name;
    artistName.innerText = songs[songIndex].artist;
    albumImg.src = songs[songIndex].img;
    
    audioElement.play();
    playBtn.style.opacity = "1";
}

nextBtn.addEventListener('click', () => changeSong(true));
prevBtn.addEventListener('click', () => changeSong(false));

// 8. Auto-play next song when finished
audioElement.addEventListener('ended', () => changeSong(true));

// 9. Card Click Functionality (Songs par click karne se bajne lage)
document.querySelectorAll('.card').forEach((card, index) => {
    card.addEventListener('click', () => {
        // Sirf example ke liye, agar cards zyada hain toh index manage karein
        if(index < songs.length) {
            songIndex = index;
            changeSong(true);
        }
    });
});

const searchInput = document.querySelector('.nav-option:nth-child(2) input'); // Agar aapne search input dala hai
const cards = document.querySelectorAll('.card');

searchInput.addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase();
    cards.forEach(card => {
        const title = card.querySelector('.card-title').innerText.toLowerCase();
        card.style.display = title.includes(value) ? "block" : "none";
    });
});
