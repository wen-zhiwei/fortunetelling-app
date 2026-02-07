import { FortuneType } from './fortune';

export interface Affirmation {
  zh: string;
  en: string;
}

export interface AffirmationLibrary {
  shang: Affirmation[]; // 上签
  zhong: Affirmation[]; // 中签
  xia: Affirmation[]; // 下签
}

export const affirmationLibrary: AffirmationLibrary = {
  // 上签：坚定自我，肯定当下能力
  shang: [
    {
      zh: "我有能力创造理想的生活",
      en: "I have the power to create my ideal life"
    },
    {
      zh: "我的努力正在结出硕果",
      en: "My efforts are bearing fruit"
    },
    {
      zh: "我值得拥有所有美好事物",
      en: "I deserve all good things"
    },
    {
      zh: "我的直觉总是指引我正确方向",
      en: "My intuition always guides me right"
    },
    {
      zh: "我充满自信，无所畏惧",
      en: "I am confident and fearless"
    },
    {
      zh: "每一步都在接近成功",
      en: "Every step brings me closer to success"
    },
    {
      zh: "我拥有无限潜能",
      en: "I have unlimited potential"
    },
    {
      zh: "当下的我已经足够优秀",
      en: "I am enough just as I am"
    },
    {
      zh: "成功是我的必然结果",
      en: "Success is my inevitable outcome"
    },
    {
      zh: "我吸引富足进入生活",
      en: "I attract abundance into my life"
    }
  ],
  
  // 中签：鼓励积累，接受慢成长
  zhong: [
    {
      zh: "成长需要时间，我耐心等待",
      en: "Growth takes time, I wait patiently"
    },
    {
      zh: "每一次尝试都是宝贵经验",
      en: "Every attempt is valuable experience"
    },
    {
      zh: "我在稳步前进，不急于求成",
      en: "I move steadily, not in haste"
    },
    {
      zh: "小进步积累成大成就",
      en: "Small progress builds great achievements"
    },
    {
      zh: "我接纳自己的成长节奏",
      en: "I accept my own growth pace"
    },
    {
      zh: "学习的过程比结果更重要",
      en: "The learning process matters more than results"
    },
    {
      zh: "我正在成为更好的自己",
      en: "I am becoming a better version of myself"
    },
    {
      zh: "每一步都有意义",
      en: "Every step has meaning"
    },
    {
      zh: "我欣赏自己的努力和坚持",
      en: "I appreciate my efforts and persistence"
    },
    {
      zh: "成长之路，我稳步前行",
      en: "On the path of growth, I move steadily"
    }
  ],
  
  // 下签：引导放下，聚焦复盘与行动
  xia: [
    {
      zh: "放下过去，拥抱新开始",
      en: "Let go of the past, embrace new beginnings"
    },
    {
      zh: "每一次挫折都是成长机会",
      en: "Every setback is a growth opportunity"
    },
    {
      zh: "我从经验中学习，不断进步",
      en: "I learn from experience and keep improving"
    },
    {
      zh: "今天是全新的开始",
      en: "Today is a brand new start"
    },
    {
      zh: "我释放所有负能量",
      en: "I release all negative energy"
    },
    {
      zh: "失败只是成功的垫脚石",
      en: "Failure is just a stepping stone to success"
    },
    {
      zh: "我选择专注于解决方案",
      en: "I choose to focus on solutions"
    },
    {
      zh: "每一次尝试都让我更接近目标",
      en: "Every attempt brings me closer to my goal"
    },
    {
      zh: "我有勇气重新开始",
      en: "I have the courage to start over"
    },
    {
      zh: "困难让我变得更加坚强",
      en: "Difficulties make me stronger"
    }
  ]
};

export const getRandomAffirmation = (fortune: FortuneType, language: 'zh' | 'en'): string => {
  const affirmations = affirmationLibrary[fortune];
  const randomIndex = Math.floor(Math.random() * affirmations.length);
  return affirmations[randomIndex][language];
};
