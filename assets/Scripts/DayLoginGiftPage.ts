import decorator from "./decorator/decorator";
import { PageEnum } from "./framework/enum/AllEnum";
import { RequestType } from "./service/RequestType";
import Service from "./service/Service";
import { gameData } from "./data/GameData";
import MakeMnGlobalData from "./data/MakeMnGlobalData";
import BasePage from "./view/BasePage";
import PageMgr from "./view/PageMgr";
const {
  ccclass,
  property
} = cc._decorator;
@ccclass
export default class DayLoginGiftPage extends BasePage {
  @property(cc.Label)
  prop1CountLabel: cc.Label = null;
  @property(cc.Label)
  prop2CountLabel: cc.Label = null;
  @decorator.Debounce(1000)
  reciveProp() {
    var e = this;
    Service.commonApiPost(RequestType.receiveLoginGift, {}).then(async function (t) {
      const __async_this = e;
      var e_local;
      e_local = t.data.prop_info;
      __async_this._fakeHide();
      gameData.startgameData.prop_info = e_local;
      await PageMgr.showPageByEnum(PageEnum.rewardToastPage, {
        propCount: MakeMnGlobalData.infoType.login_add_prop_conf.puzzle_prop,
        propCount2: MakeMnGlobalData.infoType.login_add_prop_conf.image_prop
      });
      __async_this._onHide();
      return;
    });
  }
  _init(t) {
    super._init.call(this, t);
    this.prop1CountLabel.string = "x" + MakeMnGlobalData.infoType.login_add_prop_conf.puzzle_prop;
    this.prop2CountLabel.string = "x" + MakeMnGlobalData.infoType.login_add_prop_conf.image_prop;
  }
  _onHide() {
    super._onHide.call(this);
  }
  _onShow() {
    super._onShow.call(this);
  }
}