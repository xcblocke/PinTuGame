import { RequestType } from "./service/RequestType";
import Service from "./service/Service";
import UiNode from "./common/UiNode";
import MakeMnGlobalData from "./data/MakeMnGlobalData";
import BasePage from "./view/BasePage";
const {
  ccclass,
  property
} = cc._decorator;
@ccclass
export default class wdRecordPage extends BasePage {
  @property(cc.Node)
  noRecordNode: cc.Node = null;
  @property(cc.Node)
  listNode: cc.Node = null;
  @property(cc.Node)
  childNode: cc.Node = null;
  data = null;
  async _init() {
    var e,
      t = this;
    this.listNode.removeAllChildren();
    e = await Service.commonRequest(RequestType.WithdrawHistory);
    this.data = e.data;
    if (0 === e.data.info.length) {
      this.noRecordNode.active = true;
      return;
    }
    this.noRecordNode.active = false;
    this.listNode.active = true;
    this.childNode.active = true;
    this.listNode.removeAllChildren();
    this.data.info.forEach(function (e) {
      e.l_status;
      var o = cc.instantiate(t.childNode);
      t.listNode.addChild(o);
      var n = o.getComponent(UiNode);
      n.init();
      n.uiNodes.get("record_success").active = "5" === e.l_status;
      n.uiNodes.get("record_loading").active = "1" === e.l_status;
      n.uiNodes.get("record_fail").active = "1" !== e.l_status && "5" !== e.l_status;
      n.uiLabels.get("p-mn").string = e.amount + "";
      n.uiLabels.get("p-time").string = e.extract_time + "";
      n.uiNodes.get("fail_label").active = n.uiNodes.get("record_fail").active;
      n.uiLabels.get("fail_label").string = "(检测账户异常打款失败)";
      if ("101" == e.tx_id) {
        n.uiLabels.get("p-mn").string = MakeMnGlobalData.getCNCashNum(100 * e.amount) + "";
        n.uiNodes.get("fail_label").active = true;
        n.uiLabels.get("fail_label").string = "(预计" + t.getExpectedArrivalTime(e.extract_time) + "个工作日内到账)";
        n.uiLabels.get("fail_label").node.color = new cc.Color().fromHEX("#f9751b");
      }
    });
    return;
  }
  getExpectedArrivalTime(e) {
    var t = new Date(e),
      o = new Date().getTime() - t.getTime(),
      n = Math.floor(o / 86400000);
    return "" + Math.max(3 - n, 1);
  }
}