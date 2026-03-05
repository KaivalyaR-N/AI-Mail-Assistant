📧 AI Mail Assistant

An AI-powered email writing assistant that helps users generate professional emails instantly.
It uses Google Gemini AI to understand prompts and automatically generate well-structured email replies or drafts.

This tool saves time by helping users quickly create formal, professional, or casual emails with minimal input.

🚀 Features

✉️ Generate emails using AI

🧠 Powered by Google Gemini API

⚡ Fast and responsive interface

📝 Generates structured email responses

🎯 Supports multiple tones (formal, casual, professional)

🔄 Regenerate responses instantly

📋 Copy generated email with one click

🛠️ Tech Stack

Frontend

React

TypeScript

Vite

AI Integration

Google Gemini API (@google/genai)

Styling

CSS / Tailwind (depending on your implementation)

📂 Project Structure
ai-mail-assistant
│
├── src
│   ├── components
│   │   ├── EmailForm.tsx
│   │   ├── Output.tsx
│   │
│   ├── pages
│   │   └── Home.tsx
│   │
│   ├── services
│   │   └── gemini.ts
│   │
│   └── App.tsx
│
├── public
├── package.json
└── README.md
⚙️ Installation

Clone the repository

git clone https://github.com/your-username/ai-mail-assistant.git

Go to the project directory

cd ai-mail-assistant

Install dependencies

npm install

Start the development server

npm run dev
🔑 Environment Variables

Create a .env file in the root folder.

VITE_GEMINI_API_KEY=your_api_key_here

Get your API key from Google AI Studio.

💡 Example Use Case

User Input:

Write a professional email requesting leave for 2 days due to personal reasons.

AI Output:

Subject: Request for Leave

Dear [Manager Name],

I hope you are doing well. I would like to request leave for two days due to personal reasons.

Please let me know if any arrangements are required from my side.

Thank you for your understanding.

Best regards,
[Your Name]
📸 Screenshots

(Add screenshots of your UI here)

/screenshots/ui.png
🔮 Future Improvements

Gmail integration

Tone selection

Email summarization

Reply suggestion from inbox emails

Chrome extension

🤝 Contributing

Contributions are welcome.

Fork the repository

Create a new branch

Commit changes

Open a Pull Request

📄 License

This project is licensed under the MIT License.

👨‍💻 Author

Kaivalya Narvekar

Frontend Developer | AI Enthusiast
