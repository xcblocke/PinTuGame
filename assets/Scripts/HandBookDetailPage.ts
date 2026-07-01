import decorator from "./decorator/decorator";
import EngineUtil from "./framework/Utils/EngineUtil";
import { PageEnum } from "./framework/enum/AllEnum";
import { RequestType } from "./service/RequestType";
import Service from "./service/Service";
import { gameData } from "./data/GameData";
import BasePage from "./view/BasePage";
import PageMgr from "./view/PageMgr";
const {
  ccclass,
  property
} = cc._decorator;
@ccclass
export default class HandBookDetailPage extends BasePage {
  @property(cc.Label)
  title: cc.Label = null;
  @property(cc.Node)
  atlasList: cc.Node = null;
  @property(cc.Node)
  atlasItem: cc.Node = null;
  globalList = [];
  async _init(t) {
    var o,
      n,
      i = this;
    if (!t) return;
    super._init.call(this, t);
    this.title.string = t.atlas_name;
    o = await Service.commonApiPost(RequestType.getHandBookDetail, {
      atlas_id: t.atlas_id
    });
    this.atlasList.removeAllChildren();
    n = 0;
    o.data.forEach(async function (e) {
      const __async_this = i;
      var t, o;
      (t = cc.instantiate(__async_this.atlasItem)).parent = __async_this.atlasList;
      t.active = true;
      t.getComponent(cc.Button).clickEvents[0].customEventData = "";
      if (1 == e.lock) return;
      t.getComponent(cc.Button).clickEvents[0].customEventData = "" + n++;
      o = t.getComponentInChildren(cc.Sprite);
      o.spriteFrame = await gameData.getLoadLevelData(e.small_url);
      return;
    });
    this.globalList = o.data.filter(function (e) {
      return 0 == e.lock;
    }).map(function (e, o) {
      return {
        image_id: e.image_id,
        small_url: e.small_url,
        url: e.url,
        title: t.atlas_name + "-" + (o + 1),
        isFavorite: !!e.favorite
      };
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
    return;
  }
  _onHide() {
    super._onHide.call(this);
  }
  _onShow() {
    super._onShow.call(this);
  }
}