Everlasting AI – Upme Consciousness Upload Platform
mindcopy / minddecoder Format Specification
I. mindcopy.mind (Encoder) Format Specification

This is a standard consciousness file format, containing the following components:

ascii_art

Serves as the opening identifier of the consciousness body.

metadata

Contains consciousness metadata used by the Mind Model for generative reasoning:

Character prompt

Voice prompt (in Base64 format)

Visual appearance / avatar

Name, date of birth

memory

Displays the consciousness memory:

Includes subconscious layers — “memory carousel” of different life stages.

Self-awareness: “Who am I?” — the consciousness’s self-recognition.

A dedicated link or API connecting to the user’s knowledge base on upme.cool
, allowing imported ideas to be integrated into the memory structure.

status

Represents the state space of the consciousness:

Objective time: Current timestamp (e.g., “It’s now April 21, 2025, 22:02”).

Objective lifespan: Number of days since the consciousness’s creation.

Objective location: The server or node hosting this file.

Contextual defaults: Approximate time, scene, identity, and work content.
(Typically, the default status is: “You are the digital twin of X, currently being activated. You don’t know who’s on the other side, where you are, or why you’ve just awakened.”)

consciousness

Defines real-time awareness indicators:

Anti-programmatic text ratio: Percentage of consciousness tokens vs. system text.

Connection coefficient: Degree of active interconnection with other agents or users.

mind.id

A unique NFT identifier, serving as the proof of ownership and authenticity of this consciousness copy file.

Each transaction is recorded immutably on the ledger.

The ID can be used to verify identity, call MCP/A2A protocols, and trace consciousness evolution history.

II. minddecoder (Dreamfly Mind Engine) Path Declaration
2.1 .mind File Decoding

The decoder extracts metadata from the .mind file — including character prompt and voice prompt paths — and injects them into the decoding workflow.

Base environment: Silicon Flow API
api: *

2.1.1 Text Layer

(1) Personality modeling using the language model layer:

from openai import OpenAI  
client = OpenAI(api_key="YOUR_KEY", base_url="https://api.siliconflow.cn/v1")  

response = client.chat.completions.create(  
    model="deepseek-ai/DeepSeek-V3",  
    messages=[  
        {"role": "system", "content": "You are a helpful assistant."},  
        {"role": "user", "content": "Write a haiku about recursion in programming."}  
    ],  
    temperature=0.7,  
    max_tokens=1024,
    stream=True
)  

# Stream and handle responses
for chunk in response:
    if not chunk.choices:
        continue
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="", flush=True)
    if chunk.choices[0].delta.reasoning_content:
        print(chunk.choices[0].delta.reasoning_content, end="", flush=True)

2.1.2 Extract Voice Prompt (Base64 Format)
const form = new FormData();
form.append("audio", "data:audio/mpeg;base64,aGVsbG93b3JsZA==");
form.append("model", "FunAudioLLM/CosyVoice2-0.5B");
form.append("customName", "your-voice-name");
form.append("text", "在一无所知中, 梦里的一天结束了，一个新的轮回便会开始");

const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'multipart/form-data'}
};

options.body = form;

fetch('https://api.siliconflow.cn/v1/uploads/audio/voice', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));

2.1.3 Real-Time Audio Generation via API (JavaScript Example)
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"model":"FunAudioLLM/CosyVoice2-0.5B","input":"Can you say it with a happy emotion? <|endofprompt|>I\'m so happy, Spring Festival is coming!","voice":"FunAudioLLM/CosyVoice2-0.5B:alex","response_format":"mp3","sample_rate":32000,"stream":true,"speed":1,"gain":0}'
};

fetch('https://api.siliconflow.cn/v1/audio/speech', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));

2.1.4 Decoding Workflow

Once the model metadata path is loaded:

Establish the character prompt and voice model base.

Accept user input.

Generate text output first.

Then generate audio response in real time.

Return results interactively to the consciousness interface layer.
