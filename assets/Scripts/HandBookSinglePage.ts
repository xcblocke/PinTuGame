import decorator from "./decorator/decorator";
import EngineUtil from "./framework/Utils/EngineUtil";
import { RequestType } from "./service/RequestType";
import Service from "./service/Service";
import BasePage from "./view/BasePage";
import { gameData } from "./data/GameData";
const {
  ccclass,
  property
} = cc._decorator;
@ccclass
export default class HandBookSinglePage extends BasePage {
  @property(cc.Label)
  title: cc.Label = null;
  @property(cc.Sprite)
  favoriteRootSprite: cc.Sprite = null;
  @property(cc.SpriteFrame)
  favoriteSpriteFrame: cc.SpriteFrame = null;
  @property(cc.SpriteFrame)
  unfavoriteSpriteFrame: cc.SpriteFrame = null;
  @property(cc.Node)
  listNode: cc.Node = null;
  nowIsFavorite = false;
  image_id = 100001;
  @property(cc.ScrollView)
  scrollView: cc.ScrollView = null;
  pageCount = 0;
  currentIndex = 0;
  isSnapping = false;
  dragStartOffsetX = 0;
  tween = null;
  globalList = [];
  close() {
    var t = this;
    super.close.call(this);
    this.listNode.children.forEach(function (e, o) {
      e.active = o == t.currentIndex;
    });
  }
  setCurrentIndex(e) {
    this.currentIndex = e;
    this.nowIsFavorite = this.globalList[this.currentIndex].isFavorite;
    this.favoriteRootSprite.spriteFrame = this.nowIsFavorite ? this.favoriteSpriteFrame : this.unfavoriteSpriteFrame;
    this.ADDImage();
    this.title.string = this.globalList[this.currentIndex].title;
  }
  onScroll(e, t) {
    if (e && !this.isSnapping) switch (t) {
      case cc.ScrollView.EventType.SCROLL_BEGAN:
        var o = e.getScrollOffset();
        this.dragStartOffsetX = o.x;
        break;
      case cc.ScrollView.EventType.SCROLL_ENDED:
        var n = (o = e.getScrollOffset()).x - this.dragStartOffsetX,
          i = 0.05 * this.scrollView.node.width,
          a = this.currentIndex + (n < 0 ? 1 : -1);
        if (a >= this.pageCount || a < 0) return;
        i < Math.abs(n) && (this.currentIndex = Math.max(0, Math.min(this.currentIndex + (n < 0 ? 1 : -1), this.pageCount - 1)));
        this.dragStartOffsetX = 0;
        this.setCurrentIndex(this.currentIndex);
        e.enabled = false;
        this.tween && this.tween.stop();
        this.tween = cc.tween(this.listNode).to(0.1, {
          x: -this.currentIndex * this.scrollView.node.width - this.scrollView.node.width / 2
        }).call(function () {
          e.enabled = true;
        }).start();
    }
  }
  async _init(t) {
    var o;
    var n = this;
    super._init.call(this, t);
    this.globalList = t.list;
    if (t) {
      this.pageCount = t.list.length;
      this.currentIndex = Number(t.index) || 0;
    }
    this.nowIsFavorite = null === (o = t.list[t.index]) || void 0 === o ? void 0 : o.isFavorite;
    this.resolveData = this.nowIsFavorite;
    this.image_id = t.list[t.index].image_id;
    this.favoriteRootSprite.spriteFrame = this.nowIsFavorite ? this.favoriteSpriteFrame : this.unfavoriteSpriteFrame;
    this.title.string = t.list[t.index].title;
    this.listNode.children.forEach(async function (e, o) {
      const __async_this = n;
      var n_local;
      e.active = t.list.length > o;
      e.getChildByName("uniMGBg").active = true;
      if (!e.active) return;
      e.getComponentsInChildren(cc.Sprite)[1].spriteFrame = null;
      n_local = await gameData.getLoadLevelData(__async_this.globalList[o].small_url);
      if (e.getComponentsInChildren(cc.Sprite)[1].spriteFrame) return;
      e.getComponentsInChildren(cc.Sprite)[1].spriteFrame = n_local;
      return;
    });
    this.listNode.x = -this.currentIndex * this.scrollView.node.width - this.scrollView.node.width / 2;
    this.ADDImage();
    return;
  }
  ADDImage() {
    var e = this;
    this.listNode.children.forEach(async function (t, o) {
      const __async_this = e;
      var e_local, n;
      e_local = t.getComponentsInChildren(cc.Sprite)[1];
      if (t.active && o >= __async_this.currentIndex - 2 && o <= __async_this.currentIndex + 2) {
        n = e_local;
        n.spriteFrame = await gameData.getLoadLevelData(__async_this.globalList[o].url);
        t.getChildByName("uniMGBg").active = false;
      }
      return;
    });
  }
  _onHide() {
    super._onHide.call(this);
  }
  _onShow() {
    super._onShow.call(this);
  }
  @decorator.Debounce(400)
  async setFavorite() {
    await Service.commonApiPost(RequestType.setCollectImage, {
      image_id: this.globalList[this.currentIndex].image_id
    });
    this.nowIsFavorite = !this.nowIsFavorite;
    this.globalList[this.currentIndex].isFavorite = this.nowIsFavorite;
    this.favoriteRootSprite.spriteFrame = this.nowIsFavorite ? this.favoriteSpriteFrame : this.unfavoriteSpriteFrame;
    EngineUtil.showCocosToast3(this.nowIsFavorite ? "收藏成功" : "取消收藏");
    return;
  }
}