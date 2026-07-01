(function () {
  function e() {}
  e.SubmitGame = {
    difficulty_score: 0,
    bubble_cash_balance: "",
    bubble_gold_balance: "",
    can_gold_extract: true,
    can_cash_extract: true,
    cash_balance: 0,
    cash_extract_id: "1",
    gold_balance: 0,
    levelup_force_flag: 0,
    lottery_step_force_flag: 0,
    lucky_step_force_flag: 0,
    is_no_ad_lottery: false,
    process_info: [{
      msg: "秒到账",
      reward: 10,
      reward_type: "cash",
      score: 300,
      status: 1
    }, {
      msg: "秒到账",
      reward: 120000,
      reward_type: "gold",
      score: 1000,
      status: 0
    }, {
      msg: "大额奖励",
      reward: 5000,
      reward_type: "cash",
      score: 20000,
      status: 0
    }, {
      msg: "全部提现",
      reward: 0,
      reward_type: "cash",
      score: 30000,
      status: 0
    }],
    prop_info: [{
      code: 1,
      count: 0,
      limit: 2,
      name: "重新出块",
      used_times: 0
    }, {
      code: 2,
      count: 0,
      limit: 2,
      name: "旋转方块",
      used_times: 0
    }, {
      code: 3,
      count: 0,
      limit: 2,
      name: "存储方块",
      used_times: 0
    }, {
      code: 4,
      count: 0,
      limit: 1,
      name: "复活",
      used_times: 0
    }],
    reward_info: {
      cash_reward: 0,
      gold_reward: 0,
      process_cash_reward: 10,
      process_gold_reward: 0
    },
    target_score: 30000,
    temp_reward_info: {
      cash_get: 1010,
      cash_only: 100,
      cash_show: 930,
      gold_show: 277820
    },
    xc_seven_step_force_flag: 0,
    tx_ratio: {
      new_tx_ratio: "120%",
      old_tx_ratio: "100%",
      next_tx_ratio: "140%"
    }
  };
  e.GoldExtractInfo = {
    big_gold_balance: 0,
    total_score: 10000,
    gold_balance: 10400,
    info: [{
      amount: 104,
      extract_rate: "100%",
      id: "1",
      line_up: {
        limit_day: 1000,
        num: 4627
      },
      status: 3,
      target_score: 0,
      title: "100%",
      ultimate_score: 0,
      waiting_audit: {
        num: 3814,
        rate: "98%"
      }
    }, {
      amount: 124,
      extract_rate: "120%",
      id: "2",
      line_up: {
        limit_day: 1000,
        num: 3898
      },
      status: 0,
      target_score: 1500,
      title: "120%",
      ultimate_score: 0,
      waiting_audit: {
        num: 3282,
        rate: "98%"
      }
    }, {
      amount: 145,
      extract_rate: "140%",
      id: "3",
      line_up: {
        limit_day: 1000,
        num: 4838
      },
      status: 0,
      target_score: 3000,
      title: "140%",
      ultimate_score: 0,
      waiting_audit: {
        num: 3488,
        rate: "98%"
      }
    }, {
      amount: 166,
      extract_rate: "160%",
      id: "4",
      line_up: {
        limit_day: 1000,
        num: 2624
      },
      status: 0,
      target_score: 5000,
      title: "160%",
      ultimate_score: 0,
      waiting_audit: {
        num: 4768,
        rate: "98%"
      }
    }, {
      amount: 187,
      extract_rate: "180%",
      id: "5",
      line_up: {
        limit_day: 1000,
        num: 3925
      },
      status: 0,
      target_score: 10000,
      title: "180%",
      ultimate_score: 0,
      waiting_audit: {
        num: 4198,
        rate: "98%"
      }
    }, {
      amount: 208,
      extract_rate: "200%",
      id: "6",
      line_up: {
        limit_day: 1000,
        num: 3301
      },
      status: 0,
      target_score: 28000,
      title: "200%",
      ultimate_score: 0,
      waiting_audit: {
        num: 2122,
        rate: "98%"
      }
    }, {
      amount: 3120,
      extract_rate: "3000%",
      id: "7",
      line_up: {
        limit_day: 1000,
        num: 2932
      },
      status: 0,
      target_score: 30000,
      title: "3000%",
      ultimate_score: 50000,
      waiting_audit: {
        num: 4668,
        rate: "98%"
      }
    }, {
      amount: 5200,
      extract_rate: "5000%",
      id: "8",
      line_up: {
        limit_day: 1000,
        num: 2016
      },
      status: 0,
      target_score: 40000,
      title: "5000%",
      ultimate_score: 60000,
      waiting_audit: {
        num: 2849,
        rate: "98%"
      }
    }, {
      amount: 10400,
      extract_rate: "10000%",
      id: "9",
      line_up: {
        limit_day: 1000,
        num: 4088
      },
      status: 0,
      target_score: 50000,
      title: "10000%",
      ultimate_score: 80000,
      waiting_audit: {
        num: 2053,
        rate: "98%"
      }
    }],
    level: 1,
    success_count: 1
  };
  e.infoType = {
    activity_num: 0,
    big_cash_guide: 10,
    big_scroll_xc_count: 20,
    bind_wx: 0,
    box_num: 0,
    bubble_cash_balance: "集齐<color=#FF0000>5</c>个福字，可全部提现",
    bubble_gold_balance: "再闯关<color=#FF0000>2次</c>，提升倍数",
    card_info: {
      card_100: 0,
      card_101: 0,
      card_102: 0,
      card_103: 0,
      card_104: 0,
      card_105: 0,
      card_106: 0,
      card_107: 0,
      card_108: 0,
      card_109: 0,
      card_110: 0,
      card_111: 0,
      card_112: 0,
      card_113: 0,
      card_114: 0,
      card_115: 0,
      card_116: 0,
      card_117: 0,
      card_118: 0,
      card_119: 0,
      card_120: 0,
      card_121: 0,
      card_122: 0,
      card_123: 0,
      card_124: 0,
      card_125: 0,
      card_126: 0,
      card_127: 0,
      card_128: 0,
      card_129: 0,
      card_130: 0,
      card_131: 0,
      card_132: 0,
      card_133: 0,
      card_134: 0,
      card_15: 0,
      card_16: 0,
      card_17: 0,
      card_18: 0,
      card_19: 0,
      card_20: 0,
      card_21: 0,
      card_22: 0,
      card_23: 0,
      card_24: 0,
      card_25: 0,
      card_26: 0,
      card_27: 0,
      card_28: 0,
      card_29: 0,
      card_30: 0,
      card_31: 0,
      card_32: 0,
      card_33: 0,
      card_34: 0,
      card_35: 0,
      card_36: 0,
      card_37: 0,
      card_38: 0,
      card_39: 0,
      card_40: 0,
      card_41: 0,
      card_42: 0,
      card_43: 0,
      card_44: 0,
      card_45: 0,
      card_46: 0,
      card_47: 0,
      card_48: 0,
      card_49: 0,
      card_50: 0,
      card_51: 0,
      card_52: 0,
      card_53: 0,
      card_54: 0,
      card_55: 0,
      card_56: 0,
      card_57: 0,
      card_58: 0,
      card_59: 0,
      card_60: 0,
      card_61: 0,
      card_62: 0,
      card_63: 0,
      card_64: 0,
      card_65: 0,
      card_66: 0,
      card_67: 0,
      card_68: 0,
      card_69: 0,
      card_70: 0,
      card_71: 0,
      card_72: 0,
      card_73: 0,
      card_74: 0,
      card_75: 0,
      card_76: 0,
      card_77: 0,
      card_78: 0,
      card_79: 0,
      card_80: 0,
      card_81: 0,
      card_82: 0,
      card_83: 0,
      card_84: 0,
      card_85: 0,
      card_86: 0,
      card_87: 0,
      card_88: 0,
      card_89: 0,
      card_90: 0,
      card_91: 0,
      card_92: 0,
      card_93: 0,
      card_94: 0,
      card_95: 0,
      card_96: 0,
      card_97: 0,
      card_98: 0,
      card_99: 0
    },
    card_list: [],
    cash_balance: 270,
    conf_info: {
      card_conf: {
        1: {
          name: "发财福",
          quantity: 1,
          resPath: "facaifu",
          type: 1
        },
        2: {
          name: "好运福",
          quantity: 1,
          resPath: "haoyunfu",
          type: 1
        },
        3: {
          name: "快乐福",
          quantity: 1,
          resPath: "kuailefu",
          type: 1
        },
        4: {
          name: "吉祥福",
          quantity: 1,
          resPath: "jixiangfu",
          type: 1
        },
        5: {
          name: "健康福",
          quantity: 1,
          resPath: "jiankangfu",
          type: 1
        },
        6: {
          name: "万能福",
          quantity: 1,
          resPath: "wannengfu",
          type: 1
        },
        7: {
          name: "万能福碎片",
          quantity: 6,
          resPath: "wannengfuFragMent",
          type: 2
        },
        8: {
          name: "现金100元（波动20%）",
          quantity: 10000,
          resPath: "",
          type: 3
        },
        9: {
          name: "现金200元（波动20%）",
          quantity: 20000,
          resPath: "",
          type: 3
        },
        10: {
          name: "红包50元（波动20%）",
          quantity: 5000,
          resPath: "",
          type: 4
        },
        11: {
          name: "红包100元（波动20%）",
          quantity: 10000,
          resPath: "",
          type: 4
        },
        12: {
          name: "道具1：回退一步",
          quantity: 3,
          resPath: "prop_01",
          type: 5
        },
        13: {
          name: "道具2：刷新",
          quantity: 1,
          resPath: "prop_02",
          type: 5
        },
        14: {
          name: "道具3：加瓶子",
          quantity: 1,
          resPath: "prop_03",
          type: 5
        },
        15: {
          name: "贺卡1",
          quantity: 1,
          resPath: "greetingCard_01",
          type: 6
        },
        16: {
          name: "贺卡2",
          quantity: 1,
          resPath: "greetingCard_02",
          type: 6
        },
        17: {
          name: "贺卡3",
          quantity: 1,
          resPath: "greetingCard_03",
          type: 6
        },
        18: {
          name: "贺卡4",
          quantity: 1,
          resPath: "greetingCard_04",
          type: 6
        },
        19: {
          name: "贺卡5",
          quantity: 1,
          resPath: "greetingCard_05",
          type: 6
        },
        20: {
          name: "贺卡6",
          quantity: 1,
          resPath: "greetingCard_06",
          type: 6
        },
        21: {
          name: "贺卡7",
          quantity: 1,
          resPath: "greetingCard_07",
          type: 6
        },
        22: {
          name: "贺卡8",
          quantity: 1,
          resPath: "greetingCard_08",
          type: 6
        },
        23: {
          name: "贺卡9",
          quantity: 1,
          resPath: "greetingCard_09",
          type: 6
        },
        24: {
          name: "贺卡10",
          quantity: 1,
          resPath: "greetingCard_10",
          type: 6
        },
        25: {
          name: "贺卡11",
          quantity: 1,
          resPath: "greetingCard_11",
          type: 6
        },
        26: {
          name: "贺卡12",
          quantity: 1,
          resPath: "greetingCard_12",
          type: 6
        },
        27: {
          name: "贺卡1-碎片1",
          quantity: 1,
          resPath: "01_1",
          type: 15
        },
        28: {
          name: "贺卡1-碎片2",
          quantity: 1,
          resPath: "01_2",
          type: 15
        },
        29: {
          name: "贺卡1-碎片3",
          quantity: 1,
          resPath: "01_3",
          type: 15
        },
        30: {
          name: "贺卡1-碎片4",
          quantity: 1,
          resPath: "01_4",
          type: 15
        },
        31: {
          name: "贺卡1-碎片5",
          quantity: 1,
          resPath: "01_5",
          type: 15
        },
        32: {
          name: "贺卡1-碎片6",
          quantity: 1,
          resPath: "01_6",
          type: 15
        },
        33: {
          name: "贺卡1-碎片7",
          quantity: 1,
          resPath: "01_7",
          type: 15
        },
        34: {
          name: "贺卡1-碎片8",
          quantity: 1,
          resPath: "01_8",
          type: 15
        },
        35: {
          name: "贺卡1-碎片9",
          quantity: 1,
          resPath: "01_9",
          type: 15
        },
        36: {
          name: "贺卡2-碎片1",
          quantity: 1,
          resPath: "02_1",
          type: 16
        },
        37: {
          name: "贺卡2-碎片2",
          quantity: 1,
          resPath: "02_2",
          type: 16
        },
        38: {
          name: "贺卡2-碎片3",
          quantity: 1,
          resPath: "02_3",
          type: 16
        },
        39: {
          name: "贺卡2-碎片4",
          quantity: 1,
          resPath: "02_4",
          type: 16
        },
        40: {
          name: "贺卡2-碎片5",
          quantity: 1,
          resPath: "02_5",
          type: 16
        },
        41: {
          name: "贺卡2-碎片6",
          quantity: 1,
          resPath: "02_6",
          type: 16
        },
        42: {
          name: "贺卡2-碎片7",
          quantity: 1,
          resPath: "02_7",
          type: 16
        },
        43: {
          name: "贺卡2-碎片8",
          quantity: 1,
          resPath: "02_8",
          type: 16
        },
        44: {
          name: "贺卡2-碎片9",
          quantity: 1,
          resPath: "02_9",
          type: 16
        },
        45: {
          name: "贺卡3-碎片1",
          quantity: 1,
          resPath: "03_1",
          type: 17
        },
        46: {
          name: "贺卡3-碎片2",
          quantity: 1,
          resPath: "03_2",
          type: 17
        },
        47: {
          name: "贺卡3-碎片3",
          quantity: 1,
          resPath: "03_3",
          type: 17
        },
        48: {
          name: "贺卡3-碎片4",
          quantity: 1,
          resPath: "03_4",
          type: 17
        },
        49: {
          name: "贺卡3-碎片5",
          quantity: 1,
          resPath: "03_5",
          type: 17
        },
        50: {
          name: "贺卡3-碎片6",
          quantity: 1,
          resPath: "03_6",
          type: 17
        },
        51: {
          name: "贺卡3-碎片7",
          quantity: 1,
          resPath: "03_7",
          type: 17
        },
        52: {
          name: "贺卡3-碎片8",
          quantity: 1,
          resPath: "03_8",
          type: 17
        },
        53: {
          name: "贺卡3-碎片9",
          quantity: 1,
          resPath: "03_9",
          type: 17
        },
        54: {
          name: "贺卡4-碎片1",
          quantity: 1,
          resPath: "04_1",
          type: 18
        },
        55: {
          name: "贺卡4-碎片2",
          quantity: 1,
          resPath: "04_2",
          type: 18
        },
        56: {
          name: "贺卡4-碎片3",
          quantity: 1,
          resPath: "04_3",
          type: 18
        },
        57: {
          name: "贺卡4-碎片4",
          quantity: 1,
          resPath: "04_4",
          type: 18
        },
        58: {
          name: "贺卡4-碎片5",
          quantity: 1,
          resPath: "04_5",
          type: 18
        },
        59: {
          name: "贺卡4-碎片6",
          quantity: 1,
          resPath: "04_6",
          type: 18
        },
        60: {
          name: "贺卡4-碎片7",
          quantity: 1,
          resPath: "04_7",
          type: 18
        },
        61: {
          name: "贺卡4-碎片8",
          quantity: 1,
          resPath: "04_8",
          type: 18
        },
        62: {
          name: "贺卡4-碎片9",
          quantity: 1,
          resPath: "04_9",
          type: 18
        },
        63: {
          name: "贺卡5-碎片1",
          quantity: 1,
          resPath: "05_1",
          type: 19
        },
        64: {
          name: "贺卡5-碎片2",
          quantity: 1,
          resPath: "05_2",
          type: 19
        },
        65: {
          name: "贺卡5-碎片3",
          quantity: 1,
          resPath: "05_3",
          type: 19
        },
        66: {
          name: "贺卡5-碎片4",
          quantity: 1,
          resPath: "05_4",
          type: 19
        },
        67: {
          name: "贺卡5-碎片5",
          quantity: 1,
          resPath: "05_5",
          type: 19
        },
        68: {
          name: "贺卡5-碎片6",
          quantity: 1,
          resPath: "05_6",
          type: 19
        },
        69: {
          name: "贺卡5-碎片7",
          quantity: 1,
          resPath: "05_7",
          type: 19
        },
        70: {
          name: "贺卡5-碎片8",
          quantity: 1,
          resPath: "05_8",
          type: 19
        },
        71: {
          name: "贺卡5-碎片9",
          quantity: 1,
          resPath: "05_9",
          type: 19
        },
        72: {
          name: "贺卡6-碎片1",
          quantity: 1,
          resPath: "06_1",
          type: 20
        },
        73: {
          name: "贺卡6-碎片2",
          quantity: 1,
          resPath: "06_2",
          type: 20
        },
        74: {
          name: "贺卡6-碎片3",
          quantity: 1,
          resPath: "06_3",
          type: 20
        },
        75: {
          name: "贺卡6-碎片4",
          quantity: 1,
          resPath: "06_4",
          type: 20
        },
        76: {
          name: "贺卡6-碎片5",
          quantity: 1,
          resPath: "06_5",
          type: 20
        },
        77: {
          name: "贺卡6-碎片6",
          quantity: 1,
          resPath: "06_6",
          type: 20
        },
        78: {
          name: "贺卡6-碎片7",
          quantity: 1,
          resPath: "06_7",
          type: 20
        },
        79: {
          name: "贺卡6-碎片8",
          quantity: 1,
          resPath: "06_8",
          type: 20
        },
        80: {
          name: "贺卡6-碎片9",
          quantity: 1,
          resPath: "06_9",
          type: 20
        },
        81: {
          name: "贺卡7-碎片1",
          quantity: 1,
          resPath: "07_1",
          type: 21
        },
        82: {
          name: "贺卡7-碎片2",
          quantity: 1,
          resPath: "07_2",
          type: 21
        },
        83: {
          name: "贺卡7-碎片3",
          quantity: 1,
          resPath: "07_3",
          type: 21
        },
        84: {
          name: "贺卡7-碎片4",
          quantity: 1,
          resPath: "07_4",
          type: 21
        },
        85: {
          name: "贺卡7-碎片5",
          quantity: 1,
          resPath: "07_5",
          type: 21
        },
        86: {
          name: "贺卡7-碎片6",
          quantity: 1,
          resPath: "07_6",
          type: 21
        },
        87: {
          name: "贺卡7-碎片7",
          quantity: 1,
          resPath: "07_7",
          type: 21
        },
        88: {
          name: "贺卡7-碎片8",
          quantity: 1,
          resPath: "07_8",
          type: 21
        },
        89: {
          name: "贺卡7-碎片9",
          quantity: 1,
          resPath: "07_9",
          type: 21
        },
        90: {
          name: "贺卡8-碎片1",
          quantity: 1,
          resPath: "08_1",
          type: 22
        },
        91: {
          name: "贺卡8-碎片2",
          quantity: 1,
          resPath: "08_2",
          type: 22
        },
        92: {
          name: "贺卡8-碎片3",
          quantity: 1,
          resPath: "08_3",
          type: 22
        },
        93: {
          name: "贺卡8-碎片4",
          quantity: 1,
          resPath: "08_4",
          type: 22
        },
        94: {
          name: "贺卡8-碎片5",
          quantity: 1,
          resPath: "08_5",
          type: 22
        },
        95: {
          name: "贺卡8-碎片6",
          quantity: 1,
          resPath: "08_6",
          type: 22
        },
        96: {
          name: "贺卡8-碎片7",
          quantity: 1,
          resPath: "08_7",
          type: 22
        },
        97: {
          name: "贺卡8-碎片8",
          quantity: 1,
          resPath: "08_8",
          type: 22
        },
        98: {
          name: "贺卡8-碎片9",
          quantity: 1,
          resPath: "08_9",
          type: 22
        },
        99: {
          name: "贺卡9-碎片1",
          quantity: 1,
          resPath: "09_1",
          type: 23
        },
        100: {
          name: "贺卡9-碎片2",
          quantity: 1,
          resPath: "09_2",
          type: 23
        },
        101: {
          name: "贺卡9-碎片3",
          quantity: 1,
          resPath: "09_3",
          type: 23
        },
        102: {
          name: "贺卡9-碎片4",
          quantity: 1,
          resPath: "09_4",
          type: 23
        },
        103: {
          name: "贺卡9-碎片5",
          quantity: 1,
          resPath: "09_5",
          type: 23
        },
        104: {
          name: "贺卡9-碎片6",
          quantity: 1,
          resPath: "09_6",
          type: 23
        },
        105: {
          name: "贺卡9-碎片7",
          quantity: 1,
          resPath: "09_7",
          type: 23
        },
        106: {
          name: "贺卡9-碎片8",
          quantity: 1,
          resPath: "09_8",
          type: 23
        },
        107: {
          name: "贺卡9-碎片9",
          quantity: 1,
          resPath: "09_9",
          type: 23
        },
        108: {
          name: "贺卡10-碎片1",
          quantity: 1,
          resPath: "10_1",
          type: 24
        },
        109: {
          name: "贺卡10-碎片2",
          quantity: 1,
          resPath: "10_2",
          type: 24
        },
        110: {
          name: "贺卡10-碎片3",
          quantity: 1,
          resPath: "10_3",
          type: 24
        },
        111: {
          name: "贺卡10-碎片4",
          quantity: 1,
          resPath: "10_4",
          type: 24
        },
        112: {
          name: "贺卡10-碎片5",
          quantity: 1,
          resPath: "10_5",
          type: 24
        },
        113: {
          name: "贺卡10-碎片6",
          quantity: 1,
          resPath: "10_6",
          type: 24
        },
        114: {
          name: "贺卡10-碎片7",
          quantity: 1,
          resPath: "10_7",
          type: 24
        },
        115: {
          name: "贺卡10-碎片8",
          quantity: 1,
          resPath: "10_8",
          type: 24
        },
        116: {
          name: "贺卡10-碎片9",
          quantity: 1,
          resPath: "10_9",
          type: 24
        },
        117: {
          name: "贺卡11-碎片1",
          quantity: 1,
          resPath: "11_1",
          type: 25
        },
        118: {
          name: "贺卡11-碎片2",
          quantity: 1,
          resPath: "11_2",
          type: 25
        },
        119: {
          name: "贺卡11-碎片3",
          quantity: 1,
          resPath: "11_3",
          type: 25
        },
        120: {
          name: "贺卡11-碎片4",
          quantity: 1,
          resPath: "11_4",
          type: 25
        },
        121: {
          name: "贺卡11-碎片5",
          quantity: 1,
          resPath: "11_5",
          type: 25
        },
        122: {
          name: "贺卡11-碎片6",
          quantity: 1,
          resPath: "11_6",
          type: 25
        },
        123: {
          name: "贺卡11-碎片7",
          quantity: 1,
          resPath: "11_7",
          type: 25
        },
        124: {
          name: "贺卡11-碎片8",
          quantity: 1,
          resPath: "11_8",
          type: 25
        },
        125: {
          name: "贺卡11-碎片9",
          quantity: 1,
          resPath: "11_9",
          type: 25
        },
        126: {
          name: "贺卡12-碎片1",
          quantity: 1,
          resPath: "12_1",
          type: 26
        },
        127: {
          name: "贺卡12-碎片2",
          quantity: 1,
          resPath: "12_2",
          type: 26
        },
        128: {
          name: "贺卡12-碎片3",
          quantity: 1,
          resPath: "12_3",
          type: 26
        },
        129: {
          name: "贺卡12-碎片4",
          quantity: 1,
          resPath: "12_4",
          type: 26
        },
        130: {
          name: "贺卡12-碎片5",
          quantity: 1,
          resPath: "12_5",
          type: 26
        },
        131: {
          name: "贺卡12-碎片6",
          quantity: 1,
          resPath: "12_6",
          type: 26
        },
        132: {
          name: "贺卡12-碎片7",
          quantity: 1,
          resPath: "12_7",
          type: 26
        },
        133: {
          name: "贺卡12-碎片8",
          quantity: 1,
          resPath: "12_8",
          type: 26
        },
        134: {
          name: "贺卡12-碎片9",
          quantity: 1,
          resPath: "12_9",
          type: 26
        }
      },
      parameter_conf: {
        bigmoney_cash_get: {
          para_key: "bigmoney_cash_get",
          para_meaning: "幸运弹窗领取现金",
          para_value: 5000
        },
        bigmoney_cash_only: {
          para_key: "bigmoney_cash_only",
          para_meaning: "幸运弹窗现金不领取",
          para_value: 500
        },
        bigmoney_cash_show: {
          para_key: "bigmoney_cash_show",
          para_meaning: "幸运弹窗展示现金（波动10%）",
          para_value: 5000
        },
        bigmoney_envelope_show: {
          para_key: "bigmoney_envelope_show",
          para_meaning: "幸运弹窗展示红包",
          para_value: 300000
        },
        bigmoney_showtime: {
          para_key: "bigmoney_showtime",
          para_meaning: "幸运奖励展示条件计数（操作次数）",
          para_value: 9
        },
        cash_up_2: {
          para_key: "cash_up_2",
          para_meaning: "奖励强弹频率（幸运+通关）",
          para_value: 4
        },
        envelope_limit: {
          para_key: "envelope_limit",
          para_meaning: "红包分成计算上限",
          para_value: 25
        },
        levelup_cash_get: {
          para_key: "levelup_cash_get",
          para_meaning: "通关弹窗领取现金",
          para_value: 8000
        },
        levelup_cash_only: {
          para_key: "levelup_cash_only",
          para_meaning: "通关弹窗不领取",
          para_value: 800
        },
        levelup_cash_show: {
          para_key: "levelup_cash_show",
          para_meaning: "通关弹窗显示现金（波动10%）",
          para_value: 8000
        },
        levelup_envelope_show: {
          para_key: "levelup_envelope_show",
          para_meaning: "通关弹窗显示红包",
          para_value: 500000
        },
        merge_need_num: {
          para_key: "merge_need_num",
          para_meaning: "合成万能福所需碎片数",
          para_value: 200
        },
        one_cash_reward: {
          para_key: "one_cash_reward",
          para_meaning: "完成1组奖励现金（第4关开始）",
          para_value: 10
        },
        one_red_reward: {
          para_key: "one_red_reward",
          para_meaning: "完成1组奖励红包（第4关开始）",
          para_value: 1
        },
        pass_1_ad_cash: {
          para_key: "pass_1_ad_cash",
          para_meaning: "第1关通关现金奖励",
          para_value: 10
        },
        pass_2_ad_cash: {
          para_key: "pass_2_ad_cash",
          para_meaning: "第2关通关现金奖励",
          para_value: 5
        },
        pass_3_ad_cash: {
          para_key: "pass_3_ad_cash",
          para_meaning: "第3关通关现金奖励",
          para_value: 7
        }
      }
    },
    create_city: "unknown",
    create_time: "2026-01-27 16:36:58",
    cueernt_level_url: "http://wlpgt-mddth.chongui.com/levels/level_5.json",
    diamond_num: 0,
    extract_cash_desc: "1.由于微信支付需要实名制,非实名用户账号无法支持提现,请务必将提现的微信号进行实名认证;\n\n2.由于微信官方要求，单笔提现金额最低为0.1元;\n\n3.提现申请一般是秒到账,如果突发意外情况,也会在1-3个工作日内审核到账,请耐心等待;\n\n4.用户达成提现要求即可提现到账,为保障全体用户利益,对有作弊嫌疑的用户,需经过审核验证或者满足活跃条件才可全部提现,否则不能提现;\n\n5.若发现用户有恶意作弊行为,一律封禁账号并扣除账户所有余额。",
    extract_desc: "1.由于微信支付需要实名制,非实名用户账号无法支持提现,请务必将提现的微信号进行实名认证;\n\n2.由于微信官方要求，单笔提现金额最低为0.1元;\n\n3.提现申请一般是秒到账,如果突发意外情况,也会在1-3个工作日内审核到账,请耐心等待;\n\n4.用户达成提现要求即可提现到账,为保障全体用户利益,对有作弊嫌疑的用户,需经过审核验证或者满足活跃条件才可全部提现,否则不能提现;\n\n5.若发现用户有恶意作弊行为,一律封禁账号并扣除账户所有余额。",
    extract_status: 3,
    finishNum: 4,
    free_lottery_flag: 1,
    game_level: 5,
    gender: "保密",
    gold_balance: 37426,
    guide_step_new: 6,
    headimgurl: "",
    is_reviewer: 0,
    is_tourists: true,
    level: 1,
    level_circle: {
      base_level: 8,
      round_list: [1, 1, 1, 3, 9],
      sign: 15
    },
    nickname: null,
    novice_extract: 0,
    novice_status: 0,
    prop_info: [{
      code: 2,
      count: 2,
      name: "刷新"
    }, {
      code: 1,
      count: 2,
      name: "指定炮台"
    }],
    reco_switch: 1,
    safe_guide: 70,
    sign_point: 1,
    task_point: 0,
    win_game_count: 1,
    wufu_info: {
      wufu_1: 0,
      wufu_2: 0,
      wufu_3: 0,
      wufu_4: 0,
      wufu_5: 0,
      wufu_6: 0,
      wufu_7: 0
    },
    wufu_list: [],
    wufu_reward: null
  };
})();