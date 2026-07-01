import AudioManager from "./framework/Utils/AudioManager";
import MakeMnGlobalData from "./data/MakeMnGlobalData";
import BasePage from "./view/BasePage";
const {
  ccclass,
  property
} = cc._decorator;
@ccclass
export default class LevelStartPage extends BasePage {
  @property(cc.Node)
  normalNode: cc.Node = null;
  @property(cc.Node)
  withdrawRateNode: cc.Node = null;
  @property(cc.Label)
  levelLabel: cc.Label = null;
  @property(cc.Label)
  descLabel: cc.Label = null;
  @property(cc.Node)
  newUserRedPacketNode: cc.Node = null;
  @property(cc.Node)
  cashNode: cc.Node = null;
  @property(cc.Label)
  cashLabel: cc.Label = null;
  @property(cc.Node)
  activeNode: cc.Node = null;
  @property(cc.Node)
  galleryNode: cc.Node = null;
  @property(cc.Label)
  galleryLabel: cc.Label = null;
  playMusicTestTime(e) {
    var t = this,
      o = false;
    AudioManager.instance.playCash(e, false, false, function (e, n) {
      t.scheduleOnce(function () {
        if (!o) {
          o = true;
          t._hide();
        }
      }, n.duration);
    });
    this.scheduleOnce(function () {
      if (!o) {
        o = true;
        t._hide();
      }
    }, 4.5);
  }
  _init() {
    var t = this;
    super._init.call(this);
    this._animOption.pageTime = 0.5;
    var o = MakeMnGlobalData.startGameData,
      n = o.extract_banner_conf;
    this.levelLabel.string = "第" + o.game_level + "关";
    this.newUserRedPacketNode.active = false;
    this.cashNode.active = false;
    this.activeNode.active = false;
    this.galleryNode.active = false;
    this.withdrawRateNode.active = false;
    this.withdrawRateNode.active = "gold" == n.type;
    if (0 != Object.keys(n).length) {
      switch (n.type) {
        case "gold":
          this.descLabel.string = "再闯关" + n.need_level + "次";
          this.playMusicTestTime("gold_banner_" + n.need_level);
          return;
        case "gallery":
          this.galleryNode.active = true;
          this.descLabel.string = "再收集" + (o.process_info.target_num - o.process_info.num) + "本图集";
          this.galleryLabel.string = 3 == o.process_info.step ? "5" : "30";
          this.playMusicTestTime("gallery" + (3 == o.process_info.step ? 5 : 30) + "_banner");
          return;
        case "cash":
          this.cashNode.active = true;
          MakeMnGlobalData.startGameData.game_level <= 2 && this.playMusicTestTime("level1&2_banner");
          if (4 == MakeMnGlobalData.startGameData.game_level) {
            this.cashLabel.string = "任务提现";
            this.playMusicTestTime("level4_banner");
          }
          if (MakeMnGlobalData.startGameData.game_level > 4) {
            this.cashLabel.string = "全部提现";
            this.playMusicTestTime("level5_banner");
          }
          if (1 == n.need_level && MakeMnGlobalData.startGameData.game_level < 5) {
            this.descLabel.string = "通过本关";
          } else {
            this.descLabel.string = "通关第" + n.extract_level + "关";
          }
          return;
        case "extract_gold":
          this.newUserRedPacketNode.active = true;
          this.descLabel.string = "通过本关";
          this.playMusicTestTime("level3_banner");
          return;
        case "activity":
          this.playMusicTestTime("activity_banner");
          this.activeNode.active = true;
          this.descLabel.string = "还差" + (o.process_info.target_num - o.process_info.num) + "活跃度";
          return;
      }
      this.cashNode.active = true;
      this.descLabel.string = "继续闯关";
      this.cashLabel.string = "全部提现";
      this.scheduleOnce(function () {
        t._hide();
      }, 2);
    } else {
      this.cashNode.active = true;
      this.descLabel.string = "继续闯关";
      this.cashLabel.string = "全部提现";
      this.scheduleOnce(function () {
        t._hide();
      }, 2);
    }
  }
  _onHide() {
    super._onHide.call(this);
  }
  _onShow() {
    super._onShow.call(this);
  }
}