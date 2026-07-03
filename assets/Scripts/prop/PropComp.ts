import decorator from "../decorator/decorator";
import EngineUtil from "../framework/Utils/EngineUtil";
import { PropType, PageEnum } from "../framework/enum/AllEnum";
import { RequestType } from "../service/RequestType";
import Service from "../service/Service";
import GlobalApp from "../common/GlobalApp";
import UiNode from "../common/UiNode";
import { gameData } from "../data/GameData";
import PageMgr from "../view/PageMgr";
import { getPropConfig, isPropUnlimited, isPropVisible } from "../config";
const {
  ccclass,
  property
} = cc._decorator;
new cc.Color().fromHEX("#888888");
new cc.Color().fromHEX("#FFFFFFFF");
@ccclass
export default class PropComp extends cc.Component {
  @property([UiNode])
  propUiNode: Array<UiNode> = [];
  onLoad() {}
  addShow(e) {
    this.propUiNode[e].uiNodes.get("prop-add").active = true;
    this.propUiNode[e].uiNodes.get("propCount").active = false;
  }
  countShow(e) {
    this.propUiNode[e].uiNodes.get("prop-add").active = false;
    this.propUiNode[e].uiNodes.get("propCount").active = true;
    this.propUiNode[e].uiNodes.get("propCount").getComponentInChildren(cc.Label).string = gameData.startgameData.prop_info[e].count + "";
  }
  unlimitedShow(e) {
    this.propUiNode[e].uiNodes.get("prop-add").active = false;
    this.propUiNode[e].uiNodes.get("propCount").active = false;
  }
  emptyShow(e) {
    this.propUiNode[e].uiNodes.get("prop-add").active = false;
    this.propUiNode[e].uiNodes.get("propCount").active = true;
    this.propUiNode[e].uiNodes.get("propCount").getComponentInChildren(cc.Label).string = "0";
  }
  init() {
    var e = this;
    var level = gameData.startgameData.game_level;
    gameData.startgameData.prop_info.sort(function (e, t) {
      return e.code - t.code;
    });
    this.propUiNode.forEach(function (t, o) {
      var propType = o + 1;
      var config = getPropConfig(propType);
      t.node.active = isPropVisible(propType, level);
      if (!t.node.active) return;
      if (isPropUnlimited(propType)) {
        e.unlimitedShow(o);
        return;
      }
      if (gameData.startgameData.prop_info[o].count > 0) {
        e.countShow(o);
      } else if (config.canGetByVideo) {
        e.addShow(o);
      } else {
        e.emptyShow(o);
      }
    });
  }
  async addPropUseCount(e) {
    if (isPropUnlimited(e)) return;
    var t;
    -1 == (t = await Service.commonApiPost(RequestType.usr_prop, {
      code: +e,
      prop_type: +e
    })).code && EngineUtil.showCocosToast3(t.message);
    gameData.startgameData.prop_info = t.data.prop_info;
    this.init();
    return;
  }
  @decorator.Debounce(500)
  async useProp(e, t) {
    if (!gameData.GlobalCanMove) return;
    if (!isPropVisible(t, gameData.startgameData.game_level)) return;
    if (t == PropType.wholeImage && EngineUtil.getLocalData("showWholeImage", "") == gameData.startgameData.lun_level.toString()) {
      GlobalApp.GameContainer.useProp(t);
      return;
    }
    if (isPropUnlimited(t)) {
      GlobalApp.GameContainer.useProp(t);
      t == PropType.wholeImage && EngineUtil.setLocalData("showWholeImage", gameData.startgameData.lun_level.toString());
      return;
    }
    if (gameData.startgameData.prop_info[t - 1].count <= 0) {
      if (getPropConfig(t).canGetByVideo) {
        await PageMgr.showPageByEnum(PageEnum.propBuyPage, t);
      }
      return;
    }
    GlobalApp.GameContainer.useProp(t);
    t == PropType.wholeImage && EngineUtil.setLocalData("showWholeImage", gameData.startgameData.lun_level.toString());
    this.addPropUseCount(t);
    return;
  }
  start() {}
}
