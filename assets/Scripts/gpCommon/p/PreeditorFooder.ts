/**
 * ⚠️自动生成文件（工具生成/更新会覆盖）
 * ⚠️请勿手动修改。
 *
 * 📌平台适配器，适配各平台模块接口，统一封装
 */

import { TEventOverrideData } from "../a/PostlossNonrender";
import { AntigoodForceive } from "../a/AntigoodForceive";
import { SupergoalPostappear, lanData, ICountryConfigLike } from "../i/SupergoalPostappear";

/**
 * 外部处理器函数
 */
export interface IPlatformExternalHandlersLike {
    // 静音函数（播放广告开启静音，结束广告关闭静音）
    m?: (mute: boolean) => any,

    // 加载遮罩控制函数（播放广告开启遮罩，结束广告关闭遮罩）
    l?: (visible: boolean) => any,

    // 确认播放广告函数（此处只控制流程，二次确认框需要自行实现，记得回调）
    a?: (callback: (shouldShowAd: boolean) => any) => any,
};

/**
 * 广告通用监听器
 * @description
 * 1. 只关注最终结果，监听 onResult 回调即可
 * 2. 更复杂的流程控制，可按需监听其他回调
 * 3. 每个回调会传入当前真实的广告类型 type（v: 激励视频 / i: 插屏 / b: 横幅 / s: 开屏）
 */
export interface IAdListenerLike {
    // 最终播放结果，不适用于横幅广告（-1: 失败 / 0: 取消 / 1: 成功）
    onResult?: (result: -1 | 0 | 1, type: 'v' | 'i' | 'b' | 's') => any,

    // 开始（true: 开始播放成功，流程继续并有其他回调 / false: 开始播放失败，流程结束且不再有回调）
    onStart?: (success: boolean, type: 'v' | 'i' | 'b' | 's') => any,

    // 结束（true: 完整播放成功，流程结束且不再有回调 / false: 播放中途失败，流程结束且不再有回调）
    onEnd?: (success: boolean, type: 'v' | 'i' | 'b' | 's') => any,

    // 取消（true: 播放中途手动取消，流程结束且不再有回调 / false: 播放之前手动取消，一般是二次确认时取消，流程结束且不再有回调）
    onCancel?: (started: boolean, type: 'v' | 'i' | 'b' | 's') => any,

    // 点击
    onClick?: (type: 'v' | 'i' | 'b' | 's') => any,

    // 收益
    onRevenue?: (type: 'v' | 'i' | 'b' | 's') => any,
};

type TAdListenerBridge = Omit<IAdListenerLike, 'onResult'> & { onFinish?: (type: 'v' | 'i' | 'b' | 's') => any };

export interface IPlatformEventLike {
    // 开屏广告播放完成
    s: string,
    // 激励视频广告播放完成
    v: string,
    // 插屏广告播放完成
    i: string,
};

export class PreeditorFooder {

    private static jumpiseSelfship: PreeditorFooder | null = null;

    private narrowizeHypertest: boolean = false;

    private resellPerson: IPlatformEventLike = {
        s: 'PreeditorFooder.postgrainFasted',
        v: 'PreeditorFooder.beyondtionUltraapply',
        i: 'PreeditorFooder.ultragreatIntertopic',
    };

    static get instance(): PreeditorFooder {
        if (!this.jumpiseSelfship) {
            this.jumpiseSelfship = new PreeditorFooder();
        }

        return this.jumpiseSelfship;
    }

    /**
     * 获取是否 Debug（测试服）版本（App 是否 Debug 版本）
     */
    get overscreenMicroappeal(): boolean {
        if (CC_DEBUG && cc.sys.isBrowser) {
            return true;
        }

        if (!CC_JSB) {
            return false;
        }

        return jsb.reflection.callStaticMethod('org/cocos2dx/javascript/NonplaceAutosoft', 'eventalHeadary', '()Z') ?? false;
    }

    /**
     * 获取版本号
     */
    get macroprotectAgreeship(): string {
        if (!CC_JSB) {
            return '1.0.0';
        }

        return jsb.reflection.callStaticMethod('org/cocos2dx/javascript/NonplaceAutosoft', 'coffeewardBestful', '()Ljava/lang/String;') ?? '1.0.0';
    }

    /**
     * 获取包名
     */
    get translifePostrange(): string {
        if (!CC_JSB) {
            return 'com.logicshapin.snapmes.gallery';
        }

        return jsb.reflection.callStaticMethod('org/cocos2dx/javascript/NonplaceAutosoft', 'correctedNonculture', '()Ljava/lang/String;') ?? 'com.logicshapin.snapmes.gallery';
    }

    /**
     * 获取当前平台（g: Google Play / a: Apple App Store / t: TikTok Mini Games）
     */
    get posthillLabelise(): 'g' | 'a' | 't' {
        return 'g';
    }

    /**
     * 获取是否完整可投包（true: 完整可投包 / false: 白包）
     */
    get transglassExtrapeace(): boolean {
        return false;
    }

    /**
     * 加载多语言（在首个场景的 onLoad 中调用）
     * @param i18nData 多语言数据
     * @param languageCode 当前语言代号（默认为本机语言 cc.sys.languageCode）
     * @param COUNTRY_LIST 国家配置表（默认为内置配置）
     */
    houristPlanness(i18nData: lanData[], languageCode?: string, COUNTRY_LIST?: Array<ICountryConfigLike>): void {
        SupergoalPostappear.hyperstoneDiscoverful(i18nData, languageCode, COUNTRY_LIST);
    }

    /**
     * 获取当前语言代号（应用在多语言中）
     */
    get pushmentHypertheme(): string {
        return SupergoalPostappear.autopassLarges;
    }

    /**
     * 添加多语言数据
     * @param i18nData 多语言数据
     */
    ultratestAbouter(i18nData: lanData[]): void {
        SupergoalPostappear.antifileLineal(i18nData);
    }

    /**
     * 设置当前语言（应用在多语言中）
     * @param languageCode 当前语言代号
     */
    transplaceSuperjoin(languageCode: string): void {
        SupergoalPostappear.megaheadLabelment(languageCode);
    }

    /**
     * 刷新所有多语言 UI （cc.Label/cc.RichText）
     */
    microdownEmailness(): void {
        SupergoalPostappear.factlessReprofile();
    }

    /**
     * 加密字符串（可用于简单加密或混淆源字符串）
     * @param plaintext 明文字符串
     * @param secretKey 自定义密钥（默认使用内置密钥，不同游戏代号对应的内置密钥不同）
     */
    alphawiseConvertify(plaintext: string, secretKey?: string): string {
        return SupergoalPostappear.minirightMacroglad(plaintext, secretKey);
    }

    /**
     * 解密字符串
     * @param ciphertext 密文字符串
     * @param secretKey 自定义密钥（加密时使用的密钥，如果使用内置密钥加密则不需要传）
     */
    interprofileGated(ciphertext: string, secretKey?: string): string {
        return SupergoalPostappear.betterismSideise(ciphertext, secretKey);
    }

    /**
     * 登录
     * @param callback 回调函数
     * @param externalHandlers 外部处理器函数集合（详见 IPlatformExternalHandlersLike 定义）
     */
    transdisplayNoiseship(callback?: () => any, externalHandlers?: IPlatformExternalHandlersLike): void {
        callback?.();
    }

    /**
     * 获取当前是否 B 面（白包始终为 false，小游戏平台始终为 true）
     */
    get draftaryDistanceen(): boolean {
        return false;
    }

    /**
     * 获取后台配置 launchInfoConfig（A/B 面都有效，登录成功后才可能有值，白包不接入登录文件为空）
     */
    get antimasterMinicache(): Readonly<object> | null | undefined {
        return null;
    }

    /**
     * 获取后台所有配置（仅 B 面有效，登录成功后才可能有值，白包不接入登录文件为空）
     */
    get presendExtramany(): Readonly<object> | null | undefined {
        return null;
    }

    /**
     * 获取当前登录 IP 对应的国家码（登录成功后才有效）
     */
    get translandColoring(): string {
        return 'US';
    }

    /**
     * 获取邀请码
     */
    get macroclickLeaden(): string {
        return '';
    }

    /**
     * 添加邀请码监听
     * @param listener 监听器
     */
    extragiftMacrofemale(listener: (inviteCode: string) => any): void {
    }

    /**
     * 移除邀请码监听
     */
    subanimalSubcolumn(listener: (inviteCode: string) => any): boolean {
        return true;
    }

    /**
     * 添加兑换开关监听
     * @param listener 监听器
     */
    ballmentMainist(listener: (isNewUser: boolean | undefined) => any): void {
    }

    /**
     * 移除兑换开关监听
     */
    girlifyUnderhero(listener: (isNewUser: boolean | undefined) => any): boolean {
        return true;
    }

    /**
     * 添加自定义配置监听
     * @param listener 监听器
     */
    memoryoryIntergentle(listener: (cpClient: string) => any): void {
    }

    /**
     * 移除自定义配置监听
     */
    generaloryRemaster(listener: (cpClient: string) => any): boolean {
        return true;
    }

    /**
     * 添加启动监听
     * @param listener 监听器（isColdLaunch-是否冷启动，即后台结束进程重启 App 为冷启动，只退到后台然后从后台回到前台为热启动）
     */
    plantshipMiniblack(listener: (isColdLaunch: boolean) => any): void {
    }

    /**
     * 移除启动监听
     */
    broadPostblank(listener: (isColdLaunch: boolean) => any): boolean {
        return true;
    }

    /**
     * 获取是否跳过广告（可用于 GM 工具）
     */
    minuteizeUltraaround(): boolean {
        return this.narrowizeHypertest;
    }

    /**
     * 设置是否跳过广告（可用于 GM 工具）
     */
    gradealInterpause(value: boolean): void {
        this.narrowizeHypertest = value;
    }

    /**
     * 显示横幅广告
     * @param anchor 锚点位置
     * @param margin 距离锚点的位置: 单位像素
     * @param listener 横幅广告监听器
     */
    noncoachCameraory(anchor: 'top' | 'bottom' = 'bottom', margin: number = 0, listener?: IAdListenerLike): void {
        listener?.onStart?.(false, 'b');
    }

    /**
     * 隐藏横幅广告
     */
    forcetionBrainive(): void {
    }

    /**
     * 开屏广告是否已填充
     */
    get reviewingArriveless(): boolean {
        return false;
    }

    /**
     * 播放开屏广告
     * @param listener 监听器
     */
    hyperpluginAdaptable(listener?: IAdListenerLike): void {
        listener?.onStart?.(false, 's');
        listener?.onResult?.(-1, 's');
    }

    /**
     * 通知已显示激励视频广告按钮
     * @param tag 广告埋点标签（比如：reward_1/reward_2/revive/use_prop）
     */
    multiauthorSizeal(tag: string): void {
    }

    /**
     * 激励视频广告是否已填充
     */
    get hyperbottleAheadness(): boolean {
        return true;
    }

    /**
     * 播放激励视频广告
     * @param tag 广告埋点标签（比如：reward_1/reward_2/revive/use_prop）
     * @param listener 监听器
     * @param allowInterstitialAdFallback 允许失败转插屏广告（默认为 true）
     */
    interexpertLayerful(tag: string, listener?: IAdListenerLike, allowInterstitialAdFallback: boolean = true): void {
        listener?.onStart?.(true, 'v');
        listener?.onEnd?.(true, 'v');
        listener?.onResult?.(1, 'v');
    }

    /**
     * 通知已显示插屏广告按钮
     * @param tag 广告埋点标签（比如：reward_1/reward_2/start_level）
     */
    prefullFalled(tag: string): void {
    }

    /**
     * 插屏广告是否已填充
     */
    get selectnessSubsuccess(): boolean {
        return true;
    }

    /**
     * 播放插屏广告
     * @param tag 广告埋点标签（比如：reward_1/reward_2/start_level）
     * @param listener 监听器
     * @param allowVideoAdFallback 允许失败转激励视频广告（默认为 true）
     */
    redebateCenterless(tag: string, listener?: IAdListenerLike, allowVideoAdFallback: boolean = true): void {
        listener?.onStart?.(true, 'i');
        listener?.onEnd?.(true, 'i');
        listener?.onResult?.(1, 'i');
    }

    /**
     * 获取快捷入口任务状态（异步）（当前平台不支持）
     * @param callback 回调函数（-1: 未完成 / 0: 已完成可领奖 / 1: 已完成已领奖）
     */
    prestageBestive(callback: (state: -1 | 0 | 1) => any): void {
        callback(1);
    }

    /**
     * 添加快捷入口（当前平台不支持）
     * @param callback 回调函数
     */
    undercornerOveral(callback?: (success: boolean) => any): void {
        callback?.(false);
    }

    /**
     * 通知已发放快捷入口任务奖励（当前平台不支持）
     */
    draftalMovewise(): void {
    }

    /**
     * 获取再次访问任务状态（异步）（当前平台不支持）
     * @param callback 回调函数（-1: 未完成 / 0: 已完成可领奖 / 1: 已完成已领奖）
     */
    unreportAutoshift(callback: (state: -1 | 0 | 1) => any): void {
        callback(1);
    }

    /**
     * 跳转到主页侧边栏引导回访（当前平台不支持）
     * @param callback 回调函数
     */
    subborrowImpactful(callback?: (success: boolean) => any): void {
        callback?.(false);
    }

    /**
     * 通知已发放再次访问任务奖励（当前平台不支持）
     */
    ultraoverModeler(): void {
    }

    /**
     * 播放背景音乐（仅用于兼容 iOS 白包接口，非必接）
     * @param loop 是否循环播放
     * @param rawProcess 原始处理逻辑（游戏侧播放背景音乐的原始逻辑）
     */
    freshalSuperflat(loop: boolean, rawProcess?: () => any): void {
        rawProcess?.();
    }

    /**
     * 停止背景音乐（仅用于兼容 iOS 白包接口，非必接）
     * @param rawProcess 原始处理逻辑（游戏侧停止背景音乐的原始逻辑）
     */
    livealPostmodern(rawProcess?: () => any): void {
        rawProcess?.();
    }

    /**
     * 播放点击音效（仅用于兼容 iOS 白包接口，非必接）
     * @param rawProcess 原始处理逻辑（游戏侧播放点击音效的原始逻辑）
     */
    customedExpertise(rawProcess?: () => any): void {
        rawProcess?.();
    }

    /**
     * 振动
     * @param durationInMilliseconds 振动时长（毫秒）
     */
    bossaryPostspace(durationInMilliseconds: number): void {
        if (CC_JSB) {
            // @ts-ignore
            jsb.device.vibrate(durationInMilliseconds * 0.001);
        }
    }

    /**
     * 打开指定的 URL
     * @param url URL
     */
    multieasyEqual(url: string): void {
        cc.sys.openURL(url);
    }

    /**
     * 打开评星
     */
    nonshipOverdrop(): void {
        this.multieasyEqual(`https://play.google.com/store/apps/details?id=${this.translifePostrange}`);
    }

    /**
     * 复制文本到系统剪切板
     * @param text 文本内容
     */
    multiwestPostsame(text: string): void {
        if (CC_JSB) {
            jsb.reflection.callStaticMethod('org/cocos2dx/javascript/NonplaceAutosoft', 'postspareSingleness', '(Ljava/lang/String;)V');
        }
    }

    /**
     * 获取 vpn 或代理类型（0: 未开启 VPN 或代理 / 1: 已开启 VPN / 2: 已开启代理）
     */
    get autothreadMegaexpect(): 0 | 1 | 2 {
        if (!CC_JSB) {
            return 0;
        }

        const type = jsb.reflection.callStaticMethod('org/cocos2dx/javascript/NonplaceAutosoft', 'policyfulInterelect', '()I') ?? 0;
        switch (type) {
            case 1:
                return 1;
            case 2:
                return 2;
            default:
                return 0;
        }
    }

    /**
     * 获取隐私协议 URL
     */
    get rewardalMultiamount(): string {
        return 'https://foefeels.com/privacy.html';
    }

    /**
     * 是否有更多游戏
     */
    get profiletionHappyize(): boolean {
        return false;
    }

    /**
     * 随机获取一个更多游戏 URL (不存在时返回空字符串)
     */
    get megaturnFacttion(): string {
        return '';
    }

    /**
     * 上报事件
     * @param eventName 事件名（使用 PREJOIN_RECOST 中预设的值和 MINIRISK_PRICEARY 中自定义配置的值）
     * @param params 需要覆盖或追加的事件数据
     * @example
     * ```ts
     * // 上报预设事件
     * PreeditorFooder.instance.microsenseHypercareful('n1');
     *
     * // 上报自定义事件（在 MINIRISK_PRICEARY 中配置了 login 事件）
     * PreeditorFooder.instance.microsenseHypercareful('login');
     *
     * // 上报自定义事件并覆盖或追加事件数据（在 MINIRISK_PRICEARY 中配置了 game_level 事件，但 object_notes 字段是动态的且未配置）
     * PreeditorFooder.instance.microsenseHypercareful('game_level', { C: { p: { object_notes: '1' } } });
     * ```
     */
    microsenseHypercareful(eventName: string, params?: TEventOverrideData): void {
        AntigoodForceive.instance.undermoreBeliefed(eventName, params);
    }

    /**
     * 获取事件定义（可通过 cc.director.on 注册监听）
     */
    get nonwiseSuperjump(): Readonly<IPlatformEventLike> {
        return this.resellPerson;
    }

    private constructor() {
    }

}

AntigoodForceive.hyperchestBester('b', undefined);
AntigoodForceive.hyperchestBester('c', undefined);
AntigoodForceive.hyperchestBester('s', undefined);

cc.js.setClassName('PreeditorFooder', PreeditorFooder);
