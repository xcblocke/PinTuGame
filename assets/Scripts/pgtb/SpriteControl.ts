import AudioManager from "../framework/Utils/AudioManager";
import SdkHelper from "../framework/Utils/SdkHelper";
import GlobalApp from "../common/GlobalApp";
import { gameData } from "../data/GameData";
import MakeMnGlobalData from "../data/MakeMnGlobalData";
const {
  ccclass,
  property
} = cc._decorator;
@ccclass
export default class SpriteControl extends cc.Component {
  @property(cc.SpriteFrame)
  easyCard: cc.SpriteFrame = null;
  @property(cc.SpriteFrame)
  diffCard: cc.SpriteFrame = null;
  arrPosX = 0;
  arrPosY = 0;
  reallyX = 0;
  reallyY = 0;
  sprite = null;
  groupId = 0;
  groupRound = 0;
  combineGroupLength = 9999;
  isPlayCombineAnimation = false;
  oldPosition = new cc.Vec3(0, 0);
  _nowTween = null;
  bigTween = null;
  left = false;
  right = false;
  top = false;
  bottom = false;
  leftTop = false;
  rightTop = false;
  leftBottom = false;
  rightBottom = false;
  get nowTween() {
    return this._nowTween;
  }
  set nowTween(e) {
    var t;
    null === (t = this._nowTween) || void 0 === t || t.stop();
    this._nowTween = e;
  }
  get splitSprite() {
    return GlobalApp.GameContainer.splitSprite;
  }
  get groups() {
    return this.splitSprite.groups[this.groupId];
  }
  setSpriteFrame(e) {
    this.node.getChildByName("1").getComponent(cc.Sprite).spriteFrame = e <= 5 ? this.easyCard : this.diffCard;
  }
  onLoad() {
    this.sprite = this.node.getComponent(cc.Sprite);
    this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
  }
  setPosition(e, t) {
    this.node.x = e;
    this.node.y = t;
    this.oldPosition = new cc.Vec3(e, t, 0);
  }
  async playCombineAnimation() {
    if (this.isPlayCombineAnimation) {
      await this.splitSprite.playCombineAnimation(this.groupId);
      GlobalApp.GameContainer.showWin();
      return;
    } else {
      return;
    }
  }
  setTweenPosition(e) {
    var t = this;
    this.splitSprite.testCanMerge(this.arrPosX, this.arrPosY);
    this.node.zIndex = 3;
    this.nowTween = cc.tween(this.node).to(0.3, {
      position: e
    }).call(function () {
      t.node.zIndex = 1;
      t.playCombineAnimation();
    }).start();
  }
  setTargetPosition(e, t) {
    this.oldPosition = new cc.Vec3(e, t, 0);
    this.setTweenPosition(this.oldPosition);
  }
  resetPosition() {
    var e = this,
      t = this.groups;
    t && t.forEach(function (t) {
      t.node.parent = e.splitSprite.node;
      t.node.position = t.oldPosition;
    });
  }
  onTouchStart() {
    if (gameData.GlobalCanMove) {
      GlobalApp.GameContainer.splitSprite.cancelHint();
      AudioManager.instance.playGameSound("pickCard");
      SdkHelper.setVibrator(50);
      this.resetPosition();
      gameData._isDragging = true;
    }
  }
  onTouchMove(e) {
    var t = this;
    if (gameData.GlobalCanMove) {
      var o = this.groups;
      o && o.forEach(function (o) {
        var n, i;
        null === (n = o.nowTween) || void 0 === n || n.stop();
        null === (i = o.bigTween) || void 0 === i || i.stop();
        o.node.parent = t.splitSprite.node;
        o.node.x += e.getDeltaX();
        o.node.y += e.getDeltaY();
        o.node.zIndex = 3;
      });
    }
  }
  onTouchEnd() {
    var e = this;
    AudioManager.instance.playGameSound("downCard");
    if (gameData.GlobalCanMove) {
      gameData._isDragging = false;
      var t = this.groups;
      if (t) {
        var o = t.map(function (t) {
            var o = e.splitSprite.testCanSwap(t.node);
            return o ? [o.arrPosX, o.arrPosY] : null;
          }),
          n = o.includes(null);
        t.forEach(function (t, i) {
          if (n) t.setTweenPosition(t.oldPosition);else {
            var a = o[i];
            a && e.splitSprite.swap2DArray(t.arrPosX, t.arrPosY, a[0], a[1]);
          }
        });
        this.splitSprite.testGroupImage();
        if (!n) {
          gameData.stepNum++;
          MakeMnGlobalData.showLuckReward();
        }
      }
    }
  }
  changeBorader() {
    var e = Number("0b" + (this.leftTop ? 1 : 0) + (this.rightTop ? 1 : 0) + (this.leftBottom ? 1 : 0) + (this.rightBottom ? 1 : 0) + (this.top ? 1 : 0) + (this.bottom ? 1 : 0) + (this.left ? 1 : 0) + (this.right ? 1 : 0));
    this.node.color = new cc.Color(this.node.color.r, this.node.color.g, e);
  }
  setBoraderHas(e, t, o, n) {
    this.left = !e;
    this.right = !t;
    this.top = !o;
    this.bottom = !n;
    this.changeBorader();
  }
  setBorderLeft(e) {
    this.left = !e;
    this.changeBorader();
  }
  setBorderRight(e) {
    this.right = !e;
    this.changeBorader();
  }
  setBorderTop(e) {
    this.top = !e;
    this.changeBorader();
  }
  setBorderBottom(e) {
    this.bottom = !e;
    this.changeBorader();
  }
  setBorderLeftTop(e) {
    this.leftTop = !e;
    this.changeBorader();
  }
  setBorderRightTop(e) {
    this.rightTop = !e;
    this.changeBorader();
  }
  setBorderLeftBottom(e) {
    this.leftBottom = !e;
    this.changeBorader();
  }
  setBorderRightBottom(e) {
    this.rightBottom = !e;
    this.changeBorader();
  }
}