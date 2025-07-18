import { Menu, Moon, Plus, Sparkles, Sun, Trash2, User } from "lucide-react";

const Sidebar = ({ 
  isSidebarOpen, 
  setIsSidebarOpen, 
  conversations, 
  setConversations, 
  activeConversation, 
  setActiveConversation, 
  theme, 
  setTheme,
  setIsProfileOpen // اضافه کردن prop جدید
}) => {
  // Create new conversation
  const createNewConversation = () => {
    const emptyConversation = conversations.find((conv) => conv.messages.length === 0);
    if (emptyConversation) {
      setActiveConversation(emptyConversation.id);
      return;
    }
    const newId = `conv-${Date.now()}`;
    setConversations([{ id: newId, title: "New Chat", messages: [] }, ...conversations]);
    setActiveConversation(newId);
  };

  // Delete conversation
  const deleteConversation = (id, e) => {
    e.stopPropagation();
    if (conversations.length === 1) {
      const newConversation = { id: "default", title: "New Chat", messages: [] };
      setConversations([newConversation]);
      setActiveConversation("default");
    } else {
      const updatedConversations = conversations.filter((conv) => conv.id !== id);
      setConversations(updatedConversations);
      if (activeConversation === id) {
        const nextConversation = updatedConversations[0];
        setActiveConversation(nextConversation.id);
      }
    }
  };

  // Handle profile click
  const handleProfileClick = () => {
    setIsProfileOpen(true); // باز کردن پروفایل
  };

  return (
    <aside className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <button className="sidebar-toggle" onClick={() => setIsSidebarOpen((prev) => !prev)}>
          <Menu size={18} />
        </button>
        <button className="new-chat-btn" onClick={createNewConversation}>
          <Plus size={20} />
          <span>New chat</span>
        </button>
      </div>

      {/* Conversation List */}
      <div className="sidebar-content">
        <h2 className="sidebar-title">Chat history</h2>
        <ul className="conversation-list">
          {conversations.map((conv) => (
            <li 
              key={conv.id} 
              className={`conversation-item ${activeConversation === conv.id ? "active" : ""}`} 
              onClick={() => setActiveConversation(conv.id)}
            >
              <div className="conversation-icon-title">
                <div className="conversation-icon">
                  <Sparkles size={14} />
                </div>
                <span className="conversation-title">{conv.title}</span>
              </div>
              <button 
                className={`delete-btn ${conversations.length > 1 || conv.title !== "New Chat" ? "" : "hide"}`} 
                onClick={(e) => deleteConversation(conv.id, e)}
              >
                <Trash2 size={16} />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Profile and Theme Toggle */}
      <div className="sidebar-footer">
        <button className="profile-btn" onClick={handleProfileClick}>
          <User size={20} />
          <span>My Profile</span>
        </button>
        <button className="theme-toggle" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          {theme === "light" ? (
            <>
              <Moon size={20} />
              <span>Dark mode</span>
            </>
          ) : (
            <>
              <Sun size={20} />
              <span>Light mode</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;