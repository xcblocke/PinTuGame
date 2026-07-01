import PlayerDataSys from "../Utils/PlayerDataSys";
import HotUpdate from "./HotUpdate";
import SdkHelper from "../Utils/SdkHelper";
import EngineUtil from "../Utils/EngineUtil";
import FormData from "../FormData";
var s = {
  aid: "android_id",
  madr: "mac_addr",
  wmr: "wifi_mac_addr",
  platform: cc.sys.os == cc.sys.OS_ANDROID ? "os_name" : "platform"
};
export default class ClientData {
  static yid = "";
  static device_id = "";
  static version_name = "";
  static version_code = 0;
  static channel_name = "";
  static box_pkg_name = "";
  static imei = "";
  static android_id = "";
  static mac_addr = "";
  static wifi_mac_addr = "";
  static oaid = "";
  static platform = "";
  static os_name = "";
  static os_version = "";
  static phone_model = "";
  static phone_brand = "";
  static device_type = "";
  static mdi = "";
  static rii = "";
  static ii = "";
  static device_serial = "";
  static Longitude = "";
  static Latitude = "";
  static session_id = "";
  static network_type = "";
  static idfa = "";
  static caid = "";
  static caid_version = "";
  static last_caid = "";
  static last_caid_version = "";
  static url_common_str = "";
  static cookie_str = "";
  static form_str = "";
  static init(t) {
    EngineUtil.log("参数");
    EngineUtil.log(t);
    ClientData.caid = t.caid || "";
    ClientData.caid_version = t.caid_version || "";
    ClientData.last_caid_version = t.last_caid_version || "";
    ClientData.last_caid = t.last_caid || "";
    ClientData.idfa = t.idfa || "";
    ClientData.platform = t.platform || "";
    ClientData.version_name = t.version_name || "";
    ClientData.device_id = t.device_id || "";
    ClientData.channel_name = t.channel_name || "";
    ClientData.device_serial = t.device_serial || "";
    ClientData.box_pkg_name = t.box_pkg_name || "";
    ClientData.imei = t.imei || "";
    ClientData.oaid = t.oaid || "";
    ClientData.Latitude = t.Latitude || "";
    ClientData.Longitude = t.Longitude || "";
    ClientData.os_version = t.os_version || "";
    ClientData.phone_model = t.phone_model || "";
    ClientData.phone_brand = t.phone_brand || "";
    ClientData.os_name = t.os_name || "";
    ClientData.device_type = t.device_type || "";
    ClientData.session_id = t.session_id || "";
    ClientData.network_type = t.network_type || "";
    ClientData.mdi = t.mdi || "";
    ClientData.ii = t.ii || "";
    ClientData.rii = t.rii || "";
    ClientData.mac_addr = t.madr || "";
    ClientData.wifi_mac_addr = t.wmr || "";
    ClientData.android_id = t.aid || "";
    ClientData.version_code = t.version_code || SdkHelper.getVersionCode();
    ClientData.setCommonData();
  }
  static clear() {
    ClientData.idfa = "";
    ClientData.platform = "";
    ClientData.version_name = "";
    ClientData.device_id = "";
    ClientData.channel_name = "";
    ClientData.device_serial = "";
    ClientData.box_pkg_name = "";
    ClientData.imei = "";
    ClientData.oaid = "";
    ClientData.Latitude = "";
    ClientData.Longitude = "";
    ClientData.os_version = "";
    ClientData.phone_model = "";
    ClientData.phone_brand = "";
    ClientData.os_name = "";
    ClientData.device_type = "";
    ClientData.session_id = "";
    ClientData.network_type = "";
    ClientData.mdi = "";
    ClientData.ii = "";
    ClientData.rii = "";
    ClientData.mac_addr = "";
    ClientData.wifi_mac_addr = "";
    ClientData.android_id = "";
    ClientData.version_code = 0;
  }
  static setCommonData(t) {
    ClientData.genUrlString();
    ClientData.setCookieString();
    ClientData.genFormData(t);
  }
  static getAttr(t) {
    return ClientData[s[t] ? s[t] : t];
  }
  static genUrlString() {
    var t = HotUpdate.getInstance().getVersion(),
      o = HotUpdate.getInstance().getBaseVersion();
    console.log("baseVersion:" + o + ",nowVersion:" + t);
    for (var a = "", r = ["version_name", "channel_name", "box_pkg_name", "ii", "idfa", "platform", "madr", "wmr", "oaid", "os_version", "phone_model", "phone_brand", "device_id", "version_code"], c = 0; c < r.length; c++) {
      var l = r[c],
        u = encodeURI(ClientData[s[l] ? s[l] : l]);
      "" != u && null != u && (a += "&" + l + "=" + u);
    }
    a = "user_id=" + PlayerDataSys.userid + a;
    t && (a += "&game_version=" + t + "&base_version=" + o);
    ClientData.url_common_str = a;
  }
  static setCookieString() {
    for (var t = "", o = ["device_id", "ii", "aid", "madr", "idfa", "wmr", "mdi", "rii"], i = 0; i < o.length; i++) {
      var a = o[i],
        r = ClientData[s[a] ? s[a] : a];
      "" != r && null != r && (t += "; " + a + "=" + r);
    }
    t = "yid=" + PlayerDataSys.yid + t;
    ClientData.cookie_str = t;
    document.cookie = ClientData.cookie_str;
  }
  static genFormData(t) {
    ClientData.yid = null == t ? ClientData.yid : t;
    var o = ClientData.yid,
      n = new FormData();
    n.append("yid", null != o ? o : "yid_read_fail");
    var i = ClientData[s.device_id ? s.device_id : "device_id"];
    "" != i && null != i && n.append("device_id", i);
    return n;
  }
  static getVersionData() {
    for (var t = "", o = ["box_pkg_name", "channel_name", "device_id"], n = 0; n < o.length; n++) {
      var i = o[n],
        a = ClientData[s[i] ? s[i] : i];
      "" != a && null != a && (t += ("" == t ? t : "&") + i + "=" + a);
    }
    return t;
  }
}