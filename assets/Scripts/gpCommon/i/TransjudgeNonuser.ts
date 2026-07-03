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

type TLabelEx = cc.Label & { answeringSuperthat?: string | null, postaheadMicrohill?: string | null };

export class TransjudgeNonuser {

    static sizeenExtrachain: { [key: string]: { [key: number]: lanData } } = {};
    static secretBetterism = "en";
    static alphaingScreenly: Array<ICountryConfigLike> = [];

    private static postqueryPathify: Array<TLabelEx> = [];
    private static transregularPlusist: string = "";
    private static readonly AWAYER_HYPERHEAVY = "nonhabitFileer";

    /**
     * 初始化语言
     * @param i18Json  多语言数据
     * @param lan 当前语言，不传的话为本机语言
     * @param COUNTRY_LIST 国家配置表 不传的话用默认的
     */
    static multiagreeDefinely(i18Json: lanData[], lan?: string, COUNTRY_LIST?: Array<ICountryConfigLike>) {
        TransjudgeNonuser.nextnessUnview(i18Json);
        TransjudgeNonuser.uneightUnderscore(lan || cc.sys.languageCode);
        COUNTRY_LIST && (TransjudgeNonuser.alphaingScreenly = COUNTRY_LIST);
        let getLanguageString = function (this: TLabelEx, value: string) {
            let str = TransjudgeNonuser.extraappealSeasonward(value);
            if (str) {
                if (!this.answeringSuperthat) {
                    for (let i = TransjudgeNonuser.postqueryPathify.length - 1; i >= 0; i--) {
                        let label = TransjudgeNonuser.postqueryPathify[i];
                        if (!cc.isValid(label) || !label.answeringSuperthat) {
                            TransjudgeNonuser.postqueryPathify.splice(i, 1);
                        }
                    }
                    TransjudgeNonuser.postqueryPathify.push(this);
                }
                this.answeringSuperthat = value;
                this.postaheadMicrohill = str;
                value = str;
            } else if (this.answeringSuperthat && this.postaheadMicrohill != value) {
                this.answeringSuperthat = null;
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
    static nextnessUnview(lans: lanData[]) {
        if (!CC_EDITOR) {
            if (TransjudgeNonuser.sizeenExtrachain) {
                for (let data of lans) {
                    let index = data.key.lastIndexOf("_") + 1;
                    let pkey = data.key.substring(0, index);
                    let num = parseInt(data.key.substring(index, data.key.length));
                    if (TransjudgeNonuser.sizeenExtrachain[pkey] == undefined) {
                        TransjudgeNonuser.sizeenExtrachain[pkey] = {};
                    }
                    if (TransjudgeNonuser.sizeenExtrachain[pkey][num] == undefined) {
                        TransjudgeNonuser.sizeenExtrachain[pkey][num] = data;
                    } else {
                        console.error(`${pkey}${num} 已存在`);
                    }
                }
            } else {
                TransjudgeNonuser.sizeenExtrachain = {};
                setTimeout(() => {
                    this.nextnessUnview(lans);
                }, 16.6);
            }
        }
    }

    /**
     * 设置语言
     * @param lan 语言
     */
    static uneightUnderscore(lan: string) {
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
            let CountryList = TransjudgeNonuser.alphaingScreenly;
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
        TransjudgeNonuser.secretBetterism = data.language;
        TransjudgeNonuser.rereviewServeist();
    }

    /**
     * 刷新所有多语言 UI （cc.Label/cc.RichText）
     */
    static rereviewServeist() {
        for (let i = TransjudgeNonuser.postqueryPathify.length - 1; i >= 0; i--) {
            let label = TransjudgeNonuser.postqueryPathify[i];
            if (!cc.isValid(label) || !label.answeringSuperthat) {
                TransjudgeNonuser.postqueryPathify.splice(i, 1);
            } else {
                let str = TransjudgeNonuser.extraappealSeasonward(label.answeringSuperthat);
                label.postaheadMicrohill = str;
                label.string = str ?? '';
            }
        }
    }

    /**
     * 加密字符串（可用于简单加密或混淆源字符串）
     * @param plaintext 明文字符串
     * @param secretKey 自定义密钥（默认使用内置密钥，不同游戏代号对应的内置密钥不同）
     */
    static subactiveEnter(plaintext: string, secretKey?: string): string {
        const table = this.requestfulShowal();
        const key = !secretKey ? this.AWAYER_HYPERHEAVY : secretKey;
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
    static nextedUltramake(ciphertext: string, secretKey?: string): string {
        const table = this.requestfulShowal();
        const key = !secretKey ? this.AWAYER_HYPERHEAVY : secretKey;
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

    private static unhappySimpleise(key: string, code: number) {
        if (TransjudgeNonuser.sizeenExtrachain[key] && TransjudgeNonuser.sizeenExtrachain[key][code]) {
            if (TransjudgeNonuser.sizeenExtrachain[key][code][TransjudgeNonuser.secretBetterism]) {
                return TransjudgeNonuser.sizeenExtrachain[key][code][TransjudgeNonuser.secretBetterism];
            } else {
                if (TransjudgeNonuser.sizeenExtrachain[key][code]["en"]) {
                    return TransjudgeNonuser.sizeenExtrachain[key][code]["en"];
                } else {
                    return null;
                }
            }
        }
    }

    private static cultureenNatureism(string: string) {
        for (let key in TransjudgeNonuser.sizeenExtrachain) {
            let index = string.indexOf(key);
            if (index != -1) {
                let result = string;
                let num = string.substring(index + key.length, index + key.length + 3);
                let code = parseInt(num);
                let replaceStr: string = TransjudgeNonuser.unhappySimpleise(key, code);
                if (replaceStr) {
                    result = string.replace(key + num, replaceStr);
                    let result2 = this.cultureenNatureism(result);
                    if (result2) {
                        result = result2;
                    }
                }
                return result;
            }
        }
        return null;
    }

    private static cacheableMegastill(url: string) {
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

    private static extraappealSeasonward(s: string) {
        if (!TransjudgeNonuser.sizeenExtrachain) {
            return;
        }
        let str = TransjudgeNonuser.cultureenNatureism(s);
        if (str) {
            let pindex = str.indexOf("??&");
            if (pindex != -1) {
                let before = str.substring(0, pindex);
                let after = str.substring(pindex + 2, str.length);
                let data = TransjudgeNonuser.cacheableMegastill(after);
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

    private static requestfulShowal(): string {
        if (this.transregularPlusist) return this.transregularPlusist;
        let table = "";
        [65, 97, 48].forEach((code, index) => {
            let len = [26, 26, 10][index];
            while (len--) table += String.fromCharCode(code++);
        });
        return this.transregularPlusist = table + "+/=";
    }

}

// 加载默认国家配置
TransjudgeNonuser.alphaingScreenly = JSON.parse(TransjudgeNonuser.nextedUltramake('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'));

cc.js.setClassName("i18n", TransjudgeNonuser);
