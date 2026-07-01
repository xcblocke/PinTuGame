import AudioManager from "./framework/Utils/AudioManager";
import EngineUtil from "./framework/Utils/EngineUtil";
export class UiManager {
  static addButtonListen(e, t, o, i = 0, a = "click") {
    if (e) {
      var r = e.getComponent(cc.Button);
      r || ((r = e.addComponent(cc.Button)).transition = cc.Button.Transition.SCALE);
      e.on("click", function () {
        AudioManager.getInstance().playMusic(a);
        if (t) {
          t.bind(o)();
          if (i) {
            r.interactable = false;
            setTimeout(function () {
              cc.isValid(r) && (r.interactable = true);
            }, i);
          }
        }
      }, o);
    }
  }
  static loaderView(e, t, o, n = 0) {
    cc.resources.load(EngineUtil.addBehindFixByPath("prefabs/" + t), cc.Prefab, function (i, a) {
      if (i) cc.error(i);else {
        var r = cc.instantiate(a);
        e.addChild(r, n);
        r.addComponent(t + "Ctrl");
        o && r.getComponent(t + "Ctrl").initData(o);
      }
    });
  }
  static loadSpriteFrame(e, t, o) {
    cc.resources.load(EngineUtil.addBehindFixByPath("imgs/" + t + "/" + o), cc.SpriteFrame, function (t, o) {
      if (t) {
        cc.error(t);
      } else {
        e && e.getComponent(cc.Sprite) && (e.getComponent(cc.Sprite).spriteFrame = o);
      }
    });
  }
  static loadSpine(e, t, o, n) {
    cc.resources.load(EngineUtil.addBehindFixByPath(t + "/" + o), sp.SkeletonData, function (t, o) {
      if (t) cc.error(t);else if (e && e.getComponent(sp.Skeleton)) {
        e.getComponent(sp.Skeleton).skeletonData = o;
        n && n();
      }
    });
  }
  static loaderHead(e, t, o = 100) {
    EngineUtil.loadRemoteImg(e).then(function (e) {
      t.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(e);
    }).catch(function (e) {
      console.log(e);
    });
  }
}