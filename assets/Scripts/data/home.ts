import { gameData } from "./GameData";
const {
  ccclass,
  property
} = cc._decorator;
enum r {
  RedModel = 0,
  NumModel = 1,
}
@ccclass
export default class home extends cc.Component {
  @property(cc.Label)
  modelLabel: cc.Label = null;
  gameModel = r.RedModel;
  onLoad() {
    gameData.debugData.isOpenMingma = false;
  }
  enterGame() {
    cc.director.loadScene("mainScene");
  }
  changeGameModel() {
    if (this.gameModel == r.RedModel) {
      this.gameModel = r.NumModel;
      this.modelLabel.string = "数字模式";
      gameData.debugData.isOpenMingma = true;
    } else {
      this.gameModel = r.RedModel;
      this.modelLabel.string = "红包模式";
      gameData.debugData.isOpenMingma = false;
    }
  }
}