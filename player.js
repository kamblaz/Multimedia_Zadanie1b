document.addEventListener("DOMContentLoaded", function() { start_player(); }, false);
var player;

function choose_video(name) {
    player.innerHTML = '';
    var source = document.createElement('source');
    player.appendChild(source);
    source.setAttribute('src', name);
    player.load();
    play_vid();
}

function start_player() {
    player = document.getElementById('video_player');
    player.controls = false;
}

function play_vid() {
    player.play();
}

function pause_vid() {
    player.pause();
}

function stop_vid() {
    player.pause();
    player.currentTime = 0;
}

function change_vol() {
    player.volume = document.getElementById("change_vol").value;
}