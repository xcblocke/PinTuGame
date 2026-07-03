import decorator from "./decorator/decorator";
import AudioManager from "./framework/Utils/AudioManager";
import EngineUtil from "./framework/Utils/EngineUtil";
import { PageEnum, PropType } from "./framework/enum/AllEnum";
import { GuideEnum } from "./framework/enum/GuideConfig";
import CommonUtil from "./common/CommonUtil";
import GlobalApp from "./common/GlobalApp";
import { TweenEasing } from "./game/config/AnimeConfig";
import { gameData } from "./data/GameData";
import MakeMnGlobalData from "./data/MakeMnGlobalData";
import { hasAnyVisibleProp } from "./config";
import BgContainer from "./pgtb/BgContainer";
import SplitSprite from "./pgtb/SplitSprite";
import PropComp from "./prop/PropComp";
import PageMgr from "./view/PageMgr";
const {
  ccclass,
  property
} = cc._decorator;
@ccclass
export default class GameContainer extends cc.Component {
  @property(PropComp)
  propComp: PropComp = null;
  @property(cc.Node)
  bottomContainer: cc.Node = null;
  @property(SplitSprite)
  splitSprite: SplitSprite = null;
  @property(BgContainer)
  bgContainer: BgContainer = null;
  @property(cc.Node)
  galleryRedNode: cc.Node = null;
  @property(cc.Node)
  handBookBtn: cc.Node = null;
  @property(cc.Node)
  diffTipNode: cc.Node = null;
  @property(cc.Node)
  bookNode: cc.Node = null;
  @property(cc.Label)
  levelText: cc.Label = null;
  currentLevelImg = null;
  isWin = false;
  isShowWin = false;
  commonShowPage(e, t) {
    if (!CommonUtil.onAwait(t + "pageShow", 300)) {
      AudioManager.instance.playBtn();
      PageMgr.showPageByEnum(t, {
        startPosition: e.target.worldPosition
      });
    }
  }
  update() {}
  async onLoad() {
    GlobalApp.GameContainer = this;
    this.propComp.node.scale = 0;
    this.levelText.string = "";
    this.handBookBtn && (this.handBookBtn.active = false);
    this.galleryRedNode && (this.galleryRedNode.active = false);
    return;
  }
  start() {}
  async init(e) {
    var t,
      o,
      n = this;
    gameData.GlobalCanMove = false;
    this.galleryRedNode.active = !!e.new_gallery_flag;
    this.isWin = false;
    this.isShowWin = false;
    this.levelText.string = `gkey_037??&value1==${e.game_level}`;
    t = Math.sqrt(e.profile.level_info.img_split);
    o = await gameData.getLoadLevelData(e.profile.current_level_url);
    this.bgContainer.init(t, t);
    this.currentLevelImg = o;
    this.diffTipNode.active = false;
    if (t > 5) {
      this.diffTipNode.active = true;
      this.diffTipNode.x = -this.node.width;
      this.diffTipNode.scale = 1;
      cc.tween(this.diffTipNode).to(0.3, {
        x: 0
      }).delay(1).to(0.2, {
        scale: 0
      }).call(function () {
        n.diffTipNode.active = false;
      }).start();
    }
    await this.splitSprite.init(t, o, e.profile.level_info.gride_complete_num);
    if (!(EngineUtil.testHasGuide(GuideEnum.gameGuide1) || 1 != gameData.startgameData.game_level)) {
      PageMgr.openEventBlock("initGameContainer");
      gameData.GlobalCanMove = false;
      await EngineUtil.sleep(400);
      gameData.GlobalCanMove = true;
      PageMgr.closeEventBlock("initGameContainer");
      await GlobalApp.GameMain.showGuideNode({
        guideType: GuideEnum.gameGuide1,
        nodes: [this.splitSprite.node]
      });
    }
    if (hasAnyVisibleProp(gameData.startgameData.game_level)) {
      this.propComp.init();
      cc.tween(this.propComp.node).to(0.3, {
        scale: 1
      }, {
        easing: TweenEasing.backOut
      }).start();
      if (!EngineUtil.testHasGuide(GuideEnum.gamePropGuide)) {
        gameData.GlobalCanMove = false;
        await EngineUtil.sleep(400);
        gameData.GlobalCanMove = true;
        await GlobalApp.GameMain.showGuideNode({
          guideType: GuideEnum.gamePropGuide,
          nodes: [this.propComp.node]
        });
      }
    } else {
      this.propComp.node.scale = 0;
    }
    return;
  }
  showWin() {
    if (this.isWin && !this.isShowWin) {
      this.isShowWin = true;
      GlobalApp.GameMain.overgame();
    }
  }
  useProp(e) {
    switch (+e) {
      case PropType.helpCombine:
        this.splitSprite.helpCombine();
        break;
      case PropType.wholeImage:
        this.showWholePage();
    }
  }
  @decorator.Debounce(1000)
  showWholePage() {
    PageMgr.showPageByEnum(PageEnum.WholeImgShowPage, this.currentLevelImg);
  }
}