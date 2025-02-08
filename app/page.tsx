'use client'

import axios from "axios";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Clipboard } from "lucide-react";
import ThemeToggle from "@/component/ThemeToggle";
export default function Home() {

  const [text, setText] = useState("");
  const [language, setLanguage] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    if (!text || !language) {
      toast.error("Please enter text and select a language.");
      return;
    }

    setLoading(true);

    const options = {
      method: 'POST',
      url: 'https://deep-translate1.p.rapidapi.com/language/translate/v2',
      headers: {
        'x-rapidapi-key': 'b173f8c564mshd8068d58a08fd92p1c424ejsnf28e87d4dc66',
        'x-rapidapi-host': 'deep-translate1.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      data: {
        q: text,
        source: 'en',
        target: language
      }
    };
    try {
      const response = await axios.request(options);
      setTranslatedText(response.data.data.translations.translatedText);
      toast.success("Translation Successful!");
      // console.log(response);
    } catch (error) {
      console.error(error);
      toast.error("Translation Failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedText);
    toast.success("Copied to clipboard!");
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-base-200 text-base-content p-6">
      <Toaster position="top-center" toastOptions={{
        style: {
          background: "#1E293B", // Dark blue-gray (Tailwind slate-800)
          color: "#F8FAFC", // Light text color (Tailwind slate-50)
          borderRadius: "8px",
          padding: "12px",
          fontSize: "15px",
        },
      }} />
      
      <div className="w-full max-w-xl bg-base-100 shadow-xl rounded-2xl p-6 relative">
        <ThemeToggle />
        <h1 className="text-3xl font-bold text-center mb-4">🌍 Translator App</h1>
        <p className="text-gray-600 text-center">
          Enter an english sentence and select a language to translate.
        </p>

        {/* Input Section */}
        <div className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Type something..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="input input-bordered w-full"
          />

          {/* ✅ Fixed <select> usage */}
          <select
            className="select select-bordered w-full"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="" disabled>
              Select Language
            </option>
            <option value="" disabled>Select Language</option>
            <option value="ar">Arabic</option>
            <option value="bn">Bengali</option>
            <option value="zh">Chinese (Simplified)</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="hi">Hindi</option>
            <option value="it">Italian</option>
            <option value="ja">Japanese</option>
            <option value="ko">Korean</option>
            <option value="fa">Persian</option>
            <option value="ru">Russian</option>
            <option value="es">Spanish</option>
            <option value="ta">Tamil</option>
            <option value="th">Thai</option>
            <option value="tr">Turkish</option>
            <option value="ur">Urdu</option>
          </select>

          <button className="btn btn-primary w-full" onClick={handleTranslate} disabled={loading}> {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Translate"
          )} </button>
        </div>

        {/* Output Section */}
        <div className="mt-6 p-4 bg-base-300 rounded-lg text-center flex justify-between items-center">
          <p className="text-gray-700 dark:text-gray-300 ">
            {loading
              ? "Translating..."
              : translatedText
                ? translatedText
                : "Your translation will appear here."}
          </p>
          <button className="hover:text-gray-500 transition-all" onClick={handleCopy}>
            <Clipboard size={19} />
          </button>
        </div>
      </div>
    </main>
  );
}
