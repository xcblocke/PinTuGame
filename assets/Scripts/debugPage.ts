import { gameData } from "./data/GameData";
import BasePage from "./view/BasePage";
import LocalData from "./game/cyll/LocalData";
import EventMgr from "./framework/Event/EventMgr";
import GameEventType from "./framework/Event/GameEventType";
import Service from "./service/Service";
import GlobalApp from "./common/GlobalApp";
import EngineUtil from "./framework/Utils/EngineUtil";
import { RequestType } from "./service/RequestType";
const {
  ccclass,
  property
} = cc._decorator;
@ccclass
export default class debugPage extends BasePage {
  @property(cc.EditBox)
  goldLowLimit: cc.EditBox = null;
  @property(cc.EditBox)
  goldHighLimit: cc.EditBox = null;
  @property(cc.EditBox)
  nextMustMoney: cc.EditBox = null;
  @property(cc.Toggle)
  isOpenMingma: cc.Toggle = null;
  @property(cc.EditBox)
  passLevelEditBox: cc.EditBox = null;
  @property(cc.EditBox)
  mingmaMoney: cc.EditBox = null;
  @property(cc.Toggle)
  isOpenAutoGet: cc.Toggle = null;
  _init() {
    var e = LocalData.getInstance().getDebugData();
    e && (gameData.debugData = e);
    this.goldLowLimit.string = gameData.debugData.goldLowLimit.toString();
    this.goldHighLimit.string = gameData.debugData.goldHighLimit.toString();
    this.nextMustMoney.string = gameData.debugData.nextMustMoney.toString();
    this.isOpenMingma.isChecked = gameData.debugData.isOpenMingma;
    this.mingmaMoney.string = gameData.debugData.mingmaMoney.toString();
    this.isOpenAutoGet.isChecked = gameData.debugData.isOpenAutoGet;
  }
  migaMoneyCheckChange() {}
  openAutoGetCheckChange() {
    gameData.debugData.isOpenAutoGet = this.isOpenAutoGet.isChecked;
  }
  onDestroy() {}
  close() {
    this._hide();
  }
  async passClick() {
    if (isNaN(Number(this.passLevelEditBox.string))) {
      EngineUtil.showCocosToast3(`gkey_067`);
      return;
    }
    await Service.commonRequest(RequestType.setLevel, {
      level_id: Number(this.passLevelEditBox.string)
    });
    GlobalApp.GameMain.startgame();
    this.close();
    return;
  }
  save() {
    gameData.debugData.goldLowLimit = Number(this.goldLowLimit.string);
    gameData.debugData.goldHighLimit = Number(this.goldHighLimit.string);
    gameData.debugData.nextMustMoney = Number(this.nextMustMoney.string);
    gameData.debugData.isOpenMingma = this.isOpenMingma.isChecked;
    gameData.debugData.isOpenAutoGet = this.isOpenAutoGet.isChecked;
    gameData.debugData.mingmaMoney = Number(this.mingmaMoney.string);
    if (Number(this.goldLowLimit.string) == Number(this.goldHighLimit.string)) {
      gameData.debugData.fixedMoney = Number(this.goldLowLimit.string);
    } else {
      gameData.debugData.fixedMoney = null;
    }
    LocalData.getInstance().setDebugData(JSON.stringify(gameData.debugData));
    EventMgr.trigger(GameEventType.MINGMABIAOJIA);
    this.close();
  }
}