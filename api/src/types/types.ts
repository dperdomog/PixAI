export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ImageAnalysisRequest {
  image: string; // base64
}

export interface ChatRequest {
  imageDescription: string;
  message: string;
  history?: ChatMessage[];
} 