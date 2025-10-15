export default function ChatMessage({ sender, text }) {
  const isBot = sender === "Bot";

  return (
    <div
      className={`flex ${
        isBot ? "justify-start" : "justify-end"
      }`}
    >
      <div
        className={`px-4 py-2 rounded-2xl max-w-xs ${
          isBot
            ? "bg-gray-200 text-gray-800"
            : "bg-blue-600 text-white"
        }`}
      >
        <p className="text-sm">
          <span className="font-semibold">{sender}: </span>
          {text}
        </p>
      </div>
    </div>
  );
}
