# Audia

Audia reimplements the [HTML5 Audio][1] object using the [Web Audio API][2], and adds some additional sugar to it.

## Benefits

* Future-proof
* Consistent API with HTML5 Audio
* Fixes bugs in some Audio implementations
* Works reliably in iOS 6.
* Implementation of `Audio` is weak across the board. Even in the best browers
* this is future-proof. you get Audio which is the best you can get for now, then later down the road you get web audio api
* and seriously, you'll need a wrapper for Web Audio anyway

A complete write-up on this project can be found on the [Lost Decade Games blog][3].

## API Documentation

Everything is identical to the HTML5 Audio spec. Anything not working as it should? File an issue! :)

### Global Audia object
* Audia (global object)

* **Audia.version**: `String` The version of Audia being run. (Example: `"0.1.0"`)
* **Audia.canPlayType**: you can pass in mp3, ogg (helpers since normally it wants audio/ogg audio/mp3)

#### Properties

Each Audia instance has the following properties:

* **currentTime**: `Number` The playback point of the sound (in seconds).
* **duration**: `Number` The length of the current sound buffer in seconds. (Read-only)
* **loop**: `Boolean` If set to true, the audio will play again when it reaches the end of playback. (default: `false`)
* **muted**: `Boolean` True if the sound has been muted, otherwise false.
* **paused**: `Boolean` True if the sound is paused, false if it's playing. (Read-only)
* **autoplay**: `Boolean` Set to true to play when the file is ready (default: `false`)
* **src**: `String` The URL of a sound file to load. Setting the `src` causes the file to start loading.
* **volume**: `Number` The volume of the playback where `0` is muted and `1` is normal volume. (arbitrary maximum = `10`), (default: `1`)
* **onended**: `Function` Gets called when playback reaches the end of the buffer.
* **onload**: `Function` Gets called when a sound file (requested by setting `src`) is done loading.

_* The italicized properties are only available if the client supports Web Audio API (otherwise they fail silently)._

#### Methods

* **play**: Begins playback of the sound buffer. Arguments: `currentTime` (optional) Sets the `currentTime` property before playing.
* **pause**: Pauses sound playback (retaining `currentTime`).
* **stop**: Stops sound playback (resetting `currentTime` to `0`).
// TODO: it's actually .muted (Boolean)
* **mute**: Silences playback of the sound buffer.
* **unmute**: Restores audible playback of the sound buffer.

#### Fetching sounds

Files are loaded from a server as soon as an `src` property is set. Files are loaded with XMLHttpRequest. If you are requesting files from a remote server on a different domain (e.g. a CDN), that domain must allow [Cross-Origin Resource Sharing][4]. Quick tip: if the data on that external domain is public, you can set `Access-Control-Allow-Origin: *`.

## Examples

### Play a sound when it loads

```javascript
sound = new Audia();
sound.oncanplay = function() {
	sound.play();
	doSomethingWithUI();
};
sound.src = "new_song.mp3";
```

### Move the playback pointer to 30 seconds (not milliseconds) into the sound buffer

```javascript
sound.currentTime = 30;
```

### Calculate the percentage of song that's played

```javascript
var percentage = (sound.currentTime / sound.duration) * 100;
```

### Stop sound if it's playing

```javascript
if (sound.playing) {
	sound.stop();
}
```

[1]: http://www.whatwg.org/specs/web-apps/current-work/#the-audio-element
[2]: https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html
[3]: http://www.lostdecadegames.com/audia-is-a-library-for-simplifying-the-web-audio-api/
[4]: https://developer.mozilla.org/en-US/docs/HTTP/Access_control_CORS