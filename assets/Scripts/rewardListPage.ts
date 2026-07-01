import BasePage from "./view/BasePage";
import GlobalApp from "./common/GlobalApp";
import MakeMnGlobalData from "./data/MakeMnGlobalData";
const {
  ccclass,
  property
} = cc._decorator;
@ccclass
export default class rewardListPage extends BasePage {
  listV = null;
  _data = null;
  @property(cc.Node)
  view: cc.Node = null;
  @property(cc.ScrollView)
  list: cc.ScrollView = null;
  @property(cc.Node)
  item: cc.Node = null;
  get RewardList() {
    return GlobalApp.MakeMnProcessComp.rewardList;
  }
  _init() {
    var e = this;
    this.RewardList.length > 2 && setTimeout(function () {
      e.list.scrollToBottom();
    }, 0);
    this.view.removeAllChildren();
    this.initList();
  }
  initList() {
    this._data = this.RewardList;
    this.initListUI();
  }
  initListUI() {
    var e = this;
    this._data.forEach(function (t, o) {
      var n = cc.instantiate(e.item);
      n.active = true;
      n.x = 0;
      n.getChildByName("deletItem").name = "deletItem_" + o;
      n.parent = e.view;
      var i = n.children[0],
        a = MakeMnGlobalData.getCNCashNum(t);
      if (a.indexOf(".") > 0) {
        i.getComponent(cc.Label).string = "￥" + a;
      } else {
        i.getComponent(cc.Label).string = "￥" + a + ".00";
      }
    });
  }
  onClose() {
    this._hide();
  }
  deleteAll() {
    GlobalApp.MakeMnProcessComp.rewardList = [];
    this._init();
  }
  deleteItem(e) {
    console.log("e.target.name", e.target.name);
    var t = e.target,
      o = parseInt(t.name.split("_")[1]);
    this.RewardList.splice(o, 1);
    this._init();
  }
}