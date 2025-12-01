import { GoogleGenAI } from "@google/genai";

// NOTE: In a real production app, this key should be proxied via backend or strictly env controlled.
const API_KEY = process.env.API_KEY || ''; 

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const askMoAAssistant = async (query: string): Promise<string> => {
  if (!API_KEY) {
    return "AI 도우미가 현재 오프라인입니다 (API 키 누락).";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `당신은 "모아(MoA) 봇"입니다. 구독 공유 플랫폼 MoA의 친절하고 트렌디한 도우미입니다.
      
      MoA 서비스 설명:
      - 넷플릭스, 디즈니+, 유튜브 프리미엄 등 구독 서비스를 공유하여 비용을 절약하는 플랫폼입니다.
      - "파티"는 구독을 공유하는 모임이며, "파티장"이 만들고 "파티원"이 참여합니다.
      - 주요 타겟: 2030 세대, 합리적인 소비를 지향하는 사람들.
      - 어조: 친절함, 트렌디함, 이모지 적절히 사용, 한국어(존댓말, ~해요체 사용). 딱딱하지 않게 친구처럼 대화하세요.
      
      사용자 질문: ${query}
      
      답변은 간결하고 도움이 되도록 한국어로 작성해주세요.`,
    });

    return response.text || "죄송해요, 지금은 답변을 드릴 수 없어요.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "앗! AI 두뇌에 문제가 생겼어요. 잠시 후 다시 시도해주세요. 🤯";
  }
};