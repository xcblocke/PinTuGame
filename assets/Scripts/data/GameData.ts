import SdkHelper from "../framework/Utils/SdkHelper";
import GlobalApp from "../common/GlobalApp";
import MakeMnGlobalData from "./MakeMnGlobalData";

export enum GameState {
    await = 0,
    gameing = 1,
    gameover = 2,
    gameResult = 3,
}

export var MaxSpareSlotCount = 8;

export enum OrderSlotType {
    empty = 0,
    haveData = 1,
    notOpen = 2,
}

export var OrderType = {
    chi: "sequence",
    peng: "triplet",
    gang: "Kong"
};
export default class GameData {
    _GlobalCanMove = false;
    _isDragging = false;
    _isSwapping = false;
    _isHelpCombine = false;
    successCount = 0;
    linkTimes = 0;
    guideStep = 0;
    gameState = GameState.await;
    isOpenDemo = false;
    debugData = {
        goldLowLimit: 100,
        goldHighLimit: 1000,
        nextMustMoney: 0,
        isOpenMingma: false,
        mingmaMoney: 0,
        isOpenAutoGet: false,
        fixedMoney: null,
        priceList: []
    };
    gameTime = 0;
    operStep = 0;
    verifyCommssionExtractOld = false;
    startgameData = null;
    levelData = {};
    stepNum = 0;
    restart_times = 0;
    specifyCarUseCount = 0;
    refreshUseCount = 0;
    addSpaceUseCount = 0;
    static _instance = null;

    get GlobalCanMove() {
        return this._GlobalCanMove;
    }

    set GlobalCanMove(e) {
        this._GlobalCanMove = e;
    }

    static getInstance() {
        this._instance || (this._instance = new GameData());
        return this._instance;
    }

    async loadRemoteLevelData(e, t = 0) {
        var o = this;
        if (this.levelData[e]) {
            return this.levelData[e];
        } else {
            return new Promise(function (a) {
                cc.assetManager.resources.load("LevelImg/" + e.substring(0, e.lastIndexOf(".")), cc.SpriteFrame, async function (c, s) {
                    if (c) {
                        SdkHelper.reportData("loadLevelData_error", {
                            url: e,
                            error: JSON.stringify(c || {})
                        });
                        if (3 == t) {
                            a(c);
                            return;
                        }
                        var n = t + 1;
                        var i = o.loadRemoteLevelData(e, n);
                        a(i);
                        return;
                    }
                    o.levelData[e] = s;
                    a(s);
                    return;
                });
                console.warn("assets/resources/LevelImg  里的图，如果要放在CDN 那么就可以打开下面的，用 cdn 地址 + e");
                // cc.assetManager.loadRemote(e, {
                //   ext: ".jpg"
                // }, async function (c, s) {
                //   const __async_this = o;
                //   var o_local, n;
                //   if (c) {
                //     SdkHelper.reportData("loadRemoteLevelData_error", {
                //       url: e,
                //       error: JSON.stringify(c || {})
                //     });
                //     if (3 == t) {
                //       a(c);
                //       return;
                //     }
                //     o_local = a;
                //     o_local.apply(void 0, [await __async_this.loadRemoteLevelData(e, t + 1)]);
                //     return;
                //   }
                //   n = new cc.SpriteFrame(s);
                //   __async_this.levelData[e] = n;
                //   a(n);
                //   return;
                // });
            });
        }
    }

    async getLoadLevelData(e) {
        if (!this.levelData[e]) {
            await this.loadRemoteLevelData(e);
        }
        return this.levelData[e];
    }

    initGameData(e) {
        this.stepNum = 0;
        MakeMnGlobalData.gameInit(e);
        this.startgameData = e;
        try {
            console.log("initGameData", gameData.info);
            var t = e.profile;
            e.sync_data, t.level_info;
            this.successCount = e.success_count;
        } catch (e) {
            console.error(e);
        }
        GlobalApp.GameContainer.propComp.init();
    }

    getSyncData() {
        return {
            user_step: this.stepNum,
            gameTime: this.gameTime,
            restart_times: this.restart_times,
            specifyCarUseCount: this.specifyCarUseCount,
            refreshUseCount: this.refreshUseCount,
            addSpaceUseCount: this.addSpaceUseCount
        };
    }
}
export var gameData = GameData.getInstance();