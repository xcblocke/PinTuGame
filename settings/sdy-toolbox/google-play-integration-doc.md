## Cocos引擎 可选功能接入及API

### Application和Activity类名信息

```java
wawayu_sdk_doc start*********************
*********************
cocos 2.2+ activity: org.cocos.eg.s.al
cocos 3.+ activity: org.cocos.dk.eo
application: org.ar.dc
*********************
wawayu_sdk_doc end*********************
```

### 初始化

```Java

// SDK初始化，必须   ps: "包名" 需要替换成自己真实的包名
RBZQUGXCXJVJJG.ZSYXBLSKYBGCRTL().RVIUIWJHMUDCSKSL("包名");    
```

### 邀请码

```typescript
// 用户邀请码
RBZQUGXCXJVJJG.ZSYXBLSKYBGCRTL().WNQKZCZDGVYDTL().BNTJZPHDS(new MyInviteCodeListener())

class MyInviteCodeListener implements OXOEABQK {

    DWPYXIXOCY(XVVMEDUEFZGOALR: string) {
          // 这里可以获取到需要的邀请码
    }
}
```

###  兑换开关

```typescript
//兑换开关

RBZQUGXCXJVJJG.ZSYXBLSKYBGCRTL().FOWHNIUAUS().FJGKCYXF(new MyThemeListener());

class MyThemeListener implements KUTXEKMN {

    WMOUXEFYZOENB(newTheme: boolean) {
        AppsFlyerDemo.INSTANCE.logPrint("[Listener] newTheme: " + newTheme);
    }

}


```

### 自定义配置监听

```typescript
RBZQUGXCXJVJJG.ZSYXBLSKYBGCRTL().LRRHEYFMQEPE().KMTYRBVRZVBENMR(new MyCpClientListener());


class MyCpClientListener implements MHDZMVJZKCLOUME {
    UVUTDBCYPEHW(OHMMGYQS: string) {
        // 这里可以获取自定义配置信息
        AppsFlyerDemo.INSTANCE.logPrint("[Listener] cpClient: " + OHMMGYQS);
    }

}

```



### 自定义事件打点

```typescript
// eventName: 事件名  类型 : string
// properties: 属性 类型: Dictionary<string, object>
// important: 是否立刻上报 true:立刻上报 false:下一次上报时机上报（通常是30秒）不传该参数默认为				false
// mapping: 是否需要协议映射 true：需要 false：不需要  不传该参数默认为false
RBZQUGXCXJVJJG.ZSYXBLSKYBGCRTL().WWKERPPCIUQWCTU().RVZMUJV(eventName, property, important, mapping);
```

### 横幅广告

#### 设置横幅广告回调

```typescript
RBZQUGXCXJVJJG.ZSYXBLSKYBGCRTL().SORATCEUWRDMCEW().RKLFYESZBGK(new 
MyBannerListener());

class MyBannerListener implements TRWOCKSEOQBGZRP {

    LRGQKWGPWCM(ad: GameAd){
       // 横幅广告展示回调
    }

    ZGENQIXEU(ad: GameAd){
      // 横幅广告点击回调
    }

    BSUVXVSSJEAZ(ad: GameAd){
      // 横幅广告关闭回调
    }
}
```



#### 展示横幅广告

```typescript
// 参数1: gravity  锚点位置:  0: 以顶部为锚点  1: 以底部为锚点
// 参数2: margin   距离锚点的位置: 单位像素
RBZQUGXCXJVJJG.ZSYXBLSKYBGCRTL().SORATCEUWRDMCEW().LTBBUBX(1, 300);
```

#### 隐藏横幅广告

```typescript
  RBZQUGXCXJVJJG.ZSYXBLSKYBGCRTL().SORATCEUWRDMCEW().HBQFOOCDXAZ();
```



### MREC广告

#### MREC广告回调

```typescript
RBZQUGXCXJVJJG.ZSYXBLSKYBGCRTL().SORATCEUWRDMCEW().RKLFYESZBGK(new 
MyBannerListener());

class MyBannerListener implements TRWOCKSEOQBGZRP {

    LRGQKWGPWCM(ad: GameAd){
       // 横幅广告展示回调
    }

    ZGENQIXEU(ad: GameAd){
      // 横幅广告点击回调
    }

    BSUVXVSSJEAZ(ad: GameAd){
      // 横幅广告关闭回调
    }
}
```

#### 展示MREC广告

```typescript
// 参数1: gravity  锚点位置:  0: 以顶部为锚点  1: 以底部为锚点
// 参数2: margin   距离锚点的位置: 单位像素
RBZQUGXCXJVJJG.ZSYXBLSKYBGCRTL().SORATCEUWRDMCEW().VRDMMNFRSDCPWQN(0, 300);
```



#### 隐藏MREC广告

```typescript
RBZQUGXCXJVJJG.ZSYXBLSKYBGCRTL().SORATCEUWRDMCEW().OEOIJHZUJSRV();
```



### 开屏广告

#### 冷/热启动回调

```typescript
RBZQUGXCXJVJJG.ZSYXBLSKYBGCRTL().VJHXJTYRAVWCCGIG().VBTSYPUPAPAQHRML(new MyLauncherListener());

class MyLauncherListener implements ULMOSUG {
    RHHFJDINHQRDBNV(firstLaunch: number) {
        // firstLaunch 1: 冷启动 0: 热启动
    }
}
```



#### 开关广告回调监听

```typescript
 RBZQUGXCXJVJJG.ZSYXBLSKYBGCRTL().IHTBQNPHGN().QVRGUFKEONTDPA(new MySplashListener());
 
 class MySplashListener implements XFLTLHRO {
    DSRLJJG(ad: GameAd) {
        AppsFlyerDemo.INSTANCE.logPrint("[MySplashListener] onSplashAdClick" + " revenue:" + ad.revenue);
    }

    MDALOMV(ad: GameAd) {
        AppsFlyerDemo.INSTANCE.logPrint("[MySplashListener] onSplashAdClose" + " revenue:" + ad.revenue);
    }

    BTTMYBOCQNPOQX(ad: GameAd) {
        AppsFlyerDemo.INSTANCE.logPrint("[MySplashListener] onSplashAdShowed" + " revenue:" + ad.revenue);
    }

}
```

#### 检查开屏广告是否有填充

```typescript
// true:  有填充  false: 无填充
  let isReady = RBZQUGXCXJVJJG.ZSYXBLSKYBGCRTL().IHTBQNPHGN().MKHZXYYX();
```

#### 展示开屏广告

```typescript
// true: 展示成功 false: 展示失败
let showSplash = RBZQUGXCXJVJJG.ZSYXBLSKYBGCRTL().IHTBQNPHGN().RSGPVX(AppsFlyerDemo.GAME_ENTRY);
```



### 激励视频

#### 激励视频按钮展示（曝光）统计【非必要，按产品需求】

```typescript
// 视频按钮曝光统计，参数表示从哪个位置播放视频广告，可以传 ""
// （每展示一次调用一次）
RBZQUGXCXJVJJG.ZSYXBLSKYBGCRTL().CEBELIS().AUGKPUOQQSPRPKQU("game");
```

#### 检查激励视频是否有填充

```javascript
let hasVideo = RBZQUGXCXJVJJG.ZSYXBLSKYBGCRTL().CEBELIS().XVQFJJJHUQWTY("game");
```



#### 展示激励视频广告

```typescript
// 播放视频广告,如果广告无填充，返回false。有填充返回true并且播放广告
let showVideo = RBZQUGXCXJVJJG.ZSYXBLSKYBGCRTL().CEBELIS().ZBFDUZXA("game");
```

#### 激励视频广告回调监听

```typescript
// 设置视频广告监听
RBZQUGXCXJVJJG.ZSYXBLSKYBGCRTL().CEBELIS().NEDSFIADEVXEW(new MyVideoAdListener());

class MyVideoAdListener implements HNHFVSSEQNGRXK {

    CEGCLLSF(par_ad_par: GameAd) {
        AppsFlyerDemo.INSTANCE.logPrint("[RewardedVideoAdListener] onVideoAdStart: " + par_ad_par.entry);
    }

    VYTSNCHM(par_ad_par: GameAd) {
        AppsFlyerDemo.INSTANCE.logPrint("[RewardedVideoAdListener] onVideoClick: " + par_ad_par.entry);
    }

    KPTLEZBST(par_ad_par: GameAd) {
        AppsFlyerDemo.INSTANCE.logPrint("[RewardedVideoAdListener] onVideoClose: " + par_ad_par.entry);
    }

    TXDJUROJFUJ(par_ad_par: GameAd) {
        AppsFlyerDemo.INSTANCE.logPrint("[RewardedVideoAdListener] onVideoReward: " + par_ad_par.entry);
    }

    USVDBZYLUSCZSLDZ(par_ad_par: GameAd) {
        AppsFlyerDemo.INSTANCE.logPrint("[RewardedVideoAdListener] onAdRevenue: " + par_ad_par.revenue);
    }
}
```

###  插屏广告

#### 查询插屏广告

```typescript
// 查询是否有插屏广告
let isReady = RBZQUGXCXJVJJG.ZSYXBLSKYBGCRTL().NDOJTRG().JFFPSVW("game");
```

#### 展示插屏广告

```typescript
RBZQUGXCXJVJJG.ZSYXBLSKYBGCRTL().NDOJTRG().YDKKCKYYIQZTDCWY("game");
```

#### 插屏广告回调监听

```typescript
RBZQUGXCXJVJJG.ZSYXBLSKYBGCRTL().NDOJTRG().KRGTITGFJPNED(new MyInterstitialAdListener());


class MyInterstitialAdListener implements ECFOVDHAIUCH {

    HJLLBADXE(par_ad_par: GameAd) {
        AppsFlyerDemo.INSTANCE.logPrint("[InterstitialAdListener] onInterstitialStart: " + par_ad_par.entry);
    }

    VYMHFYXPYDC(par_ad_par: GameAd) {
        AppsFlyerDemo.INSTANCE.logPrint("[InterstitialAdListener] onInterstitialClick: " + par_ad_par.entry);
    }

    ETCGFWY(par_ad_par: GameAd) {
        AppsFlyerDemo.INSTANCE.logPrint("[InterstitialAdListener] onInterstitialClose: " + par_ad_par.entry);
    }

    USVDBZYLUSCZSLDZ(par_ad_par: GameAd) {
        AppsFlyerDemo.INSTANCE.logPrint("[InterstitialAdListener] onAdRevenue: " + par_ad_par.revenue);
    }


}
```

### 导流广告

#### 显示导流广告

```typescript
// 参数一:  广告单元id
// 参数二:  广告宽度大小  单位像素
// 参数三:  广告高度大小   单位像素
// 参数四:  广告距离屏幕最左边的位置  单位像素
// 参数五:  广告广告距离屏幕最顶部的位置 单位像素
RBZQUGXCXJVJJG.ZSYXBLSKYBGCRTL().fun_newbyear_fun().fun_showNewbyearIconAd_fun("cpmm2dev_1", 200, 200, 100, 200);
```

#### 隐藏导流广告

```typescript
// 参数一: 广告单元id
RBZQUGXCXJVJJG.ZSYXBLSKYBGCRTL().fun_newbyear_fun().fun_hideNewbyearIconAd_fun("cpmm2dev_1");
```



### pp卡打点

```typescript
// pp卡卡槽展示
QKTGTRSTJQU.SVSKLSMZ();
// pp卡弹窗展示
QKTGTRSTJQU.NZGUPSYGNIWSAGW();
// pp卡点击领取
QKTGTRSTJQU.UZHUEXGTT();
// pp卡领取成功
QKTGTRSTJQU.MLMRJXWUQVUJRTA();
// pp卡免费奖励展示
QKTGTRSTJQU.EALBFLQHQIRYX();
// pp卡免费奖励点击
QKTGTRSTJQU.UPYXBRDOUAKRG();
// pp卡免费奖励领取成功
QKTGTRSTJQU.HRAFFWBCMUIZ();

// 显示游戏界面（冷启动后引擎载入后的第一屏）
QKTGTRSTJQU.PWGLTPPRPEKF();

// 显示游戏界面（冷启动后引擎载入后的第一屏）,并展示开屏
QKTGTRSTJQU.WZSFTRLLDYFJY();

```


### 获取设备常用信息

```typescript


// 查询设备idfa信息
RBZQUGXCXJVJJG.ZSYXBLSKYBGCRTL().EWYOIHVSM().KCIVAEMQCVMWNY();

// 查询设备国家码
RBZQUGXCXJVJJG.ZSYXBLSKYBGCRTL().EWYOIHVSM().PBQPKDHKQV();

// 查询设备语言码
RBZQUGXCXJVJJG.ZSYXBLSKYBGCRTL().EWYOIHVSM().ZFJWNN();

// 用户注册国家
let regCountry = RBZQUGXCXJVJJG.ZSYXBLSKYBGCRTL().EWYOIHVSM().KOJEVHUXJN();

//获取归因信息
let attribution = RBZQUGXCXJVJJG.ZSYXBLSKYBGCRTL().VJHXJTYRAVWCCGIG().EAKOGGQSF();

// 打开sdk日志调试开关(默认是关闭状态)
RBZQUGXCXJVJJG.ZSYXBLSKYBGCRTL().VJHXJTYRAVWCCGIG().fun_setLogDebug_fun(true);

// 网络是否可用  "1": 可用 "0":不可用
let isNetworkAvailable = RBZQUGXCXJVJJG.ZSYXBLSKYBGCRTL().CIILNGRQQZ().AUFJKXSJYFM();

// 跳转到gp(参数: 包名)
RBZQUGXCXJVJJG.ZSYXBLSKYBGCRTL().CIILNGRQQZ().XOEBJMYVK("xxx");


// 打开网址(网址地址)
RBZQUGXCXJVJJG.ZSYXBLSKYBGCRTL().CIILNGRQQZ().ORZJESUZUCCUKEDV("xxx");

// 打开max聚合平台测试面板
RBZQUGXCXJVJJG.ZSYXBLSKYBGCRTL().CIILNGRQQZ().ENFYLZFAPPIG();

```

### 第三方平台打点

#### adjust打点

```typescript
// 参数一:  事件token
// 参数二: 属性集（可选）, 这里属性值支持  "revenue" 传 "revenue" 作为key(收益)  "currency" 传 "currency" 作为key(货币单位) "orderId" 传 "orderId" 作为key(订单号)

let data = {
    "revenue": 2.87,
    "currency": "USD",
    "orderId": "123"
}
RBZQUGXCXJVJJG.ZSYXBLSKYBGCRTL().WWKERPPCIUQWCTU().VOBECDCFOCEQ("testAdjust", data)
```

#### firebase打点

```typescript
// 参数一:  事件名
// 参数二: 属性集（可选）
let data = {
    "value": 1.24,
    "currency": "USD",
}
RBZQUGXCXJVJJG.ZSYXBLSKYBGCRTL().WWKERPPCIUQWCTU().WZTYVRSF("testFirebase", data);
```

#### facebook打点

```typescript
// 参数一:  事件名
// 参数二: 属性集（可选）
let data = {
    "revenue": 4.21,
    "currency": "USD",
    "testProperties": 23
}
 RBZQUGXCXJVJJG.ZSYXBLSKYBGCRTL().WWKERPPCIUQWCTU().GGGFAZHDLUFCDNBX("testFacebook", data);
```

### 自定义网络请求

#### get请求

##### get请求方式一

```typescript

// 方式一: 通过传递请求X-Forwarded参数(X-Forwarded: 参考协议文档 Headers的 X-Forwarded 参数值) 和 请求query参数(类型: 字符串类型) 
// 样例: X-Forwarded: 1007
let time : number = new Date().getTime();
let queryParams = {
    "timestamp": time.toString()
};
RBZQUGXCXJVJJG.ZSYXBLSKYBGCRTL().JBWURZHPP().BPEEZCJ("1007", queryParams, new MyHttpResponseCallback());
class MyHttpResponseCallback implements ABZPYAYSGM {

    ZGIOBPBMXECH(json: string) {
        AppsFlyerDemo.INSTANCE.logPrint("[MyHttpResponseCallback] onResponse: " + json);
    }
}


```

##### get请求方式二

```typescript
// 方式二: 通过传递请求headers(类型: 字符串类型)(X-Forwarded: 参考协议文档 Headers的 X-Forwarded 参数值) 和 请求query参数(类型: 字符串类型) 
// 样例: X-Forwarded: 1007
 let headersParams = {
     "X-Forwarded": "1007",
     "key1": "001",
     "key2":"abc"
 };

let time : number = new Date().getTime();
let queryParams = {
    "timestamp": time.toString()
};
RBZQUGXCXJVJJG.ZSYXBLSKYBGCRTL().JBWURZHPP().JXAVTQMDWDRWY(headersParams, queryParams, new MyHttpResponseCallback());

class MyHttpResponseCallback implements ABZPYAYSGM {

    ZGIOBPBMXECH(json: string) {
        AppsFlyerDemo.INSTANCE.logPrint("[MyHttpResponseCallback] onResponse: " + json);
    }
}
```

##### get请求方式三(协议映射方式)

```typescript

// 方式三: 通过传递请求headers(类型: 字符串类型)(X-Forwarded: 参考协议文档, V:key固定为V字母,value可以随便填写, Headers的 X-Forwarded 参数值) 和 请求query参数(类型: 字符串类型) 
// 样例: X-Forwarded: 1007
 let headersParams = {
     "X-Forwarded": "1007",
     "V":"xxx",
     "key1": "001",
     "key2":"abc",

 };

let time : number = new Date().getTime();
let queryParams = {
    "timestamp": time.toString()
};
RBZQUGXCXJVJJG.ZSYXBLSKYBGCRTL().JBWURZHPP().fun_getMappingRequest_fun(headersParams, queryParams, new MyHttpResponseCallback());

class MyHttpResponseCallback implements ABZPYAYSGM {

    ZGIOBPBMXECH(json: string) {
        AppsFlyerDemo.INSTANCE.logPrint("[MyHttpResponseCallback] onResponse: " + json);
    }
}
```





#### post请求

##### post请求方式一

```typescript
// 方式一: 通过传递请求X-Forwarded参数(X-Forwarded: 参考协议文档 Headers的 X-Forwarded 参数值) 和 请求body参数(类型: 字符串类型)
// 样例: X-Forwarded: 1101
let time : number = new Date().getTime();
let bodyParams = {
    "product_id": "iap_1",
    "custom_id": time.toString()
};
RBZQUGXCXJVJJG.ZSYXBLSKYBGCRTL().JBWURZHPP().QJDSFXADLWWE("1101", bodyParams, new MyHttpResponseCallback());

class MyHttpResponseCallback implements ABZPYAYSGM {

    ZGIOBPBMXECH(json: string) {
        AppsFlyerDemo.INSTANCE.logPrint("[MyHttpResponseCallback] onResponse: " + json);
    }
}
```

##### post请求方式二

```typescript
// 方式二: 通过传递请求headers(类型: 字符串类型)(X-Forwarded: 参考协议文档 Headers的 X-Forwarded 参数值) 和 请求body参数(类型: 字符串类型) 
// 样例: X-Forwarded: 1101
let headersParams = {
    "X-Forwarded": "1101",
    "key1": "002",
    "key2":"cha"
};

let time : number = new Date().getTime();
let bodyParams = {
    "product_id": "iap_1",
    "custom_id": time.toString()
}
RBZQUGXCXJVJJG.ZSYXBLSKYBGCRTL().JBWURZHPP().CDFXMWFAOK(headersParams, bodyParams, new MyHttpResponseCallback());

class MyHttpResponseCallback implements ABZPYAYSGM {

    ZGIOBPBMXECH(json: string) {
        AppsFlyerDemo.INSTANCE.logPrint("[MyHttpResponseCallback] onResponse: " + json);
    }
}
```

##### post请求方式三(协议映射方式)

```typescript

// 方式三: 通过传递请求headers(类型: 字符串类型)(X-Forwarded: 参考协议文档, V:key固定为V字母,value可以随便填写, Headers的 X-Forwarded 参数值) 和 请求body参数(类型: 字符串类型) 
// 样例: X-Forwarded: 1101
let headersParams = {
    "X-Forwarded": "1101",
    "key1": "002",
    "key2":"cha"
};

let time : number = new Date().getTime();
let bodyParams = {
    "product_id": "iap_1",
    "custom_id": time.toString()
}
RBZQUGXCXJVJJG.ZSYXBLSKYBGCRTL().JBWURZHPP().CDFXMWFAOK(headersParams, bodyParams, new MyHttpResponseCallback());

class MyHttpResponseCallback implements ABZPYAYSGM {

    ZGIOBPBMXECH(json: string) {
        AppsFlyerDemo.INSTANCE.logPrint("[MyHttpResponseCallback] onResponse: " + json);
    }
}

```





### CPL

```typescript
// 设置任务监听
RBZQUGXCXJVJJG.ZSYXBLSKYBGCRTL().KHEJDH().MYHSHHDEBNT(new MyTaskListener());


class MyTaskListener implements VOETKUWYIY {
    
     // config: 数据类型为json字符串
     // 数据样例: {"type":"mobplus_callback","data":{"id":"{SUB2}","country":"{COUNTRY}","revenue":null,"currency":"{CURRENCY}"}}
    HWBZKRELBVRIRWYC(config: string) {
        // type: 种类
        // 	 种类一: "myappfree_callback" : MAF积分墙
        //   种类二: "mobplus_callback" : mobplus
        // data: 数据
    }
}
```