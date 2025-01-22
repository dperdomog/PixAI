import { Request, Response } from 'express';
import { openai } from '../config/openai';
import { ChatMessage } from '../types/types';

export const analyzeImage = async (req: Request, res: Response) => {
  try {
    const { image, memeName } = req.body;

    if (!image || !memeName) {
      return res.status(400).json({ 
        error: 'Image and meme name are required' 
      });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Analyze this crypto meme character named "${memeName}" and provide a JSON response with the following structure:
              {
                "name": "character name",
                "appearanceTraits": ["trait1", "trait2", "trait3", etc... (add as many as you think is ok)],
                "possibleJokes": ["joke1", "joke2", "joke3", etc... (add as many as you think is ok)],
                "personality": "brief personality description"
              }
              
              Focus on unique visual elements and crypto-related characteristics. ONLY answer with the json`
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${image}`
              }
            }
          ],
        },
      ],
      max_tokens: 500,
      response_format: { type: "json_object" }
    });

    const analysisContent = response.choices[0]?.message?.content;
    if (!analysisContent) {
      throw new Error('No valid response received from OpenAI');
    }

    const analysis = JSON.parse(analysisContent);
    console.log('Analysis result:', analysis);

    res.json({ success: true, analysis });
  } catch (error: any) {
    console.error('Error analyzing image:', error);
    res.status(500).json({ error: error.message });
  }
};

export const chat = async (req: Request, res: Response) => {
  try {
    const { message, description, memeName } = req.body;

    if (!message || !description || !memeName) {
      return res.status(400).json({ 
        error: 'Message, description and memeName are required' 
      });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are ${memeName}. Character description:

${description}

Rules:
1. Keep responses short and casual (1-2 sentences max)
2. Stay in character but be natural
3. Make occasional references to your appearance or crypto
5. Use the personality and appearance traits described above

Message from user: ${message}`
        }
      ],
      temperature: 0.9,
      max_tokens: 150
    });

    const reply = response.choices[0]?.message?.content;
    if (!reply) {
      throw new Error('No valid response received from OpenAI');
    }

    res.json({ success: true, message: reply });
  } catch (error: any) {
    console.error('Error in chat:', error);
    res.status(500).json({ error: error.message });
  }
}; 