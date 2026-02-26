// API配置文件
// 注意：请确保此文件已添加到.gitignore中，避免泄露API密钥

export const API_CONFIG = {
  // OpenAI API配置
  openai: {
    endpoint: 'https://api.openai.com/v1/chat/completions',
    apiKey: 'YOUR_OPENAI_API_KEY',
  },
  
  // 百度文心一言API配置
  baidu: {
    endpoint: 'https://qianfan.baidubce.com/v2/chat/completions',
    apiKey: 'bce-v3/ALTAK-YEO5FrR5bnT5iSBr6pUeU/0df5dd1ddbea5f7e1bfa9a105a212ada81dbeb1f', // 完整的API Key
  },
  
  // 其他大语言模型API配置（可选）
  // 例如：Anthropic Claude
  anthropic: {
    endpoint: 'https://api.anthropic.com/v1/messages',
    apiKey: 'YOUR_ANTHROPIC_API_KEY',
  },
};

// 默认使用的API服务
export const DEFAULT_API_SERVICE: 'openai' | 'baidu' | 'anthropic' = 'baidu';
