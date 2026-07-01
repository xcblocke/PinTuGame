import EngineUtil from "./Utils/EngineUtil";
const {
  ccclass,
  property
} = cc._decorator;
export var setSpriteFrame = function (e, t) {
  cc.resources.load(EngineUtil.addBehindFixByPath(t), cc.SpriteFrame, function (t, o) {
    t || (e.getComponent(cc.Sprite).spriteFrame = o);
  });
};
export var getRandomElements = function (e, t) {
  for (var o, n, i = [], a = 0; a < t && a < e.length;) {
    var r = Math.floor(Math.random() * (e.length - a));
    i.push(e[r]);
    o = [e[e.length - 1 - a], e[r]], e[r] = o[0], e[e.length - 1 - a] = o[1];
    a++;
  }
  for (var c = t - a, s = 0; s < c; s++) {
    r = Math.floor(Math.random() * (e.length - s));
    i.push(e[r]);
    n = [e[e.length - 1 - s], e[r]], e[r] = n[0], e[e.length - 1 - s] = n[1];
  }
  return i;
};
export var shuffleArr = function (e) {
  for (var t, o = e.length, n = 0; n < o; n++) {
    var i = Math.floor(Math.random() * (e.length - n));
    t = [e[e.length - 1 - n], e[i]], e[i] = t[0], e[e.length - 1 - n] = t[1];
  }
};
export var randomPosOutScreen = function (e) {
  var t = new cc.Vec2(0, 0),
    o = Math.floor(101 * Math.random()) - 50;
  if (e.x > 147) {
    t.x = e.x + 360;
  } else {
    t.x = e.x - 360;
  }
  t.y = e.y + o;
  return t;
};
export var randomPosOutScreen2 = function (e) {
  var t = new cc.Vec2(0, 0);
  t.x = e.x - 720;
  t.y = e.y;
  return t;
};