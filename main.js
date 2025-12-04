        // --- CÁLCULO DO CHURRASCO (Lógica anterior) ---
        function calcularChurrasco() {
            let h = Number(document.getElementById('homens').value);
            let m = Number(document.getElementById('mulheres').value);
            let c = Number(document.getElementById('criancas').value);
            let b = Number(document.getElementById('bebedores').value);
            let duracao = document.getElementById('duracao').value;

            let carneH = (duracao === "longo") ? 0.7 : 0.5;
            let carneM = (duracao === "longo") ? 0.5 : 0.35;
            let carneC = 0.2;

            let totalCarne = (h * carneH) + (m * carneM) + (c * carneC);
            let cervejaL = b * 1.5;
            let latas = Math.ceil(cervejaL / 0.350);
            let carvao = totalCarne;

            let res = document.getElementById('resultado');
            res.style.display = "block";
            res.innerHTML = `
                <h2>📋 Lista do Patrão:</h2>
                <p>🥩 Carne: <strong>${totalCarne.toFixed(1)} kg</strong></p>
                <p>🍺 Cerveja: <strong>${cervejaL.toFixed(1)} L</strong> (${latas} latas)</p>
                <p>🔥 Carvão: <strong>${carvao.toFixed(1)} kg</strong></p>
                <hr><p><em>Dúvida no ponto? Chama o bot ali no canto! 👉</em></p>
            `;
        }

        // --- LÓGICA DO CHATBOT ---
        
        // 1. Abrir e Fechar o Chat
        function toggleChat() {
            let chat = document.getElementById('chatWindow');
            if (chat.style.display === "flex") {
                chat.style.display = "none";
            } else {
                chat.style.display = "flex";
            }
        }

        // 2. Permitir enviar com "Enter"
        function handleEnter(e) {
            if (e.key === 'Enter') enviarMensagem();
        }

        // 3. Processar Mensagem
        function enviarMensagem() {
            let input = document.getElementById('chatInput');
            let textoUsuario = input.value.trim();
            if (textoUsuario === "") return;

            // Adiciona a msg do usuário na tela
            addMsgNaTela(textoUsuario, 'user');
            input.value = ""; // Limpa o campo

            // Simula o bot pensando (500ms)
            setTimeout(() => {
                responderBot(textoUsuario.toLowerCase());
            }, 600);
        }

        // 4. Cérebro do Bot (Respostas)
        function responderBot(texto) {
            let resposta = "";

            // Verifica palavras-chave
            if (texto.includes("ponto") || texto.includes("temperatura")) {
                resposta = "🌡️ <strong>Ponto da Carne:</strong><br>- Mal Passada: 50-53°C<br>- Ao Ponto: 57-63°C<br>- Bem Passada: 68°C+<br>Tira antes que vira sola!";
            } 
            else if (texto.includes("conta") || texto.includes("calculo")) {
                resposta = "🔢 <strong>A matemática é simples:</strong><br>- Homem: 500g (ou 700g se for longo)<br>- Mulher: 350g (ou 500g se for longo)<br>- Criança: 200g fixo.<br>Melhor sobrar que faltar!";
            }
            else if (texto.includes("carvao") || texto.includes("carvão")) {
                resposta = "🔥 A regra de ouro é <strong>1kg de carvão para cada 1kg de carne</strong>. Se o vento estiver forte, compra um saco extra!";
            }
            else if (texto.includes("ola") || texto.includes("oi")) {
                resposta = "E aí, meu consagrado! Manda a dúvida: 'ponto', 'conta' ou 'carvão'?";
            }
            else {
                resposta = "Xiii patrão, não entendi. Tenta digitar: <strong>ponto</strong>, <strong>conta</strong> ou <strong>carvão</strong>.";
            }

            addMsgNaTela(resposta, 'bot');
        }

        // 5. Função auxiliar para criar o HTML da mensagem
        function addMsgNaTela(msg, tipo) {
            let chatBody = document.getElementById('chatBody');
            let div = document.createElement('div');
            div.className = 'msg ' + (tipo === 'bot' ? 'msg-bot' : 'msg-user');
            div.innerHTML = msg;
            chatBody.appendChild(div);
            // Rola para baixo automaticamente
            chatBody.scrollTop = chatBody.scrollHeight;
        }
