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
  title: `gkey_070`,
  isOpen: false,
  children: [{
    title: `gkey_071`,
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
  title: `gkey_072`,
  isOpen: false,
  children: [{
    title: `gkey_012`,
    type: DebugType.Button,
    func: function () {
      GlobalApp.GameMain.overgame();
    }
  }, {
    title: `gkey_073`,
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
    title: `gkey_074`,
    type: DebugType.EditBox,
    func: function (e, t) {
      DebugProperty.levelNum2 = +t;
    }
  }, {
    title: `gkey_075`,
    type: DebugType.Button,
    func: async function () {
      var e;
      EngineUtil.showCocosToast3(`gkey_076??&value1==${DebugProperty.levelNum2}`);
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
    title: `gkey_077`,
    type: DebugType.Button,
    func: function (e) {
      AdManager.getInstance().noAdTest = !AdManager.getInstance().noAdTest;
      var t = AdManager.getInstance().noAdTest;
      e.btnLabel.string = t ? `gkey_078` : `gkey_079`;
    },
    params: {
      btnLabel: `gkey_079`
    }
  }, {
    title: `gkey_080`,
    type: DebugType.Watch,
    params: {
      watchValue: function () {
        return EngineUtil.formatTime(gameData.gameTime);
      }
    }
  }, {
    title: `gkey_081`,
    type: DebugType.Button,
    func: function () {
      GlobalApp.GameMain.restartGame();
    }
  }, {
    title: `gkey_082`,
    type: DebugType.EditBox,
    func: function (e, t) {
      DebugProperty.levelNum = +t;
    }
  }, {
    title: `gkey_011`,
    type: DebugType.Button,
    func: async function () {
      var e;
      EngineUtil.showCocosToast3(`gkey_083??&value1==${DebugProperty.levelNum}`);
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
  title: `gkey_084`,
  isOpen: false,
  children: [y.createPage("luckRewardPage", PageEnum.luckRewardPage), y.createPage("SettlementPage", PageEnum.SettlementPage), y.createPage("SettleWholeImgPage", PageEnum.SettleWholeImgPage), y.createPage("WholeImgShowPage", PageEnum.WholeImgShowPage), y.createPage("propBuyPage", PageEnum.propBuyPage), y.createPage("SetUpPage", PageEnum.SetUpPage), y.createPage("failPage", PageEnum.failPage), y.createPage("oppoAdPage", PageEnum.oppoAdPage), y.createPage("webPage", PageEnum.webPage)]
}];