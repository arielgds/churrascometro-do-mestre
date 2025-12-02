// --- FUNÇÃO PRINCIPAL DE CÁLCULO ---
function calcularChurrasco() {
    // 1. Pegar Quantidades
    let h = Number(document.getElementById('homens').value);
    let m = Number(document.getElementById('mulheres').value);
    let c = Number(document.getElementById('criancas').value);
    let b = Number(document.getElementById('bebedores').value);
    let duracao = document.getElementById('duracao').value;

    // 2. Pegar Preços (Rateio)
    let precoComida = Number(document.getElementById('preco-comida').value);
    let precoBebida = Number(document.getElementById('preco-bebida').value);

    // 3. Regras de Carne (kg)
    let carneH = (duracao === "longo") ? 0.7 : 0.5;
    let carneM = (duracao === "longo") ? 0.5 : 0.35;
    let carneC = 0.2;

    let totalCarne = (h * carneH) + (m * carneM) + (c * carneC);
    
    // 4. Regras de Bebida e Carvão
    let cervejaL = b * 1.5;
    let latas = Math.ceil(cervejaL / 0.350);
    let carvao = totalCarne; // 1kg carvão para 1kg carne

    // 5. Cálculo do Rateio (Dinheiro)
    let totalPagantesComida = h + m; // Crianças não pagam
    if (totalPagantesComida === 0) totalPagantesComida = 1; // Evita erro de divisão
    if (b === 0) b = 1; // Evita erro de divisão

    let custoComidaPorPessoa = precoComida / totalPagantesComida;
    let custoBebidaPorPessoa = precoBebida / b;

    let custoNaoBebedor = custoComidaPorPessoa;
    let custoBebedor = custoComidaPorPessoa + custoBebidaPorPessoa;

    // 6. Montar o HTML do Resultado
    let res = document.getElementById('resultado');
    res.style.display = "block";

    let htmlContent = `
        <h2>📋 Lista do Patrão:</h2>
        <p>🥩 Carne: <strong>${totalCarne.toFixed(1)} kg</strong></p>
        <p>🍺 Cerveja: <strong>${cervejaL.toFixed(1)} L</strong> (${latas} latas)</p>
        <p>🔥 Carvão: <strong>${carvao.toFixed(1)} kg</strong></p>
    `;

    // Se o usuário preencheu preços, mostra o rateio
    if (precoComida > 0 || precoBebida > 0) {
        htmlContent += `
            <div class="resultado-rateio">
                <h3>💰 Rateio por Pessoa</h3>
                <p>Quem <strong>BEBE</strong> paga:<br> 
                <span class="destaque-preco">R$ ${custoBebedor.toFixed(2)}</span></p>
                
                <p>Quem <strong>NÃO BEBE</strong> paga:<br> 
                <span class="destaque-preco">R$ ${custoNaoBebedor.toFixed(2)}</span></p>
            </div>
        `;
    }

    // Botão do WhatsApp (passando todos os valores)
    htmlContent += `
        <button class="btn-calcular btn-whatsapp" onclick="compartilharZap(${totalCarne}, ${latas}, ${carvao}, ${custoBebedor}, ${custoNaoBebedor}, ${precoComida + precoBebida})">
            Enviar no Zap 📱
        </button>
        <hr><p><em>Dúvida? Chama o bot ali no canto! 👉</em></p>
    `;

    res.innerHTML = htmlContent;
}

// --- FUNÇÃO PARA COMPARTILHAR NO WHATSAPP ---
function compartilharZap(carne, latas, carvao, vBebedor, vNaoBebedor, totalGeral) {
    let msg = `🔥 *Churrasco do Mestre* 🔥%0A` +
              `------------------------------%0A` +
              `🥩 Carne: ${carne.toFixed(1)}kg%0A` +
              `🍺 Cerveja: ${latas} latas%0A` +
              `🔥 Carvão: ${carvao.toFixed(1)}kg%0A` +
              `------------------------------%0A`;
    
    // Só adiciona preços na mensagem se eles existirem (> 0)
    if (totalGeral > 0) {
        msg += `💰 *RATEIO:*%0A` +
               `💸 Quem bebe: R$ ${vBebedor.toFixed(2)}%0A` +
               `💸 Quem não bebe: R$ ${vNaoBebedor.toFixed(2)}%0A`;
    }

    msg += `%0APartiu churras?`;
    
    let link = `https://wa.me/?text=${msg}`;
    window.open(link, '_blank');
}

// --- LÓGICA DO CHATBOT ---
function toggleChat() {
    let chat = document.getElementById('chatWindow');
    chat.style.display = (chat.style.display === "flex") ? "none" : "flex";
}

function handleEnter(e) {
    if (e.key === 'Enter') enviarMensagem();
}

function enviarMensagem() {
    let input = document.getElementById('chatInput');
    let texto = input.value.trim();
    if (texto === "") return;

    addMsgNaTela(texto, 'user');
    input.value = "";

    setTimeout(() => { responderBot(texto.toLowerCase()); }, 600);
}

function responderBot(texto) {
    let resp = "";
    
    if (texto.includes("ponto") || texto.includes("temperatura")) {
        resp = "🌡️ <strong>Ponto da Carne:</strong><br>- Mal Passada: 50-53°C<br>- Ao Ponto: 57-63°C<br>- Bem Passada: 68°C+";
    } 
    else if (texto.includes("conta") || texto.includes("calculo")) {
        resp = "🔢 <strong>Conta básica:</strong> Homem come 500g, Mulher 350g. Se for churrasco longo, aumenta um pouco!";
    }
    else if (texto.includes("carvao") || texto.includes("carvão")) {
        resp = "🔥 Regra de ouro: <strong>1kg de carvão para cada 1kg de carne</strong>.";
    }
    else if (texto.includes("ola") || texto.includes("oi")) {
        resp = "E aí, meu consagrado! Qual a boa? Dúvidas sobre o ponto ou a conta?";
    }
    else {
        resp = "Xiii patrão, não entendi. Tenta: 'ponto', 'conta' ou 'carvão'.";
    }
    addMsgNaTela(resp, 'bot');
}

function addMsgNaTela(msg, tipo) {
    let chatBody = document.getElementById('chatBody');
    let div = document.createElement('div');
    div.className = 'msg ' + (tipo === 'bot' ? 'msg-bot' : 'msg-user');
    div.innerHTML = msg;
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
}