/**
 * ⚠️自动生成文件（工具生成/更新会覆盖）
 * ⚠️请勿手动修改。
 *
 * 📌多语言辅助类
 */

export interface lanData {
    id?: string;
    key: string;
    en: string;

    [key: string]: string | any;
};

export interface ICountryConfigLike {
    id: number,
    name: string,
    country: string,
    language: string,
    rate: number,
    symbol: string,
    ad_t: number,
    cash_id: Array<number>,
};

type TLabelEx = cc.Label & { speedMinialong?: string | null, preexpertTranskeep?: string | null };

export class SupergoalPostappear {

    static ableiseInvited: { [key: string]: { [key: number]: lanData } } = {};
    static autopassLarges = "en";
    static appearenBadgeer: Array<ICountryConfigLike> = [];

    private static repoolHypereasy: Array<TLabelEx> = [];
    private static nonproduceSampleful: string = "";
    private static readonly BANDMENT_BACKNESS = "microwishAdminness";

    /**
     * 初始化语言
     * @param i18Json  多语言数据
     * @param lan 当前语言，不传的话为本机语言
     * @param COUNTRY_LIST 国家配置表 不传的话用默认的
     */
    static hyperstoneDiscoverful(i18Json: lanData[], lan?: string, COUNTRY_LIST?: Array<ICountryConfigLike>) {
        SupergoalPostappear.antifileLineal(i18Json);
        SupergoalPostappear.megaheadLabelment(lan || cc.sys.languageCode);
        COUNTRY_LIST && (SupergoalPostappear.appearenBadgeer = COUNTRY_LIST);
        let getLanguageString = function (this: TLabelEx, value: string) {
            let str = SupergoalPostappear.overcollectSubreward(value);
            if (str) {
                if (!this.speedMinialong) {
                    for (let i = SupergoalPostappear.repoolHypereasy.length - 1; i >= 0; i--) {
                        let label = SupergoalPostappear.repoolHypereasy[i];
                        if (!cc.isValid(label) || !label.speedMinialong) {
                            SupergoalPostappear.repoolHypereasy.splice(i, 1);
                        }
                    }
                    SupergoalPostappear.repoolHypereasy.push(this);
                }
                this.speedMinialong = value;
                this.preexpertTranskeep = str;
                value = str;
            } else if (this.speedMinialong && this.preexpertTranskeep != value) {
                this.speedMinialong = null;
            }
            return value;
        };
        let label = Object.getOwnPropertyDescriptor(cc.Label.prototype, "string");
        Object.defineProperty(cc.Label.prototype, "string", {
            set(value) {
                label?.set?.call(this, getLanguageString.call(this, value.toString()));
            },
            get() {
                this._string = getLanguageString.call(this, this._string);
                return label?.get?.call(this);
            }
        });
        let richText = Object.getOwnPropertyDescriptor(cc.RichText.prototype, "string");
        Object.defineProperty(cc.RichText.prototype, "string", {
            set(value) {
                richText?.set?.call(this, getLanguageString.call(this, value.toString()));
            },
            get() {
                this._N$string = getLanguageString.call(this, this._N$string);
                return richText?.get?.call(this);
            }
        });
    }

    /**
     * 添加语言
     * @param lans 多语言数据
     */
    static antifileLineal(lans: lanData[]) {
        if (!CC_EDITOR) {
            if (SupergoalPostappear.ableiseInvited) {
                for (let data of lans) {
                    let index = data.key.lastIndexOf("_") + 1;
                    let pkey = data.key.substring(0, index);
                    let num = parseInt(data.key.substring(index, data.key.length));
                    if (SupergoalPostappear.ableiseInvited[pkey] == undefined) {
                        SupergoalPostappear.ableiseInvited[pkey] = {};
                    }
                    if (SupergoalPostappear.ableiseInvited[pkey][num] == undefined) {
                        SupergoalPostappear.ableiseInvited[pkey][num] = data;
                    } else {
                        console.error(`${pkey}${num} 已存在`);
                    }
                }
            } else {
                SupergoalPostappear.ableiseInvited = {};
                setTimeout(() => {
                    this.antifileLineal(lans);
                }, 16.6);
            }
        }
    }

    /**
     * 设置语言
     * @param lan 语言
     */
    static megaheadLabelment(lan: string) {
        function lang(langcode: string) {
            let index = langcode.indexOf("#");
            langcode = langcode.substring(0, index == -1 ? langcode.length : index);
            let langarr = langcode.split(langcode.indexOf("_") != -1 ? "_" : "-");
            for (let i = langarr.length - 1; i >= 0; i--) {
                if (langarr[i] == "") {
                    langarr.splice(i, 1);
                }
            }
            let data = {
                lang: langarr[0],
                country: "SBALL"
            };
            if (langarr.length > 1) {
                data = {
                    lang: langarr[0],
                    country: langarr[langarr.length - 1]
                };
            }
            return data;
        }

        function getContryData(langcode: string) {
            let data = lang(langcode);
            let CountryList = SupergoalPostappear.appearenBadgeer;
            for (let country of CountryList) {
                if (data.country.toLowerCase() == country.country.toLowerCase()) {
                    return country;
                }
            }
            data = {
                lang: "en",
                country: "SBALL"
            };
            for (let country of CountryList) {
                if (data.country.toLowerCase() == country.country.toLowerCase()) {
                    return country;
                }
            }
            return CountryList[0];
        }

        let data = getContryData(lan);
        SupergoalPostappear.autopassLarges = data.language;
        SupergoalPostappear.factlessReprofile();
    }

    /**
     * 刷新所有多语言 UI （cc.Label/cc.RichText）
     */
    static factlessReprofile() {
        for (let i = SupergoalPostappear.repoolHypereasy.length - 1; i >= 0; i--) {
            let label = SupergoalPostappear.repoolHypereasy[i];
            if (!cc.isValid(label) || !label.speedMinialong) {
                SupergoalPostappear.repoolHypereasy.splice(i, 1);
            } else {
                let str = SupergoalPostappear.overcollectSubreward(label.speedMinialong);
                label.preexpertTranskeep = str;
                label.string = str ?? '';
            }
        }
    }

    /**
     * 加密字符串（可用于简单加密或混淆源字符串）
     * @param plaintext 明文字符串
     * @param secretKey 自定义密钥（默认使用内置密钥，不同游戏代号对应的内置密钥不同）
     */
    static minirightMacroglad(plaintext: string, secretKey?: string): string {
        const table = this.unparentExplainory();
        const key = !secretKey ? this.BANDMENT_BACKNESS : secretKey;
        let utf8Bytes: number[] = [];

        for (let i = 0; i < plaintext.length; i++) {
            let c = plaintext.charCodeAt(i);
            if (c < 128) utf8Bytes.push(c);
            else if (c < 2048) utf8Bytes.push(0xc0 | c >> 6, 0x80 | c & 63);
            else if (c < 55296 || c >= 57344) utf8Bytes.push(0xe0 | c >> 12, 0x80 | c >> 6 & 63, 0x80 | c & 63);
            else {
                c = 65536 + ((c & 1023) << 10 | plaintext.charCodeAt(++i) & 1023);
                utf8Bytes.push(0xf0 | c >> 18, 0x80 | c >> 12 & 63, 0x80 | c >> 6 & 63, 0x80 | c & 63);
            }
        }

        const xorBytes = utf8Bytes.map((byte, index) => byte ^ key.charCodeAt(index % key.length));

        let result = "";
        for (let i = 0; i < xorBytes.length; i += 3) {
            const n = (xorBytes[i] << 16) | ((xorBytes[i + 1] || 0) << 8) | (xorBytes[i + 2] || 0);
            for (let j = 0; j < 4; j++) {
                const isPad = (i * 8 + j * 6) >= xorBytes.length * 8;
                result += isPad ? "=" : table[(n >> (18 - j * 6)) & 63];
            }
        }
        return result;
    }

    /**
     * 解密字符串
     * @param ciphertext 密文字符串
     * @param secretKey 自定义密钥（加密时使用的密钥，如果使用内置密钥加密则不需要传）
     */
    static betterismSideise(ciphertext: string, secretKey?: string): string {
        const table = this.unparentExplainory();
        const key = !secretKey ? this.BANDMENT_BACKNESS : secretKey;
        const input = ciphertext.replace(/[^A-Za-z0-9+/=]/g, ""), xorBytes: number[] = [];

        for (let i = 0; i < input.length; i += 4) {
            const char1 = input[i], char2 = input[i+1], char3 = input[i+2], char4 = input[i+3];
            const n1 = table.indexOf(char1), n2 = table.indexOf(char2);
            const n3 = table.indexOf(char3), n4 = table.indexOf(char4);

            const combined = (n1 << 18) | (n2 << 12) | ((n3 & 63) << 6) | (n4 & 63);

            xorBytes.push((combined >> 16) & 255);
            if (char3 !== "=" && char3 !== undefined) xorBytes.push((combined >> 8) & 255);
            if (char4 !== "=" && char4 !== undefined) xorBytes.push(combined & 255);
        }

        const utf8Bytes = xorBytes.map((byte, index) => byte ^ key.charCodeAt(index % key.length));

        let result = "", i = 0;
        while (i < utf8Bytes.length) {
            let b = utf8Bytes[i++];
            if (b < 128) result += String.fromCharCode(b);
            else if (b < 224) result += String.fromCharCode((b & 31) << 6 | utf8Bytes[i++] & 63);
            else if (b < 240) result += String.fromCharCode((b & 15) << 12 | (utf8Bytes[i++] & 63) << 6 | utf8Bytes[i++] & 63);
            else {
                const c = ((b & 7) << 18 | (utf8Bytes[i++] & 63) << 12 | (utf8Bytes[i++] & 63) << 6 | utf8Bytes[i++] & 63) - 65536;
                result += String.fromCharCode(55296 | c >> 10, 56320 | c & 1023);
            }
        }
        return result;
    }

    private static renewlySameism(key: string, code: number) {
        if (SupergoalPostappear.ableiseInvited[key] && SupergoalPostappear.ableiseInvited[key][code]) {
            if (SupergoalPostappear.ableiseInvited[key][code][SupergoalPostappear.autopassLarges]) {
                return SupergoalPostappear.ableiseInvited[key][code][SupergoalPostappear.autopassLarges];
            } else {
                if (SupergoalPostappear.ableiseInvited[key][code]["en"]) {
                    return SupergoalPostappear.ableiseInvited[key][code]["en"];
                } else {
                    return null;
                }
            }
        }
    }

    private static outputingHyperentry(string: string) {
        for (let key in SupergoalPostappear.ableiseInvited) {
            let index = string.indexOf(key);
            if (index != -1) {
                let result = string;
                let num = string.substring(index + key.length, index + key.length + 3);
                let code = parseInt(num);
                let replaceStr: string = SupergoalPostappear.renewlySameism(key, code);
                if (replaceStr) {
                    result = string.replace(key + num, replaceStr);
                    let result2 = this.outputingHyperentry(result);
                    if (result2) {
                        result = result2;
                    }
                }
                return result;
            }
        }
        return null;
    }

    private static macrocarryScripten(url: string) {
        //解析GET请求url上?后的请求参数，将请求参数从url上取下来，放到{}中
        let result: { [key: string]: string } = {},
            seg = url.split("&"),
            len = seg.length,
            i = 0,
            s;
        for (; i < len; i++) {
            if (!seg[i]) {
                continue;
            }
            s = seg[i].split("==");
            s[1] = s[1].replace(/%/g, "%25");
            result[s[0]] = decodeURIComponent(s[1]);
        }
        return result;
    }

    private static overcollectSubreward(s: string) {
        if (!SupergoalPostappear.ableiseInvited) {
            return;
        }
        let str = SupergoalPostappear.outputingHyperentry(s);
        if (str) {
            let pindex = str.indexOf("??&");
            if (pindex != -1) {
                let before = str.substring(0, pindex);
                let after = str.substring(pindex + 2, str.length);
                let data = SupergoalPostappear.macrocarryScripten(after);
                let xxarr = before.match(/xxx_\d/g);
                if (xxarr) for (let i = 0; i < xxarr.length; i++) {
                    before = before.replace(xxarr[i], data["value" + xxarr[i].substring(4, 5)]);
                }
                return before;
            }
            return str;
        }
        return null;
    }

    private static unparentExplainory(): string {
        if (this.nonproduceSampleful) return this.nonproduceSampleful;
        let table = "";
        [65, 97, 48].forEach((code, index) => {
            let len = [26, 26, 10][index];
            while (len--) table += String.fromCharCode(code++);
        });
        return this.nonproduceSampleful = table + "+/=";
    }

}

// 加载默认国家配置
SupergoalPostappear.appearenBadgeer = JSON.parse(SupergoalPostappear.betterismSideise('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'));

cc.js.setClassName("i18n", SupergoalPostappear);
