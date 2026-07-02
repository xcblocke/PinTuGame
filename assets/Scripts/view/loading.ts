import AudioManager from "../framework/Utils/AudioManager";
import BaseSystem from "../framework/Utils/BaseSystem";
import PlayerDataSys from "../framework/Utils/PlayerDataSys";
import GlobaldataMgr from "../framework/data/GlobaldataMgr";
import PageMgr from "./PageMgr";
import GlobalDataSys from "../framework/controller/GlobalDataSys";
import { Res } from "../common/ResourcesManager";
import { gameData } from "../data/GameData";
import LocalData from "../game/cyll/LocalData";
const {
  ccclass,
  property
} = cc._decorator;
@ccclass
export default class loading extends cc.Component {
  @property(cc.Sprite)
  progress: cc.Sprite = null;
  @property(cc.Node)
  showLogin: cc.Node = null;
  @property(cc.Node)
  loading: cc.Node = null;
  @property(cc.Label)
  loadingLabel: cc.Label = null;
  @property(cc.Label)
  pro_label: cc.Label = null;
  @property(cc.Node)
  proIconNode: cc.Node = null;
  totalNum = [0];
  setLoadingLabel(e) {
    if (this.loadingLabel) {
      this.loadingLabel.string = e;
    }
  }
  onLoad() {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (e) {
        switch (e.label) {
          case 0:
            this.setLoadingLabel("正在初始化");
            if (this.showLogin) this.showLogin.active = false;
            if (this.loading) this.loading.active = true;
            AudioManager.getInstance().init();
            LocalData.getInstance().initData();
            PageMgr.init();
            GlobalDataSys.init();
            BaseSystem.init();
            this.setProgress(0);
            return [4, this.bootstrap()];
          case 1:
            e.sent();
            return [2];
        }
      });
    });
  }
  start() {
    this.setProgress(0);
  }
  async bootstrap() {
    try {
      this.setLoadingLabel("正在加载配置");
      this.setProgress(0.2);
      var configRes = await BaseSystem.getSystemConfig({});
      GlobaldataMgr.init(configRes.data);
      this.setLoadingLabel("正在初始化用户数据");
      this.setProgress(0.4);
      var loginRes = await BaseSystem.touristsLogin({});
      PlayerDataSys.initUserId(loginRes.data);
      var userRes = await BaseSystem.getUserInfo({});
      if (userRes && 1 == userRes.code) {
        PlayerDataSys.setUserInfo(userRes.data);
      }
      this.setProgress(0.6);
      await this.loadScene();
    } catch (error) {
      console.error("loading bootstrap error", error);
      this.setLoadingLabel("加载失败，请重试");
    }
  }
  loadScene() {
    var e = this;
    this.setLoadingLabel("正在加载场景");
    AudioManager.getInstance().initNativeUrl();
    var t = "mainScene";
    var o = gameData.loadRemoteLevelData(PlayerDataSys.playerInfo.cueernt_level_url);
    var n = Res.loadGameRes();
    cc.director.preloadScene(t, function (t, o) {
      e.totalNum[0] = t / o / e.totalNum.length;
      e.setProgress2();
    }, function () {
      return __awaiter(e, void 0, void 0, function () {
        return __generator(this, function (e) {
          switch (e.label) {
            case 0:
              return [4, o];
            case 1:
              e.sent();
              return [4, n];
            case 2:
              e.sent();
              this.setProgress(1);
              cc.director.loadScene(t);
              return [2];
          }
        });
      });
    });
  }
  setProgress2() {
    var e = this.totalNum.reduce(function (e, t) {
      return e + t;
    }, 0);
    this.setProgress(0.6 + 0.4 * e);
  }
  setProgress(e) {
    if (!isNaN(e)) {
      e < 0 && (e = 0);
      e > 1 && (e = 1);
      if (this.proIconNode && this.proIconNode.parent) {
        this.proIconNode.x = this.proIconNode.parent.width * e;
      }
      if (this.progress) {
        this.progress.fillRange = e;
      }
      if (this.pro_label) {
        this.pro_label.string = Math.floor(10000 * e) / 100 + "%";
      }
    }
  }
}
