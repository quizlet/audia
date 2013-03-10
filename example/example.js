console.log('Using ' + (Audia.hasWebAudio ? 'WAI' : 'audio wrapper'));

// Attack sound...
console.log("attackSound: loading...");

  // Play button
  var playAttack = document.getElementById("play-attack");
	playAttack.disabled = true;
  playAttack.addEventListener("click", function () {
		// Passing in a number sets currentTime
		// In this case it's a shortcut to ensuring the sound
		// plays from the beginning
    attackSound.play();
  }, false);

  var attackSound = new Audia();
	attackSound.addEventListener("canplaythrough", function () {
		console.log("attackSound: canplaythrough event!");
		playAttack.disabled = false;
	}, false);
	attackSound.oncanplay = function () {
		console.log("attackSound: oncanplay!", attackSound.seekable);
		playAttack.disabled = false;
	};

	attackSound.src = "audio/demoblin_attacks.mp3";

  // Loop
  var loopAttack = document.getElementById("loop-attack");
  loopAttack.addEventListener("click", function () {
    attackSound.loop = loopAttack.checked;
  }, false);

  // Volume
  var volumeAttack = document.getElementById("volume-attack");
  volumeAttack.addEventListener("change", function () {
    attackSound.volume = volumeAttack.value;
  }, false);

  // Shop music...

  var shopMusic = new Audia("audio/shop.mp3");
  shopMusic.loop = true;
  shopMusic.autoplay = true;

	shopMusic.addEventListener("seeked", function () {
		console.log('seeked!');
	});

  // Play
  var playShop = document.getElementById("play-shop");
  playShop.addEventListener("click", function () {
    shopMusic.play();
  }, false);

  // Pause
  var pauseShop = document.getElementById("pause-shop");
  pauseShop.addEventListener("click", function () {
    shopMusic.pause();
  }, false);

  // Stop
  var stopShop = document.getElementById("stop-shop");
  stopShop.addEventListener("click", function () {
    shopMusic.stop();
  }, false);

  // Current time
  var currentTimeShop = document.getElementById("current-time-shop");
  var currentTimeInterval = setInterval(function () {
    currentTimeShop.innerHTML = Math.round(shopMusic.currentTime) + "/" + Math.floor(shopMusic.duration);
  }, 50);
  document.getElementById("set-current-time-shop").addEventListener("click", function () {
    shopMusic.currentTime = Number(document.getElementById("current-time-value-shop").value);
  });

  // Volume
  var volumeShop = document.getElementById("volume-shop");
  document.getElementById("set-volume-shop").addEventListener("click", function () {
    shopMusic.volume = Number(document.getElementById("volume-shop").value);
  });

  // Mute
  var muteShop = document.getElementById("mute-shop");
  muteShop.addEventListener("click", function () {
		shopMusic.muted = muteShop.checked;
  }, false);

//})();
