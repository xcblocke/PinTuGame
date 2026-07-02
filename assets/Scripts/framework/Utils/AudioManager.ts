import PlayerDataSys from "./PlayerDataSys";
import SdkHelper from "./SdkHelper";
import EngineUtil from "./EngineUtil";
const {
  ccclass,
  property
} = cc._decorator;
var p = [];
@ccclass
export default class AudioManager extends cc.Component {
  vibratorOpen = 0;
  bgOpen = 0;
  effectOpen = 0;
  _bgAudios = {};
  _effectAudio = {};
  _effectAudioisPlayArray = {};
  clipMap = new Map();
  _nativeAudio = new Map();
  static get instance() {
    this._instance || (this._instance = new AudioManager());
    return this._instance;
  }
  static getInstance() {
    this._instance || (this._instance = new AudioManager());
    return this._instance;
  }
  playBtn() {
    this.playMusic("btntouch", false);
  }
  playBtnEffect() {
    this.playMusic("btntouch", false);
  }
  onLoad() {}
  init() {
    var e = this;
    this._effectAudioisPlayArray = {};
    this.bgOpen = Number(EngineUtil.localStorageGetItem("bg_audio", "1"));
    this.effectOpen = Number(EngineUtil.localStorageGetItem("effect_audio", "1"));
    this.vibratorOpen = Number(EngineUtil.localStorageGetItem("vibratorOpen", "1"));
    p.forEach(function (t) {
      e.preLoadMusic(t);
    });
  }
  getMusicState() {
    return 1 == this.bgOpen;
  }
  getAudioState() {
    return 1 == this.effectOpen;
  }
  getVibratorState() {
    return 1 == this.vibratorOpen;
  }
  openVibrator() {
    EngineUtil.localStorageSetItem("vibratorOpen", "1");
    this.vibratorOpen = 1;
  }
  closeVibrator() {
    EngineUtil.localStorageSetItem("vibratorOpen", "0");
    this.vibratorOpen = 0;
  }
  openAudio() {
    EngineUtil.localStorageSetItem("effect_audio", "1");
    this.effectOpen = 1;
  }
  closeAudio() {
    EngineUtil.localStorageSetItem("effect_audio", "0");
    this.effectOpen = 0;
  }
  openBg() {
    cc.audioEngine.setMusicVolume(0.9);
    EngineUtil.localStorageSetItem("bg_audio", "1");
    this.bgOpen = 1;
    PlayerDataSys.isOppoReviewer() || this.resumeMusic("bgm", true);
  }
  closeBg() {
    EngineUtil.localStorageSetItem("bg_audio", "0");
    this.bgOpen = 0;
    PlayerDataSys.isOppoReviewer() || this.pauseMusic("bgm", true);
  }
  playGameSound(e) {
    this.playMusic("gameSound/" + e);
  }
  stopGameSound(e) {
    this.stopMusic("gameSound/" + e);
  }
  playCashPerson(e) {
    this.playMusic("cashSound/person/" + e);
  }
  stopCashPerson(e) {
    this.stopMusic("cashSound/person/" + e);
  }
  playCash(e, t = false, o = false, n?, i = 1) {
    // this.playMusic("makeMnSound/" + e, t, o, n, i);
  }
  stopCash(e) {
    // this.stopMusic("makeMnSound/" + e);
  }
  playMusic(e, t = false, o = false, n?, i = 1) {
    if ((0 != this.effectOpen || o) && (0 != this.bgOpen || !o)) {
      var a = "sound/" + e,
        r = this;
      if (this.clipMap.has(e)) {
        var c = this.clipMap.get(e),
          l = cc.audioEngine.playEffect(c, t);
        cc.audioEngine.setVolume(l, i);
        this._effectAudio[e] = l;
        n && n(l, c);
      } else cc.loader.loadRes(EngineUtil.addBehindFixByPath(a), cc.AudioClip, function (a, c) {
        if (a) console.log(a);else {
          r.clipMap.set(e, c);
          if (o) {
            r._bgAudios[e] = cc.audioEngine.playMusic(c, t);
            n && n(r._bgAudios[e], c);
          } else {
            r._effectAudio[e] = cc.audioEngine.playEffect(c, t);
            cc.audioEngine.setVolume(r._effectAudio[e], i);
            n && n(r._effectAudio[e], c);
          }
        }
      });
    }
  }
  preLoadMusic(e) {
    var t = this;
    cc.loader.loadRes(EngineUtil.addBehindFixByPath("sound/" + e), cc.AudioClip, function (o, n) {
      if (o) {
        console.log(o);
      } else {
        t.clipMap.set(e, n);
      }
    });
  }
  playEffect(e, t) {
    if (0 != this.effectOpen) {
      var o = "sound/" + e;
      cc.loader.loadRes(EngineUtil.addBehindFixByPath(o), cc.AudioClip, function (e, o) {
        if (e) {
          console.log(e);
          t && t();
        } else {
          var n = cc.audioEngine.playEffect(o, false);
          t && cc.audioEngine.setFinishCallback(n, function () {
            t && t();
          });
        }
      });
    } else t && t();
  }
  stopEffect(e) {
    this._effectAudio[e] && cc.audioEngine.stopEffect(this._effectAudio[e]);
  }
  stopMusic(e, t = false) {
    if (t) cc.audioEngine.stopMusic();else {
      console.log("🚀yxl ~ AudioManager.ts:217 ~ AudioManager ~ stopMusic ~ this._effectAudio[audio]:", this._effectAudio[e]);
      cc.audioEngine.stop(this._effectAudio[e]);
    }
  }
  stopAllMusic() {
    var e = this;
    this._effectAudio && Object.keys(this._effectAudio).forEach(function (t) {
      e.stopMusic(t, false);
    });
  }
  pauseMusic(e, t = false) {
    if (t) {
      cc.audioEngine.pauseMusic();
    } else {
      cc.audioEngine.pause(this._effectAudio[e]);
    }
  }
  resumeMusic(e, t = false) {
    if (t) {
      if (0 == this.bgOpen) return;
      if (!this._bgAudios[e]) {
        this.playMusic(e, true, true);
        return;
      }
      cc.audioEngine.resumeMusic();
    } else {
      if (0 == this.effectOpen) return;
      cc.audioEngine.resume(this._effectAudio[e]);
    }
  }
  initNativeUrl() {
    var e = this;
    cc.resources.loadDir("sound/native", cc.AudioClip, function (t, o) {
      if (t) {
        console.log(t.name, t.message, t.stack);
      } else {
        o.forEach(function (t) {
          cc.log("name:" + t.name + "    ");
          var o = cc.assetManager.utils.getUuidFromURL(t.nativeUrl),
            n = cc.assetManager.utils.getUrlWithUuid(o, {
              isNative: true,
              nativeExt: ".mp3"
            });
          e._nativeAudio.set(t.name, n);
        });
      }
    });
  }
  playNativeMusic(e) {
    if (!cc.sys.isBrowser && cc.sys.isNative) {
      var t = this._nativeAudio.get(e);
      t && SdkHelper.playNativeAudio(t);
    } 
   // else this.playMusic("native/" + e);
  }
}