import { ArrowUp, Paperclip } from "lucide-react";
import { useState, useRef } from "react";

const PromptForm = ({ conversations, setConversations, activeConversation, generateResponse, isLoading, setIsLoading }) => {
  const [promptText, setPromptText] = useState("");
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newImages = [];
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
          newImages.push(event.target.result.split(',')[1]);
          if (newImages.length === files.length) {
            setImages(prev => [...prev, ...newImages]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading || (!promptText.trim() && images.length === 0)) return;
    setIsLoading(true);
    
    const currentConvo = conversations.find((convo) => convo.id === activeConversation) || conversations[0];
    let newTitle = currentConvo.title;
    
    if (currentConvo.messages.length === 0) {
      newTitle = promptText.length > 25 ? promptText.substring(0, 25) + "..." : promptText || "Image Chat";
    }

    const userMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: promptText,
      images: images.length > 0 ? images : undefined,
    };

    const apiConversation = {
      ...currentConvo,
      messages: [...currentConvo.messages, userMessage],
    };

    setConversations(conversations.map((conv) => 
      (conv.id === activeConversation ? 
        { ...conv, title: newTitle, messages: [...conv.messages, userMessage] } : 
        conv)
    ));

    setPromptText("");
    setImages([]);

    setTimeout(() => {
      const botMessageId = `bot-${Date.now()}`;
      const botMessage = {
        id: botMessageId,
        role: "bot",
        content: "Just a sec...",
        loading: true,
      };
      
      setConversations((prev) => 
        prev.map((conv) => 
          (conv.id === activeConversation ? 
            { ...conv, title: newTitle, messages: [...conv.messages, botMessage] } : 
            conv)
        )
      );
      
      generateResponse(apiConversation, botMessageId);
    }, 300);
  };

  // ... (بقیه کدها بدون تغییر)
  return (
    <div className="prompt-wrapper">
      {images.length > 0 && (
        <div className="image-preview-container">
          {images.map((img, index) => (
            <div key={index} className="image-preview-item">
              <img 
                src={`data:image/jpeg;base64,${img}`} 
                alt={`Preview ${index}`} 
                className="image-preview"
              />
              <button 
                className="remove-image-btn" 
                onClick={() => removeImage(index)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
      <form className="prompt-form" onSubmit={handleSubmit}>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          multiple
          style={{ display: 'none' }}
        />
        <input 
          placeholder="از Gemini بپرسید ..." 
          className="prompt-input" 
          value={promptText} 
          onChange={(e) => setPromptText(e.target.value)} 
          required
          dir="rtl"
        />
        <button 
          type="button" 
          className="attach-image-btn"
          onClick={() => fileInputRef.current.click()}
        >
          <Paperclip size={18} />
        </button>
        <button 
          type="submit" 
          className="send-prompt-btn"
          disabled={isLoading || (!promptText.trim() && images.length === 0)}
        >
          <ArrowUp size={20} />
        </button>
      </form>
    </div>
  );
// ... (بقیه کدها بدون تغییر)
};

export default PromptForm;