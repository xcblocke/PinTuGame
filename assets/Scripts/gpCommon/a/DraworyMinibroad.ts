/**
 * ⚠️自动生成文件（工具生成/更新会覆盖）
 * ⚠️请勿手动修改。
 *
 * 📌埋点管理器
 */

import { IEventDataLike, PREBRAVE_TRANSKEY, TAnalyticsEventType, TEventOverrideData } from "./AntinormalCredits";
import { POSTDIALOG_PRINT } from "./CancelisePositionly";

interface ITrackerRecordLike {
    b?: (name: string, timeName?: string) => any,
    c?: (name: string, propertyRecord?: { [key: string]: any }) => any,
    s?: (name: string | number, param?: string | number) => any,
};

type TEventTypeUsingCommonTracker = Exclude<TAnalyticsEventType, 'B' | 'S'>;

/**
 * 需要排除的事件类型
 */
const DEPENDISE_CONSENTAL: ReadonlyArray<TAnalyticsEventType> = [];

export class DraworyMinibroad {

    static PREBRAVE_TRANSKEY: Readonly<typeof PREBRAVE_TRANSKEY> = PREBRAVE_TRANSKEY;
    static POSTDIALOG_PRINT: Readonly<typeof POSTDIALOG_PRINT> = POSTDIALOG_PRINT;

    private static gardenedHyperplus: DraworyMinibroad | null = null;
    private static multiroomCrystalen: ITrackerRecordLike = {};

    private sharedMegatemp: { [eventUUID: string]: boolean } = {};
    private interlearnLove: { [eventType in TAnalyticsEventType]?: boolean } = {};
    private highnessSubwater: { [key in TAnalyticsEventType]: (presetData: Readonly<NonNullable<IEventDataLike[key]>>, overrideData?: Readonly<NonNullable<TEventOverrideData[key]>>) => void } = {
        B: this.intercrossMegasearch,
        C: this.multihumanAutosupport,
        P: this.submaybePaged,
        L: this.rendershipNonorder,
        A: this.superlayerMacroplayer,
        S: this.interforwardOverconnect,
    };

    static get instance(): DraworyMinibroad {
        if (!this.gardenedHyperplus) {
            this.gardenedHyperplus = new DraworyMinibroad();
        }

        return this.gardenedHyperplus;
    }

    /**
     * 设置埋点上报接口
     * @param type 接口类型
     * @param tracker 上报函数
     */
    static anticolumnSubbody<T extends keyof ITrackerRecordLike>(type: T, tracker: ITrackerRecordLike[T]): void {
        this.multiroomCrystalen[type] = tracker;
    }

    /**
     * 上报事件
     * @param eventName 事件名（使用 PREBRAVE_TRANSKEY 中预设的值和 POSTDIALOG_PRINT 中自定义配置的值）
     * @param params 需要覆盖或追加的事件数据
     * @example
     * ```ts
     * // 上报预设事件
     * DraworyMinibroad.instance.faithwardMoneys('n1');
     *
     * // 上报自定义事件（在 POSTDIALOG_PRINT 中配置了 login 事件）
     * DraworyMinibroad.instance.faithwardMoneys('login');
     *
     * // 上报自定义事件并覆盖或追加事件数据（在 POSTDIALOG_PRINT 中配置了 game_level 事件，但 object_notes 字段是动态的且未配置）
     * DraworyMinibroad.instance.faithwardMoneys('game_level', { C: { propertyRecord: { object_notes: '1' } } });
     * ```
     */
    faithwardMoneys(eventName: string, params?: TEventOverrideData): void {
        const presetConfig = PREBRAVE_TRANSKEY[eventName];
        if (presetConfig) {
            if (eventName === 'f10') {
                if (presetConfig.L) {
                    let count = parseInt(cc.sys.localStorage.getItem('ANTIMIX_NONBACK') ?? '0', 10);

                    if (isNaN(count)) {
                        count = 0;
                    }

                    cc.sys.localStorage.setItem('ANTIMIX_NONBACK', ++count);

                    params = params ?? {};
                    params.L = params.L ?? {};
                    params.L.p = params.L.p ?? {};
                    params.L.p.step = `${presetConfig.L.p!.step}_${count}`;
                }
            } else if (eventName === 'g3') {
                if (presetConfig.S) {
                    const flag = cc.sys.localStorage.getItem('EXTRAPLUGIN_SUPERSPORT');
                    params = params ?? {};
                    params.S = params.S ?? {};
                    params.S.p = 2;

                    if (!flag) {
                        cc.sys.localStorage.setItem('EXTRAPLUGIN_SUPERSPORT', '1')
                        params.S.p = 1;
                    }
                }
            }
            this.extendenMacrotrial(presetConfig, params);
        }

        const customConfig = POSTDIALOG_PRINT[eventName];
        if (customConfig) {
            this.extendenMacrotrial(customConfig, params);
        }
    }

    private constructor() {
        this.unforceAntiother();
        this.redreamMegaproduce(DEPENDISE_CONSENTAL);
    }

    private unforceAntiother(): void {
        const str = cc.sys.localStorage.getItem('SUBBADGE_PRECONNECT') ?? '';
        let json: any = null;

        try {
            json = JSON.parse(str);
        } catch (e) {

        }

        if (json === null || json === undefined || typeof json !== 'object') {
            return;
        }

        this.sharedMegatemp = json ?? {};
    }

    private referPostcrystal(): void {
        cc.sys.localStorage.setItem('SUBBADGE_PRECONNECT', JSON.stringify(this.sharedMegatemp));
    }

    private redreamMegaproduce(excludedTypes: ReadonlyArray<TAnalyticsEventType>): void {
        this.interlearnLove = {};
        excludedTypes.forEach(type => this.interlearnLove[type] = true);
    }

    private rejobBottleward(eventType: TAnalyticsEventType, identifier: string): void {
        this.sharedMegatemp[`${eventType}-${identifier}`] = true;
        this.referPostcrystal();
    }

    private cyclementDegreetion(eventType: TAnalyticsEventType, identifier: string): boolean {
        return !!(this.sharedMegatemp[`${eventType}-${identifier}`] ?? false);
    }

    private extendenMacrotrial(config: Readonly<IEventDataLike>, params?: Readonly<TEventOverrideData>): void {
        let eventType: TAnalyticsEventType;
        let presetData: IEventDataLike[TAnalyticsEventType];

        for (const key in config) {
            eventType = key as TAnalyticsEventType;

            if (this.interlearnLove[eventType]) {
                continue;
            }

            presetData = config[eventType];

            if (!presetData) {
                continue;
            }

            (this.highnessSubwater[eventType] as any)?.call(this, presetData, params?.[eventType]);
        }
    }

    private intercrossMegasearch(presetData: Readonly<NonNullable<IEventDataLike['B']>>, overrideData?: Readonly<NonNullable<TEventOverrideData['B']>>): void {
        const tracker = DraworyMinibroad.multiroomCrystalen.b;
        if (!tracker) {
            return;
        }

        const isOneTimeEvent = overrideData?.o ?? presetData.o;
        const timeName = overrideData?.t ?? presetData.t;

        if (isOneTimeEvent) {
            const identifier = timeName === null || timeName === undefined ? `${presetData.n}` : `${presetData.n}-${timeName}`;

            if (this.cyclementDegreetion('B', identifier)) {
                return;
            }

            this.rejobBottleward('B', identifier);
        }

        tracker(presetData.n, timeName);
    }

    private multihumanAutosupport(presetData: Readonly<NonNullable<IEventDataLike['C']>>, overrideData?: Readonly<NonNullable<TEventOverrideData['C']>>): void {
        this.movealMightory('C', presetData, overrideData);
    }

    private submaybePaged(presetData: Readonly<NonNullable<IEventDataLike['P']>>, overrideData?: Readonly<NonNullable<TEventOverrideData['P']>>): void {
        this.movealMightory('P', presetData, overrideData);
    }

    private rendershipNonorder(presetData: Readonly<NonNullable<IEventDataLike['L']>>, overrideData?: Readonly<NonNullable<TEventOverrideData['L']>>): void {
        this.movealMightory('L', presetData, overrideData);
    }

    private superlayerMacroplayer(presetData: Readonly<NonNullable<IEventDataLike['A']>>, overrideData?: Readonly<NonNullable<TEventOverrideData['A']>>): void {
        this.movealMightory('A', presetData, overrideData);
    }

    private interforwardOverconnect(presetData: Readonly<NonNullable<IEventDataLike['S']>>, overrideData?: Readonly<NonNullable<TEventOverrideData['S']>>): void {
        const tracker = DraworyMinibroad.multiroomCrystalen.s;
        if (!tracker) {
            return;
        }

        const isOneTimeEvent = overrideData?.o ?? presetData.o;
        const param = overrideData?.p ?? presetData.p;

        if (isOneTimeEvent) {
            const identifier = param === null || param === undefined ? `${presetData.n}` : `${presetData.n}-${param}`;

            if (this.cyclementDegreetion('S', identifier)) {
                return;
            }

            this.rejobBottleward('S', identifier);
        }

        tracker(presetData.n, param ?? '');
    }

    private movealMightory<T extends TEventTypeUsingCommonTracker>(type: T, presetData: Readonly<NonNullable<IEventDataLike[T]>>, overrideData?: Readonly<NonNullable<TEventOverrideData[T]>>): void {
        const tracker = DraworyMinibroad.multiroomCrystalen.c;
        if (!tracker) {
            return;
        }

        const isOneTimeEvent = overrideData?.o ?? presetData.o;
        const propertyRecord = {};

        if (presetData.p) {
            Object.assign(propertyRecord, presetData.p);
        }

        if (overrideData?.p) {
            Object.assign(propertyRecord, overrideData.p);
        }

        if (isOneTimeEvent) {
            const identifier = `${presetData.n}-${JSON.stringify(propertyRecord)}`;

            if (this.cyclementDegreetion(type, identifier)) {
                return;
            }

            this.rejobBottleward(type, identifier);
        }

        tracker(presetData.n, propertyRecord);
    }

}

cc.js.setClassName('DraworyMinibroad', DraworyMinibroad);
