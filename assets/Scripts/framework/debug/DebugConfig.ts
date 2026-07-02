import GlobalApp from "../../common/GlobalApp";
import { gameData } from "../../data/GameData";
import MakeMnGlobalData from "../../data/MakeMnGlobalData";
import PageMgr from "../../view/PageMgr";
import { RequestType } from "../../service/RequestType";
import Service from "../../service/Service";
import AudioManager from "../Utils/AudioManager";
import AdManager from "../Platform/AdManager";
import EngineUtil from "../Utils/EngineUtil";
import { PageEnum } from "../enum/AllEnum";
export var DebugType = {
  Button: "button",
  EditBox: "editBox",
  Toggle: "toggle",
  Slider: "slider",
  showText: "showText",
  Watch: "watch"
};
class y {
  static createPage(e, t, o = null) {
    return {
      title: e,
      type: DebugType.Button,
      func: function () {
        PageMgr.showPageByEnum(t, o);
      }
    };
  }
}
export var DebugProperty = {
  levelNum: 0,
  levelNum2: 0
};
export var DebugConfig = [{
  title: "删除用户",
  isOpen: false,
  children: [{
    title: "确认删除",
    type: DebugType.Button,
    func: async function () {
      var e;
      e = EngineUtil.getLocalData("yid");
      await Service.commonRequest(RequestType.create_new_user, {
        user_id: e.split("_")[0]
      });
      PageMgr.clear();
      EngineUtil.setLocalData("yid", "");
      AudioManager.getInstance().stopMusic("bg", true);
      cc.game.restart();
      return;
    }
  }]
}, {
  title: "基础测试",
  isOpen: false,
  children: [{
    title: "跳关",
    type: DebugType.Button,
    func: function () {
      GlobalApp.GameMain.overgame();
    }
  }, {
    title: "跳到第二阶段前一关",
    type: DebugType.Button,
    func: async function () {
      var e, t;
      e = 25 - MakeMnGlobalData.startGameData.lun_level;
      t = 0;
      while (t < e) {
        await Service.submitGame({
          is_tg: 1
        });
        t++;
      }
      GlobalApp.GameMain.restartGame();
      return;
    }
  }, {
    title: "跳N关文本",
    type: DebugType.EditBox,
    func: function (e, t) {
      DebugProperty.levelNum2 = +t;
    }
  }, {
    title: "跳N关",
    type: DebugType.Button,
    func: async function () {
      var e;
      EngineUtil.showCocosToast3("跳" + DebugProperty.levelNum2 + "关");
      e = 0;
      while (e < DebugProperty.levelNum2) {
        await Service.submitGame({
          is_tg: 1
        });
        e++;
      }
      GlobalApp.GameMain.restartGame();
      return;
    }
  }, {
    title: "广告开关",
    type: DebugType.Button,
    func: function (e) {
      AdManager.getInstance().noAdTest = !AdManager.getInstance().noAdTest;
      var t = AdManager.getInstance().noAdTest;
      e.btnLabel.string = t ? "广告已关" : "广告已开";
    },
    params: {
      btnLabel: "广告已开"
    }
  }, {
    title: "对局时间",
    type: DebugType.Watch,
    params: {
      watchValue: function () {
        return EngineUtil.formatTime(gameData.gameTime);
      }
    }
  }, {
    title: "重开游戏",
    type: DebugType.Button,
    func: function () {
      GlobalApp.GameMain.restartGame();
    }
  }, {
    title: "跳指定关文本",
    type: DebugType.EditBox,
    func: function (e, t) {
      DebugProperty.levelNum = +t;
    }
  }, {
    title: "跳指定关",
    type: DebugType.Button,
    func: async function () {
      var e;
      EngineUtil.showCocosToast3("跳到" + DebugProperty.levelNum + "关");
      e = 0;
      while (e < DebugProperty.levelNum - MakeMnGlobalData.startGameData.lun_level) {
        await Service.submitGame({
          is_tg: 1
        });
        e++;
      }
      GlobalApp.GameMain.restartGame();
      return;
    }
  }]
}, {
  title: "页面展示",
  isOpen: false,
  children: [y.createPage("luckRewardPage", PageEnum.luckRewardPage), y.createPage("SettlementPage", PageEnum.SettlementPage), y.createPage("SettleWholeImgPage", PageEnum.SettleWholeImgPage), y.createPage("WholeImgShowPage", PageEnum.WholeImgShowPage), y.createPage("propBuyPage", PageEnum.propBuyPage), y.createPage("SetUpPage", PageEnum.SetUpPage), y.createPage("failPage", PageEnum.failPage), y.createPage("oppoAdPage", PageEnum.oppoAdPage), y.createPage("webPage", PageEnum.webPage)]
}];