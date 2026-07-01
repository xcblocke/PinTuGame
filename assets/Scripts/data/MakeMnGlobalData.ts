import { PageEnum } from "../framework/enum/AllEnum";
import EventMgr from "../framework/Event/EventMgr";
import GameEventType from "../framework/Event/GameEventType";
import { MathUtils } from "../framework/Utils/MathUtil";
import LocalData from "../game/cyll/LocalData";
import { gameData } from "./GameData";
import GlobalApp from "../common/GlobalApp";
import PageMgr from "../view/PageMgr";
class f {
  _cashBalance = 0;
  _goldBalance = 0;
  force_num = 0;
  clearCount = 0;
  infoType = null;
  startGameData = null;
  submitGameData = null;
  oldStep = 0;
  linkTimes = 0;
  get cashBalance() {
    return this._cashBalance;
  }
  set cashBalance(e) {
    this._cashBalance = e;
  }
  get goldBalance() {
    return this._goldBalance;
  }
  set goldBalance(e) {
    this._goldBalance = e;
  }
  get ForceNum() {
    if (this.startGameData.game_level <= 2) return false;
    this.force_num++;
    if (this.force_num == this.forceNumFrequency) {
      this.force_num = 0;
      return true;
    }
    return false;
  }
  get extract_desc() {
    return this.infoType.extract_desc;
  }
  get extract_cash_desc() {
    return this.infoType.extract_cash_desc;
  }
  get forceNumFrequency() {
    return this.infoType.conf_info.parameter_conf.cash_up_2.para_value;
  }
  get luckyShowNum() {
    return this.infoType.conf_info.parameter_conf.bigmoney_showtime.para_value;
  }
  get settlementShowNum() {
    return this.infoType.conf_info.parameter_conf.levelup_envelope_show.para_value;
  }
  get luckyRewardNum() {
    return this.infoType.conf_info.parameter_conf.bigmoney_envelope_show.para_value;
  }
  get luckyRewardOnlyNum() {
    return this.infoType.conf_info.parameter_conf.bigmoney_cash_only.para_value;
  }
  get pass1CashReward() {
    return this.infoType.conf_info.parameter_conf.pass_1_ad_cash.para_value;
  }
  get pass2CashReward() {
    return this.infoType.conf_info.parameter_conf.pass_2_ad_cash.para_value;
  }
  async showLuckReward() {
    if (gameData._isHelpCombine) return;
    if (this.startGameData.game_level <= 2) return;
    this.clearCount++;
    if (!(GlobalApp.GameContainer.isWin || this.clearCount % this.luckyShowNum != 0)) {
      await PageMgr.showPageByEnum(PageEnum.luckRewardPage, {}, {
        inQueue: true
      });
      return;
    } else {
      return;
    }
  }
  submitGameDataInit(e) {
    this.submitGameData = e;
  }
  infoInit(e) {
    this.infoType = e;
    this.goldBalance = e.gold_balance;
    this.cashBalance = e.cash_balance;
  }
  gameInit(e) {
    this.startGameData = e;
    0 == this.oldStep && (this.oldStep = this.startGameData.process_info.step);
  }
  addUserCashBalance(e) {
    if (e >= 0) {
      this.cashBalance += e;
      gameData.isOpenDemo || EventMgr.trigger(GameEventType.UPDATE_BALANCE);
    }
    gameData.isOpenDemo && LocalData.getInstance().setUserCashData(this.cashBalance);
  }
  getCashBalance(e = this.cashBalance) {
    return this.getCNCashNum(e);
  }
  getCashBalanceWithUnit(e = this.cashBalance, t = "元") {
    return this.getCNCashNum(e) + t;
  }
  setUserCashBalance(e, t = true) {
    e = e < 0 ? 0 : e;
    this.cashBalance = e;
    t && EventMgr.trigger(GameEventType.UPDATE_BALANCE);
  }
  addUserGoldBalance(e, t = true) {
    if (e >= 0) {
      this.goldBalance += e;
      t && EventMgr.trigger(GameEventType.UPDATE_GOLDBALANCE);
    }
  }
  getGoldBalance(e = this.goldBalance) {
    return this.getCNGoldBalanceNum(e);
  }
  getGoldBalanceWithUnit(e = this.goldBalance, t = "元") {
    return this.getCNGoldBalanceNum(e) + t;
  }
  setUserGoldBalance(e, t = true) {
    e = e < 0 ? 0 : e;
    this.goldBalance = e;
    t && EventMgr.trigger(GameEventType.UPDATE_GOLDBALANCE);
  }
  getCNCashNum(e, t = 1000) {
    if (0 == e) return e.toString();
    var o = Math.floor(100 * e) / 100 / 100,
      n = parseInt(o.toString()),
      i = n.toString(),
      a = parseInt((MathUtils.getInstance().accMul(o, 100) - 100 * n).toString()).toString();
    1 == a.length && (a = "0" + a);
    if ("00" == a) return i;
    2 == a.length && "0" == a[1] && (a = a[0]);
    +i >= 100 && (a = +a[0] ? a[0] : "");
    return +i >= t ? i : a ? i + "." + a : i;
  }
  getCNGoldBalanceNum(e) {
    if (0 == e) return e.toString();
    var t = Math.floor(100 * e) / 100,
      o = parseInt(t.toString()),
      n = o.toString(),
      i = parseInt((MathUtils.getInstance().accMul(t, 100) - 100 * o).toString()).toString();
    1 == i.length && (i = "0" + i);
    if ("00" == i) return n;
    2 == i.length && "0" == i[1] && (i = i[0]);
    return n + "." + i;
  }
}
export default new f();