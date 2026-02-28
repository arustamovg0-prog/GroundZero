import { useState, useRef, useEffect, FormEvent } from "react";
import { X, Send, Bot, User, AlertCircle } from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from "motion/react";

export function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<
    { role: "user" | "bot"; text: string }[]
  >([
    {
      role: "bot",
      text: "Здравствуйте! Я AI-ассистент Ground Zero. Для скольких человек вы ищете рабочее пространство?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e?: FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setIsLoading(true);
    setIsError(false);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = `
        Ты AI-квалификатор коворкинга Ground Zero. 
        Твоя задача - определить подходящий продукт на основе количества человек, которое назовет пользователь.
        Правила:
        - 1-3 человека: Предложи "Open Space" (Hot Desk / Personal Desk).
        - 4-15 человек: Предложи "Team Office" (Готовый изолированный офис).
        - 20+ человек: Предложи "Корпоративное решение" (Отдельный этаж) и попроси оставить контактные данные для передачи менеджеру.
        
        Отвечай коротко, вежливо и по делу.
        
        История диалога:
        ${messages.map((m) => `${m.role === "bot" ? "Ты" : "Пользователь"}: ${m.text}`).join("\n")}
        Пользователь: ${userMsg}
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      setMessages((prev) => [
        ...prev,
        { role: "bot", text: response.text || "Извините, я не понял." },
      ]);

      // Simulate CRM Tagging if qualified
      if (userMsg.match(/\d+/)) {
        console.log("[CRM Sync] Lead Qualified via AI. Segment Tag applied.");
      }
    } catch (err) {
      console.error("AI Chat Error:", err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-40 bg-primary text-primary-foreground p-4 rounded-full shadow-2xl hover:bg-primary/90 transition-transform hover:scale-105"
      >
        <Bot className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[350px] h-[500px] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="bg-primary p-4 flex justify-between items-center text-primary-foreground">
              <div className="flex items-center gap-2 font-medium">
                <Bot className="w-5 h-5" /> AI-Консультант
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-primary-foreground/20 p-1 rounded-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-background">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                  >
                    {msg.role === "user" ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4" />
                    )}
                  </div>
                  <div
                    className={`p-3 rounded-2xl text-sm max-w-[80%] ${msg.role === "user" ? "bg-primary text-primary-foreground rounded-tr-none" : "bg-card border border-border rounded-tl-none"}`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0 text-muted-foreground">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="p-3 rounded-2xl bg-card border border-border rounded-tl-none flex gap-1 items-center">
                    <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"></span>
                    <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce delay-75"></span>
                    <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce delay-150"></span>
                  </div>
                </div>
              )}
              {isError && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs flex flex-col gap-2">
                  <div className="flex items-center gap-1 font-bold">
                    <AlertCircle className="w-4 h-4" /> Ошибка соединения
                  </div>
                  <p>
                    AI временно недоступен. Пожалуйста, воспользуйтесь
                    стандартной формой заявки.
                  </p>
                  <a href="/contacts" className="underline font-medium">
                    Перейти к форме
                  </a>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form
              onSubmit={handleSend}
              className="p-3 bg-card border-t border-border flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Напишите сообщение..."
                className="flex-1 bg-background border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary"
                disabled={isLoading || isError}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading || isError}
                className="bg-primary text-primary-foreground p-2 rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
