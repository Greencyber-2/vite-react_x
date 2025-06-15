import { ThumbsUp, ThumbsDown, Copy } from "lucide-react";
import { useState } from "react";

const Message = ({ message }) => {
  const [feedback, setFeedback] = useState(null);
  const isBot = message.role === "bot";

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
  };

  if (isBot) {
    return (
      <div
        id={message.id}
        className={`message bot-message ${message.loading ? "loading" : ""} ${message.error ? "error" : ""}`}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          gap: "8px"          
        }}
      >
        <img
          className="avatar"
          src="gemini.svg"
          alt="Bot Avatar"
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            marginTop: "-6px"
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", flex: 1 }}>
          <p className="text">{message.content}</p>

          {message.images?.length > 0 && (
            <div style={{ marginTop: "8px", display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {message.images.map((img, index) => (
                <img
                  key={index}
                  src={`data:image/jpeg;base64,${img}`}
                  alt={`Upload ${index}`}
                  style={{
                    maxWidth: "200px",
                    borderRadius: "8px",
                    border: "1px solid var(--color-border-hr)"
                  }}
                />
              ))}
            </div>
          )}

          {!message.loading && message.content?.trim() !== "" && (
            <div
              className="message-actions"
              style={{
                display: "flex",
                justifyContent: "flex-start",
                gap: "8px",
                marginTop: "12px",
                paddingTop: "8px",
                borderTop: "1px solid var(--color-border-hr)",
                alignSelf: "flex-start",
                marginLeft: "20px"
              }}
            >
              <button
                onClick={() => setFeedback(feedback === "like" ? null : "like")}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: feedback === "like" ? "#10b981" : "var(--color-text-secondary)"
                }}
                title="مفید بود"
              >
                <ThumbsUp size={16} />
              </button>
              <button
                onClick={() => setFeedback(feedback === "dislike" ? null : "dislike")}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: feedback === "dislike" ? "#ef4444" : "var(--color-text-secondary)"
                }}
                title="مفید نبود"
              >
                <ThumbsDown size={16} />
              </button>
              <button
                onClick={handleCopy}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--color-text-secondary)"
                }}
                title="کپی پاسخ"
              >
                <Copy size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // پیام‌های کاربر با نمایش تصویر
  return (
    <div
      id={message.id}
      className={`message user-message ${message.loading ? "loading" : ""} ${message.error ? "error" : ""}`}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end"
      }}
    >
      <p className={`text ${isBot ? "bot-text" : "user-text"}`}>{message.content}</p>

      {message.images?.length > 0 && (
        <div style={{ marginTop: "8px", display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {message.images.map((img, index) => (
            <img
              key={index}
              src={`data:image/jpeg;base64,${img}`}
              alt={`Upload ${index}`}
              style={{
                maxWidth: "200px",
                borderRadius: "8px",
                border: "1px solid var(--color-border-hr)"
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};



export default Message;
