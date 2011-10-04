var Audia=function(){var h=true;if(typeof AudioContext=="function")var d=new AudioContext;else if(typeof webkitAudioContext=="function")d=new webkitAudioContext;else h=false;var k=function(a,c,e){if(a<c)return c;else if(a>e)return e;return a},i={},b=function(a){this._duration=this._currentTime=0;this._onendedTimeout=this._gain=null;this._playing=false;this._startTime=this._source=null;this._volume=1;if(typeof a=="string")this.src=a;else if(typeof a=="object")for(var c in a)this[c]=a[c]};b.__defineGetter__("version",
function(){return 0.1});b.__defineGetter__("supported",function(){return h});if(!h)return b;b.prototype.__defineGetter__("currentTime",function(){if(this._playing){var a=d.currentTime-this._startTime+this._currentTime;return a>this._duration?this._duration:a}else return this._currentTime});b.prototype.__defineSetter__("currentTime",function(a){a=k(a,0,this._duration);if(this.currentTime!=a){var c=this._playing;this._stop();this._currentTime=a;c&&this.play()}});b.prototype.__defineGetter__("duration",
function(){return this._duration});b.prototype.__defineGetter__("playing",function(){return this._playing});b.prototype.__defineGetter__("src",function(){return this._src});b.prototype.__defineSetter__("src",function(a){this._src=a;var c=this,e=d.createGainNode();e.connect(d.destination);e.gain.value=this._volume;var g=d.createBufferSource();g.connect(e);this._gain=e;this._source=g;if(a in i)g.buffer=i[a];else{var f=new XMLHttpRequest;f.open("GET",a,true);f.responseType="arraybuffer";f.onload=function(){var j=
d.createBuffer(f.response,false);g.buffer=j;i[a]=j;c._duration=j.duration;c.onload()};f.send()}});b.prototype.__defineGetter__("volume",function(){return this._volume});b.prototype.__defineSetter__("volume",function(a){this._volume=a=k(a,0,10);this._gain.gain.value=a});b.prototype.onended=function(){};b.prototype.onload=function(){};b.prototype.play=function(){if(!this._playing){this._regenerateBuffer();var a=this._duration-this._currentTime-0.01;this._source.noteGrainOn(0,this._currentTime,a);this._playing=
true;this._startTime=d.currentTime;var c=this;this._onendedTimeout=setTimeout(function(){c.onended();c._stop();c.currentTime=0;c.loop&&c.play()},a*1E3)}};b.prototype.pause=function(){this._stop()};b.prototype.stop=function(){this._stop();this._currentTime=0};b.prototype._stop=function(){if(this._playing){if(this._onendedTimeout){clearTimeout(this._onendedTimeout);this._onendedTimeout=null}this._source.noteOff(0);this._expireBuffer();this._currentTime+=d.currentTime-this._startTime;this._playing=false}};
b.prototype._expireBuffer=function(){this._source=null};b.prototype._regenerateBuffer=function(){this.src=this._src};return b}();
