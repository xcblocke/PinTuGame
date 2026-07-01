const {
  ccclass,
  property
} = cc._decorator;
@ccclass
export default class GameConfig {
  _card_conf = null;
  _parameter_conf = null;
  _glory_conf = null;
  static _instance = null;
  get cardConfig() {
    return this._card_conf;
  }
  set cardConfig(e) {
    this._card_conf = e;
  }
  get paramConfig() {
    return this._parameter_conf;
  }
  set paramConfig(e) {
    this._parameter_conf = e;
  }
  get gloryConfig() {
    return this._glory_conf;
  }
  set gloryConfig(e) {
    this._glory_conf = e;
  }
  static getInstance() {
    this._instance || (this._instance = new GameConfig());
    return this._instance;
  }
  getStepShowGoldCount() {
    return this._parameter_conf.bigmoney_gold_only.para_value;
  }
  getStepRewardConfig() {
    return {
      goldReward: this._parameter_conf.bigmoney_envelope_show.para_value,
      cashOnlyReward: this._parameter_conf.bigmoney_cash_only.para_value
    };
  }
  getSettleMentConfig() {
    return {
      goldReward: this._parameter_conf.levelup_envelope_show.para_value,
      cashOnlyReward: this._parameter_conf.levelup_cash_only.para_value
    };
  }
  getAllFuFragmentCount() {
    return this._parameter_conf.merge_need_num.para_value;
  }
  getAssetIconPathById(e) {
    return this.cardConfig[e].resPath;
  }
  getAssetInfoById(e) {
    return this.cardConfig[e];
  }
  getTotalGloryCash() {
    var e = 0;
    for (var t in this._glory_conf) e += this._glory_conf[t].cash;
    return e;
  }
}
export enum BlockType {
  CASH_BLOCK = 1,
  GOLD_BLOCK = 2,
}
export var WdReqType = {
  can_wd: 1,
  wait_wd: 2,
  restrict_wd: 3,
  sign_wd: 4
};
export var gameConfig = GameConfig.getInstance();