import axios from 'axios';
import fs from 'fs';
import path from 'path';
import readline from 'readline';

const API_URL = 'http://localhost:3001/api/images';
const IMAGE_PATH = path.join(__dirname, 'image.png');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function readImage(): Promise<string> {
  const imageBuffer = fs.readFileSync(IMAGE_PATH);
  return imageBuffer.toString('base64');
}

function askMemeName(): Promise<string> {
  return new Promise((resolve) => {
    rl.question('Enter the name for the meme character: ', (name) => {
      resolve(name);
    });
  });
}

async function analyzeImage(image: string, memeName: string): Promise<any> {
  try {
    const response = await axios.post(`${API_URL}/analyze`, {
      image,
      memeName
    });
    return response.data;
  } catch (error: any) {
    console.error('Error analyzing image:', error.response?.data || error.message);
    throw error;
  }
}

async function chat(message: string, description: string, memeName: string): Promise<string> {
  try {
    const response = await axios.post(`${API_URL}/chat`, {
      message,
      description,
      memeName
    });
    return response.data.message;
  } catch (error: any) {
    console.error('Error in chat:', error.response?.data || error.message);
    throw error;
  }
}

async function startChat(description: string, memeName: string) {
  console.log('\nChat started! (Type "exit" to end the conversation)');
  
  const askQuestion = () => {
    rl.question('You: ', async (message) => {
      if (message.toLowerCase() === 'exit') {
        rl.close();
        return;
      }

      try {
        const reply = await chat(message, description, memeName);
        console.log(`${memeName}: ${reply}\n`);
        askQuestion();
      } catch (error) {
        console.error('Error:', error);
        rl.close();
      }
    });
  };

  askQuestion();
}

async function main() {
  try {
    console.log('Reading image...');
    const image = await readImage();
    
    const memeName = await askMemeName();
    console.log('\nAnalyzing image...');
    
    const analysisResult = await analyzeImage(image, memeName);
    
    console.log('\nAnalysis Result:');
    console.log(JSON.stringify(analysisResult.analysis, null, 2));

    const description = JSON.stringify(analysisResult.analysis);

    console.log('\nStarting chat with the character...');
    await startChat(description, memeName);

  } catch (error) {
    console.error('Error in main:', error);
    rl.close();
  }
}

main(); 