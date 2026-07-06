import AudioManager from "../framework/Utils/AudioManager";
import BaseSystem from "../framework/Utils/BaseSystem";
import PlayerDataSys from "../framework/Utils/PlayerDataSys";
import GlobaldataMgr from "../framework/data/GlobaldataMgr";
import PageMgr from "./PageMgr";
import GlobalDataSys from "../framework/controller/GlobalDataSys";
import { Res } from "../common/ResourcesManager";
import { gameData } from "../data/GameData";
import LocalData from "../game/cyll/LocalData";
import { A } from "../gpCommon/api";
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

  @property(cc.JsonAsset)
  languageJson: cc.JsonAsset = null;

  private readonly MAIN_SCENE = "mainScene";
  private readonly LOADING_DURATION = 1.5;

  setLoadingLabel(e) {
    if (this.loadingLabel) {
      this.loadingLabel.string = e;
    }
  }
  onLoad() {
    A.n1(this.languageJson.json, cc.sys.languageCode);
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (e) {
        switch (e.label) {
          case 0:
            var duplicateLoading = this.node.getChildByName("for_loading copy");
            duplicateLoading && (duplicateLoading.active = false);
            this.setLoadingLabel(`gkey_267`);
            if (this.showLogin) this.showLogin.active = true;
            if (this.loading) this.loading.active = true;
            AudioManager.getInstance().init();
            LocalData.getInstance().initData();
            PageMgr.init();
            GlobalDataSys.init();
            BaseSystem.init();
            // this.setProgress(0);
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
    cc.director.preloadScene(this.MAIN_SCENE);
    this.playLoadingProgress();
  }

  playLoadingProgress() {
    cc.tween(this.node)
      .to(this.LOADING_DURATION, {}, {
        onUpdate: (target, ratio) => {
          this.setProgress(ratio);
        },
        easing: "linear"
      })
      .call(() => {
        this.setProgress(1);
        cc.director.loadScene(this.MAIN_SCENE);
      })
      .start();
  }
  async bootstrap() {
    try {
      this.setLoadingLabel(`gkey_268`);
      var configRes = await BaseSystem.getSystemConfig({});
      GlobaldataMgr.init(configRes.data);
      this.setLoadingLabel(`gkey_269`);
      var loginRes = await BaseSystem.touristsLogin({});
      PlayerDataSys.initUserId(loginRes.data);
      var userRes = await BaseSystem.getUserInfo({});
      if (userRes && 1 == userRes.code) {
        PlayerDataSys.setUserInfo(userRes.data);
      }
      this.setLoadingLabel(`gkey_271`);
      AudioManager.getInstance().initNativeUrl();
      await gameData.loadRemoteLevelData(PlayerDataSys.playerInfo.cueernt_level_url);
      await Res.loadGameRes();
    } catch (error) {
      console.error("loading bootstrap error", error);
      this.setLoadingLabel(`gkey_270`);
    }
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
        this.pro_label.string = Math.floor(100 * e) + "%";
      }
    }
  }

  onClickPrivacy() {
    A.u(A.p || PlayerDataSys.getPrivacyAgreementUrl());
  }
}
