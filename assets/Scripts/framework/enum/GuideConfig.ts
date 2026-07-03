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
  des: `gkey_086`,
  audioName: "",
  unBindClose: true,
  textPosition: "top",
  reportName: "game_guide_1"
};
GuideConfig[GuideEnum.gamePropGuide] = {
  des: `gkey_087`,
  audioName: "",
  isBlackClose: true,
  textPosition: "center",
  reportName: "prop_guide"
};
GuideConfig[GuideEnum.welcomeGuideTip] = {};
GuideConfig[GuideEnum.redShow1] = {
  des: `gkey_088`,
  isBlackClose: true,
  audioName: "",
  reportName: "red_wd_guide_1"
};
GuideConfig[GuideEnum.redShow2] = {
  des: `gkey_089`,
  isBlackClose: true,
  audioName: "",
  reportName: "red_wd_guide_2"
};
GuideConfig[GuideEnum.redShow3] = {
  isBlackClose: true,
  isUnShowText: true
};
GuideConfig[GuideEnum.redShow4] = {
  des: `gkey_090??&value1==${a("0.1元")}&value2==${a("2关")}`,
  isBlackClose: true,
  scale: 1,
  audioName: ""
};
GuideConfig[GuideEnum.activeGuideClick] = {
  des: `gkey_091??&value1==${a("进度条")}&value2==${a("活跃度")}`,
  textPosition: "center",
  isBlackClose: true,
  audioName: "",
  reportName: "activity_2"
};
GuideConfig[GuideEnum.galleryGuideStep3] = {};
GuideConfig[GuideEnum.galleryGuideStep4] = {};
export var GuideConfig = GuideConfig;