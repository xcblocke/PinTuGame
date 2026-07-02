import AdManager from "../framework/Platform/AdManager";
import Service from "../service/Service";
import { gameData } from "../data/GameData";
import EventMgr from "../framework/Event/EventMgr";
import GameEventType from "../framework/Event/GameEventType";
import PlayerDataSys from "../framework/Utils/PlayerDataSys";
import SdkHelper from "../framework/Utils/SdkHelper";
import LocalData from "../game/cyll/LocalData";
import MakeMnGlobalData from "../data/MakeMnGlobalData";
import PageMgr from "../view/PageMgr";
class _GameSystem {
  static _instance = null;
  static _getInstance() {
    _GameSystem._instance || (_GameSystem._instance = new _GameSystem());
    return _GameSystem._instance;
  }
  async startGame(e = 0) {
    return new Promise(function (t, o) {
      Service.startGame({
        is_restart: e
      }).then(function (e) {
        console.log("start game res-------", e);
        gameData.initGameData(e.data);
        var o = e.data.gold_bubble_flag;
        EventMgr.trigger(GameEventType.FRESH_RED_BUBBLE, o);
        t(e);
      }).catch(function (e) {
        o(e);
      });
    });
  }
  videoReward(e, t = 0) {
    var o = this;
    var s = AdManager.getInstance().cpm_data;
    e = Object.assign(Object.assign(Object.assign({}, e), s), {
      prop_type: t
    });
    console.log("*-*-*-*-*-*-*", e);
    return new Promise(function (t, n) {
      Service.videoReward(e).then(async function (e) {
        const __async_this = o;
        t(e);
        return;
      }).catch(function (e) {
        n(e);
      });
    });
  }
  onlyReward(e = {
    type: 1
  }) {
    var t = this;
    return new Promise(function (o, n) {
      Service.onlyReward(e).then(async function () {
        const __async_this = t;
        o(null);
        return;
      }).catch(function (e) {
        n(e);
      });
    });
  }
  updateGuideIno(e) {
    e.novice_status && (PlayerDataSys.guideStep = e.novice_status);
    return Service.updateGuideInfo(e);
  }
  getRankingInfo() {
    return Service.getRankingInfo();
  }
  getScrollMsg(e = null) {
    return Service.getScrollMsg(e);
  }
  getTaskList() {
    return Service.getTaskList();
  }
  luckyDraw() {
    return Service.luckyDraw();
  }
  luckyDrawList() {
    return Service.luckyDrawList();
  }
  getExtractInfo() {
    return Service.getExtractInfo();
  }
  gotoWithdraw_v2(e) {
    return Service.gotoWithdraw_v2(e);
  }
  getGoldExtractInfo() {
    return Service.getGoldExtractInfo();
  }
  getLevelExtractInfo() {
    return Service.getLevelExtractInfo();
  }
  getDayTaskInfo() {
    return Service.getDayTaskInfo();
  }
  getDayTask(e) {
    return Service.getDayTask(e);
  }
  getLevelReward(e) {
    return Service.getLevelReward(e);
  }
  getBigMsg() {
    return Service.getBigMsg();
  }
  gotoWithdraw(e) {
    return new Promise(function (t, o) {
      Service.gotoWithdraw(e).then(function (e) {
        t(e);
      }).catch(function (e) {
        o(e);
      });
    });
  }
  getWithdrawDetail(e) {
    return Service.getWithdrawDetail(e);
  }
  gotoGoldWithdraw(e) {
    return Service.gotoGoldWithdraw(e);
  }
  async handleSubmitGameAfter(e, t = null, o = false) {
    MakeMnGlobalData.submitGameDataInit(e);
  }
  async submitGame(e, t = null) {
    var o = await Service.submitGame({
      is_tg: e,
      sync_data: ""
    });
    await this.handleSubmitGameAfter(o.data, t, e);
    return o.data;
  }
  useProp(e) {
    var t = e.code;
    SdkHelper.reportData("use_prop", {
      prop_type: t
    });
    return new Promise(function (t, o) {
      Service.useProp(e).then(function (e) {
        t(e);
      }).finally(function () {
        o();
      });
    });
  }
  getGoldReward() {
    var e = 0;
    if (gameData.debugData.nextMustMoney > 0) {
      e = gameData.debugData.nextMustMoney;
      gameData.debugData.nextMustMoney = 0;
      LocalData.getInstance().setDebugData(JSON.stringify(gameData.debugData));
    } else if (null != gameData.debugData.fixedMoney) {
      e = gameData.debugData.fixedMoney;
      LocalData.getInstance().setDebugData(JSON.stringify(gameData.debugData));
    } else if (gameData.debugData.isOpenMingma) {
      e = 1;
      e *= 100;
    } else {
      var t = gameData.debugData.goldLowLimit,
        o = gameData.debugData.goldHighLimit;
      e = Math.floor(Math.random() * (o - t)) + t;
    }
    return e;
  }
  async clearBlock(e = null) {
    if (gameData.isOpenDemo) {
      LocalData.getInstance().setUserCashData(MakeMnGlobalData.goldBalance);
      gameData.isOpenDemo && gameData.debugData.isOpenAutoGet && PageMgr.openEventBlock("clearBlock");
      return;
    }
    await this.submitGame(0, e);
  }
  getCashReward(e) {
    var t = 0;
    if (gameData.debugData.nextMustMoney > 0) {
      t = gameData.debugData.nextMustMoney;
      gameData.debugData.nextMustMoney = 0;
      LocalData.getInstance().setDebugData(JSON.stringify(gameData.debugData));
    } else if (null != gameData.debugData.fixedMoney) {
      t = gameData.debugData.fixedMoney;
      LocalData.getInstance().setDebugData(JSON.stringify(gameData.debugData));
    } else if (gameData.debugData.isOpenMingma) {
      t = e;
      t *= 100;
    } else {
      var o = gameData.debugData.goldLowLimit,
        n = gameData.debugData.goldHighLimit;
      t = Math.floor(Math.random() * n) + o;
    }
    return t;
  }
  withdrawHistory() {
    return Service.withdrawHistory();
  }
  removeUser(e) {
    return Service.removeUser(e);
  }
}
export default _GameSystem._getInstance();