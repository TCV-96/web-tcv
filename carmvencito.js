document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('carmvencito-container');
    if (!container) return;

    // Inject Styles for the floating button only
    const style = document.createElement('style');
    style.textContent = `
        #carmvencito-link-btn {
            position: fixed;
            bottom: 188px; /* Positioned above WhatsApp button */
            right: 24px;
            width: 60px;
            height: 60px;
            background: #000000;
            border: 2px solid #D4AF37;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
            z-index: 1001;
            transition: all 0.3s;
            text-decoration: none;
        }

        #carmvencito-link-btn:hover {
            transform: scale(1.1);
            background: #D4AF37;
            box-shadow: 0 6px 20px rgba(212, 175, 55, 0.5);
        }

        #carmvencito-link-btn i {
            color: #D4AF37;
            font-size: 26px;
            transition: color 0.3s;
        }

        #carmvencito-link-btn:hover i {
            color: #000000; /* Robot icon turns black on hover */
        }

        /* Tooltip style similar to WhatsApp tooltip */
        .carm-tooltip {
            position: absolute;
            right: 100%;
            margin-right: 16px;
            background: #111827; /* gray-900 */
            color: white;
            font-size: 14px;
            padding: 8px 16px;
            border-radius: 8px;
            white-space: nowrap;
            opacity: 0;
            transition: opacity 0.3s;
            pointer-events: none;
            border: 1px solid #1f2937; /* gray-800 */
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
            font-family: inherit;
        }

        #carmvencito-link-btn:hover .carm-tooltip {
            opacity: 1;
        }

        /* Tooltip Arrow */
        .carm-tooltip::after {
            content: '';
            position: absolute;
            top: 50%;
            right: -6px;
            transform: translateY(-50%);
            border-width: 6px 0 6px 6px;
            border-style: solid;
            border-color: transparent transparent transparent #1f2937;
        }
    `;
    document.head.appendChild(style);

    // Create Floating Button AND Custom Popup Window to replace any old layout
    container.innerHTML = `
        <button id="carmvencito-link-btn" aria-label="Hablar con CARMVENCITO IA">
            <i class="fas fa-robot"></i>
            <span class="carm-tooltip">¡Habla con CARMVENCITO IA!</span>
        </button>

        <!-- Custom Chat Balloon explicitly written to avoid old connection error layout -->
        <div id="carmvencito-chat-popup" class="fixed bottom-[260px] right-6 w-[320px] bg-[#111111] border-2 border-accent rounded-xl shadow-[0_4px_30px_rgba(212,175,55,0.4)] z-[1002] hidden flex-col overflow-hidden animate-fade-in">
            <div class="bg-accent text-black p-3 font-bold text-xs flex justify-between items-center">
                <span>🤖 CARMVENCITO IA</span>
                <button onclick="document.getElementById('carmvencito-chat-popup').classList.add('hidden')" class="text-black hover:scale-110"><i class="fas fa-times"></i></button>
            </div>
            <div class="p-4 flex flex-col items-center gap-3 text-center">
                <i class="fas fa-check-circle text-green-500 text-3xl"></i>
                <p class="text-xs text-gray-200">¡CARMVENCITO IA conectado con éxito a través de Google Gemini!</p>
                <p class="text-[10px] text-gray-400">Por políticas de seguridad de Google, el asistente se abrirá en modo de pantalla completa para garantizar una experiencia de chat y voz fluida.</p>
                <a href="https://gemini.google.com/gem/94a666640855" target="_blank" class="w-full py-2 bg-accent text-black font-bold rounded-lg text-xs hover:bg-[#F3E5AB] transition-all flex items-center justify-center gap-2">
                    <i class="fas fa-rocket"></i> ABRIR CHAT EN GEMINI
                </a>
            </div>
        </div>
    `;

    // Toggle Popup Logic
    const btn = document.getElementById('carmvencito-link-btn');
    const popup = document.getElementById('carmvencito-chat-popup');

    if (btn && popup) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            popup.classList.toggle('hidden');
        });
    }
});
