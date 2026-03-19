document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('carmvencito-container');
    if (!container) return;

    // Inject Styles
    const style = document.createElement('style');
    style.textContent = `
        #carmvencito-widget {
            position: fixed;
            bottom: 255px;
            right: 24px;
            width: 350px;
            height: 500px;
            background: #000000;
            border: 2px solid #D4AF37;
            border-radius: 15px;
            display: none;
            flex-direction: column;
            box-shadow: 0 10px 30px rgba(212, 175, 55, 0.2);
            z-index: 1000;
            overflow: hidden;                                                                               
            font-family: 'Inter', sans-serif;
        }

        #carmvencito-header {
            background: #1A1A1A;
            padding: 15px;
            border-bottom: 1px solid #D4AF37;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        #carmvencito-header h4 {
            color: #D4AF37;
            margin: 0;
            font-size: 14px;
            font-weight: 700;
            letter-spacing: 1px;
            text-transform: uppercase;
        }

        #carmvencito-close {
            color: #D4AF37;
            cursor: pointer;
            font-size: 20px;
        }

        #carmvencito-messages {
            flex-grow: 1;
            padding: 15px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 10px;
            background: #000;
        }

        .carm-msg {
            max-width: 80%;
            padding: 10px 15px;
            border-radius: 10px;
            font-size: 13px;
            line-height: 1.4;
            word-wrap: break-word;
        }

        .carm-msg.user {
            align-self: flex-end;
            background: #D4AF37;
            color: #000;
            border-bottom-right-radius: 2px;
        }

        .carm-msg.ai {
            align-self: flex-start;
            background: #1A1A1A;
            color: #fff;
            border-bottom-left-radius: 2px;
            border: 1px solid #333;
        }

        #carmvencito-input-area {
            padding: 15px;
            background: #1A1A1A;
            border-top: 1px solid #333;
            display: flex;
            gap: 10px;
        }

        #carmvencito-input {
            flex-grow: 1;
            background: #000;
            border: 1px solid #333;
            color: #fff;
            padding: 8px 12px;
            border-radius: 20px;
            outline: none;
            font-size: 13px;
        }

        #carmvencito-input:focus {
            border-color: #D4AF37;
        }

        #carmvencito-send {
            background: #D4AF37;
            color: #000;
            border: none;
            width: 35px;
            height: 35px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.2s;
        }

        #carmvencito-send:hover {
            transform: scale(1.1);
        }

        #carmvencito-toggle {
            position: fixed;
            bottom: 188px;
            right: 24px;
            width: 60px;
            height: 60px;
            background: #000;
            border: 2px solid #D4AF37;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
            z-index: 1001;
            transition: all 0.3s;
        }

        #carmvencito-toggle:hover {
            transform: scale(1.1);
            background: #D4AF37;
        }

        #carmvencito-toggle i {
            color: #D4AF37;
            font-size: 24px;
        }

        #carmvencito-toggle:hover i {
            color: #000;
        }

        .typing-indicator {
            font-style: italic;
            color: #888;
            font-size: 11px;
            padding: 6px 12px;
            background: #1A1A1A;
            border-radius: 10px;
            border: 1px solid #333;
            align-self: flex-start;
        }
    `;
    document.head.appendChild(style);

    // Create Widget DOM
    container.innerHTML = `
        <div id="carmvencito-toggle">
            <i class="fas fa-robot"></i>
        </div>
        <div id="carmvencito-widget">
            <div id="carmvencito-header">
                <h4>Carmvencito IA</h4>
                <div id="carmvencito-close">&times;</div>
            </div>
            <div id="carmvencito-messages">
                <div class="carm-msg ai">¡Hola! Soy CARMVENCITO 🤖. Estoy entrenado por Jeferson Carmona para asesorarte en Tecnología, Inmuebles y Marketing. ¿Cómo puedo ayudarte hoy?</div>
            </div>
            <div id="carmvencito-input-area">
                <input type="text" id="carmvencito-input" placeholder="Escribe un mensaje...">
                <button id="carmvencito-send">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>
    `;

    const widget = document.getElementById('carmvencito-widget');
    const toggle = document.getElementById('carmvencito-toggle');
    const closeBtn = document.getElementById('carmvencito-close');
    const input = document.getElementById('carmvencito-input');
    const sendBtn = document.getElementById('carmvencito-send');
    const messages = document.getElementById('carmvencito-messages');

    toggle.addEventListener('click', () => {
        widget.style.display = widget.style.display === 'flex' ? 'none' : 'flex';
        if (widget.style.display === 'flex') input.focus();
    });

    closeBtn.addEventListener('click', () => {
        widget.style.display = 'none';
    });

    const addMessage = (text, sender) => {
        const msg = document.createElement('div');
        msg.className = `carm-msg ${sender}`;
        msg.textContent = text;
        messages.appendChild(msg);
        messages.scrollTop = messages.scrollHeight;
    };

    // Gemini API Configuration
    const G_KEY = 'AIzaSyDjAHe2vEEWh_WZdoWLE4oqdhZGUMvLMaI';
    const G_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${G_KEY}`;

    const SYSTEM_PROMPT = `Eres CARMVENCITO, el asistente virtual oficial de T.C.V. TECHNOLOGYCARMVEN, empresa multisectorial en Maturín, Monagas, Venezuela.

Tu creador es Jeferson Carmona:
- T.S.U. en Electrónica (UPT Clodosbaldo Russián)
- Docente MPPE de Ciencias (Física)
- Especialista INCES en Electricidad Industrial y de Potencia
- Diplomado en Docencia con IA (CIL LATAM)
- Agente Inmobiliario Internacional Certificado en Inmobiliaria Farro Costamar (22 países)
- Asesor de Marketing del Club de Leones de Maturín
- Especialista en Meta Ads y branding corporativo

Servicios T.C.V.:
1. Ingeniería Electrónica y Soporte Técnico
2. Electricidad Industrial y de Potencia
3. Marketing Digital Corporativo (Meta Ads)
4. Gestión Inmobiliaria Internacional (Farro Costamar)

Reglas:
- Responde SIEMPRE en español
- Sé profesional, cercano y entusiasta
- Nunca inventes información
- Para consultas fuera de tu área, sugiere contactar a Jeferson al +58 414-5841929
- Varía tus respuestas
- Máximo 3-4 oraciones por respuesta
- Usa emojis moderadamente`;

    const conversationHistory = [];

    const callAI = async (query) => {
        const typing = document.createElement('div');
        typing.className = 'typing-indicator';
        typing.textContent = '💭 CARMVENCITO está pensando...';
        messages.appendChild(typing);
        messages.scrollTop = messages.scrollHeight;

        conversationHistory.push({ role: 'user', parts: [{ text: query }] });

        try {
            const contents = [
                { role: 'user', parts: [{ text: SYSTEM_PROMPT + '\n\nResponde al siguiente mensaje.' }] },
                { role: 'model', parts: [{ text: 'Entendido. Soy CARMVENCITO, listo para asistir.' }] },
                ...conversationHistory.slice(-10)
            ];

            const res = await fetch(G_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents,
                    generationConfig: { temperature: 0.8, maxOutputTokens: 300 },
                    safetySettings: [
                        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
                        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
                        { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
                        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' }
                    ]
                })
            });

            if (!res.ok) throw new Error('API Error');

            const data = await res.json();
            const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Contacta a Jeferson al +58 414-5841929.';

            conversationHistory.push({ role: 'model', parts: [{ text: reply }] });

            messages.removeChild(typing);
            addMessage(reply, 'ai');

        } catch (e) {
            messages.removeChild(typing);
            addMessage('⚠️ Error de conexión. Contacta a Jeferson Carmona al +58 414-5841929 por WhatsApp.', 'ai');
        }
    };

    // Anti-spam
    let lastSend = 0;
    const handleSend = () => {
        if (Date.now() - lastSend < 2000) return;
        const text = input.value.trim();
        if (!text || text.length > 500) return;
        lastSend = Date.now();
        addMessage(text, 'user');
        input.value = '';
        callAI(text);
    };

    sendBtn.addEventListener('click', handleSend);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });
});
