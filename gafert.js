(function () {
    const styles = `
        .n8n-chat-widget {
            --chat--color-primary: var(--n8n-chat-primary-color, #854fff);
            --chat--color-secondary: var(--n8n-chat-secondary-color, #6b3fd4);
            --chat--color-background: var(--n8n-chat-background-color, #ffffff);
            --chat--color-font: var(--n8n-chat-font-color, #333333);
            font-family: 'Geist Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        
        .n8n-chat-widget .chat-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
            display: none;
            width: 380px;
            max-width: calc(100vw - 40px);
            height: 600px;
            max-height: calc(100vh - 40px);
            background: var(--chat--color-background);
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(133, 79, 255, 0.15);
            border: 1px solid rgba(133, 79, 255, 0.2);
            overflow: hidden;
            font-family: inherit;
            transition: all 0.3s ease;
        }

        /* Mobil tam ekran modu */
        @media (max-width: 768px) {
            .n8n-chat-widget .chat-container.open {
                top: 0 !important;
                left: 0 !important;
                right: 0 !important;
                bottom: 0 !important;
                width: 100vw !important;
                height: 100vh !important;
                height: 100dvh !important;
                max-width: 100vw !important;
                max-height: 100vh !important;
                max-height: 100dvh !important;
                border-radius: 0 !important;
                border: none !important;
                margin: 0 !important;
            }

            .n8n-chat-widget .chat-input {
                position: sticky;
                bottom: 0;
                background: var(--chat--color-background);
                z-index: 10;
            }
        }

        .n8n-chat-widget .chat-container.position-left {
            right: auto;
            left: 20px;
        }

        .n8n-chat-widget .chat-container.open {
            display: flex;
            flex-direction: column;
        }

        .n8n-chat-widget .brand-header {
            padding: 16px;
            display: flex;
            align-items: center;
            gap: 12px;
            border-bottom: 1px solid rgba(133, 79, 255, 0.1);
            position: relative;
        }

        .n8n-chat-widget .header-controls {
            position: absolute;
            right: 16px;
            top: 50%;
            transform: translateY(-50%);
            display: flex;
            gap: 8px;
            align-items: center;
        }

        .n8n-chat-widget .sound-toggle {
            background: none;
            border: none;
            color: var(--chat--color-font);
            cursor: pointer;
            padding: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: color 0.2s;
            opacity: 0.6;
        }

        .n8n-chat-widget .sound-toggle:hover {
            opacity: 1;
        }

        .n8n-chat-widget .sound-toggle.speaking {
            animation: sound-pulse 0.8s ease-in-out infinite;
        }

        @keyframes sound-pulse {
            0%, 100% {
                transform: scale(1);
                opacity: 0.6;
            }
            50% {
                transform: scale(1.15);
                opacity: 1;
            }
        }

        .n8n-chat-widget .sound-toggle svg {
            width: 20px;
            height: 20px;
            fill: currentColor;
        }

        .n8n-chat-widget .sound-toggle.muted {
            color: #ff4757;
            opacity: 0.8;
        }

        .n8n-chat-widget .close-button {
            background: none;
            border: none;
            color: var(--chat--color-font);
            cursor: pointer;
            padding: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: color 0.2s;
            font-size: 20px;
            opacity: 0.6;
        }

        .n8n-chat-widget .close-button:hover {
            opacity: 1;
        }

        .n8n-chat-widget .brand-header img {
            width: 32px;
            height: 32px;
        }

        .n8n-chat-widget .brand-header span {
            font-size: 18px;
            font-weight: 500;
            color: var(--chat--color-font);
        }

        .n8n-chat-widget .chat-interface {
            display: flex;
            flex-direction: column;
            height: 100%;
        }

        .n8n-chat-widget .chat-messages {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
            background: var(--chat--color-background);
            display: flex;
            flex-direction: column;
        }

        .n8n-chat-widget .chat-message {
            padding: 12px 16px;
            margin: 8px 0;
            border-radius: 12px;
            max-width: 80%;
            word-wrap: break-word;
            font-size: 14px;
            line-height: 1.5;
        }

        .n8n-chat-widget .chat-message.user {
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            align-self: flex-end;
            box-shadow: 0 4px 12px rgba(133, 79, 255, 0.2);
            border: none;
        }

        .n8n-chat-widget .chat-message.bot {
            background: var(--chat--color-background);
            border: 1px solid rgba(133, 79, 255, 0.2);
            color: var(--chat--color-font);
            align-self: flex-start;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .n8n-chat-widget .chat-input {
            padding: 16px;
            background: var(--chat--color-background);
            border-top: 1px solid rgba(133, 79, 255, 0.1);
            display: flex;
            gap: 8px;
            align-items: flex-end;
        }

        .n8n-chat-widget .chat-input textarea {
            flex: 1;
            padding: 12px;
            border: 1px solid rgba(133, 79, 255, 0.2);
            border-radius: 8px;
            background: var(--chat--color-background);
            color: var(--chat--color-font);
            resize: none;
            font-family: inherit;
            font-size: 16px;
            touch-action: manipulation;
        }

        .n8n-chat-widget .chat-input textarea::placeholder {
            color: var(--chat--color-font);
            opacity: 0.6;
        }

        .n8n-chat-widget .mic-button {
            background: var(--chat--color-background);
            color: var(--chat--color-primary);
            border: 1px solid rgba(133, 79, 255, 0.2);
            border-radius: 8px;
            padding: 12px;
            cursor: pointer;
            transition: all 0.2s;
            font-family: inherit;
            font-weight: 500;
            user-select: none;
            -webkit-tap-highlight-color: transparent;
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 48px;
            min-height: 48px;
        }

        .n8n-chat-widget .mic-button:hover {
            background: rgba(133, 79, 255, 0.1);
        }

        .n8n-chat-widget .mic-button.recording {
            background: linear-gradient(135deg, #ff4757 0%, #ff6348 100%);
            color: white;
            animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
        }

        .n8n-chat-widget .mic-button svg {
            width: 20px;
            height: 20px;
            fill: currentColor;
        }

        .n8n-chat-widget .send-button {
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            border-radius: 8px;
            padding: 12px;
            cursor: pointer;
            transition: all 0.2s;
            font-family: inherit;
            font-weight: 500;
            user-select: none;
            -webkit-tap-highlight-color: transparent;
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 48px;
            min-height: 48px;
        }

        .n8n-chat-widget .send-button:hover {
            transform: scale(1.05);
        }

        .n8n-chat-widget .send-button svg {
            width: 20px;
            height: 20px;
            fill: currentColor;
        }

        .n8n-chat-widget .chat-input button:hover {
            transform: scale(1.05);
        }

        .n8n-chat-widget .chat-toggle {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            border-radius: 30px;
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(133, 79, 255, 0.3);
            z-index: 999;
            transition: transform 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .n8n-chat-widget .chat-toggle.position-left {
            right: auto;
            left: 20px;
        }

        .n8n-chat-widget .chat-toggle:hover {
            transform: scale(1.05);
        }

        .n8n-chat-widget .chat-toggle svg {
            width: 24px;
            height: 24px;
            fill: currentColor;
        }

        .n8n-chat-widget .chat-footer {
            padding: 8px;
            text-align: center;
            background: var(--chat--color-background);
            border-top: 1px solid rgba(133, 79, 255, 0.1);
        }

        .n8n-chat-widget .chat-footer a {
            color: var(--chat--color-primary);
            text-decoration: none;
            font-size: 12px;
            opacity: 0.8;
            transition: opacity 0.2s;
            font-family: inherit;
        }

        .n8n-chat-widget .chat-footer a:hover {
            opacity: 1;
        }

        .n8n-chat-widget .typing-indicator {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 12px 16px;
            background: var(--chat--color-background);
            border: 1px solid rgba(133, 79, 255, 0.2);
            border-radius: 12px;
            align-self: flex-start;
            margin: 8px 0;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .n8n-chat-widget .typing-text {
            font-size: 14px;
            color: var(--chat--color-font);
            opacity: 0.7;
            margin-right: 4px;
        }

        .n8n-chat-widget .typing-dots {
            display: flex;
            gap: 4px;
        }

        .n8n-chat-widget .typing-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: var(--chat--color-primary);
            animation: typing-bounce 1.4s infinite ease-in-out;
        }

        .n8n-chat-widget .typing-dot:nth-child(1) {
            animation-delay: -0.32s;
        }

        .n8n-chat-widget .typing-dot:nth-child(2) {
            animation-delay: -0.16s;
        }

        @keyframes typing-bounce {
            0%, 80%, 100% {
                transform: scale(0.8);
                opacity: 0.5;
            }
            40% {
                transform: scale(1);
                opacity: 1;
            }
        }

        /* Phone Icon Styles */
        .n8n-chat-widget .search-icon-container {
            position: absolute;
            bottom: 140px;
            right: 16px;
            z-index: 5;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .n8n-chat-widget .search-icon-container.visible {
            opacity: 1;
            transform: translateY(0);
        }


        .n8n-chat-widget .search-icon {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(133, 79, 255, 0.3);
            transition: all 0.3s ease;
            font-size: 24px;
        }

        .n8n-chat-widget .search-icon:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 16px rgba(133, 79, 255, 0.4);
        }

        .n8n-chat-widget .search-icon:active {
            transform: scale(0.95);
        }


        @keyframes slideUpFadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    let viewportMeta = document.querySelector('meta[name="viewport"]');
    if (!viewportMeta) {
        viewportMeta = document.createElement('meta');
        viewportMeta.name = 'viewport';
        document.head.appendChild(viewportMeta);
    }
    const currentContent = viewportMeta.content || 'width=device-width, initial-scale=1.0';
    if (!currentContent.includes('maximum-scale')) {
        viewportMeta.content = currentContent + ', maximum-scale=1.0, user-scalable=0';
    }

    const defaultConfig = {
        webhook: { url: '', route: '' },
        branding: {
            logo: '',
            name: '',
            welcomeText: '',
            responseTimeText: '',
            poweredBy: { text: 'Powered by Batu' }
        },
        style: {
            primaryColor: '',
            secondaryColor: '',
            position: 'right',
            backgroundColor: '#ffffff',
            fontColor: '#333333'
        },
        phoneNumber: ''  // Telefon numarası (📞 butonu için)
    };

    const config = window.ChatWidgetConfig ?
        {
            webhook: { ...defaultConfig.webhook, ...window.ChatWidgetConfig.webhook },
            branding: { ...defaultConfig.branding, ...window.ChatWidgetConfig.branding },
            style: { ...defaultConfig.style, ...window.ChatWidgetConfig.style },
            phoneNumber: window.ChatWidgetConfig.phoneNumber || defaultConfig.phoneNumber
        } : defaultConfig;

    if (window.N8NChatWidgetInitialized) return;
    window.N8NChatWidgetInitialized = true;

    let currentSessionId = '';
    let isSoundEnabled = true; // Ses açık mı kapalı mı (başlangıçta AÇIK)
    let selectedVoice = null; // Seçili ses

    // En iyi Türkçe sesi seç (fallback sistemi ile)
    function selectBestTurkishVoice() {
        if (!('speechSynthesis' in window)) return null;

        const voices = speechSynthesis.getVoices();
        console.log('Mevcut sesler:', voices.map(v => v.name + ' (' + v.lang + ')'));

        // Öncelik sırası (en iyiden kötüye)
        const preferredVoices = [
            'Microsoft Eda Online (Natural) - Turkish (Turkey)',
            'Microsoft Emel Online (Natural) - Turkish (Turkey)',
            'Microsoft Ahmet Online (Natural) - Turkish (Turkey)',
            'Eda', // Windows'ta kısa isim
            'Ahmet',
            'Google Türkçe',
            'tr-TR-Standard-D',
            'tr-TR-Standard-A',
            'tr-TR-Wavenet-A'
        ];

        // Öncelikli sesleri ara
        for (const preferred of preferredVoices) {
            const voice = voices.find(v => v.name.includes(preferred));
            if (voice) {
                console.log('Seçilen ses:', voice.name);
                return voice;
            }
        }

        // Hiçbiri yoksa, herhangi bir tr-TR sesi seç
        const turkishVoice = voices.find(v => v.lang.startsWith('tr'));
        if (turkishVoice) {
            console.log('Fallback Türkçe ses:', turkishVoice.name);
            return turkishVoice;
        }

        // Hiç Türkçe ses yoksa null döner (varsayılan kullanılır)
        console.log('Türkçe ses bulunamadı, varsayılan kullanılacak');
        return null;
    }

    // Sesler yüklendiğinde en iyisini seç
    if ('speechSynthesis' in window) {
        speechSynthesis.onvoiceschanged = () => {
            selectedVoice = selectBestTurkishVoice();
        };
        // Hemen bir kez dene (bazı tarayıcılarda sesler hazır)
        selectedVoice = selectBestTurkishVoice();
    }

    function speakText(text, messageElement = null) {
        console.log('speakText çağrıldı, isSoundEnabled:', isSoundEnabled);

        // Eğer ses kapalıysa hiç çalıştırma
        if (!isSoundEnabled) {
            console.log('Ses kapalı, okuma yapılmıyor');
            return;
        }

        if (!('speechSynthesis' in window)) {
            console.warn('Bu tarayıcı Text-to-Speech desteklemiyor');
            return;
        }

        // Eğer ses henüz seçilmediyse tekrar dene
        if (!selectedVoice) {
            selectedVoice = selectBestTurkishVoice();
        }

        console.log('Ses okuma başlıyor:', text.substring(0, 50));
        console.log('Kullanılan ses:', selectedVoice ? selectedVoice.name : 'Varsayılan');
        window.speechSynthesis.cancel();

        setTimeout(() => {
            const utterance = new SpeechSynthesisUtterance(text);

            // Seçili sesi kullan (varsa)
            if (selectedVoice) {
                utterance.voice = selectedVoice;
            }

            utterance.lang = 'tr-TR';
            utterance.rate = 0.95; // Biraz yavaşlatıldı, daha doğal
            utterance.pitch = 1.0;
            utterance.volume = 1.0;

            utterance.onerror = (event) => {
                console.error('TTS Hatası:', event);
                // Ses ikonunu durdur
                soundToggle.classList.remove('speaking');
            };

            utterance.onstart = () => {
                console.log('Sesli okuma başladı:', text.substring(0, 50) + '...');
                // Ses ikonuna animasyon ekle
                soundToggle.classList.add('speaking');
            };

            utterance.onend = () => {
                console.log('Sesli okuma bitti');
                // Ses ikonunu durdur
                soundToggle.classList.remove('speaking');
            };

            window.speechSynthesis.speak(utterance);
        }, 100);
    }

    function showTypingAnimation() {
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'typing-indicator';
        typingIndicator.id = 'bot-typing';
        typingIndicator.innerHTML = `
            <span class="typing-text">Yazıyor</span>
            <div class="typing-dots">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        messagesContainer.appendChild(typingIndicator);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function removeTypingAnimation() {
        const typingEl = document.getElementById('bot-typing');
        if (typingEl) typingEl.remove();
    }

    async function typeMessage(message, messageElement, speed = 15) {
        const text = message;
        messageElement.textContent = '';

        speakText(text);

        for (let i = 0; i < text.length; i++) {
            messageElement.textContent += text[i];
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            await new Promise(resolve => setTimeout(resolve, speed));
        }
    }

    async function sendMessage(message) {
        const messageData = {
            action: "sendMessage",
            sessionId: currentSessionId,
            route: config.webhook.route,
            chatInput: message,
            metadata: { userId: "" }
        };

        const userMessageDiv = document.createElement('div');
        userMessageDiv.className = 'chat-message user';
        userMessageDiv.textContent = message;
        messagesContainer.appendChild(userMessageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        await new Promise(resolve => setTimeout(resolve, 400));

        showTypingAnimation();

        try {
            const response = await fetch(config.webhook.url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(messageData)
            });

            const data = await response.json();
            const botResponse = Array.isArray(data) ? data[0].output : data.output;

            setTimeout(() => {
                removeTypingAnimation();

                const botMessageDiv = document.createElement('div');
                botMessageDiv.className = 'chat-message bot';
                messagesContainer.appendChild(botMessageDiv);

                typeMessage(botResponse, botMessageDiv, 15);
            }, 1000);

        } catch (error) {
            removeTypingAnimation();
            console.error('Error:', error);
        }
    }

    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'n8n-chat-widget';

    widgetContainer.style.setProperty('--n8n-chat-primary-color', config.style.primaryColor);
    widgetContainer.style.setProperty('--n8n-chat-secondary-color', config.style.secondaryColor);
    widgetContainer.style.setProperty('--n8n-chat-background-color', config.style.backgroundColor);
    widgetContainer.style.setProperty('--n8n-chat-font-color', config.style.fontColor);

    const chatContainer = document.createElement('div');
    chatContainer.className = `chat-container${config.style.position === 'left' ? ' position-left' : ''}`;

    const chatInterfaceHTML = `
        <div class="chat-interface">
            <div class="brand-header">
                <img src="${config.branding.logo}" alt="${config.branding.name}">
                <span>${config.branding.name}</span>
                <div class="header-controls">
                    <button class="sound-toggle" title="Sesi Aç/Kapat">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="sound-on">
                            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="sound-off" style="display:none;">
                            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                        </svg>
                    </button>
                    <button class="close-button">×</button>
                </div>
            </div>
            <div class="chat-messages"></div>
            <form class="chat-input">
                <textarea placeholder="Size nasıl yardımcı oluruz..." rows="1"></textarea>
                <button type="button" class="mic-button" title="Sesli mesaj">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                        <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                    </svg>
                </button>
                <button type="button" class="send-button" title="Gönder">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                    </svg>
                </button>
            </form>
            <div class="chat-footer">
                <a href="${config.branding.poweredBy.link}" target="_blank">${config.branding.poweredBy.text}</a>
            </div>
        </div>
    `;

    chatContainer.innerHTML = chatInterfaceHTML;

    const toggleButton = document.createElement('button');
    toggleButton.className = `chat-toggle${config.style.position === 'left' ? ' position-left' : ''}`;
    toggleButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.5 21.5l4.5-.838A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.476 0-2.886-.313-4.156-.878l-3.156.586.586-3.156A7.962 7.962 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
        </svg>`;

    widgetContainer.appendChild(chatContainer);
    widgetContainer.appendChild(toggleButton);
    document.body.appendChild(widgetContainer);

    const messagesContainer = chatContainer.querySelector('.chat-messages');
    const textarea = chatContainer.querySelector('textarea');
    const sendButton = chatContainer.querySelector('.send-button');
    const micButton = chatContainer.querySelector('.mic-button');
    const chatInputForm = chatContainer.querySelector('.chat-input');
    const soundToggle = chatContainer.querySelector('.sound-toggle');
    const soundOnIcon = soundToggle.querySelector('.sound-on');
    const soundOffIcon = soundToggle.querySelector('.sound-off');

    let recognition = null;
    let isRecording = false;
    let fullTranscript = '';
    let recognitionRestartCount = 0; // Android restart sayacı
    let lastSpeechTime = 0; // Son konuşma zamanı (beep önleme için)
    const isAndroid = /Android/i.test(navigator.userAgent);

    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        recognition.lang = 'tr-TR';

        // Android'de continuous false (tekrarlama önleme)
        // iOS'ta continuous true (kusursuz çalışıyor)
        recognition.continuous = !isAndroid;
        recognition.interimResults = true;

        recognition.onresult = (event) => {
            let interimTranscript = '';
            let finalTranscript = '';

            // Her result için kontrol et
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalTranscript += transcript + ' ';
                } else {
                    interimTranscript += transcript;
                }
            }

            // Herhangi bir transcript varsa son konuşma zamanını güncelle
            if (finalTranscript || interimTranscript) {
                lastSpeechTime = Date.now();
            }

            // Final sonuçları ekle
            if (finalTranscript) {
                fullTranscript += finalTranscript;
                console.log('Final result:', finalTranscript);
            }

            textarea.value = fullTranscript + interimTranscript;
        };

        recognition.onstart = () => {
            if (isAndroid) {
                recognitionRestartCount++;
                if (recognitionRestartCount > 1) {
                    console.log(`Recognition başlatıldı (restart #${recognitionRestartCount - 1})`);
                }
            }
        };

        recognition.onend = () => {
            // Android'de sadece aktif konuşma varsa restart (beep önleme)
            if (isRecording && isAndroid) {
                const timeSinceLastSpeech = Date.now() - lastSpeechTime;
                const shouldRestart = timeSinceLastSpeech < 3000; // Son 3 saniye içinde konuşma var mı?

                if (shouldRestart) {
                    console.log('Android: Aktif konuşma var, restart yapılıyor...');
                    setTimeout(() => {
                        if (isRecording) {
                            try {
                                recognition.start();
                                console.log('Recognition yeniden başlatıldı');
                            } catch (e) {
                                console.error('Recognition restart hatası:', e);
                                if (e.name !== 'InvalidStateError') {
                                    isRecording = false;
                                    micButton.classList.remove('recording');
                                }
                            }
                        }
                    }, 300);
                } else {
                    console.log('Android: Sessizlik algılandı, restart yapılmıyor (beep önleme)');
                    // Sessizlikte restart yapma, beep sesini önle
                }
            } else if (!isAndroid) {
                // iOS: continuous mode var, normal işlem
                if (!isRecording) {
                    isRecording = false;
                    micButton.classList.remove('recording');
                    recognitionRestartCount = 0;
                }
            }

            // Recognition durduğunda transcript'i TAMAMEN temizle
            if (!isRecording) {
                fullTranscript = '';
                recognitionRestartCount = 0;
            }
        };

        recognition.onerror = (event) => {
            console.error('Ses tanıma hatası:', event.error);

            // Android'de bazı hatalar için otomatik recovery
            if (isAndroid && isRecording) {
                // no-speech: Sessizlik algılandı
                // network: Ağ hatası (geçici)
                // aborted: Kullanıcı tarafından durduruldu (restart yapma)
                if (event.error === 'no-speech' || event.error === 'network') {
                    console.log(`${event.error} hatası, yeniden başlatılıyor...`);
                    setTimeout(() => {
                        if (isRecording) {
                            try {
                                recognition.start();
                                console.log('Hata sonrası yeniden başlatıldı');
                            } catch (e) {
                                console.error('Recovery restart hatası:', e);
                                if (e.name !== 'InvalidStateError') {
                                    isRecording = false;
                                    micButton.classList.remove('recording');
                                }
                            }
                        }
                    }, 300);
                    return; // Hemen durdurma
                }
            }

            // Diğer hatalar veya iOS'ta kaydı durdur
            isRecording = false;
            micButton.classList.remove('recording');
        };
    }

    function generateUUID() {
        return crypto.randomUUID();
    }

    function handleSendMessage() {
        const message = textarea.value.trim();
        if (message) {
            // Önce her şeyi temizle
            textarea.value = '';
            fullTranscript = '';

            // Ses kaydı aktifse DURDUR
            if (isRecording && recognition) {
                recognition.stop();
                isRecording = false;
                micButton.classList.remove('recording');
            }

            sendMessage(message);

            setTimeout(() => {
                textarea.focus();
            }, 100);
        }
    }

    async function startNewConversation() {
        currentSessionId = generateUUID();
        const data = [{
            action: "loadPreviousSession",
            sessionId: currentSessionId,
            route: config.webhook.route,
            metadata: { userId: "" }
        }];

        try {
            const response = await fetch(config.webhook.url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const responseData = await response.json();

            const botMessageDiv = document.createElement('div');
            botMessageDiv.className = 'chat-message bot';
            const welcomeMessage = Array.isArray(responseData) ? responseData[0].output : responseData.output;
            botMessageDiv.textContent = welcomeMessage;
            messagesContainer.appendChild(botMessageDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;

            speakText(welcomeMessage, botMessageDiv);

            setTimeout(() => {
                textarea.focus();
            }, 300);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    let isProcessing = false;

    // Ses açma/kapama butonu
    soundToggle.addEventListener('click', () => {
        isSoundEnabled = !isSoundEnabled;

        if (isSoundEnabled) {
            // Ses açık
            soundToggle.classList.remove('muted');
            soundOnIcon.style.display = 'block';
            soundOffIcon.style.display = 'none';
        } else {
            // Ses kapalı - devam eden sesi durdur
            window.speechSynthesis.cancel();
            soundToggle.classList.remove('speaking'); // Animasyonu durdur
            soundToggle.classList.add('muted');
            soundOnIcon.style.display = 'none';
            soundOffIcon.style.display = 'block';
        }
    });

    micButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!recognition) {
            alert('Tarayıcınız sesli komut desteklemiyor. Lütfen Chrome veya Edge kullanın.');
            return;
        }

        if (isRecording) {
            recognition.stop();
            isRecording = false;
            micButton.classList.remove('recording');
            recognitionRestartCount = 0; // Sayacı sıfırla
            lastSpeechTime = 0; // Son konuşma zamanını sıfırla
        } else {
            fullTranscript = '';
            textarea.value = '';
            recognitionRestartCount = 0; // Sayacı sıfırla
            lastSpeechTime = Date.now(); // Şimdi başlıyor
            isRecording = true;
            micButton.classList.add('recording');
            recognition.start();
        }
    });

    sendButton.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (isProcessing) return;

        // Mesajı al
        const message = textarea.value.trim();

        if (!message) return;

        isProcessing = true;

        // ÖNCELİKLE SES KAYDINI DURDUR VE TEMİZLE
        if (recognition) {
            try {
                recognition.abort(); // Stop yerine abort kullan
            } catch (e) { }
        }
        isRecording = false;
        micButton.classList.remove('recording');

        // Hemen ardından textarea'yı temizle
        textarea.value = '';
        fullTranscript = '';

        // Mesajı gönder
        sendMessage(message);

        setTimeout(() => {
            isProcessing = false;
        }, 300);
    });

    chatInputForm.addEventListener('submit', (e) => {
        e.preventDefault();
    });

    textarea.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();

            const message = textarea.value.trim();
            if (message) {
                // Ses kaydını abort et
                if (recognition) {
                    try {
                        recognition.abort();
                    } catch (err) { }
                }
                isRecording = false;
                micButton.classList.remove('recording');

                // Temizle
                textarea.value = '';
                fullTranscript = '';

                sendMessage(message);
            }
        }
    });

    function toggleBodyScroll(disable) {
        if (window.innerWidth <= 768) {
            if (disable) {
                document.body.style.overflow = 'hidden';
                document.body.style.position = 'fixed';
                document.body.style.width = '100%';
                document.body.style.height = '100%';
            } else {
                document.body.style.overflow = '';
                document.body.style.position = '';
                document.body.style.width = '';
                document.body.style.height = '';
            }
        }
    }

    if (window.innerWidth <= 768) {
        textarea.addEventListener('focus', () => {
            setTimeout(() => {
                textarea.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        });

        textarea.addEventListener('blur', (e) => {
            if (!isProcessing) {
                setTimeout(() => {
                    textarea.focus();
                }, 50);
            }
        });
    }

    // Create phone icon
    const phoneIconContainer = document.createElement('div');
    phoneIconContainer.className = 'search-icon-container';
    phoneIconContainer.innerHTML = `
        <button class="search-icon" title="Telefon Ara">
            📞
        </button>
    `;

    // Add phone icon to chat interface
    const chatInterface = chatContainer.querySelector('.chat-interface');
    chatInterface.appendChild(phoneIconContainer);

    // Phone icon click handler
    const phoneIcon = phoneIconContainer.querySelector('.search-icon');
    phoneIcon.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Trigger phone call
        console.log('Phone icon clicked - initiating call');

        // Check if phone number is configured
        let phoneNumber = config.phoneNumber;

        // If no configured number, prompt for it
        if (!phoneNumber || phoneNumber.trim() === '') {
            alert('Telefon numarası yapılandırılmamış. Lütfen ChatWidgetConfig içinde phoneNumber ekleyin.');
            return;
        }

        // Remove spaces and non-numeric characters except + and -
        const cleanNumber = phoneNumber.trim().replace(/[^0-9+\-]/g, '');

        // Initiate phone call
        console.log('Arama başlatılıyor:', cleanNumber);
        window.location.href = `tel:${cleanNumber}`;
    });

    toggleButton.addEventListener('click', () => {
        const isOpening = !chatContainer.classList.contains('open');
        chatContainer.classList.toggle('open');
        toggleBodyScroll(isOpening);

        // Show/hide phone icon with animation
        if (isOpening) {
            setTimeout(() => {
                phoneIconContainer.classList.add('visible');
            }, 100);
        } else {
            phoneIconContainer.classList.remove('visible');
        }

        if (isOpening && !currentSessionId) {
            startNewConversation();
        } else if (isOpening) {
            setTimeout(() => {
                textarea.focus();
            }, 300);
        }
    });

    const closeButton = chatContainer.querySelector('.close-button');
    closeButton.addEventListener('click', () => {
        chatContainer.classList.remove('open');
        toggleBodyScroll(false);
        window.speechSynthesis.cancel();

        // Hide phone icon when closing
        phoneIconContainer.classList.remove('visible');

        // Chat kapatılınca ses kaydını da durdur
        if (isRecording && recognition) {
            recognition.stop();
            isRecording = false;
            micButton.classList.remove('recording');
        }
    });
})();
