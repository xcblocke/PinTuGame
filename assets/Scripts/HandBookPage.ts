import decorator from "./decorator/decorator";
import EngineUtil from "./framework/Utils/EngineUtil";
import { PageEnum } from "./framework/enum/AllEnum";
import { RequestType } from "./service/RequestType";
import Service from "./service/Service";
import GlobalApp from "./common/GlobalApp";
import UiNode from "./common/UiNode";
import { gameData } from "./data/GameData";
import MakeMnGlobalData from "./data/MakeMnGlobalData";
import BasePage from "./view/BasePage";
import PageMgr from "./view/PageMgr";
const {
  ccclass,
  property
} = cc._decorator;
@ccclass
export default class HandBookPage extends BasePage {
  @property(cc.Node)
  atlasList: cc.Node = null;
  @property(cc.Node)
  atlasItem: cc.Node = null;
  @property(cc.Node)
  tipNode: cc.Node = null;
  @property(cc.RichText)
  tipRichText: cc.RichText = null;
  @property(cc.Label)
  tipAmountLabel: cc.Label = null;
  @property(cc.Label)
  atlasAmountLabel: cc.Label = null;
  @property(cc.Label)
  atlasDescLabel: cc.Label = null;
  @property(cc.Widget)
  atlasListWidget: cc.Widget = null;
  atlasTargetCount = 30;
  atlasUnlockCount = 0;
  onLoad() {
    super.onLoad.call(this);
    this.startPosition = GlobalApp.GameContainer.handBookBtn.worldPosition;
    this.atlasList.removeAllChildren();
  }
  @decorator.Debounce(1000)
  async showHandBookDetail(e, t) {
    var o, n, i;
    o = t.split("|"), n = o[0], i = o[1];
    PageMgr.showPageByEnum(PageEnum.HandBookDetailPage, {
      atlas_id: n,
      atlas_name: i,
      startPosition: e.target.worldPosition
    });
    return;
  }
  initAtlasList(e) {
    var t = this;
    e.forEach(async function (e, o) {
      const __async_this = t;
      await __async_this.initAtlasItem(e, o);
      return;
    });
  }
  async initAtlasItem(e, t) {
    var o, n, i;
    o = this.atlasList.children[t] || cc.instantiate(this.atlasItem);
    await EngineUtil.sleep(10 * t);
    o.parent = this.atlasList;
    o.active = true;
    (n = o.getComponent(UiNode)).uiLabels.get("name").string = e.atlas_name;
    n.uiNodes.get("weijiesuo_bg").active = false;
    n.uiNodes.get("has").active = false;
    o.getComponent(cc.Button).clickEvents[0].customEventData = e.atlas_id + "|" + e.atlas_name;
    if (0 == e.completed_count) {
      n.uiNodes.get("weijiesuo_bg").active = true;
      n.uiLabels.get("allLock").string = "0/" + e.count;
      return;
    }
    n.uiNodes.get("has").active = true;
    n.uiNodes.get("tag_unlock").active = e.completed_count == e.count;
    n.uiNodes.get("tag_lock").active = e.completed_count != e.count;
    n.uiLabels.get("unLockLabel").string = e.completed_count + "/" + e.count;
    n.uiLabels.get("allUnLock").string = e.count + "/" + e.count;
    i = await gameData.getLoadLevelData(e.cover_url);
    n.uiNodes.get("img").getComponent(cc.Sprite).spriteFrame = i;
    return;
  }
  clickMn() {
    EngineUtil.showCocosToast3("还差" + (this.atlasTargetCount - this.atlasUnlockCount) + "个图集，可直接提现" + this.atlasAmountLabel.string);
  }
  async _init(t) {
    var o, n;
    super._init.call(this, t);
    GlobalApp.GameContainer.galleryRedNode.active = false;
    o = await Service.commonApiPost(RequestType.getHandBookList);
    this.atlasTargetCount = o.data.target_atlas_count;
    this.atlasUnlockCount = o.data.unlock_atlas_count;
    this.atlasAmountLabel.string = o.data.amount + "元";
    this.atlasDescLabel.string = "集齐" + o.data.unlock_atlas_count + "/" + o.data.target_atlas_count + "个图集，可直接提现" + o.data.amount + "元";
    this.initAtlasList(o.data.atlas_list);
    n = MakeMnGlobalData.startGameData.process_info.step;
    this.tipNode.active = 3 == n || 4 == n;
    this.atlasListWidget.top = this.tipNode.active ? 520 : 420;
    this.atlasListWidget.bottom = 190;
    this.tipRichText.string = 3 == n ? "集齐<color=#FF2A2A>" + MakeMnGlobalData.startGameData.process_info.num + "/" + MakeMnGlobalData.startGameData.process_info.target_num + "</color>本图集，免排队，立即提现" : "集齐<color=#FF2A2A>" + MakeMnGlobalData.startGameData.process_info.num + "/" + MakeMnGlobalData.startGameData.process_info.target_num + "</color>本图集，加速提现，秒到账";
    this.tipAmountLabel.string = "" + MakeMnGlobalData.getCNCashNum(Object.values(MakeMnGlobalData.startGameData.combine_extract_amount_dict).reduce(function (e, t) {
      return e + t;
    }, 0));
    return;
  }
  _onHide() {
    super._onHide.call(this);
  }
  _onShow() {
    super._onShow.call(this);
  }
}