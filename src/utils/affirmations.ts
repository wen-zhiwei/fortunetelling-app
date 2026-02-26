import { FortuneType } from './fortune';
import axios from 'axios';
import { API_CONFIG, DEFAULT_API_SERVICE } from './apiConfig';

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
  // 下签：坚定自我，肯定当下能力
  xia: [
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
  
  // 上签：引导复盘，聚焦规划与行动
  shang: [
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

// 缓存机制
export const cache: Record<string, { data: Affirmation; timestamp: number }> = {};
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24小时

// 暴露到全局作用域，方便调试
if (typeof window !== 'undefined') {
  (window as any).affirmationCache = cache;
}

// 获取签文提示词
const getPrompt = (fortune: FortuneType, language: 'zh' | 'en'): string => {
  const prompts = {
    zh: {
      xia: "请生成一句5-15字的积极肯定语，风格坚定自我，肯定当下能力，适合作为下签的鼓励语。",
      zhong: "请生成一句5-15字的积极肯定语，风格鼓励积累，接受慢成长，适合作为中签的鼓励语。",
      shang: "请生成一句5-15字的积极肯定语，风格引导复盘，聚焦规划与行动，适合作为上签的引导语。"
    },
    en: {
      xia: "Please generate a positive affirmation of 5-15 words, with a style that affirms oneself and current abilities, suitable as encouragement for a lower fortune.",
      zhong: "Please generate a positive affirmation of 5-15 words, with a style that encourages accumulation and accepts slow growth, suitable as encouragement for a middle fortune.",
      shang: "Please generate a positive affirmation of 5-15 words, with a style that guides reflection, focuses on planning and action, suitable as guidance for an upper fortune."
    }
  };
  return prompts[language][fortune];
};

// 调用大语言模型API生成签文
export const generateAffirmation = async (fortune: FortuneType, language: 'zh' | 'en'): Promise<string> => {
  // 检查缓存
  const cacheKey = `${fortune}_${language}`;
  if (cache[cacheKey] && Date.now() - cache[cacheKey].timestamp < CACHE_DURATION) {
    return cache[cacheKey].data[language];
  }

  try {
    const prompt = getPrompt(fortune, language);
    
    if (DEFAULT_API_SERVICE === 'openai') {
      const response = await axios.post(
        API_CONFIG.openai.endpoint,
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "你是一个专业的签文生成助手，擅长创作积极正面的肯定语。"
            },
            {
              role: "user",
              content: prompt
            }
          ],
          max_tokens: 50,
          temperature: 0.7
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_CONFIG.openai.apiKey}`
          }
        }
      );

      const generatedText = response.data.choices[0].message.content.trim();
      
      // 更新缓存
      const existingAffirmation = cache[cacheKey]?.data || { zh: "", en: "" };
      cache[cacheKey] = {
        data: {
          ...existingAffirmation,
          [language]: generatedText
        },
        timestamp: Date.now()
      };

      return generatedText;
    } else if (DEFAULT_API_SERVICE === 'baidu') {
      // 直接使用提供的完整API Key作为access_token
      const accessToken = API_CONFIG.baidu.apiKey;

      // 百度文心一言API调用
      const response = await axios.post(
        API_CONFIG.baidu.endpoint,
        {
          model: "ernie-3.5-8k",
          messages: [
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.7
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
          }
        }
      );

      const generatedText = response.data.choices[0].message.content.trim();
      
      // 更新缓存
      const existingAffirmation = cache[cacheKey]?.data || { zh: "", en: "" };
      cache[cacheKey] = {
        data: {
          ...existingAffirmation,
          [language]: generatedText
        },
        timestamp: Date.now()
      };

      return generatedText;
    } else {
      // 其他API服务的实现
      throw new Error(`Unsupported API service: ${DEFAULT_API_SERVICE}`);
    }
  } catch (error) {
    console.error('Error generating affirmation:', error);
    // 失败时使用本地库
    return getLocalAffirmation(fortune, language);
  }
};

// 从本地库获取签文
const getLocalAffirmation = (fortune: FortuneType, language: 'zh' | 'en'): string => {
  const affirmations = affirmationLibrary[fortune];
  const randomIndex = Math.floor(Math.random() * affirmations.length);
  return affirmations[randomIndex][language];
};

// 获取随机签文（优先使用API生成）
export const getRandomAffirmation = async (fortune: FortuneType, language: 'zh' | 'en'): Promise<string> => {
  try {
    return await generateAffirmation(fortune, language);
  } catch (error) {
    console.error('Error getting random affirmation:', error);
    return getLocalAffirmation(fortune, language);
  }
};

// 同步版本（用于需要立即返回的场景）
export const getRandomAffirmationSync = (fortune: FortuneType, language: 'zh' | 'en'): string => {
  // 检查缓存
  const cacheKey = `${fortune}_${language}`;
  if (cache[cacheKey] && Date.now() - cache[cacheKey].timestamp < CACHE_DURATION) {
    return cache[cacheKey].data[language];
  }
  
  // 使用本地库
  return getLocalAffirmation(fortune, language);
};
