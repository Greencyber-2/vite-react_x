import { ArrowLeft, Construction, User, Settings, HelpCircle, LogOut } from "lucide-react";
import { useState, useEffect } from "react";

const Profile = ({ onClose }) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // Simulate construction progress
    const timer = setInterval(() => {
      setProgress(prev => (prev >= 85 ? 85 : prev + 5));
    }, 300);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="profile-container">
      {/* Header */}
      <div className="profile-header">
        <button onClick={onClose} className="back-btn" aria-label="بازگشت">
          <ArrowLeft size={20} />
        </button>
        <h2>پروفایل کاربری</h2>
        <div className="header-actions">
          <button className="action-btn" aria-label="تنظیمات">
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="profile-content">
        {/* User Info Section */}
        <div className="user-card">
          <div className="avatar-container">
            <div className="avatar">
              <User size={48} />
            </div>
            <div className="status-indicator"></div>
          </div>
          <h3 className="username">کاربر مهمان</h3>
          <p className="user-email">example@rockstar.com</p>
        </div>

        {/* Construction Notice */}
        <div className="construction-notice">
          <div className="construction-icon">
            <Construction size={80} />
          </div>
          <h3>این بخش در حال توسعه است</h3>
          <p>ما در حال ساخت تجربه بهتری برای شما هستیم</p>
          
          {/* Progress Bar */}
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            <span className="progress-text">{progress}% تکمیل شده</span>
          </div>
        </div>

        {/* Menu Items */}
        <div className="profile-menu">
          <button className="menu-item">
            <HelpCircle size={20} />
            <span>راهنما و پشتیبانی</span>
          </button>
          <button className="menu-item logout">
            <LogOut size={20} />
            <span>خروج از حساب کاربری</span>
          </button>
        </div>

        {/* Team Signature */}
        <div className="team-signature">
          <span>با ❤️ برای یازدهمین جشنواره نوجوانان خوارزمی</span>
          <small>نسخه ۱.۰.۰</small>
        </div>
      </div>
    </div>
  );
};

export default Profile;
