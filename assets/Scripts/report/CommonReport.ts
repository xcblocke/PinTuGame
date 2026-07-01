import SdkHelper from "../framework/Utils/SdkHelper";
import { gameData } from "../data/GameData";
import MakeMnGlobalData from "../data/MakeMnGlobalData";
export class CommonReport {
  static _instance = null;
  get levelInfo() {
    return {
      level: gameData.startgameData.lun_level
    };
  }
  static get instance() {
    this._instance || (this._instance = new CommonReport());
    return this._instance;
  }
  failPass() {
    this.report("fail_pass_game_level", Object.assign({}, this.levelInfo));
  }
  report(e, t) {
    SdkHelper.reportData(e, t);
  }
  reportGameGuide(e) {
    this.report("guide", e);
  }
  reportGameCashGuide() {
    this.report("guide_cash", Object.assign({}, this.levelInfo));
  }
  reportGameStart() {
    this.report("show_game_level", Object.assign({}, this.levelInfo));
  }
  reportGameEnd() {
    this.report("pass_game_level", Object.assign({
      duration: gameData.gameTime,
      user_step: gameData.stepNum,
      restart_times: gameData.restart_times,
      specifyCarUseCount: gameData.specifyCarUseCount,
      refreshUseCount: gameData.refreshUseCount,
      addSpaceUseCount: gameData.addSpaceUseCount
    }, this.levelInfo));
  }
  reportGameBalanceEnd() {
    this.report("pass_game_level_balance", Object.assign(Object.assign({
      duration: gameData.gameTime
    }, this.levelInfo), {
      cashNum: MakeMnGlobalData.cashBalance,
      goldNum: MakeMnGlobalData.goldBalance
    }));
  }
  reportGameAdPlay(e) {
    this.report("video", Object.assign(Object.assign({}, e), this.levelInfo));
  }
}
CommonReport.instance;