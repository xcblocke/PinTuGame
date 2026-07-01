import decorator from "./decorator/decorator";
import AudioManager from "./framework/Utils/AudioManager";
import EngineUtil from "./framework/Utils/EngineUtil";
import { RequestType } from "./service/RequestType";
import Service from "./service/Service";
import GlobalApp from "./common/GlobalApp";
import MakeMnGlobalData from "./data/MakeMnGlobalData";
import { Constants } from "./main/Constants";
import SplitSprite from "./pgtb/SplitSprite";
import BasePage from "./view/BasePage";
const {
  ccclass,
  property
} = cc._decorator;
@ccclass
export default class SettleWholeImgPage extends BasePage {
  @property(cc.Node)
  imgNode: cc.Node = null;
  @property(cc.Node)
  titleNode: cc.Node = null;
  @property(cc.Node)
  btnNode: cc.Node = null;
  @property(sp.Skeleton)
  spineSkeleton: sp.Skeleton = null;
  @property(cc.Node)
  particleNode: cc.Node = null;
  @property(cc.Node)
  likeNode: cc.Node = null;
  @property(cc.Node)
  unlikeNode: cc.Node = null;
  nowIsFavorite = false;
  async _init(t) {
    super._init.call(this, t);
    this.titleNode.active = false;
    this.btnNode.active = false;
    this.spineSkeleton.node.active = false;
    this.particleNode.active = false;
    this.titleNode.opacity = 255;
    this.btnNode.opacity = 255;
    this.likeNode.active = false;
    this.unlikeNode.active = false;
    this.nowIsFavorite = false;
    return;
  }
  _onHide() {
    super._onHide.call(this);
    this.imgNode.removeAllChildren();
  }
  @decorator.Debounce(400)
  async setFavorite() {
    await Service.commonApiPost(RequestType.setCollectImage, {
      image_id: MakeMnGlobalData.startGameData.profile.level_info.img_id
    });
    this.nowIsFavorite = !this.nowIsFavorite;
    this.likeNode.active = this.nowIsFavorite;
    EngineUtil.showCocosToast3(this.nowIsFavorite ? "收藏成功" : "取消收藏");
    return;
  }
  @decorator.Debounce(1000)
  close() {
    var e = this;
    AudioManager.instance.playBtn();
    cc.tween(GlobalApp.GameMain.node).to(0.1, {
      opacity: 255
    }).start();
    cc.tween(this.titleNode).to(0.1, {
      opacity: 0
    }).start();
    cc.tween(this.btnNode).to(0.1, {
      opacity: 0
    }).start();
    var t = GlobalApp.GameContainer.bookNode.worldPosition.add(cc.v3(0, 20, 0));
    this.spineSkeleton.node.active = false;
    cc.tween(this.imgNode.children[0]).to(0.2, {
      scale: 0.9
    }).delay(0.1).to(0.5, {
      scale: 0.1,
      position: t
    }, Object.assign({}, Constants.bezierOpts2(this.imgNode.children[0], cc.Vec3.ZERO, t, 1, cc.v3(200, 500, 0)))).to(0.1, {
      scale: 0
    }).call(function () {
      e._hide();
    }).start();
  }
  async _onShow() {
    var t,
      o,
      n = this;
    super._onShow.call(this);
    await EngineUtil.sleep(500);
    t = GlobalApp.GameContainer.splitSprite;
    (o = cc.instantiate(t.node)).removeComponent(SplitSprite);
    GlobalApp.GameContainer.bgContainer.node.removeAllChildren();
    cc.tween(GlobalApp.GameMain.node).to(0.1, {
      opacity: 0
    }).start();
    o.parent = this.imgNode;
    o.worldPosition = t.node.worldPosition;
    AudioManager.instance.playGameSound("win");
    this.scheduleOnce(function () {
      t.node.removeAllChildren();
      n.particleNode.active = true;
      n.particleNode.getComponentsInChildren(cc.ParticleSystem3D).forEach(function (e) {
        e.play();
      });
      cc.tween(o).to(0.2, {
        scale: 0.75,
        position: cc.Vec3.ZERO
      }).call(function () {
        n.spineSkeleton.node.active = true;
        n.spineSkeleton.setAnimation(0, "show", false);
        var e = n;
        n.spineSkeleton.setEventListener(function (t) {
          if ("show" == t.animation.name) {
            e.titleNode.active = true;
            e.btnNode.active = true;
            e.unlikeNode.active = true;
          }
        });
      }).start();
    }, 0.01);
    return;
  }
}