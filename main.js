        /* --- LÓGICA (JAVASCRIPT) --- */
        function calcularChurrasco() {
            // 1. Pegar os valores dos inputs
            let homens = document.getElementById('homens').value;
            let mulheres = document.getElementById('mulheres').value;
            let criancas = document.getElementById('criancas').value;
            let bebedores = document.getElementById('bebedores').value;
            let duracao = document.getElementById('duracao').value;

            // Converter textos para números (para evitar erros de matemática)
            homens = Number(homens);
            mulheres = Number(mulheres);
            criancas = Number(criancas);
            bebedores = Number(bebedores);

            // 2. Definir as regras baseadas na duração
            // Regra Padrão (4h)
            let carneHomem = 0.5; // 500g = 0.5kg
            let carneMulher = 0.35; // 350g = 0.35kg
            let carneCrianca = 0.2; // 200g = 0.2kg

            // Se for Longo, aumentamos a carne dos adultos
            if (duracao === "longo") {
                carneHomem = 0.7; // 700g
                carneMulher = 0.5; // 500g
                // Criança mantém 200g segundo a regra
            }

            // 3. Calcular Totais
            let totalCarne = (homens * carneHomem) + (mulheres * carneMulher) + (criancas * carneCrianca);
            
            // Cerveja: 1.5L por adulto que bebe
            let totalCervejaLitros = bebedores * 1.5;
            let totalLatas = Math.ceil(totalCervejaLitros / 0.350); // Convertendo para latas de 350ml (aproximado)

            // Carvão: 1kg para cada 1kg de carne
            let totalCarvao = totalCarne; 

            // 4. Exibir o Resultado na tela
            let divResultado = document.getElementById('resultado');
            
            divResultado.style.display = "block"; // Mostra a caixa
            divResultado.innerHTML = `
                <h2>📋 Lista do Patrão:</h2>
                <p>🥩 <strong>Carne:</strong> ${totalCarne.toFixed(1)} kg <br><small>(Qualidade é tudo, hein!)</small></p>
                <p>🍺 <strong>Cerveja:</strong> ${totalCervejaLitros.toFixed(1)} Litros <br><small>(Aprox. ${totalLatas} latas)</small></p>
                <p>🔥 <strong>Carvão:</strong> ${totalCarvao.toFixed(1)} kg <br><small>(Melhor sobrar carvão do que faltar fogo!)</small></p>
                <hr>
                <p><em>"Paciência com o fogo, meu consagrado!"</em></p>
            `;
        }
