const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');

    // Sounds
    const sounds = document.querySelectorAll('.sound-picker button');

    // Time Display
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time-select button');

    // Get length of the outline
    const outlineLength = outline.getTotalLength();
    console.log(outlineLength);

    // Duration 
    let fakeDuration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    // Play sound
    play.addEventListener('click', () => {
        checkPlaying(song);
    });

    // Select time
    timeSelect.forEach(option => {
        option.addEventListener('click', function() {
            fakeDuration = this.getAttribute('data-time');
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;
            checkPlaying(song);
        });
    });

    // Select sound
    sounds.forEach(option => {
        option.addEventListener('click', function() {
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            checkPlaying(song);
        });
    });

    // Create a function specifically to stop and play the sound
    const checkPlaying = song => {
        if (song.paused) {
            song.play();
            video.play();
            play.src = './svg/pause.svg';
        }
        else {
            song.pause();
            video.pause();
            play.src = './svg/play.svg'
        }
    };

    // Animates the moving time circle
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        // Animate the circle
        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;

        // Animate the text
        timeDisplay.textContent = `${minutes}:${seconds}`;

        // loop the video
        if (video.ended) {
            video.load();
            video.play();
        }

        // if time is up, reset the player
        if (currentTime >= fakeDuration) {
            resetPlayer();
        }
    }

    const resetPlayer = () => {
        song.pause();
        song.currentTime = 0;
        video.pause();
        play.src = './svg/play.svg'
    }


};

app();