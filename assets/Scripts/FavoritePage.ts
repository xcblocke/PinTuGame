import decorator from "./decorator/decorator";
import EngineUtil from "./framework/Utils/EngineUtil";
import { PageEnum } from "./framework/enum/AllEnum";
import { RequestType } from "./service/RequestType";
import Service from "./service/Service";
import UiNode from "./common/UiNode";
import { gameData } from "./data/GameData";
import BasePage from "./view/BasePage";
import PageMgr from "./view/PageMgr";
const {
  ccclass,
  property
} = cc._decorator;
@ccclass
export default class FavoritePage extends BasePage {
  @property(cc.Node)
  atlasList: cc.Node = null;
  @property(cc.Node)
  atlasItem: cc.Node = null;
  globalList = [];
  onLoad() {
    super.onLoad.call(this);
    this.atlasList.removeAllChildren();
  }
  async _init(t) {
    super._init.call(this, t);
    await this.updateList();
    return;
  }
  async updateList() {
    var e,
      t = this;
    this.globalList = [];
    e = await Service.commonApiPost(RequestType.collectImage);
    this.atlasList.children.forEach(function (t, o) {
      o >= e.data.length && (t.active = false);
    });
    e.data.forEach(async function (e, o) {
      const __async_this = t;
      var t_local, n, i;
      __async_this.globalList.push({
        image_id: e.image_id,
        small_url: e.small_url,
        url: e.url,
        title: e.title,
        isFavorite: true
      });
      (t_local = __async_this.atlasList.children[o] || cc.instantiate(__async_this.atlasItem)).getComponent(cc.Button).clickEvents[0].customEventData = "" + o;
      await EngineUtil.sleep(10 * o);
      n = t_local.getComponent(UiNode);
      i = n.uiSprites.get("img");
      i.spriteFrame = await gameData.getLoadLevelData(e.small_url);
      t_local.parent = __async_this.atlasList;
      t_local.active = true;
      return;
    });
    return;
  }
  @decorator.Debounce(200)
  async showHandBookSinglePage(e, t) {
    var e;
    if (!t) {
      EngineUtil.showCocosToast3("还未解锁，继续游戏吧~");
      return;
    }
    e = t;
    await PageMgr.showPageByEnum(PageEnum.HandBookSinglePage, {
      index: e,
      list: this.globalList
    });
    this.updateList();
    return;
  }
  _onHide() {
    super._onHide.call(this);
  }
  _onShow() {
    super._onShow.call(this);
  }
}