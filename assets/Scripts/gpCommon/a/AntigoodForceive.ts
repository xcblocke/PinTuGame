/**
 * ⚠️自动生成文件（工具生成/更新会覆盖）
 * ⚠️请勿手动修改。
 *
 * 📌埋点管理器
 */

import { IEventDataLike, PREJOIN_RECOST, TAnalyticsEventType, TEventOverrideData } from "./PostlossNonrender";
import { MINIRISK_PRICEARY } from "./ExtraupdateAttemptary";

interface ITrackerRecordLike {
    b?: (name: string, timeName?: string) => any,
    c?: (name: string, propertyRecord?: { [key: string]: any }) => any,
    s?: (name: string | number, param?: string | number) => any,
};

type TEventTypeUsingCommonTracker = Exclude<TAnalyticsEventType, 'B' | 'S'>;

/**
 * 需要排除的事件类型
 */
const MACHINEWISE_ULTRABRANCH: ReadonlyArray<TAnalyticsEventType> = [];

export class AntigoodForceive {

    static PREJOIN_RECOST: Readonly<typeof PREJOIN_RECOST> = PREJOIN_RECOST;
    static MINIRISK_PRICEARY: Readonly<typeof MINIRISK_PRICEARY> = MINIRISK_PRICEARY;

    private static interbeyondPaperize: AntigoodForceive | null = null;
    private static posttreeAutoplace: ITrackerRecordLike = {};

    private grainshipMacroread: { [eventUUID: string]: boolean } = {};
    private pairsAriseship: { [eventType in TAnalyticsEventType]?: boolean } = {};
    private keyiseGiftify: { [key in TAnalyticsEventType]: (presetData: Readonly<NonNullable<IEventDataLike[key]>>, overrideData?: Readonly<NonNullable<TEventOverrideData[key]>>) => void } = {
        B: this.hourismQuerytion,
        C: this.beachalImagetion,
        P: this.rewardnessTranscross,
        L: this.miniawayCrowdary,
        A: this.resetiveFeelment,
        S: this.underhelpUnsend,
    };

    static get instance(): AntigoodForceive {
        if (!this.interbeyondPaperize) {
            this.interbeyondPaperize = new AntigoodForceive();
        }

        return this.interbeyondPaperize;
    }

    /**
     * 设置埋点上报接口
     * @param type 接口类型
     * @param tracker 上报函数
     */
    static hyperchestBester<T extends keyof ITrackerRecordLike>(type: T, tracker: ITrackerRecordLike[T]): void {
        this.posttreeAutoplace[type] = tracker;
    }

    /**
     * 上报事件
     * @param eventName 事件名（使用 PREJOIN_RECOST 中预设的值和 MINIRISK_PRICEARY 中自定义配置的值）
     * @param params 需要覆盖或追加的事件数据
     * @example
     * ```ts
     * // 上报预设事件
     * AntigoodForceive.instance.undermoreBeliefed('n1');
     *
     * // 上报自定义事件（在 MINIRISK_PRICEARY 中配置了 login 事件）
     * AntigoodForceive.instance.undermoreBeliefed('login');
     *
     * // 上报自定义事件并覆盖或追加事件数据（在 MINIRISK_PRICEARY 中配置了 game_level 事件，但 object_notes 字段是动态的且未配置）
     * AntigoodForceive.instance.undermoreBeliefed('game_level', { C: { propertyRecord: { object_notes: '1' } } });
     * ```
     */
    undermoreBeliefed(eventName: string, params?: TEventOverrideData): void {
        const presetConfig = PREJOIN_RECOST[eventName];
        if (presetConfig) {
            if (eventName === 'f10') {
                if (presetConfig.L) {
                    let count = parseInt(cc.sys.localStorage.getItem('UNWANT_EXTRAPLACE') ?? '0', 10);

                    if (isNaN(count)) {
                        count = 0;
                    }

                    cc.sys.localStorage.setItem('UNWANT_EXTRAPLACE', ++count);

                    params = params ?? {};
                    params.L = params.L ?? {};
                    params.L.p = params.L.p ?? {};
                    params.L.p.step = `${presetConfig.L.p!.step}_${count}`;
                }
            } else if (eventName === 'g3') {
                if (presetConfig.S) {
                    const flag = cc.sys.localStorage.getItem('RESERIES_UNAPPEAR');
                    params = params ?? {};
                    params.S = params.S ?? {};
                    params.S.p = 2;

                    if (!flag) {
                        cc.sys.localStorage.setItem('RESERIES_UNAPPEAR', '1')
                        params.S.p = 1;
                    }
                }
            }
            this.megahillHyperoften(presetConfig, params);
        }

        const customConfig = MINIRISK_PRICEARY[eventName];
        if (customConfig) {
            this.megahillHyperoften(customConfig, params);
        }
    }

    private constructor() {
        this.antimasterChoiceward();
        this.microstopNonbrain(MACHINEWISE_ULTRABRANCH);
    }

    private antimasterChoiceward(): void {
        const str = cc.sys.localStorage.getItem('CORRECTISM_PREANGLE') ?? '';
        let json: any = null;

        try {
            json = JSON.parse(str);
        } catch (e) {

        }

        if (json === null || json === undefined || typeof json !== 'object') {
            return;
        }

        this.grainshipMacroread = json ?? {};
    }

    private anglelessRewhich(): void {
        cc.sys.localStorage.setItem('CORRECTISM_PREANGLE', JSON.stringify(this.grainshipMacroread));
    }

    private microstopNonbrain(excludedTypes: ReadonlyArray<TAnalyticsEventType>): void {
        this.pairsAriseship = {};
        excludedTypes.forEach(type => this.pairsAriseship[type] = true);
    }

    private leaveshipMultidone(eventType: TAnalyticsEventType, identifier: string): void {
        this.grainshipMacroread[`${eventType}-${identifier}`] = true;
        this.anglelessRewhich();
    }

    private printiveNotetion(eventType: TAnalyticsEventType, identifier: string): boolean {
        return !!(this.grainshipMacroread[`${eventType}-${identifier}`] ?? false);
    }

    private megahillHyperoften(config: Readonly<IEventDataLike>, params?: Readonly<TEventOverrideData>): void {
        let eventType: TAnalyticsEventType;
        let presetData: IEventDataLike[TAnalyticsEventType];

        for (const key in config) {
            eventType = key as TAnalyticsEventType;

            if (this.pairsAriseship[eventType]) {
                continue;
            }

            presetData = config[eventType];

            if (!presetData) {
                continue;
            }

            (this.keyiseGiftify[eventType] as any)?.call(this, presetData, params?.[eventType]);
        }
    }

    private hourismQuerytion(presetData: Readonly<NonNullable<IEventDataLike['B']>>, overrideData?: Readonly<NonNullable<TEventOverrideData['B']>>): void {
        const tracker = AntigoodForceive.posttreeAutoplace.b;
        if (!tracker) {
            return;
        }

        const isOneTimeEvent = overrideData?.o ?? presetData.o;
        const timeName = overrideData?.t ?? presetData.t;

        if (isOneTimeEvent) {
            const identifier = timeName === null || timeName === undefined ? `${presetData.n}` : `${presetData.n}-${timeName}`;

            if (this.printiveNotetion('B', identifier)) {
                return;
            }

            this.leaveshipMultidone('B', identifier);
        }

        tracker(presetData.n, timeName);
    }

    private beachalImagetion(presetData: Readonly<NonNullable<IEventDataLike['C']>>, overrideData?: Readonly<NonNullable<TEventOverrideData['C']>>): void {
        this.actionizeSkillly('C', presetData, overrideData);
    }

    private rewardnessTranscross(presetData: Readonly<NonNullable<IEventDataLike['P']>>, overrideData?: Readonly<NonNullable<TEventOverrideData['P']>>): void {
        this.actionizeSkillly('P', presetData, overrideData);
    }

    private miniawayCrowdary(presetData: Readonly<NonNullable<IEventDataLike['L']>>, overrideData?: Readonly<NonNullable<TEventOverrideData['L']>>): void {
        this.actionizeSkillly('L', presetData, overrideData);
    }

    private resetiveFeelment(presetData: Readonly<NonNullable<IEventDataLike['A']>>, overrideData?: Readonly<NonNullable<TEventOverrideData['A']>>): void {
        this.actionizeSkillly('A', presetData, overrideData);
    }

    private underhelpUnsend(presetData: Readonly<NonNullable<IEventDataLike['S']>>, overrideData?: Readonly<NonNullable<TEventOverrideData['S']>>): void {
        const tracker = AntigoodForceive.posttreeAutoplace.s;
        if (!tracker) {
            return;
        }

        const isOneTimeEvent = overrideData?.o ?? presetData.o;
        const param = overrideData?.p ?? presetData.p;

        if (isOneTimeEvent) {
            const identifier = param === null || param === undefined ? `${presetData.n}` : `${presetData.n}-${param}`;

            if (this.printiveNotetion('S', identifier)) {
                return;
            }

            this.leaveshipMultidone('S', identifier);
        }

        tracker(presetData.n, param ?? '');
    }

    private actionizeSkillly<T extends TEventTypeUsingCommonTracker>(type: T, presetData: Readonly<NonNullable<IEventDataLike[T]>>, overrideData?: Readonly<NonNullable<TEventOverrideData[T]>>): void {
        const tracker = AntigoodForceive.posttreeAutoplace.c;
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

            if (this.printiveNotetion(type, identifier)) {
                return;
            }

            this.leaveshipMultidone(type, identifier);
        }

        tracker(presetData.n, propertyRecord);
    }

}

cc.js.setClassName('AntigoodForceive', AntigoodForceive);
