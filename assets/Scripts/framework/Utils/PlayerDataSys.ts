import LocalData from "../../game/cyll/LocalData";
import { gameConfig } from "../../game/data/GameConfig";
import { gameData } from "../../data/GameData";
import MakeMnGlobalData from "../../data/MakeMnGlobalData";
import PlayerDataMgr from "../data/PlayerDataMgr";
import HotUpdate from "../Event/HotUpdate";
import ClientData from "../Event/ClientData";
import SdkHelper from "./SdkHelper";
import { CUSTOMER_SERVICE, IOS_USER_AGREEMENT, USER_AGREEMENT, IOS_PRIVACY_AGREEMENT, PRIVACY_AGREEMENT } from "../SystemConfig";
import EngineUtil from "./EngineUtil";
class _PlayerDataSys extends PlayerDataMgr {
  playerInfo = null;
  static _instance = null;
  static _getInstance() {
    this._instance || (_PlayerDataSys._instance = new _PlayerDataSys());
    return _PlayerDataSys._instance;
  }
  setConfigReviewing(e) {
    var t = e.is_reviewer;
    this.is_reviewer = t || this.is_reviewer || 0;
  }
  setUserInfo(e) {
    this.playerInfo = e;
    MakeMnGlobalData.infoInit(e);
    e.is_reviewer;
    var t = e.level,
      o = e.big_scroll_xc_count,
      n = (e.cash_balance, e.bind_wx),
      i = e.gender,
      l = e.create_time,
      u = e.nickname,
      p = (e.game_level, e.headimgurl),
      f = e.reco_switch,
      h = (e.gold_balance, e.novice_status),
      g = (e.prop_info, e.extract_desc, e.free_lottery_flag, e.guide_step_new);
    e.extract_cash_desc, e.diamond_num, e.wufu_info, e.wufu_list, e.card_info, e.card_list, e.sign_point, e.task_point, e.box_num, e.extract_status, e.sign_popup_flag, e.wufu_reward, e.task_show;
    try {
      gameData.info = e;
      gameConfig.paramConfig = e.conf_info.parameter_conf;
      gameConfig.cardConfig = e.conf_info.card_conf;
      this.big_scroll_xc_count = o;
      this.user_level = t || 1;
      this.reco_switch = f;
      this.bindwx = n;
      this.createtime = l;
      this.gender = i;
      this.headimgurl = p || "https://thirdwx.qlogo.cn/mmopen/vi_32/JrN4b6WVb5xtuuticYA1y9Wnv3KQPBUShsWKY1ibHg3NMf9r8MMvjH4Jrial6td6ibUteOzSUYGChGGoPtzibE669Ng/132";
      this.nickname = u || `gkey_108??&value1==${1248152}`;
      this.guide_step_new = BigInt(g) || BigInt(0);
      var y = LocalData.getInstance().getDebugData();
      y && (gameData.debugData = y);
      var m = h;
      this.guideStep = m;
      var _ = this.yid,
        v = this.userid;
      SdkHelper.setUserInfo({
        yid: _,
        user_id: v,
        gender: i,
        create_time: l,
        is_travel: n
      });
      this.is_reviewer && SdkHelper.reportData("loading_is_reviewer");
    } catch (e) {
      console.error(e);
    }
  }
  initUserId(e) {
    var t = e.user_id,
      o = e.yid;
    this.userid = t || "";
    this.yid = o || "yid_read_failed";
    EngineUtil.setLocalData("yid", this.yid);
    ClientData.setCommonData(o);
  }
  getYid() {
    return this.yid;
  }
  initWxData(e) {
    this.initUserId(e);
    var t = e.bind_phone,
      o = e.gender,
      n = e.headimgurl,
      i = e.nickname;
    this.bindphone = t || 0;
    this.gender = o || `gkey_069`;
    this.headimgurl = n || "";
    this.nickname = i || "";
    this.bindwx = 1;
  }
  uploadCpm(e) {
    e && (this.userCpm = JSON.parse(e));
  }
  updateGameTime() {
    this.gameTime = EngineUtil.getTimeStamp();
  }
  isOppoReviewer() {
    return this.is_reviewer && "oppo" == ClientData.channel_name;
  }
  isVivoReviewer() {
    return this.is_reviewer && ("vivo" == ClientData.channel_name || "huawei" == ClientData.channel_name);
  }
  isXiaoMiReviewer() {
    return this.is_reviewer && "xiaomi" == SdkHelper.getChannelName().toLowerCase();
  }
  isTencent() {
    return new RegExp("tencent").test(ClientData.channel_name);
  }
  getCustomerServiceUrl() {
    var e = SdkHelper.getChannelName().toLowerCase();
    return CUSTOMER_SERVICE + "&channel_name=" + e;
  }
  getUserAgreementUrl(e = 0) {
    var t = SdkHelper.getChannelName().toLowerCase(),
      o = cc.sys.os === cc.sys.OS_IOS ? IOS_USER_AGREEMENT : USER_AGREEMENT,
      n = e;
    return o + "&version_name=" + ClientData.version_name + "&channel_name=" + t + "&device_id=" + ClientData.device_id + "&fd=" + n + "&debug=" + !HotUpdate.getInstance().isOnlineRelease();
  }
  getPrivacyAgreementUrl() {
    SdkHelper.openAgreementPage();
    var e = SdkHelper.getChannelName().toLowerCase(),
      t = cc.sys.os === cc.sys.OS_IOS ? IOS_PRIVACY_AGREEMENT : PRIVACY_AGREEMENT;
    return t + "&version_name=" + ClientData.version_name + "&channel_name=" + e + "&device_id=" + ClientData.device_id + "&fd=1&debug=" + !HotUpdate.getInstance().isOnlineRelease();
  }
}
export default _PlayerDataSys._getInstance();