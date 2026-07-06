import { PropType } from "./framework/enum/AllEnum";

export var PageConfig = {
  bottomTab: [{
    name: `gkey_055`
  }, {
    name: `gkey_056`
  }, {
    name: `gkey_057`
  }, {
    name: `gkey_058`
  }],
  pageInfo: [{
    title: `gkey_059`,
    tip: `gkey_060??&value1==${10}`
  }, {
    title: `gkey_061`,
    tip: `gkey_062??&value1==${10}`
  }, {
    title: `gkey_057`,
    tip: `gkey_057`
  }, {
    title: `gkey_058`,
    tip: `gkey_058`
  }]
};
export var privacy = "https://foefeels.com/privacy.html";
export var resBasePath = "sceneA/";
export enum EAppThemeType {
  Theme1 = 0,
  Theme2 = 1,
  Theme3 = 2,
  Theme4 = 3,
}
export var appTheme = EAppThemeType.Theme3;


export enum developType {
  develop = 1,  // 开发服
  production = 2, // 正式服
}

export const ServerConfig = {
  curServerStatus: 2,
};

export interface PropItemConfig {
  /** 从第几关开始显示该道具 */
  showLevel: number;
  /** 初始数量，-1 表示无限使用且不显示数量角标 */
  initCount: number;
  /** 数量不足时是否可通过看视频获取 */
  canGetByVideo: boolean;
}

export const PropConfig: Record<number, PropItemConfig> = {
  [PropType.helpCombine]: {
    showLevel: 3,
    initCount: -1,
    canGetByVideo: true,
  },
  [PropType.wholeImage]: {
    showLevel: 3,
    initCount: -1,
    canGetByVideo: true,
  },
};

export function getPropConfig(propType: number): PropItemConfig {
  return PropConfig[propType];
}

export function isPropUnlimited(propType: number): boolean {
  return getPropConfig(propType).initCount === -1;
}

export function isPropVisible(propType: number, level: number): boolean {
  return level >= getPropConfig(propType).showLevel;
}

export function hasAnyVisibleProp(level: number): boolean {
  return Object.keys(PropConfig).some(function (key) {
    return isPropVisible(+key, level);
  });
}