import ClientData from "../framework/Event/ClientData";
import SdkHelper from "../framework/Utils/SdkHelper";
import TimeUtils from "../framework/Utils/TimeUtils";
import HttpUtil from "../framework/Utils/HttpUtil";
import {RequestType} from "./RequestType";
import UrlMgr from "./UrlMgr";
import EngineUtil from "../framework/Utils/EngineUtil";
import GlobaldataMgr from "../framework/data/GlobaldataMgr";
import GlobalDataSys from "../framework/controller/GlobalDataSys";
import EventMgr from "../framework/Event/EventMgr";
import GameEventType from "../framework/Event/GameEventType";
import { PropType } from "../framework/enum/AllEnum";
import { getPropConfig, isPropUnlimited } from "../config";

export default class Service {
    static genCommonRequestData() {
        return ClientData.genFormData();
    }

    static getRequestData(e) {
        GlobalDataSys.dev_token || GlobalDataSys.initToken(SdkHelper.getDev_token() || "");
        e = Object.assign(Object.assign({}, e), {
            forbid_red_envelope: GlobaldataMgr.reviewing,
            antian_flag: GlobaldataMgr.reviewing_antian
        });
        GlobalDataSys.dev_token && (e.dev_token = GlobalDataSys.dev_token);
        var t = this.genCommonRequestData();
        if (e) {
            e = GlobaldataMgr.is_encrypt ? SdkHelper.getAesEncrypData(e) : JSON.stringify(e);
            t.append("business_data", e);
        }
        return t;
    }

    static getConfmeData(e) {
        var t = this.genCommonRequestData();
        if (e) {
            e = JSON.stringify(e);
            t.append("business_data", e);
        }
        return t;
    }

    static async commonRequest(e, t, o = false) {
        return await this.commonApiPost(e, t, o);
    }

    static getSubsidyReward() {
        return Service.commonApiPost(RequestType.subsidyReward, null);
    }

    static async commonApiPost(t, o, n = false) {
        var r,
            s,
            u = this;
        if (t == RequestType.usr_prop) return this.mockUseProp(o);
        if (t == RequestType.VideoReward) return this.mockVideoReward(o);
        r = Service.getRequestData(o);
        s = await HttpUtil.Post(Service.genRequestUrl(t), r);
        EngineUtil.isOnlineRelease() || console.log("UUURL====================================================>\n            请求名称:" + t + "\n            请求地址:" + Service.genRequestUrl(t) + "\n            请求数据:" + (!cc.sys.isBrowser && JSON.stringify(o)) + "\n            返回数据:" + (!cc.sys.isBrowser && JSON.stringify(s)) + "\n            END============================================》\n            ", o, s);
        return new Promise(async function (e, r) {
            const __async_this_1 = u;
            var l = __async_this_1;
            if (n) return e(s);
            if (-101 == s.code) {
                SdkHelper.reportData("network_error", {
                    requestUrl: t,
                    message: `gkey_236??&value1==${s.message}`
                });
                EngineUtil.showCocosToast3(`gkey_237`);
                return r(s);
            }
            if (-100 == s.code) {
                SdkHelper.reportData("network_error", {
                    requestUrl: t,
                    message: s.message
                });
                EngineUtil.showCocosToast3(`gkey_094`);
                return EngineUtil.httpErr(s.message, async function () {
                    const __async_this = l;
                    var n;
                    n = await __async_this.commonApiPost.call(__async_this, t, o);
                    e(n);
                    return;
                }, false);
            }
            -1 == s.code && EngineUtil.showCocosToast3(s.message);
            return e(s);
        });
    }

    static genSign(e, t, o) {
        for (var n = ["version_name", "channel_name", "device_id", "time"], i = "/" + UrlMgr.getInstance().getUri(e), a = 0; a < n.length; a++) {
            var c = n[a];
            if ("time" == c) i += " " + t; else {
                var s = ClientData.getAttr(c);
                i += "" != s && null != s ? " " + s : " null";
            }
        }
        i += " " + o;
        i += " gohell";
        var l = CryptoJS.enc.Base64.stringify(CryptoJS.MD5(i));
        return l.replace(new RegExp("\\+", "g"), "-").replace(new RegExp("/", "g"), "_").replace(new RegExp("=", "g"), "");
    }

    static uuid() {
        for (var e = [], t = 0; t < 36; t++) e[t] = "0123456789abcdef".substr(Math.floor(16 * Math.random()), 1);
        e[14] = "4";
        e[19] = "0123456789abcdef".substr(3 & e[19] | 8, 1);
        e[8] = e[13] = e[18] = e[23] = "-";
        return e.join("");
    }

    static getCommonUrlData(t) {
        var o = SdkHelper.getUrlSplicingString(),
            n = "/" + UrlMgr.getInstance().getUri(t);
        if (null != o) {
            var i;
            i = TimeUtils.getTimeinSeconds() + 120;
            var a = Service.uuid();
            o += "&nonce_str=" + a + "&et=" + i + "&ngister=" + SdkHelper.getNgister(n, i, a);
        }
        return o;
    }

    static genRequestUrl(t) {
        var o = UrlMgr.getInstance().getUrl(t),
            n = Service.getCommonUrlData(t);
        EngineUtil.log("genRequestUrl----", o);
        return n ? o + "?" + n : o;
    }

    static getConfmeUrl(t) {
        var o = UrlMgr.getInstance().getConfmeUrl(t),
            n = Service.getCommonUrlData(t);
        EngineUtil.log("genRequestUrl----", o);
        return n ? o + "?" + n : o;
    }

    static getSystemConfig(t) {
        return Promise.resolve({
            "code": 1,
            "data": {
                "activate": true,
                "config_data": {"new_user": 1},
                "is_encrypt": false,
                "is_reviewer": 0,
                "tongdun_info": "{\"action\": \"activate\"}"
            },
            "ecp": 0,
            "message": `gkey_238`
        });
        // return Service.commonApiPost(RequestType.GetSystemConfig, t);
    }

    static autoLogin(t) {
        return Promise.resolve({"code": -1010, "data": {}, "ecp": 0, "message": `gkey_239`});
        // return Service.commonApiPost(RequestType.AutoLogin, t);
    }

    static touristsLogin(t) {
        return Promise.resolve({
            "code": 1,
            "data": {"user_id": "13637261", "user_name": `gkey_108??&value1==${13637261}`, "yid": "13637261_8132415152"},
            "ecp": 0,
            "message": `gkey_240`
        });
        // return Service.commonApiPost(RequestType.TouristLogin, t);
    }

    static wechatLogin(t, o = false) {
        return Service.commonApiPost(RequestType.WeChatLogin, t, o);
    }

    static wechatBind(t) {
        return Service.commonApiPost(RequestType.BindWeChat, t);
    }

    static OFFLINE_LEVEL_INDEX_KEY = "offline_level_idx";
    static OFFLINE_PROP_INFO_KEY = "offline_prop_info";
    static _offlineLevelProfiles = null;
    static _offlineLevelProfilesPromise = null;

    static cloneJson(e) {
        return null == e ? e : JSON.parse(JSON.stringify(e));
    }

    static getDefaultOfflineProfile() {
        return {
            current_level_url: "level_10001.jpg",
            level_info: {
                chang_id: 1,
                chang_max: 1,
                gride_complete_num: 0,
                img_id: 10001,
                img_split: 9,
                level_id: 1,
                round_id: 1,
                round_max: 1,
                turn_id: 1,
                turn_max: 1
            },
            next_level_url: "level_10002.jpg"
        };
    }

    static async loadOfflineLevelProfiles() {
        if (this._offlineLevelProfiles) return this._offlineLevelProfiles;
        if (this._offlineLevelProfilesPromise) return this._offlineLevelProfilesPromise;
        this._offlineLevelProfilesPromise = new Promise((resolve, reject) => {
            cc.resources.load("config/level", cc.JsonAsset, (error, asset) => {
                if (error) {
                    reject(error);
                    return;
                }
                const json = asset && asset.json;
                if (!Array.isArray(json)) {
                    reject(new Error("config/level.json 格式错误"));
                    return;
                }
                resolve(json);
            });
        }).then((profiles) => {
            this._offlineLevelProfiles = profiles;
            this._offlineLevelProfilesPromise = null;
            return profiles;
        }).catch((error) => {
            console.error("loadOfflineLevelProfiles error", error);
            this._offlineLevelProfiles = [];
            this._offlineLevelProfilesPromise = null;
            return [];
        });
        return this._offlineLevelProfilesPromise;
    }

    static normalizeOfflineLevelIndex(total, index) {
        let nextIndex = parseInt("" + index, 10);
        if (isNaN(nextIndex) || nextIndex < 0) nextIndex = 0;
        if (total > 0) nextIndex %= total;
        return nextIndex;
    }

    static getOfflineLevelIndex(total = 0) {
        const raw = EngineUtil.getLocalData(this.OFFLINE_LEVEL_INDEX_KEY, "0");
        const index = this.normalizeOfflineLevelIndex(total, raw);
        EngineUtil.setLocalData(this.OFFLINE_LEVEL_INDEX_KEY, "" + index);
        return index;
    }

    static setOfflineLevelIndex(total, index) {
        const nextIndex = this.normalizeOfflineLevelIndex(total, index);
        EngineUtil.setLocalData(this.OFFLINE_LEVEL_INDEX_KEY, "" + nextIndex);
        return nextIndex;
    }

    static advanceOfflineLevelIndex(total, step = 1) {
        const currentIndex = this.getOfflineLevelIndex(total);
        return this.setOfflineLevelIndex(total, currentIndex + step);
    }

    static getDefaultOfflinePropInfo() {
        return [{
            code: PropType.helpCombine,
            count: getPropConfig(PropType.helpCombine).initCount,
            name: `gkey_241`
        }, {
            code: PropType.wholeImage,
            count: getPropConfig(PropType.wholeImage).initCount,
            name: `gkey_235`
        }];
    }

    static getOfflinePropInfo() {
        const raw = EngineUtil.getLocalData(this.OFFLINE_PROP_INFO_KEY, "");
        let propInfo = null;
        if (raw) {
            try {
                propInfo = JSON.parse(raw);
            } catch (error) {
                propInfo = null;
            }
        }
        if (!Array.isArray(propInfo) || !propInfo.length) {
            propInfo = this.getDefaultOfflinePropInfo();
            this.setOfflinePropInfo(propInfo);
            return this.cloneJson(propInfo);
        }
        const mappedPropInfo = this.getDefaultOfflinePropInfo().map((defaultItem) => {
            const config = getPropConfig(defaultItem.code);
            if (isPropUnlimited(defaultItem.code)) {
                return {
                    code: defaultItem.code,
                    count: -1,
                    name: defaultItem.name
                };
            }
            const currentItem = propInfo.find((item) => item && item.code == defaultItem.code);
            const count = currentItem && !isNaN(parseInt("" + currentItem.count, 10)) ? Math.max(0, parseInt("" + currentItem.count, 10)) : defaultItem.count;
            return {
                code: defaultItem.code,
                count,
                name: defaultItem.name
            };
        });
        this.setOfflinePropInfo(mappedPropInfo);
        return this.cloneJson(mappedPropInfo);
    }

    static setOfflinePropInfo(propInfo) {
        EngineUtil.setLocalData(this.OFFLINE_PROP_INFO_KEY, JSON.stringify(propInfo || []));
    }

    static changeOfflinePropCount(code, delta) {
        const propInfo = this.getOfflinePropInfo();
        const propItem = propInfo.find((item) => item && item.code == code);
        if (!propItem || isPropUnlimited(code) || propItem.count === -1) return propInfo;
        propItem.count = Math.max(0, propItem.count + delta);
        this.setOfflinePropInfo(propInfo);
        return this.cloneJson(propInfo);
    }

    static async getOfflineCurrentProfile() {
        const profiles = await this.loadOfflineLevelProfiles();
        const index = this.getOfflineLevelIndex(profiles.length);
        const profile = profiles.length > 0 ? profiles[index] : this.getDefaultOfflineProfile();
        return {
            index,
            total: profiles.length,
            profile: this.cloneJson(profile || this.getDefaultOfflineProfile())
        };
    }

    static buildOfflineUserInfoData(profile, index) {
        const currentLevel = index + 1;
        return {
            activity_num: 2100,
            ad_level: 4,
            big_cash_guide: 10,
            big_scroll_xc_count: 20,
            bind_wx: 0,
            bubble_cash_balance: `gkey_242`,
            bubble_gold_balance: `gkey_243??&value1==${1}`,
            cash_balance: 0,
            conf_info: {
                cash_extract_conf: {},
                card_conf: {},
                parameter_conf: {
                    bigmoney_cash_only: {
                        para_key: "bigmoney_cash_only",
                        para_meaning: `gkey_138`,
                        para_value: 500
                    },
                    bigmoney_envelope_show: {
                        para_key: "bigmoney_envelope_show",
                        para_meaning: `gkey_140`,
                        para_value: 300000
                    },
                    bigmoney_gold_only: {
                        para_key: "bigmoney_gold_only",
                        para_meaning: `gkey_244`,
                        para_value: 30
                    },
                    bigmoney_showtime: {
                        para_key: "bigmoney_showtime",
                        para_meaning: `gkey_245`,
                        para_value: 9
                    },
                    cash_up_2: {
                        para_key: "cash_up_2",
                        para_meaning: `gkey_246`,
                        para_value: 4
                    },
                    levelup_cash_only: {
                        para_key: "levelup_cash_only",
                        para_meaning: `gkey_247`,
                        para_value: 800
                    },
                    levelup_envelope_show: {
                        para_key: "levelup_envelope_show",
                        para_meaning: `gkey_147`,
                        para_value: 5000
                    },
                    merge_need_num: {
                        para_key: "merge_need_num",
                        para_meaning: `gkey_248`,
                        para_value: 200
                    },
                    pass_1_ad_cash: {
                        para_key: "pass_1_ad_cash",
                        para_meaning: `gkey_151??&value1==${1}`,
                        para_value: 1000
                    },
                    pass_2_ad_cash: {
                        para_key: "pass_2_ad_cash",
                        para_meaning: `gkey_151??&value1==${2}`,
                        para_value: 1000
                    }
                }
            },
            create_city: `gkey_249`,
            create_time: "2020-01-01 00:00:00",
            cueernt_level_url: profile.current_level_url,
            diamond_num: 0,
            extract_cash_desc: `gkey_152??&value1==${1}&value2==${2}&value3==${0.1}&value4==${3}&value5==${1}&value6==${-3}&value7==${4}&value8==${5}`,
            extract_desc: `gkey_152??&value1==${1}&value2==${2}&value3==${0.1}&value4==${3}&value5==${1}&value6==${-3}&value7==${4}&value8==${5}`,
            extract_status: 0,
            finishNum: index,
            free_lottery_flag: 1,
            gallery_count_one_limit: 5,
            gallery_count_two_limit: 30,
            game_level: currentLevel,
            gender: `gkey_069`,
            gold_balance: 0,
            guide_step_new: 0,
            headimgurl: "",
            is_reviewer: 0,
            is_tourists: true,
            level: currentLevel,
            login_add_prop_conf: {},
            nickname: null,
            novice_extract: 0,
            novice_status: 0,
            prop_info: this.getOfflinePropInfo(),
            reco_switch: 1,
            safe_guide: 70,
            sign_point: 1,
            sign_popup_flag: 1,
            task_point: 0,
            task_show: 1,
            win_game_count: index
        };
    }

    static buildOfflineStartGameData(profile, index) {
        return {
            bubble_cash_balance: `gkey_242`,
            bubble_gold_balance: `gkey_243??&value1==${1}`,
            cash_balance: 0,
            combine_extract_amount_dict: {},
            extract_banner_conf: {
                extract_level: 1,
                max_level: 1,
                need_level: 1,
                type: "gold"
            },
            gallery_count: 0,
            game_level: index + 1,
            gold_balance: 0,
            is_extract: 0,
            lun_level: index + 1,
            new_gallery_flag: 0,
            process_info: {
                level_reward_list: [{
                    desc: `gkey_250`,
                    level: 1,
                    type: "cash"
                }, {
                    desc: `gkey_250`,
                    level: 2,
                    type: "cash"
                }, {
                    desc: `gkey_251`,
                    level: 3,
                    type: "gold"
                }, {
                    desc: `gkey_252`,
                    level: 4,
                    type: "cash"
                }, {
                    desc: `gkey_116`,
                    level: 5,
                    type: "cash"
                }],
                start_level: 1,
                step: 1
            },
            profile,
            prop_info: this.getOfflinePropInfo(),
            subsidy_reward_flag: 0,
            success_count: index,
            sync_data: ""
        };
    }

    static buildOfflineSubmitGameData(currentIndex, isPass) {
        const successCount = currentIndex + (isPass ? 1 : 0);
        return {
            activity_num: 2100,
            bubble_cash_balance: `gkey_242`,
            bubble_gold_balance: `gkey_243??&value1==${1}`,
            cash_balance: 0,
            cash_reward: 0,
            extract_status: 0,
            gold_balance: 0,
            gold_reward: 0,
            is_extract: 0,
            lun_count: successCount,
            show_tg_video_reward: 0,
            show_xc_video_reward: 4852,
            sucess_count: successCount,
            task_point: 0,
            task_popup_flag: 0,
            tg_reward: 0,
            tx_ratio: {}
        };
    }

    static mockUseProp(t) {
        const code = parseInt("" + ((null == t ? void 0 : t.code) || (null == t ? void 0 : t.prop_type)), 10);
        const propInfo = this.getOfflinePropInfo();
        const propItem = propInfo.find((item) => item && item.code == code);
        if (!propItem) {
            return Promise.resolve({
                code: -1,
                data: {
                    prop_info: propInfo
                },
                ecp: 0,
                message: `gkey_253`
            });
        }
        if (!isPropUnlimited(code) && propItem.count <= 0) {
            return Promise.resolve({
                code: -1,
                data: {
                    prop_info: propInfo
                },
                ecp: 0,
                message: `gkey_254`
            });
        }
        if (isPropUnlimited(code) || propItem.count === -1) {
            return Promise.resolve({
                code: 1,
                data: {
                    prop_info: propInfo
                },
                ecp: 0,
                message: `gkey_238`
            });
        }
        return Promise.resolve({
            code: 1,
            data: {
                prop_info: this.changeOfflinePropCount(code, -1)
            },
            ecp: 0,
            message: `gkey_238`
        });
    }

    static mockVideoReward(t) {
        const videoType = parseInt("" + (null == t ? void 0 : t.video_type), 10);
        const isOver = !!(null == t ? void 0 : t.is_over);
        let propInfo = this.getOfflinePropInfo();
        if (isOver && 3 == videoType && getPropConfig(PropType.helpCombine).canGetByVideo) propInfo = this.changeOfflinePropCount(1, 2);
        if (isOver && 4 == videoType && getPropConfig(PropType.wholeImage).canGetByVideo) propInfo = this.changeOfflinePropCount(2, 2);
        return Promise.resolve({
            code: 1,
            data: {
                activity_num: 0,
                cash_balance: 0,
                cash_reward: 0,
                gold_balance: 0,
                gold_reward: 0,
                prop_info: propInfo
            },
            ecp: 0,
            message: `gkey_238`
        });
    }

    static async getUserInfo(t) {
        const {
            profile,
            index
        } = await this.getOfflineCurrentProfile();
        return Promise.resolve({
            code: 1,
            data: this.buildOfflineUserInfoData(profile, index),
            ecp: 0,
            message: `gkey_238`
        });
    }

    static getAbTestInfo() {
        return Service.commonApiPost(RequestType.AbTestInfo, null);
    }

    static async startGame(t) {
        const {
            profile,
            index
        } = await this.getOfflineCurrentProfile();
        return Promise.resolve({
            code: 1,
            data: this.buildOfflineStartGameData(profile, index),
            ecp: 0,
            message: `gkey_238`
        });
    }

    static async submitGame(t) {
        const profiles = await this.loadOfflineLevelProfiles();
        const currentIndex = this.getOfflineLevelIndex(profiles.length);
        const isPass = !!(null == t ? void 0 : t.is_tg);
        if (isPass && profiles.length > 0) this.advanceOfflineLevelIndex(profiles.length, 1);
        return Promise.resolve({
            code: 1,
            data: this.buildOfflineSubmitGameData(currentIndex, isPass),
            ecp: 0,
            message: `gkey_238`
        });
    }

    static videoReward(t) {
        return Service.commonApiPost(RequestType.VideoReward, t);
    }

    static onlyReward(t) {
        return Service.commonApiPost(RequestType.OnlyReward, t);
    }

    static updateGuideInfo(t) {
        return Promise.resolve({"code": 1, "data": {}, "ecp": 0, "message": `gkey_238`});

        // return Service.commonApiPost(RequestType.UpdateGuideInfo, t);
    }

    static getRankingInfo() {
        return Service.commonApiPost(RequestType.GetRankingInfo, null);

    }

    static getScrollMsg(t = null) {
        return Promise.resolve({
            "code": 1, "data": {
                "dm_info": [{
                    "image": "",
                    "msg": `gkey_255??&value1==${50}&value2==${4766.0}`
                }], "size": 1
            }, "ecp": 0, "message": `gkey_238`
        });
        // return Service.commonApiPost(RequestType.ScrollMsg, t);
    }

    static setReco(t) {
        return Service.commonApiPost(RequestType.SetReco, t);
    }

    static getTaskList() {
        return Promise.resolve({
            "code": 1,
            "data": [{
                "current_login_days": 1,
                "fake_money": 0,
                "id": "1",
                "level_count": 0,
                "show_money": 10,
                "sign_up_day_limit": 1,
                "status": 0,
                "today_level_count_limit": 4,
                "true_money": 10
            }, {
                "current_login_days": 1,
                "fake_money": 0,
                "id": "2",
                "level_count": 0,
                "show_money": 20,
                "sign_up_day_limit": 3,
                "status": 0,
                "today_level_count_limit": 5,
                "true_money": 20
            }, {
                "current_login_days": 1,
                "fake_money": 0,
                "id": "3",
                "level_count": 0,
                "show_money": 30,
                "sign_up_day_limit": 5,
                "status": 0,
                "today_level_count_limit": 10,
                "true_money": 30
            }, {
                "current_login_days": 1,
                "fake_money": 5000,
                "id": "4",
                "level_count": 0,
                "show_money": 5000,
                "sign_up_day_limit": 8,
                "status": 0,
                "today_level_count_limit": 10,
                "true_money": 0
            }, {
                "current_login_days": 1,
                "fake_money": 30000,
                "id": "5",
                "level_count": 0,
                "show_money": 30000,
                "sign_up_day_limit": 15,
                "status": 0,
                "today_level_count_limit": 10,
                "true_money": 0
            }, {
                "current_login_days": 1,
                "fake_money": 100000,
                "id": "6",
                "level_count": 0,
                "show_money": 100000,
                "sign_up_day_limit": 20,
                "status": 0,
                "today_level_count_limit": 10,
                "true_money": 0
            }, {
                "current_login_days": 1,
                "fake_money": 300000,
                "id": "7",
                "level_count": 0,
                "show_money": 300000,
                "sign_up_day_limit": 30,
                "status": 0,
                "today_level_count_limit": 10,
                "true_money": 0
            }],
            "ecp": 0,
            "message": `gkey_238`
        });
        // return Service.commonApiPost(RequestType.taskList, null);
    }

    static getTaskExtract(t) {
        return Service.commonApiPost(RequestType.taskExtract, t);
    }

    static luckyDraw() {
        return Service.commonApiPost(RequestType.LuckyDraw, null);
    }

    static luckyDrawList() {
        return Service.commonApiPost(RequestType.luckyDrawList, null);
    }

    static getExtractInfo() {
        return Service.commonApiPost(RequestType.GetExtractInfo, null);
    }

    static gotoWithdraw_v2(t) {
        return Service.commonApiPost(RequestType.GotoWithdraw_v2, t);
    }

    static getGoldExtractInfo() {
        return Service.commonApiPost(RequestType.GetGoldExtractInfo, null);
    }

    static getLevelExtractInfo() {
        return Service.commonApiPost(RequestType.GetLevelExtractInfo, null);
    }

    static getDayTaskInfo() {
        return Service.commonApiPost(RequestType.DayTaskInfo, null);
    }

    static getDayTask(t) {
        return Service.commonApiPost(RequestType.GetDayTask, t);
    }

    static getLevelReward(t) {
        return Service.commonApiPost(RequestType.GetLevelReward, t);
    }

    static getBigMsg() {
        return Promise.resolve({
            "code": 1, "data": {
                "dm_info": [{
                    "amount": 442.51,
                    "image": "https://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaELPARmfBrVETflLm5pBozo3uryZkY2d6XF3JQicDiaITzqxrNcpFO0ciaeD6zgtFEia7vgYOIDFBHRibpj3sZX5j8jMH4B44iafszj5vibsAJoEfpYRA/132",
                    "msg": `gkey_256??&value1==${442.51}`,
                    "name": "ᵉ***ᵉ"
                }], "size": 1
            }, "ecp": 0, "message": `gkey_238`
        });
        // return Service.commonApiPost(RequestType.GetBigMsg, null);
    }

    static gotoWithdraw(t) {
        return Service.commonApiPost(RequestType.GotoWithdraw, t);
    }

    static gotoGoldWithdraw(t) {
        return Service.commonApiPost(RequestType.GotoGoldWithdraw, t);
    }

    static getWithdrawDetail(t) {
        return Service.commonApiPost(RequestType.WithdrawDetail, t);
    }

    static withdrawHistory() {
        return Service.commonApiPost(RequestType.WithdrawHistory, null);
    }

    static removeUser(t) {
        return Service.commonApiPost(RequestType.RemoveUser, t);
    }

    static agreementForce(t) {
        return Service.commonApiPost(RequestType.AgreementReport, t);
    }

    static ShuMengReport(t) {
        return Service.commonApiPost(RequestType.ShuMengReport, t);
    }

    static chat_main(t) {
        return Service.commonApiPost(RequestType.chat_main, t);
    }

    static chat_msg_pop(t) {
        return Service.commonApiPost(RequestType.chat_msg_pop, t);
    }

    static useProp(t) {
        return Service.commonApiPost(RequestType.usr_prop, t);
    }

    static updateLevel(t) {
        return Service.commonApiPost(RequestType.update_level, t);
    }

    static newGoldReward() {
        return Service.commonApiPost(RequestType.newGoldReward, null);
    }

    static getHandBookReward(t) {
        return Service.commonApiPost(RequestType.getHandBookReward, t);
    }

    static getHandBookPage(t) {
        return Service.commonApiPost(RequestType.getHandBookPage, t);
    }

    static async getBigCashExtractInfo() {
        return Service.commonApiPost(RequestType.getBigCashVerifyInfo, null);
    }

    static getTaskScorllMsg() {
        return Service.commonApiPost(RequestType.taskScorllMsg, null);
    }

    static getSignInfo() {
        return Promise.resolve({
            "code": 1, "data": {
                "sign_info_list": [{
                    "current_login_days": 1,
                    "current_user_level": 1,
                    "id": "1",
                    "is_limit": 0,
                    "is_top": 0,
                    "red_show_money": 1000,
                    "red_true_money": 1000,
                    "sign_up_day_limit": 1,
                    "status": 1
                }, {
                    "current_login_days": 1,
                    "current_user_level": 1,
                    "id": "2",
                    "is_limit": 0,
                    "is_top": 0,
                    "red_show_money": 888,
                    "red_true_money": 888,
                    "sign_up_day_limit": 2,
                    "status": 0
                }, {
                    "current_login_days": 1,
                    "current_user_level": 1,
                    "id": "3",
                    "is_limit": 0,
                    "is_top": 0,
                    "red_show_money": 100,
                    "red_true_money": 100,
                    "sign_up_day_limit": 3,
                    "status": 0
                }, {
                    "current_login_days": 1,
                    "current_user_level": 1,
                    "id": "4",
                    "is_limit": 0,
                    "is_top": 0,
                    "red_show_money": 100,
                    "red_true_money": 100,
                    "sign_up_day_limit": 4,
                    "status": 0
                }, {
                    "current_login_days": 1,
                    "current_user_level": 1,
                    "id": "5",
                    "is_limit": 0,
                    "is_top": 0,
                    "red_show_money": 100,
                    "red_true_money": 100,
                    "sign_up_day_limit": 5,
                    "status": 0
                }, {
                    "current_login_days": 1,
                    "current_user_level": 1,
                    "id": "6",
                    "is_limit": 0,
                    "is_top": 0,
                    "red_show_money": 100,
                    "red_true_money": 100,
                    "sign_up_day_limit": 7,
                    "status": 0
                }, {
                    "current_login_days": 1,
                    "current_user_level": 1,
                    "id": "7",
                    "is_limit": 0,
                    "is_top": 1,
                    "red_show_money": 8888,
                    "red_true_money": 888,
                    "sign_up_day_limit": 8,
                    "status": 0
                }, {
                    "current_login_days": 1,
                    "current_user_level": 1,
                    "id": "8",
                    "is_limit": 0,
                    "is_top": 0,
                    "red_show_money": 100,
                    "red_true_money": 100,
                    "sign_up_day_limit": 9,
                    "status": 0
                }, {
                    "current_login_days": 1,
                    "current_user_level": 1,
                    "id": "9",
                    "is_limit": 0,
                    "is_top": 1,
                    "red_show_money": 888,
                    "red_true_money": 888,
                    "sign_up_day_limit": 10,
                    "status": 0
                }, {
                    "current_login_days": 1,
                    "current_user_level": 1,
                    "id": "10",
                    "is_limit": 0,
                    "is_top": 0,
                    "red_show_money": 200,
                    "red_true_money": 200,
                    "sign_up_day_limit": 12,
                    "status": 0
                }, {
                    "current_login_days": 1,
                    "current_user_level": 1,
                    "id": "11",
                    "is_limit": 0,
                    "is_top": 0,
                    "red_show_money": 1222,
                    "red_true_money": 1222,
                    "sign_up_day_limit": 15,
                    "status": 0
                }, {
                    "current_login_days": 1,
                    "current_user_level": 1,
                    "id": "12",
                    "is_limit": 0,
                    "is_top": 0,
                    "red_show_money": 200,
                    "red_true_money": 200,
                    "sign_up_day_limit": 20,
                    "status": 0
                }, {
                    "current_login_days": 1,
                    "current_user_level": 1,
                    "id": "13",
                    "is_limit": 0,
                    "is_top": 0,
                    "red_show_money": 200,
                    "red_true_money": 200,
                    "sign_up_day_limit": 25,
                    "status": 0
                }, {
                    "current_login_days": 1,
                    "current_user_level": 1,
                    "id": "14",
                    "is_limit": 1,
                    "is_top": 0,
                    "red_show_money": 88888,
                    "red_true_money": 0,
                    "sign_up_day_limit": 30,
                    "status": 0
                }]
            }, "ecp": 0, "message": `gkey_238`
        });
        // return Service.commonApiPost(RequestType.signIn, null);
    }

    static getSignInReward(t) {
        return Service.commonApiPost(RequestType.signInReward, t);
    }

    static openBox() {
        return Service.commonApiPost(RequestType.openBox, null);
    }

    static getBoxReward(t) {
        return Service.commonApiPost(RequestType.boxReward, t);
    }

    static getWufuReward() {
        return Service.commonApiPost(RequestType.wufuReward, null);
    }

    static wufuFragment() {
        return Service.commonApiPost(RequestType.wufuFragment, null);
    }

    static setWufuCardNum(t) {
        return Service.commonApiPost(RequestType.setWufuCardNum, t);
    }
}
