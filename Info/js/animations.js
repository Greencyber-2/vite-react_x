//😍بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِیمِ😍
document.addEventListener('DOMContentLoaded', function() {
    const heroElements = document.querySelectorAll('.hero-title span, .hero-description, .hero-buttons');
    
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.5 });
    
    heroElements.forEach(el => {
        heroObserver.observe(el);
    });
    
    const featureCards = document.querySelectorAll('.feature-card');
    
    const featureObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 200);
            }
        });
    }, { threshold: 0.1 });
    
    featureCards.forEach(card => {
        featureObserver.observe(card);
    });
    
    const downloadCards = document.querySelectorAll('.download-card');
    
    const downloadObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 150);
            }
        });
    }, { threshold: 0.1 });
    
    downloadCards.forEach(card => {
        downloadObserver.observe(card);
    });
    
    const mathShapes = document.querySelectorAll('.math-shapes div');
    
    const shapesObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                mathShapes.forEach((shape, index) => {
                    setTimeout(() => {
                        shape.classList.add('animate');
                    }, index * 300);
                });
            }
        });
    }, { threshold: 0.5 });
    
    const aboutSection = document.querySelector('.about');
    if (aboutSection) {
        shapesObserver.observe(aboutSection);
    }
    
    const equation = document.querySelector('.equation');
    const solution = document.querySelector('.solution');
    
    if (equation && solution) {
        setInterval(() => {
            equation.style.animation = 'none';
            solution.style.animation = 'none';
            void equation.offsetWidth;
            void solution.offsetWidth; 
            
            const a = Math.floor(Math.random() * 5) + 1;
            const b = Math.floor(Math.random() * 10) + 5;
            const c = a * (Math.floor(Math.random() * 5)) + 5;
            
            equation.textContent = `${a}x + ${b} = ${c}`;
            equation.style.animation = 'fadeIn 1s ease-in-out';
            
            setTimeout(() => {
                solution.textContent = `x = ${(c - b) / a}`;
                solution.style.animation = 'fadeIn 1s ease-in-out';
            }, 1500);
        }, 5000);
    }
    
    const chatMessages = document.querySelector('.chat-messages');
    const chatInput = document.querySelector('.chat-input input');
    const chatSendBtn = document.querySelector('.chat-input button');
    
    if (chatSendBtn) {
        chatSendBtn.addEventListener('click', function() {
            if (chatInput.value.trim() !== '') {
                const userMsg = document.createElement('div');
                userMsg.className = 'message user-message';
                userMsg.innerHTML = `<div class="message-content">${chatInput.value}</div>`;
                chatMessages.appendChild(userMsg);
                
                const userQuestion = chatInput.value;
                chatInput.value = '';
                
                chatMessages.scrollTop = chatMessages.scrollHeight;
                
                setTimeout(() => {
                    const botMsg = document.createElement('div');
                    botMsg.className = 'message bot-message';
                    
                    let botResponse = '';
                    if (userQuestion.includes('حل')) {
                        const a = Math.floor(Math.random() * 5) + 1;
                        const b = Math.floor(Math.random() * 10) + 5;
                        const c = a * (Math.floor(Math.random() * 5)) + 5;
                        const x = (c - b) / a;
                        
                        botResponse = `حل معادله ${a}x + ${b} = ${c}:<br>
                            1. ${b} را از دو طرف کم می‌کنیم: ${a}x = ${c - b}<br>
                            2. دو طرف را بر ${a} تقسیم می‌کنیم: x = ${x}<br>
                            جواب نهایی: x = ${x}`;
                    } else if (userQuestion.includes('ریاضی') || userQuestion.includes('سوفیا')) {
                        botResponse = 'سوفیا+ یک اکوسیستم آموزشی هوشمند برای یادگیری ریاضی است. من می‌توانم به سوالات ریاضی شما پاسخ دهم و مفاهیم را آموزش دهم.';
                    } else {
                        botResponse = 'سلام! من چت‌بات سوفیا+ هستم. می‌توانم به سوالات ریاضی شما پاسخ دهم. لطفاً سوال خود را به صورت واضح بیان کنید.';
                    }
                    
                    botMsg.innerHTML = `<div class="message-content">${botResponse}</div>`;
                    chatMessages.appendChild(botMsg);
                    
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }, 1000);
            }
        });
        
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                chatSendBtn.click();
            }
        });
    }
});
// به نام خویش کردم, ختم و پایان