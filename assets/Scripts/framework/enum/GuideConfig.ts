export enum GuideEnum {
  commonHighlight = 0,
  gameGuide1 = 1,
  gamePropGuide = 2,
  redShow1 = 3,
  redShow2 = 4,
  redShow3 = 5,
  redShow4 = 6,
  welcomeGuideTip = 7,
  signPop = 8,
  taskPop = 9,
  activeGuide = 10,
  galleryGuideStep3 = 11,
  galleryGuideStep4 = 12,
  activeGuideClick = 13,
}
function a(e) {
  return "<size=41><color=#FF0000>" + e + "</color></size>";
}
(GuideConfig = {})[GuideEnum.activeGuide] = {};
GuideConfig[GuideEnum.signPop] = {};
GuideConfig[GuideEnum.taskPop] = {};
GuideConfig[GuideEnum.commonHighlight] = {
  des: "",
  unBindClose: true,
  isBlackClose: false,
  textPosition: "top",
  isRepeat: true
};
GuideConfig[GuideEnum.gameGuide1] = {
  des: a("拖动碎片") + "即可完成交换，快拼好整张图片吧",
  audioName: "gameSound/game_guide_1",
  unBindClose: true,
  textPosition: "top",
  reportName: "game_guide_1"
};
GuideConfig[GuideEnum.gamePropGuide] = {
  des: "遇到难关，可以" + a("使用道具") + "哦",
  audioName: "gameSound/prop_guide",
  isBlackClose: true,
  textPosition: "center",
  reportName: "prop_guide"
};
GuideConfig[GuideEnum.welcomeGuideTip] = {};
GuideConfig[GuideEnum.redShow1] = {
  des: "每次观看视频获得的红包，都可以在这里提现",
  isBlackClose: true,
  audioName: "red_wd_guide_1",
  reportName: "red_wd_guide_1"
};
GuideConfig[GuideEnum.redShow2] = {
  des: "通关越多，提现比例越高！",
  isBlackClose: true,
  audioName: "red_wd_guide_2_s1",
  reportName: "red_wd_guide_2"
};
GuideConfig[GuideEnum.redShow3] = {
  isBlackClose: true,
  isUnShowText: true
};
GuideConfig[GuideEnum.redShow4] = {
  des: "金额满" + a("0.1元") + "可提现，\n预计再闯" + a("2关") + "即可满足，\n95%的用户已提现成功哟～",
  isBlackClose: true,
  scale: 1,
  audioName: "red_guide_4"
};
GuideConfig[GuideEnum.activeGuideClick] = {
  des: "点击" + a("进度条") + "，即可查看" + a("活跃度") + "相关信息",
  textPosition: "center",
  isBlackClose: true,
  audioName: "makeMnSound/activity_4",
  reportName: "activity_2"
};
GuideConfig[GuideEnum.galleryGuideStep3] = {};
GuideConfig[GuideEnum.galleryGuideStep4] = {};
export var GuideConfig = GuideConfig;