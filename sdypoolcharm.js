/*
*当前版本 ：2026.5.25
*看你本地版本，和更新日志对比
*如果差2个版本以上建议重新更新全文件
*如果只差1个版本，可在上面的日志里查看修改日志
*/
(function () {
  /*
  *  加载包信息类
  *  @name 分包名
  *  @loadName 包加载成功后的预制体名
  *  @remotepath 包路径
  *  @initFun  初始化预制体方法
  *  @onProcessCall 加载过程的回调方法
  *  @isZip 是否Zip 可不传，默认为 true
  */
  var bundleInfo = function () {
    function bundleInfo(name, loadName, remotepath, initFun, onProcessCall, isZip, isABundle) {
      this.name = name;
      this.loadName = loadName;
      this.initFun = initFun;
      this.remotepath = remotepath;
      this.isZip = isZip === undefined ? true : isZip;
      this.isABundle = isABundle === undefined ? false : isABundle;
      this.load_err = null;
      this.laod_eventData = null;
      this.load_assets = null;
      this.isInit = null;
      if (onProcessCall) {
        this.onProcessCall = onProcessCall;
      }
      timeEvent("load_" + this.name);
    }
    bundleInfo.prototype.errorDispose = function (error) {
      console.error(error);
      debugger;
    };
    bundleInfo.prototype.onComplete = function (err, bundle, eventData) {
      var self = this;
      self.load_err = err;
      self.laod_eventData = eventData;
      if (self.loadName) {
        bundle.load(self.loadName, cc.Prefab, function (error, assets) {
          if (error) {
            self.errorDispose(error);
          } else {
            self.load_assets = assets;
            self.onShwoBundle();
            timeEvent("load_" + self.name, true);
          }
        });
      } else {
        self.load_assets = bundle;
        self.onShwoBundle();
        timeEvent("load_" + self.name, true);
      }
    };
    bundleInfo.prototype.onShwoBundle = function () {
      var self = this;
      if (self.isInit !== null && self.load_assets) {
        timeEvent("prepare_show_" + self.name, true);
        timeEvent("show_" + self.name);
        try {
          !self.isABundle && middLewareData.sdyEvent(710, self.laod_eventData);
          self.initFun(self.load_err, self.load_assets, self.laod_eventData);
          sendAllTimeEvent();
          !self.isABundle && middLewareData.sdyEvent(711, self.laod_eventData);
          timeEvent("show_" + self.name, true);
          clearInterval(self.isInit);
        } catch (e) {
          clearInterval(self.isInit);
          self.errorDispose(e);
        }
      }
    };
    bundleInfo.prototype.initBundle = function () {
      var self = this;
      if (self.isInit === null) {
        timeEvent("prepare_show_" + self.name);
        self.isInit = setInterval(self.onShwoBundle.bind(self), 16.66);
      }
    };
    bundleInfo.prototype.onProcessCall = function (data) {
      CC_DEBUG && console.warn("如果下载进度要打点，那么就在 new 的时候传入");
    };
    return bundleInfo;
  }();

  /**
   *  获取已注册的类，通过名称进行索引 （调用静态方法用这个）
   *  @param classname 类名
   *  如果获取不到，请先在JSDK初始化的 bundles 里添加类所在的分包名
   *  如果还是获取不到 那么就要在 定义类的下面添加 cc.js.setClassName(); 手动注册类
   *  比如：Web 类
   *  export class Web {
   *      static curType: number = 0;
   *  }
   *  //在这里添加
   *  cc.js.setClassName("Web", Web);
   */
  function getClassByName(classname) {
    return cc.js.getClassByName(classname) || cc.js._registeredClassNames[classname];
  }
  /**
   *  加载相对于指定thisPath 路径的类，等于在 thisPath 路径下 require 了这个类
   *  @param depclassPath 类路径 （相对于thisPath的路径，不带后缀）
   *  @param thisPath 当前路径 （assets/后的路径，不带后缀）
   *  比如要拿类 Login 类。
   *  先要找到一个引用了这个类的文件，比如 Load 类, 引用了 Login 类
   *  Load  类的路径是 assets/script/game/Load.js
   *  Login 类的路径是 assets/script/Login.js
   *  那么 Login 类的 相对于 Load 的路径就是 ../Login
   *  那么使用方法如下：
   *  let Login = requireClass("../Login", "script/game/Load");
   *  Login 正常是一个对象,比如 {Login: function Login(),__esModule: true}，这个就看你类的导出方式了，如果是 export default Login 那么就是 Login.default
   */
  function requireClass(depclassPath, thisPath) {
    let calssData = null;
    if (window.__require) {
      calssData = window.__require(cc.path.basename(depclassPath, cc.path.extname(depclassPath)), true);
    }
    if (!calssData && window.__quick_compile_project__) {
      calssData = window.__quick_compile_project__.require(depclassPath, 'preview-scripts/assets/' + thisPath + '.js');
    }
    return calssData;
  }

  /**
   *  加载我们自己的bundle包
   *  @param bundleInfoList    包信息 是一个数组 对象 [{name：包名  onComplete：加载回调  isZip:是否ZIP 包 默认为 true}]
   *  @param domain            CDN 域名合集
   *  @param communalpath      公用文件路径
   *  @param resVer            当前后台的热更版本
   *  @param logCommonEvent    WWY 通用埋点接口
   *  @param sdyEvent          SDY 埋点接口,我们自己的埋点
   */
  function loadSDYBundle(bundleInfoList, domain, communalpath, resVer, logCommonEvent, sdyEvent) {
    timeEvent("load_rely");
    for (var i = bundleInfoList.length - 1; i >= 0; i--) {
      let info = bundleInfoList[i];
      if (info.isABundle) {
        cc.assetManager.loadBundle(info.name, function (err, bundle) {
          info.onComplete && info.onComplete(err, bundle, null);
        });
        bundleInfoList.splice(i, 1);
      }
    }
    let loadAny = domainindex => {
      domainindex = Number(domainindex);
      let loadurls = [domain[domainindex] + communalpath + "/loadBundle.js"];
      if (!window.JSZip) {
        loadurls.push(domain[domainindex] + communalpath + "/jszip.min.js");
      }
      cc.assetManager.loadScript(loadurls, err => {
        if (err) {
          if (domain[domainindex + 1]) {
            loadAny(domainindex + 1);
          } else {
            sdyEvent(703);
            loadAny(0);
          }
        } else {
          cc.sys.localStorage.setItem("domainindex", domainindex);
          sdyEvent(704);
          timeEvent("load_rely", true);
          loadBundle();
        }
      });
    };
    var onhot = function (hotTiem, size) {
      var data = {
        "step": "start"
      };
      var data1 = {
        object_action: "show",
        object_name: "request_resource"
      };
      if (hotTiem) {
        data.step = "end";
        data.duration = hotTiem;
        data.res_ver = resVer;
        data1.object_name = "download_success";
        data.size = size || 0;
      }
      if (logCommonEvent) {
        // WWY 生命周期打点
        logCommonEvent("game_life_key_node", data);
        // SDY 通用埋点
        logCommonEvent("sdy_resource_download", data1);
      }
    };
    var loadBundle = function () {
      var code = 0;
      var bundleSize = 0;
      var hotTiem = Date.now();
      var isUpdate = false;
      var _loop = function _loop(i) {
        var data = bundleInfoList[i];
        var res = new cc.sdy.bundle(data.name, resVer, domain, {
          path: data.remotepath,
          communalpath: communalpath
        });
        sdyEvent(718, res.getSdyEventData());
        if (res.isUpdate) {
          isUpdate = true;
        }
        if (res.isReUpdata) {
          sdyEvent(717, res.getSdyEventData());
        }
        res.setLoadProcessCall(data.onProcessCall);
        res.setBundleSizeCall(function (size) {
          bundleSize += size;
        });
        res.loadBundle(function (err, bundle) {
          code++;
          if (isUpdate && code == bundleInfoList.length) {
            onhot(Date.now() - hotTiem, bundleSize);
          }
          data.onComplete && data.onComplete(err, bundle, res.getSdyEventData());
        }, data.isZip);
      };
      for (var i = 0; i < bundleInfoList.length; i++) {
        _loop(i);
      }
      if (isUpdate) {
        onhot();
      }
    };
    if (bundleInfoList.length > 0) {
      loadAny(cc.sys.localStorage.getItem("domainindex") || 0);
    } else {
      timeEvent("load_rely", true);
      onhot();
      onhot(1, 1);
    }
  }

  /**
   *  获取版本
   *  @param isCode 是否全数字
   *  返回  类型  string
   *   isCode = true :  r_1.0.0 转成 100
   *   isCode = false :  r_1.0.0 转成 1.0.0
   */
  function getRemoteVersion(isCode) {
    var verstring = configs.remote.path.split("/");
    verstring = verstring[verstring.length - 1];
    if (middLewareData.abtestConfigTag == undefined) {
      middLewareData.abtestConfigTag = "r_1.0.0";
    }
    verstring = middLewareData.abtestConfigTag + verstring;
    var ver = verstring.split(".").map(function (value) {
      return value.match(/\d+/g);
    });
    return ver.join(isCode ? "" : ".");
  }
  var time_Event_Obj = {};
  function timeEvent(name, isend) {
    if (isend) {
      if (time_Event_Obj[name]) {
        var data = {
          name: name,
          time: Date.now() - time_Event_Obj[name]
        };
        middLewareData.sdyEvent(719, JSON.stringify(data));
        time_Event_Obj[name] = null;
        CC_DEBUG && console.log("耗时：", data);
      }
    } else {
      time_Event_Obj[name] = Date.now();
    }
  }
  var all_Time_Indxe = 0;
  timeEvent("all");

  //发送总时间
  function sendAllTimeEvent() {
    all_Time_Indxe++;
    if (all_Time_Indxe == bundleInfoList.length) {
      timeEvent("all", true);
    }
  }

  ///////////////////////////////////////////上面的不要动,下面这一节由插件自动生成///////////////////////////////////////////////////////////

  let PeronateSapele = getClassByName("PeronateSapele");
  let configs = PeronateSapele.instance.overflower;

  //下面要用的方法或值到这里添加
  PeronateSapele.instance.enteropathogenic = true;
  //注意：这里的是改值，不是对象名
  var ScreeniseDeadward = getClassByName("ScreeniseDeadward"),
    AnswermentOvertrack = getClassByName("AnswermentOvertrack"),
    middLewareData = {
      // abtestConfigTag
      abtestConfigTag: configs.melee,
      //登陆文件里的 前期埋点 方法
      earlierStageEvent: PeronateSapele.instance.motomagnetic.bind(PeronateSapele.instance),
      //WWY 通用埋点接口
      logCommonEvent: ScreeniseDeadward.instance.transextendUndermany,
      //我们自己的埋点(批量打点)
      sdyEvent: PeronateSapele.instance.unaccompanying.bind(PeronateSapele.instance),
      //当前国家地区代码
      currentCountry: configs.dragons.toUpperCase()
    };
  //国家特定配置
  if (configs.basicConfig && configs.basicConfig.LOCAL_CONF && configs.basicConfig.LOCAL_CONF[middLewareData.currentCountry]) {
    let localConfig = configs.basicConfig.LOCAL_CONF[middLewareData.currentCountry];
    if (localConfig.SDK_CONF) {
      if (configs.basicConfig.SDK_CONF == undefined) {
        configs.basicConfig.SDK_CONF = {};
      }
      for (let key in localConfig.SDK_CONF) {
        configs.basicConfig.SDK_CONF[key] = localConfig.SDK_CONF[key];
      }
    }
    if (localConfig.FRAME_CONF) {
      if (configs.basicConfig.FRAME_CONF == undefined) {
        configs.basicConfig.FRAME_CONF = {};
      }
      for (let key in localConfig.FRAME_CONF) {
        configs.basicConfig.FRAME_CONF[key] = localConfig.FRAME_CONF[key];
      }
    }
  }
  var varInfoLabel = new cc.Node();
  varInfoLabel = varInfoLabel.addComponent(cc.Label);
  varInfoLabel.string = "r_" + getRemoteVersion(true);
  varInfoLabel.fontSize = 24;
  varInfoLabel.enableBold = true;
  varInfoLabel.node.setContentSize(60, 25);
  varInfoLabel.node.color = new cc.Color().fromHEX("#000000");
  varInfoLabel.node.position = cc.v3(cc.winSize.width * 0.5 - varInfoLabel.node.width, -(cc.winSize.height * 0.5) + varInfoLabel.node.height);
  varInfoLabel.node.parent = cc.director.getScene().children[0];
  //WWY 显示游戏界面（冷启动后引擎载入后的第一屏）
  middLewareData.logCommonEvent("user_launcher_step", {
    "step": "engine_show"
  });

  /*
  发送下载成功前期埋点
  */
  function sendResourceSuccess() {
    middLewareData.earlierStageEvent("resource_success", "login_success");
  }

  /*
  * 统一在这里回调结束
  */
  function enterIntoGame() {
    cc.isValid(varInfoLabel.node) && varInfoLabel.node.destroy();
    PeronateSapele.instance.demultiplexed();
  }

  /////////////////////////////////////////////上面的也不要动，要修改 rewriteGame 和 loadBundleInfo 里的信息就行///////////////////////////////////////////////////////////////////
  //注意：如果没有写在 rewriteGame 和 loadBundleInfo 里的信息，插件更新时会被清除
  // 要在加载前就重写的游戏方法或配置信息的，在 rewriteGame 里添加
  function rewriteGame() {
    // [sdy-toolbox:begin login-middle:rewriteGame]
    // api.ts 中暴露的 A 对象
    const A = window['_A_'];
    // 平台适配器
    const PlatformAdapter = getClassByName('AnswermentOvertrack');
    // 埋点管理器
    const AnalyticsManager = getClassByName('DraworyMinibroad');
    // SDK 包装类
    const SDKWrapper = getClassByName('ScreeniseDeadward');

    // B 面预设事件
    const addedPresetEventConfig = {
      g2: { L: { n: 'game_life_key_node', p: { step: 'into_game' } }, S: { n: 401 } },
      g3: { L: { n: 'game_life_key_node', p: { step: 'start_game' } }, S: { n: 347 } },
      n1: { B: { n: 'guide_start', t: 'enter_success' }, L: { n: 'game_life_key_node', p: { step: 'guide_start' } }, S: { n: 345, p: 0 } },
      n2: { B: { n: 'guide_button', t: 'guide_start' }, S: { n: 345, p: 1 } },
      n3: { B: { n: 'guide_reward', t: 'guide_button' }, S: { n: 345, p: 2 } },
      n4: { L: { n: 'game_life_key_node', p: { step: 'guide_end' } }, S: { n: 346 } },
      f1: { P: { n: 'sdk_theme_stuff', p: { step: 'stuff_homepage' } } },
      f2: { P: { n: 'sdk_theme_stuff', p: { step: 'stuff_impression' } } },
      f3: { P: { n: 'sdk_theme_stuff', p: { step: 'stuff_click' } } },
      f4: { P: { n: 'sdk_theme_stuff', p: { step: 'stuff_get_success' } } },
      f5: { P: { n: 'sdk_theme_stuff', p: { step: 'stuff_impression_free' } }, S: { n: 348, o: true } },
      f6: { P: { n: 'sdk_theme_stuff', p: { step: 'stuff_click_free' } } },
      f7: { P: { n: 'sdk_theme_stuff', p: { step: 'stuff_get_success_free' } }, S: { n: 349, o: true } },
      f8: { L: { n: 'game_life_key_node', p: { step: 'reach_threshold' } } },
      f9: { L: { n: 'game_life_key_node', p: { step: 'submit_order' }, o: true } },
      f10: { L: { n: 'game_life_key_node', p: { step: 'finish_task' }, o: true } },
      v0: { A: { n: 'c_ad_event', p: { action: 'exposure', type: 'video', placement: 'game' } } },
      v1: { A: { n: 'c_ad_event', p: { action: 'touch', type: 'video', placement: 'game' } } },
      v2: { B: { n: 'ad_success' }, L: { n: 'game_life_key_node', p: { step: 'first_ad' }, o: true }, A: { n: 'c_ad_event', p: { action: 'impression', type: 'video', placement: 'game' } } },
      v3: { A: { n: 'c_ad_event', p: { action: 'click', type: 'video', placement: 'game' } } },
      v4: { A: { n: 'c_ad_event', p: { action: 'close', type: 'video', placement: 'game' } } },
      v5: { A: { n: 'c_ad_event', p: { action: 'rewarded', type: 'video', placement: 'game' } } },
      i0: { A: { n: 'c_ad_event', p: { action: 'exposure', type: 'interstitial', placement: 'game' } } },
      i1: { A: { n: 'c_ad_event', p: { action: 'touch', type: 'interstitial', placement: 'game' } } },
      i2: { B: { n: 'ad_success' }, L: { n: 'game_life_key_node', p: { step: 'first_ad' }, o: true }, A: { n: 'c_ad_event', p: { action: 'impression', type: 'interstitial', placement: 'game' } } },
      i3: { A: { n: 'c_ad_event', p: { action: 'click', type: 'interstitial', placement: 'game' } } },
      i4: { A: { n: 'c_ad_event', p: { action: 'close', type: 'interstitial', placement: 'game' } } },
    };

    // 在此处配置 B 面自定义事件（配置格式参见 CancelisePositionly.ts 的注释说明）
    const addedCustomEventConfig = {
      GN_ZB_01_00_00_1f: { C: { n: 'GN_ZB', p: { object_action: 'GN_ZB_01_00_00_luck', object_name: 'free' } } },
      GN_ZB_01_00_00_1v: { C: { n: 'GN_ZB', p: { object_action: 'GN_ZB_01_00_00_luck', object_name: 'adopen' } } },

      GN_CC_04_01_00_show_video: { C: { n: 'GN_CC', p: { object_action: 'GN_CC_04_01_00', object_name: 'show', object_notes: 'video' } } },
      GN_CC_04_01_00_show_inter: { C: { n: 'GN_CC', p: { object_action: 'GN_CC_04_01_00', object_name: 'show', object_notes: 'inter' } } },
      GN_CC_04_01_00_click_video: { C: { n: 'GN_CC', p: { object_action: 'GN_CC_04_01_00', object_name: 'click', object_notes: 'video' } } },
      GN_CC_04_01_00_click_inter: { C: { n: 'GN_CC', p: { object_action: 'GN_CC_04_01_00', object_name: 'click', object_notes: 'inter' } } },

      GN_ZB_03_01_01_s1: { C: { n: 'GN_ZB', p: { object_action: 'GN_ZB_03_01_01', object_name: 'show', object_notes: '' } } },
      GN_ZB_03_01_01_c1: { C: { n: 'GN_ZB', p: { object_action: 'GN_ZB_03_01_01', object_name: 'Claim', object_notes: '' } } },

      GN_FK_01_00_00_fb: { C: { n: 'GN_FK', p: { object_action: 'GN_FK_01_00_00_feedback', object_notes: '{}' } } },

      GN_CC_04_00_00_show_video: { C: { n: 'GN_CC', p: { object_action: 'GN_CC_04_00_00', object_name: 'show', object_notes: 'video' } } },
      GN_CC_04_00_00_show_inter: { C: { n: 'GN_CC', p: { object_action: 'GN_CC_04_00_00', object_name: 'show', object_notes: 'inter' } } },
      GN_CC_04_00_00_click_video: { C: { n: 'GN_CC', p: { object_action: 'GN_CC_04_00_00', object_name: 'click', object_notes: 'video' } } },
      GN_CC_04_00_00_click_inter: { C: { n: 'GN_CC', p: { object_action: 'GN_CC_04_00_00', object_name: 'click', object_notes: 'inter' } } },

      GN_CC_01_00_00_show: { C: { n: 'GN_CC', p: { object_action: 'GN_CC_01_00_00', object_name: 'show' } } },
      GN_CC_01_00_00_click: { C: { n: 'GN_CC', p: { object_action: 'GN_CC_01_00_00', object_name: 'click' } } },
      GN_CC_01_00_00_close: { C: { n: 'GN_CC', p: { object_action: 'GN_CC_01_00_00', object_name: 'close' } } },

      GN_ZB_02_01_01_s1: { C: { n: 'GN_ZB', p: { object_action: 'GN_ZB_02_01_01', object_name: 'show', object_notes: '' } } },
      GN_ZB_02_01_01_c1: { C: { n: 'GN_ZB', p: { object_action: 'GN_ZB_02_01_01', object_name: 'click', object_notes: '' } } },

      GN_ZB_04_00_00_1f: { C: { n: 'GN_ZB', p: { object_action: 'GN_ZB_04_00_00_open', object_name: 'open_1' } } },
      GN_ZB_04_00_00_2f: { C: { n: 'GN_ZB', p: { object_action: 'GN_ZB_04_00_00_open', object_name: 'open_2' } } },
      GN_ZB_04_00_00_1v: { C: { n: 'GN_ZB', p: { object_action: 'GN_ZB_04_00_00_vido', object_name: 'adopen' } } },

      DH_WZ_01_00_00_r1: { C: { n: 'DH_WZ', p: { object_action: 'DH_WZ_01_00_00_rem', object_name: 'rem_1' }, o: true } },
      DH_WZ_01_00_00_r2: { C: { n: 'DH_WZ', p: { object_action: 'DH_WZ_01_00_00_rem', object_name: 'rem_2' }, o: true } },
      DH_WZ_01_00_00_r3: { C: { n: 'DH_WZ', p: { object_action: 'DH_WZ_01_00_00_rem', object_name: 'rem_3' }, o: true } },
      DH_WZ_01_00_00_r4: { C: { n: 'DH_WZ', p: { object_action: 'DH_WZ_01_00_00_rem', object_name: 'rem_4' }, o: true } },
      DH_WZ_01_00_00_r5: { C: { n: 'DH_WZ', p: { object_action: 'DH_WZ_01_00_00_rem', object_name: 'rem_5' }, o: true } },
      DH_WZ_01_00_00_c1: { C: { n: 'DH_WZ', p: { object_action: 'DH_WZ_01_00_00_card', object_name: 'card_101' } } },
      DH_WZ_01_00_00_c2: { C: { n: 'DH_WZ', p: { object_action: 'DH_WZ_01_00_00_card', object_name: 'card_102' } } },
      DH_WZ_01_00_00_c3: { C: { n: 'DH_WZ', p: { object_action: 'DH_WZ_01_00_00_card', object_name: 'card_103' } } },
      DH_WZ_01_00_00_c4: { C: { n: 'DH_WZ', p: { object_action: 'DH_WZ_01_00_00_card', object_name: 'card_104' } } },
      DH_WZ_01_00_00_c5: { C: { n: 'DH_WZ', p: { object_action: 'DH_WZ_01_00_00_card', object_name: 'card_105' } } },
      DH_WZ_01_00_00_c6: { C: { n: 'DH_WZ', p: { object_action: 'DH_WZ_01_00_00_card', object_name: 'card_106' } } },
      DH_WZ_01_00_00_c7: { C: { n: 'DH_WZ', p: { object_action: 'DH_WZ_01_00_00_card', object_name: 'card_107' } } },
      DH_WZ_01_00_00_c8: { C: { n: 'DH_WZ', p: { object_action: 'DH_WZ_01_00_00_card', object_name: 'card_108' } } },
      DH_WZ_01_00_00_d1: { C: { n: 'DH_WZ', p: { object_action: 'DH_WZ_01_00_00_day', object_name: 'day_01' } } },
      DH_WZ_01_00_00_d2: { C: { n: 'DH_WZ', p: { object_action: 'DH_WZ_01_00_00_day', object_name: 'day_02' } } },
      DH_WZ_01_00_00_d3: { C: { n: 'DH_WZ', p: { object_action: 'DH_WZ_01_00_00_day', object_name: 'day_03' } } },
      DH_WZ_01_00_00_d4: { C: { n: 'DH_WZ', p: { object_action: 'DH_WZ_01_00_00_day', object_name: 'day_04' } } },
      DH_WZ_01_00_00_d5: { C: { n: 'DH_WZ', p: { object_action: 'DH_WZ_01_00_00_day', object_name: 'day_05' } } },
      DH_WZ_01_00_00_d6: { C: { n: 'DH_WZ', p: { object_action: 'DH_WZ_01_00_00_day', object_name: 'day_06' } } },
      DH_WZ_01_00_00_d7: { C: { n: 'DH_WZ', p: { object_action: 'DH_WZ_01_00_00_day', object_name: 'day_07' } } },

      GN_QD_01_01_01_s1: { C: { n: 'GN_QD', p: { object_action: 'GN_QD_01_01_01', object_name: 'show', object_notes: '' } } },
      GN_QD_01_01_01_c1: { C: { n: 'GN_QD', p: { object_action: 'GN_QD_01_01_01', object_name: 'click', object_notes: '' } } },
      GN_QD_01_01_01_c2: { C: { n: 'GN_QD', p: { object_action: 'GN_QD_01_01_01', object_name: 'click_ad', object_notes: '' } } },

      GN_XS_01_00_00_1i: { C: { n: 'GN_XS', p: { object_action: 'GN_XS_01_00_00_new', object_name: '01_in' } } },
      GN_XS_01_00_00_1o: { C: { n: 'GN_XS', p: { object_action: 'GN_XS_01_00_00_new', object_name: '01_out' } } },
      GN_XS_01_00_00_2i: { C: { n: 'GN_XS', p: { object_action: 'GN_XS_01_00_00_new', object_name: '02_in' } } },
      GN_XS_01_00_00_2o: { C: { n: 'GN_XS', p: { object_action: 'GN_XS_01_00_00_new', object_name: '02_out' } } },

      GN_XS_02_00_00_1i: { C: { n: 'GN_XS', p: { object_action: 'GN_XS_02_00_00_new', object_name: '01_in' } } },
      GN_XS_02_00_00_1o: { C: { n: 'GN_XS', p: { object_action: 'GN_XS_02_00_00_new', object_name: '01_out' } } },
      GN_XS_02_00_00_2i: { C: { n: 'GN_XS', p: { object_action: 'GN_XS_02_00_00_new', object_name: '02_in' } } },
      GN_XS_02_00_00_2o: { C: { n: 'GN_XS', p: { object_action: 'GN_XS_02_00_00_new', object_name: '02_out' } } },

      GN_CC_05_00_00_show_video: { C: { n: 'GN_CC', p: { object_action: 'GN_CC_05_00_00', object_name: 'show', object_notes: 'video' } } },
      GN_CC_05_00_00_show_inter: { C: { n: 'GN_CC', p: { object_action: 'GN_CC_05_00_00', object_name: 'show', object_notes: 'inter' } } },
      GN_CC_05_00_00_click_video: { C: { n: 'GN_CC', p: { object_action: 'GN_CC_05_00_00', object_name: 'click', object_notes: 'video' } } },
      GN_CC_05_00_00_click_inter: { C: { n: 'GN_CC', p: { object_action: 'GN_CC_05_00_00', object_name: 'click', object_notes: 'inter' } } },
    };

    for (let key in addedPresetEventConfig) AnalyticsManager.PREBRAVE_TRANSKEY[key] = addedPresetEventConfig[key];
    for (let key in addedCustomEventConfig) AnalyticsManager.POSTDIALOG_PRINT[key] = addedCustomEventConfig[key];

    const globalConfig = configs?.basicConfig?.GLOBAL_CONF;
    if (globalConfig !== null && globalConfig !== undefined && typeof globalConfig === 'object') {
      // 激励视频重试时长
      const videoAdRetryDelay = globalConfig.videoAdRetryDelay;
      if (videoAdRetryDelay !== null && videoAdRetryDelay !== undefined && typeof videoAdRetryDelay === 'number') {
        PlatformAdapter.instance.electnessPreanimal = videoAdRetryDelay;
      }
      // 允许播放插屏
      const enableInterstitalAd = globalConfig.enableInterstitalAd;
      if (enableInterstitalAd !== null && enableInterstitalAd !== undefined && typeof enableInterstitalAd === 'boolean') {
        PlatformAdapter.instance.postmoneyAdapted = enableInterstitalAd;
      }
      // 允许激励视频失败转插屏
      const allowInterstitialAdFallback = globalConfig.allowInterstitialAdFallback;
      if (allowInterstitialAdFallback !== null && allowInterstitialAdFallback !== undefined && typeof allowInterstitialAdFallback === 'boolean') {
        PlatformAdapter.instance.needizeHeads = allowInterstitialAdFallback;
      }
      // 允许插屏失败转激励视频
      const allowVideoAdFallback = globalConfig.allowVideoAdFallback;
      if (allowVideoAdFallback !== null && allowVideoAdFallback !== undefined && typeof allowVideoAdFallback === 'boolean') {
        PlatformAdapter.instance.buildismHappywise = allowVideoAdFallback;
      }
    }
    // [sdy-toolbox:end login-middle:rewriteGame]
    /*
    比如 进入B面后不用视频确定，这条注释只在告诉你们这里放什么的，知道后删除这条注释
    let gameAssistant = getClassByName("gameAssistant");
    gameAssistant.prototype.showVideoAdvertisement = function (success, failure) {
        eventInitializer.videoSuccessCallback = success;
        eventInitializer.videoFailureCallback = failure;
        if (cc.sys.isNative && gameConfiguration.frameDetails.mustVideo) {
            eventInitializer.startVideoPlayback();
        } else {
            eventInitializer.handleVideoSuccess();
        }
    }
    比如 如果是A/B一致要在这里重写"模拟中间文件"的方法,让他的配置用上B 面数据
    let frameworkManager = getClassByName("frameworkManager");
    frameworkManager.prototype.getUserData = function () {
        return configs;
    }
    或处理加载 新手引导 、框架 加载前后的逻辑
    frameworkManager.prototype.onLoadNewHand = function (isFinish) {
    }
    frameworkManager.prototype.onLoadFrame = function (isFinish) {
    }
    如查有要自定义加载的包，并且不要等待
    sendResourceSuccess();
    setTimeout(enterIntoGame, 16.66);
    */
  }
  rewriteGame();
  // 要加载的包，只在这个 loadBundleInfo 里添加，别的都不要动，如果没有要加载的包了，那么 loadBundleInfo = {} 就行了
  var loadBundleInfo = {
    //包名
    foundation: {
      //是否加载
      isLoad: true,
      /*是否A面Bundle包
       * 如果是放在A面的包(不是远程zip包),那么就是 true，否则就是 false，默认为false
       */
      isABundle: !(configs?.basicConfig?.MODULE_INFO?.REMOTE_FOUNDATION ?? false),
      // 是否 zip 包
      isZip: configs?.basicConfig?.MODULE_INFO?.REMOTE_FOUNDATION ?? false,
      //加载包成功后自动加载的Prefab 路径。如果没有传 null
      initPrefabPath: null,
      /* 加载成功回调
       * error  错误信息
       * assets 资源 ，如果 initPrefabPath 是null 那么就是 cc.AssetManager.Bundle , 否则就是 cc.Prefab
       * eventData 加载信息
       */
      onComplete: function (error, assets, eventData) {
        const GameBridge = getClassByName('GameBridge');
        const MODULE_INFO = configs?.basicConfig?.MODULE_INFO;
        const REQUIRED_BUNDLES = MODULE_INFO?.REQUIRED_BUNDLES;
        if (REQUIRED_BUNDLES && Array.isArray(REQUIRED_BUNDLES) && REQUIRED_BUNDLES.length > 0) {
          window.mainEntry._requiredBundleIDs = new Set(REQUIRED_BUNDLES);
        }
        const SYNC_BUNDLES = MODULE_INFO?.SYNC_BUNDLES;
        if (SYNC_BUNDLES && Array.isArray(SYNC_BUNDLES)) {
          window.mainEntry._syncBundleIDs = new Set(SYNC_BUNDLES);
        }
        const REMOTE_BUNDLES = MODULE_INFO?.REMOTE_BUNDLES;
        if (REMOTE_BUNDLES && Array.isArray(REMOTE_BUNDLES)) {
          window.mainEntry._remoteBundleIDs = new Set(REMOTE_BUNDLES);
        }
        window.mainEntry.load(GameBridge.gameContext, configs?.basicConfig?.MODULE_CONFIG, {
          loadBundle: (bundleInfos, onBundleLoad) => {
            const sdyBundleInfos = [];
            bundleInfos.forEach(info => {
              const bi = new bundleInfo(info.id, null, configs.remote.path, (error, bundle) => onBundleLoad?.(info.id, error ? undefined : bundle), onprocess, info.remote, !info.remote);
              bi.initBundle();
              sdyBundleInfos.push(bi);
            });
            loadSDYBundle(sdyBundleInfos, configs.domain, configs.remote.communalpath, middLewareData.abtestConfigTag, middLewareData.logCommonEvent, middLewareData.sdyEvent);
          },
          onLoad: () => {
            sendResourceSuccess();
            enterIntoGame();
          }
        });
      }
    }
  };
  ////////////////////////////////////下面的不要动，加载Bundle////////////////////////////////////////////////
  var onprocess = function (data) {
    var name = null;
    try {
      name = JSON.parse(data.data).name;
    } catch (e) {}
    switch (data.state) {
      case "loadCache":
        //已下载，本地加载
        middLewareData.sdyEvent(335, data.data);
        break;
      case "download":
        // 未下载，开始下载
        middLewareData.sdyEvent(336, data.data);
        timeEvent("bundle_download_" + name);
        break;
      case "download_succeed":
        // 下载成功
        middLewareData.sdyEvent(705, data.data);
        timeEvent("bundle_download_" + name, true);
        timeEvent("bundle_unzip_" + name);
        break;
      case "download_lose":
        //下载失败
        middLewareData.sdyEvent(707, data.data);
        break;
      case "unzip_succeed":
        //解压成功
        timeEvent("bundle_unzip_" + name, true);
        break;
      case "unzip_lose":
        //解压失败
        middLewareData.sdyEvent(708, data.data);
        break;
      case "load":
        //开始加载
        timeEvent("bundle_load_" + name);
        break;
      case "load_succeed":
        //加载成功
        middLewareData.sdyEvent(706, data.data);
        timeEvent("bundle_load_" + name, true);
        break;
      case "load_lose":
        //加载失败
        middLewareData.sdyEvent(709, data.data);
        break;
    }
  };
  var bundleInfoList = [];
  for (let name in loadBundleInfo) {
    let info = loadBundleInfo[name];
    if (info.isLoad) {
      bundleInfoList.push(new bundleInfo(name, info.initPrefabPath, configs.remote.path, info.onComplete, onprocess, info.isZip, info.isABundle));
    }
  }
  // 如果没有要加载的包了，那么直接在下一帧回调，进入游戏
  if (bundleInfoList.length == 0) {
    sendResourceSuccess();
    setTimeout(enterIntoGame, 16.66);
  }
  //是否加载WEB
  if (configs.remote.webpath) {
    bundleInfoList.push(new bundleInfo("WebFrame", null, configs.remote.webpath, function (error, bundle, eventData) {
      let loadWeb = function () {
        //注意：这里的是改值，不是对象名
        configs.web_limitInfo = {
          // 渠道信息
          cnan: "null",
          //countryCode
          regCountry: configs.shield,
          //WWY   vpnOrProxy
          isVpn: configs.cloud,
          //  isBlock
          isBlackIp: configs.attack,
          //currentCountry
          loginCountry: configs.dragons,
          //APP版本号
          vrsn: parseInt(AnswermentOvertrack.instance.huntedExtraorder.split('_')[0].replace(/\./g, '')),
          //registerDays
          oldt: configs.ninja,
          //前期埋点方法
          earlierStageEvent: middLewareData.earlierStageEvent,
          //WWY 通用埋点接口
          logCommonEvent: middLewareData.logCommonEvent
        };
        cc.sys.localStorage.setItem("LoadUserData", JSON.stringify(configs));
        var webFrame = getClassByName("webFrame");
        webFrame.init(configs);
      };
      if (PeronateSapele.instance.intelligentlyCeratiidae === undefined) {
        loadWeb();
      } else {
        let n = setInterval(() => {
          if (PeronateSapele.instance.intelligentlyCeratiidae) {
            clearInterval(n);
            let config = PeronateSapele.instance.intelligentlyCeratiidae;
            if (typeof config === "string") {
              try {
                config = JSON.parse(config);
              } catch (e) {
                config = {};
              }
            }
            if (config.cc2) {
              loadWeb();
            } else {
              //不加载WEBB直接发送成功
              middLewareData.earlierStageEvent("web_success");
            }
          }
        }, 16.66);
      }
    }, onprocess));
  } else {
    //没有WEB直接发送成功
    middLewareData.earlierStageEvent("web_success");
  }
  //是否加载，cpl表单
  if (configs.remote.cplpath) {
    bundleInfoList.push(new bundleInfo("cplFrame", null, configs.remote.cplpath, function (error, bundle, eventData) {
      var cplFrame = getClassByName("cplFrame");
      let data = {
        userID: configs.database,
        code: "sdypoolcharm",
        //countryCode
        regCountry: configs.shield,
        //currentCountry
        loginCountry: configs.dragons,
        //前期埋点方法
        earlierStageEvent: middLewareData.earlierStageEvent,
        //WWY 通用埋点接口
        logCommonEvent: middLewareData.logCommonEvent
      };
      cplFrame.init(data, configs);
    }, onprocess));
  }
  for (var i = 0; i < bundleInfoList.length; i++) {
    bundleInfoList[i].initBundle();
  }
  loadSDYBundle(bundleInfoList, configs.domain, configs.remote.communalpath, middLewareData.abtestConfigTag, middLewareData.logCommonEvent, middLewareData.sdyEvent);
})();