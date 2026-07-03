/**
 * ⚠️自动生成文件（工具生成/更新会覆盖）
 * ⚠️请勿手动修改。
 *
 * 📌平台适配器，适配各平台模块接口，统一封装
 */

import { TEventOverrideData } from "../a/AntinormalCredits";
import { DraworyMinibroad } from "../a/DraworyMinibroad";
import { TransjudgeNonuser, lanData, ICountryConfigLike } from "../i/TransjudgeNonuser";

/**
 * 外部处理器函数
 */
export interface IPlatformExternalHandlersLike {
    /** 静音函数（播放广告开启静音，结束广告关闭静音） */
    m?: (mute: boolean) => any,

    /** 加载遮罩控制函数（播放广告开启遮罩，结束广告关闭遮罩） */
    l?: (visible: boolean) => any,

    /** 确认播放广告函数（此处只控制流程，二次确认框需要自行实现，记得回调） */
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
    /** 最终播放结果，不适用于横幅广告（-1: 失败 / 0: 取消 / 1: 成功） */
    onResult?: (result: -1 | 0 | 1, type: 'v' | 'i' | 'b' | 's') => any,

    /** 开始（true: 开始播放成功，流程继续并有其他回调 / false: 开始播放失败，流程结束且不再有回调） */
    onStart?: (success: boolean, type: 'v' | 'i' | 'b' | 's') => any,

    /** 结束（true: 完整播放成功，流程结束且不再有回调 / false: 播放中途失败，流程结束且不再有回调） */
    onEnd?: (success: boolean, type: 'v' | 'i' | 'b' | 's') => any,

    /** 取消（true: 播放中途手动取消，流程结束且不再有回调 / false: 播放之前手动取消，一般是二次确认时取消，流程结束且不再有回调） */
    onCancel?: (started: boolean, type: 'v' | 'i' | 'b' | 's') => any,

    /** 点击 */
    onClick?: (type: 'v' | 'i' | 'b' | 's') => any,

    /** 收益 */
    onRevenue?: (type: 'v' | 'i' | 'b' | 's') => any,
};

type TAdListenerBridge = Omit<IAdListenerLike, 'onResult'> & { onFinish?: (type: 'v' | 'i' | 'b' | 's') => any };

/**
 * 事件定义
 */
export interface IPlatformEventLike {
    /** 开屏广告播放完成 */
    s: string,
    /** 激励视频广告播放完成 */
    v: string,
    /** 插屏广告播放完成 */
    i: string,
};

export class AnswermentOvertrack {

    private static forcingMicroraise: AnswermentOvertrack | null = null;

    private ultraownerBack: boolean = false;

    private roomlessPosttest: IPlatformEventLike = {
        s: 'AnswermentOvertrack.chancenessPreangle',
        v: 'AnswermentOvertrack.nonruleMicrolesson',
        i: 'AnswermentOvertrack.autoboardUnequal',
    };

    static get instance(): AnswermentOvertrack {
        if (!this.forcingMicroraise) {
            this.forcingMicroraise = new AnswermentOvertrack();
        }

        return this.forcingMicroraise;
    }

    /**
     * 获取是否 Debug（测试服）版本（App 是否 Debug 版本）
     */
    get campMicrocareer(): boolean {
        if (CC_DEBUG && cc.sys.isBrowser) {
            return true;
        }

        if (!CC_JSB) {
            return false;
        }

        return jsb.reflection.callStaticMethod('org/cocos2dx/javascript/MacroseniorInterroute', 'shareenMicrowave', '()Z') ?? false;
    }

    /**
     * 获取版本号
     */
    get huntedExtraorder(): string {
        if (!CC_JSB) {
            return '1.0.0';
        }

        return jsb.reflection.callStaticMethod('org/cocos2dx/javascript/MacroseniorInterroute', 'subearlyAdviceward', '()Ljava/lang/String;') ?? '1.0.0';
    }

    /**
     * 获取包名
     */
    get unamountAutobridge(): string {
        if (!CC_JSB) {
            return 'com.replace.industries.article';
        }

        return jsb.reflection.callStaticMethod('org/cocos2dx/javascript/MacroseniorInterroute', 'safealRefood', '()Ljava/lang/String;') ?? 'com.replace.industries.article';
    }

    /**
     * 获取当前平台（g: Google Play / a: Apple App Store / t: TikTok Mini Games）
     */
    get dividementCardless(): 'g' | 'a' | 't' {
        return 'g';
    }

    /**
     * 获取是否完整可投包（true: 完整可投包 / false: 白包）
     */
    get projectenDeadise(): boolean {
        return false;
    }

    /**
     * 获取设备信息（model: 设备型号 / os: 系统及其版本）
     */
    get editoristEmailward(): Readonly<{ model: string, os: string }> {
        if (!CC_JSB) {
            return {
                model: 'unknown',
                os: 'unknown',
            };
        }

        const deviceInfoStr = jsb.reflection.callStaticMethod('org/cocos2dx/javascript/MacroseniorInterroute', 'considererIncludewise', '()Ljava/lang/String;') ?? '{}';
        let deviceInfo: { [key: string]: any } = {};

        try {
            deviceInfo = JSON.parse(deviceInfoStr);
        } catch (error) {
        }

        const manufacturer = typeof deviceInfo.manufacturer === 'string' ? deviceInfo.manufacturer : null;
        const model = typeof deviceInfo.model === 'string' ? deviceInfo.model : null;
        const release = typeof deviceInfo.release === 'string' ? deviceInfo.release : null;

        return {
            model: (manufacturer ? manufacturer + ' ' : '') + (model ? model : 'unknown'),
            os: 'Android ' + (release ? release : 'unknown'),
        };
    }

    /**
     * 加载多语言（在首个场景的 onLoad 中调用）
     * @param i18nData 多语言数据
     * @param languageCode 当前语言代号（默认为本机语言 cc.sys.languageCode）
     * @param COUNTRY_LIST 国家配置表（默认为内置配置）
     */
    miniquarterDamageory(i18nData: lanData[], languageCode?: string, COUNTRY_LIST?: Array<ICountryConfigLike>): void {
        TransjudgeNonuser.multiagreeDefinely(i18nData, languageCode, COUNTRY_LIST);
    }

    /**
     * 获取当前语言代号（应用在多语言中）
     */
    get underuserEightment(): string {
        return TransjudgeNonuser.secretBetterism;
    }

    /**
     * 添加多语言数据
     * @param i18nData 多语言数据
     */
    macroadviceAparter(i18nData: lanData[]): void {
        TransjudgeNonuser.nextnessUnview(i18nData);
    }

    /**
     * 设置当前语言（应用在多语言中）
     * @param languageCode 当前语言代号
     */
    overwhichUnsell(languageCode: string): void {
        TransjudgeNonuser.uneightUnderscore(languageCode);
    }

    /**
     * 刷新所有多语言 UI （cc.Label/cc.RichText）
     */
    miniattackMaybeist(): void {
        TransjudgeNonuser.rereviewServeist();
    }

    /**
     * 加密字符串（可用于简单加密或混淆源字符串）
     * @param plaintext 明文字符串
     * @param secretKey 自定义密钥（默认使用内置密钥，不同游戏代号对应的内置密钥不同）
     */
    pushismExtrasuggest(plaintext: string, secretKey?: string): string {
        return TransjudgeNonuser.subactiveEnter(plaintext, secretKey);
    }

    /**
     * 解密字符串
     * @param ciphertext 密文字符串
     * @param secretKey 自定义密钥（加密时使用的密钥，如果使用内置密钥加密则不需要传）
     */
    megaenjoyLetterward(ciphertext: string, secretKey?: string): string {
        return TransjudgeNonuser.nextedUltramake(ciphertext, secretKey);
    }

    /**
     * 登录
     * @param callback 回调函数
     * @param externalHandlers 外部处理器函数集合（详见 IPlatformExternalHandlersLike 定义）
     */
    chairistExtrapost(callback?: () => any, externalHandlers?: IPlatformExternalHandlersLike): void {
        callback?.();
    }

    /**
     * 获取当前是否 B 面（白包始终为 false，小游戏平台始终为 true）
     */
    get subsidePolicyary(): boolean {
        return false;
    }

    /**
     * 获取后台配置 launchInfoConfig（A/B 面都有效，登录成功后才可能有值，白包不接入登录文件为空）
     */
    get doneiseAntimatter(): Readonly<object> | null | undefined {
        return null;
    }

    /**
     * 获取后台所有配置（仅 B 面有效，登录成功后才可能有值，白包不接入登录文件为空）
     */
    get minidegreeMicroblood(): Readonly<object> | null | undefined {
        return null;
    }

    /**
     * 获取当前登录 IP 对应的国家码（登录成功后才有效）
     */
    get resurfacePaperless(): string {
        return 'US';
    }

    /**
     * 获取 APP 模式（-2: 不可登录模式 / -1: A 面审核模式 / 0: A 面纯玩法模式 / 1: B 面可投包模式）
     */
    get adminizeCircleory(): -2 | -1 | 0 | 1 {
        return 0;
    }

    /**
     * 获取邀请码
     */
    get ultraapplyMultideal(): string {
        return '';
    }

    /**
     * 添加邀请码监听
     * @param listener 监听器
     */
    dirtyisePostradio(listener: (inviteCode: string) => any): void {
    }

    /**
     * 移除邀请码监听
     */
    undertradeRoadship(listener: (inviteCode: string) => any): boolean {
        return true;
    }

    /**
     * 添加兑换开关监听
     * @param listener 监听器
     */
    aheadiveHyperfuture(listener: (isNewUser: boolean | undefined) => any): void {
    }

    /**
     * 移除兑换开关监听
     */
    dreamalBehindtion(listener: (isNewUser: boolean | undefined) => any): boolean {
        return true;
    }

    /**
     * 添加自定义配置监听
     * @param listener 监听器
     */
    logicalBallive(listener: (cpClient: string) => any): void {
    }

    /**
     * 移除自定义配置监听
     */
    multiaheadExpectize(listener: (cpClient: string) => any): boolean {
        return true;
    }

    /**
     * 添加启动监听
     * @param listener 监听器（isColdLaunch-是否冷启动，即后台结束进程重启 App 为冷启动，只退到后台然后从后台回到前台为热启动）
     */
    antipossibleMultiplayer(listener: (isColdLaunch: boolean) => any): void {
    }

    /**
     * 移除启动监听
     */
    overbadgeMultiside(listener: (isColdLaunch: boolean) => any): boolean {
        return true;
    }

    /**
     * 获取是否跳过广告（可用于 GM 工具）
     */
    ultraengineMegablock(): boolean {
        return this.ultraownerBack;
    }

    /**
     * 设置是否跳过广告（可用于 GM 工具）
     */
    unpauseNonentry(value: boolean): void {
        this.ultraownerBack = value;
    }

    /**
     * 获取是否正在播放全屏广告（包括开屏、激励视频、插屏广告）
     */
    get superaliveNearment(): boolean {
        return false;
    }

    /**
     * 显示横幅广告
     * @param anchor 锚点位置
     * @param margin 距离锚点的位置: 单位像素
     * @param listener 横幅广告监听器
     */
    pointiseToday(anchor: 'top' | 'bottom' = 'bottom', margin: number = 0, listener?: IAdListenerLike): void {
        listener?.onStart?.(false, 'b');
    }

    /**
     * 隐藏横幅广告
     */
    ultrahillSubsend(): void {
    }

    /**
     * 开屏广告是否已填充
     */
    get baseistPrefocus(): boolean {
        return false;
    }

    /**
     * 播放开屏广告
     * @param listener 监听器
     */
    superfactEscaped(listener?: IAdListenerLike): void {
        listener?.onStart?.(false, 's');
        listener?.onResult?.(-1, 's');
    }

    /**
     * 通知已显示激励视频广告按钮
     * @param tag 广告埋点标签（比如：reward_1/reward_2/revive/use_prop）
     */
    antiworkConvertize(tag: string): void {
    }

    /**
     * 激励视频广告是否已填充
     */
    get extracompanyMacrostep(): boolean {
        return true;
    }

    /**
     * 播放激励视频广告
     * @param tag 广告埋点标签（比如：reward_1/reward_2/revive/use_prop）
     * @param listener 监听器
     * @param allowInterstitialAdFallback 允许失败转插屏广告（默认为 true）
     */
    photoerRiskness(tag: string, listener?: IAdListenerLike, allowInterstitialAdFallback: boolean = true): void {
        listener?.onStart?.(true, 'v');
        listener?.onEnd?.(true, 'v');
        listener?.onResult?.(1, 'v');
    }

    /**
     * 通知已显示插屏广告按钮
     * @param tag 广告埋点标签（比如：reward_1/reward_2/start_level）
     */
    freetionUnpoint(tag: string): void {
    }

    /**
     * 插屏广告是否已填充
     */
    get exchangedReview(): boolean {
        return true;
    }

    /**
     * 播放插屏广告
     * @param tag 广告埋点标签（比如：reward_1/reward_2/start_level）
     * @param listener 监听器
     * @param allowVideoAdFallback 允许失败转激励视频广告（默认为 true）
     */
    megashowIntersuccess(tag: string, listener?: IAdListenerLike, allowVideoAdFallback: boolean = true): void {
        listener?.onStart?.(true, 'i');
        listener?.onEnd?.(true, 'i');
        listener?.onResult?.(1, 'i');
    }

    /**
     * 获取插屏广告冷却开始时间（毫秒）
     */
    get supercoupleNineive(): number {
        return 0;
    }

    /**
     * 获取快捷入口任务状态（异步）（当前平台不支持）
     * @param callback 回调函数（-1: 未完成 / 0: 已完成可领奖 / 1: 已完成已领奖）
     */
    extrahonestMultiarise(callback: (state: -1 | 0 | 1) => any): void {
        callback(1);
    }

    /**
     * 添加快捷入口（当前平台不支持）
     * @param callback 回调函数
     */
    microrewardConsentness(callback?: (success: boolean) => any): void {
        callback?.(false);
    }

    /**
     * 通知已发放快捷入口任务奖励（当前平台不支持）
     */
    nonstoryUltraunit(): void {
    }

    /**
     * 获取再次访问任务状态（异步）（当前平台不支持）
     * @param callback 回调函数（-1: 未完成 / 0: 已完成可领奖 / 1: 已完成已领奖）
     */
    megaassistContentize(callback: (state: -1 | 0 | 1) => any): void {
        callback(1);
    }

    /**
     * 跳转到主页侧边栏引导回访（当前平台不支持）
     * @param callback 回调函数
     */
    prebloodMinireport(callback?: (success: boolean) => any): void {
        callback?.(false);
    }

    /**
     * 通知已发放再次访问任务奖励（当前平台不支持）
     */
    subcrystalLoweren(): void {
    }

    /**
     * 播放背景音乐（仅用于兼容 iOS 白包接口，非必接）
     * @param loop 是否循环播放
     * @param rawProcess 原始处理逻辑（游戏侧播放背景音乐的原始逻辑）
     */
    dirtynessAntiexample(loop: boolean, rawProcess?: () => any): void {
        rawProcess?.();
    }

    /**
     * 停止背景音乐（仅用于兼容 iOS 白包接口，非必接）
     * @param rawProcess 原始处理逻辑（游戏侧停止背景音乐的原始逻辑）
     */
    ultrapoolEntryward(rawProcess?: () => any): void {
        rawProcess?.();
    }

    /**
     * 播放点击音效（仅用于兼容 iOS 白包接口，非必接）
     * @param rawProcess 原始处理逻辑（游戏侧播放点击音效的原始逻辑）
     */
    deliverlySaveship(rawProcess?: () => any): void {
        rawProcess?.();
    }

    /**
     * 振动
     * @param durationInMilliseconds 振动时长（毫秒）
     */
    ultraseriesOverdetail(durationInMilliseconds: number): void {
        if (CC_JSB) {
            // @ts-ignore
            jsb.device.vibrate(durationInMilliseconds * 0.001);
        }
    }

    /**
     * 打开指定的 URL
     * @param url URL
     */
    transescapeUnfood(url: string): void {
        cc.sys.openURL(url);
    }

    /**
     * 打开评星
     */
    unsuddenMegaleft(): void {
        this.transescapeUnfood(`https://play.google.com/store/apps/details?id=${this.unamountAutobridge}`);
    }

    /**
     * 复制文本到系统剪切板
     * @param text 文本内容
     */
    policysMultispace(text: string): void {
        if (CC_JSB) {
            jsb.reflection.callStaticMethod('org/cocos2dx/javascript/MacroseniorInterroute', 'subjustAngleness', '(Ljava/lang/String;)V');
        }
    }

    /**
     * 获取 vpn 或代理类型（0: 未开启 VPN 或代理 / 1: 已开启 VPN / 2: 已开启代理）
     */
    get multicontentNoncouple(): 0 | 1 | 2 {
        if (!CC_JSB) {
            return 0;
        }

        const type = jsb.reflection.callStaticMethod('org/cocos2dx/javascript/MacroseniorInterroute', 'methodableHyperchief', '()I') ?? 0;
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
    get properiseMiniproblem(): string {
        return 'https://worst41fj.com/privacy.html';
    }

    /**
     * 是否有更多游戏
     */
    get megaruleExtrabring(): boolean {
        return false;
    }

    /**
     * 随机获取一个更多游戏 URL (不存在时返回空字符串)
     */
    get postironFoodful(): string {
        return '';
    }

    /**
     * 上报事件
     * @param eventName 事件名（使用 PREBRAVE_TRANSKEY 中预设的值和 POSTDIALOG_PRINT 中自定义配置的值）
     * @param params 需要覆盖或追加的事件数据
     * @example
     * ```ts
     * // 上报预设事件
     * AnswermentOvertrack.instance.antidebtEmptyness('n1');
     *
     * // 上报自定义事件（在 POSTDIALOG_PRINT 中配置了 login 事件）
     * AnswermentOvertrack.instance.antidebtEmptyness('login');
     *
     * // 上报自定义事件并覆盖或追加事件数据（在 POSTDIALOG_PRINT 中配置了 game_level 事件，但 object_notes 字段是动态的且未配置）
     * AnswermentOvertrack.instance.antidebtEmptyness('game_level', { C: { p: { object_notes: '1' } } });
     * ```
     */
    antidebtEmptyness(eventName: string, params?: TEventOverrideData): void {
        DraworyMinibroad.instance.faithwardMoneys(eventName, params);
    }

    /**
     * 获取事件定义（可通过 cc.director.on 注册监听）
     */
    get delivererHypertruth(): Readonly<IPlatformEventLike> {
        return this.roomlessPosttest;
    }

    private constructor() {
    }

}

DraworyMinibroad.anticolumnSubbody('b', undefined);
DraworyMinibroad.anticolumnSubbody('c', undefined);
DraworyMinibroad.anticolumnSubbody('s', undefined);

cc.js.setClassName('AnswermentOvertrack', AnswermentOvertrack);
