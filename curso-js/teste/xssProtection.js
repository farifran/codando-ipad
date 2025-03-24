/* xssProtecao.js - Versão Melhorada com Filosofia KISS */

// Tabela de escape para HTML
const HTML_ESCAPE = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
};

/**
 * Sanitiza a entrada com base no tipo esperado.
 * @param {*} input Valor de entrada.
 * @param {string} type Tipo esperado ('string', 'number' ou 'alphanumeric').
 * @returns {string|number} Valor sanitizado.
 */
function sanitizeInput(input, type = 'string') {
    if (input === undefined || input === null) {
        return type === 'number' ? NaN : '';
    }

    // Converte e remove espaços desnecessários
    const str = String(input).trim();
    // Limita o tamanho para evitar ataques DoS
    const maxLength = 1000;
    const limitedStr = str.substring(0, maxLength);

    switch (type) {
        case 'number': {
            // Remove caracteres indesejados e converte para número
            const cleaned = limitedStr.replace(/[^0-9.-]/g, '');
            const num = cleaned ? parseFloat(cleaned) : NaN;
            // Previne overflow: números com valor absoluto muito grande são rejeitados
            return Math.abs(num) > 1e100 ? NaN : num;
        }
        case 'alphanumeric':
            // Remove tudo exceto letras e números
            return limitedStr.replace(/[^a-zA-Z0-9]/g, '');
        default:
            // Remove caracteres potencialmente perigosos para o contexto HTML
            return limitedStr.replace(/[&<>"'`]/g, '');
    }
}

/**
 * Escapa o conteúdo para ser inserido em CSS.
 * Remove keywords perigosas e permite somente caracteres alfanuméricos e espaços.
 */
function escapeCSS(input) {
    return String(input)
        .replace(/url|expression|javascript/gi, '') // Bloqueia palavras-chave perigosas
        .replace(/[^a-zA-Z0-9\s]/g, '');
}

/**
 * Escapa o conteúdo para ser inserido em código JavaScript.
 * Converte caracteres não alfanuméricos para sua representação Unicode.
 */
function escapeJS(input) {
    return String(input).replace(/[^a-zA-Z0-9]/g, c => 
        `\\u${c.charCodeAt(0).toString(16).padStart(4, '0')}`
    );
}

/**
 * Sanitiza e valida URLs.
 * Retorna '#' se a URL for considerada insegura ou inválida.
 */
function sanitizeURL(input) {
    try {
        const decoded = decodeURIComponent(String(input));

        // Bloqueia protocolos perigosos, mesmo se codificados
        if (/(javascript|data|vbscript):/gi.test(decoded)) {
            return '#';
        }

        const url = new URL(decoded);
        const allowedProtocols = ['http:', 'https:'];
        const allowedDomains = ['meudominio.com']; // Personalize conforme necessário

        if (!allowedProtocols.includes(url.protocol) ||
            !allowedDomains.some(d => url.hostname === d)) {
            return '#';
        }
        return encodeURI(url.href);
    } catch {
        return '#';
    }
}

/**
 * Gera um nonce seguro usando a API Crypto.
 * @returns {string} Nonce gerado.
 */
function generateNonce() {
    const array = new Uint8Array(32);
    window.crypto.getRandomValues(array);
    return Array.from(array, byte =>
        byte.toString(16).padStart(2, '0')
    ).join('');
}

let currentNonce = '';

/**
 * Aplica a política de segurança de conteúdo (CSP) via meta tag.
 * Utiliza um nonce dinâmico para permitir scripts inline autorizados.
 */
function applyCSP() {
    currentNonce = generateNonce();
    const csp = [
        "default-src 'none'",
        `script-src 'self' 'nonce-${currentNonce}'`,
        "style-src 'self'",
        "img-src 'self'",
        "font-src 'self'",
        "connect-src 'self'",
        "form-action 'self'",
        "base-uri 'none'",
        "frame-ancestors 'none'"
    ].join('; ');

    // Remove CSP anterior, se existir
    const oldMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    if (oldMeta) oldMeta.remove();

    const meta = document.createElement('meta');
    meta.httpEquiv = 'Content-Security-Policy';
    meta.content = csp;
    document.head.prepend(meta);
}

/**
 * Escapa entidades HTML usando a tabela definida.
 */
function escapeHTML(input) {
    return String(input).replace(/[&<>"'`]/g, c => HTML_ESCAPE[c]);
}

// ============== INTEGRAÇÃO SEGURA NO DOM ==============
document.addEventListener('DOMContentLoaded', () => {
    // Aplica a CSP o mais cedo possível
    applyCSP();

    const form = document.querySelector('#securityTestForm');
    const resultsDiv = document.querySelector('#results');

    if (!form || !resultsDiv) {
        console.error('Elementos do formulário não encontrados no DOM.');
        return;
    }

    // Seleciona os inputs necessários usando querySelector
    const textInput = form.querySelector('input[name="textInput"]');
    const numberInput = form.querySelector('input[name="numberInput"]');
    const alphaInput = form.querySelector('input[name="alphaInput"]');
    const urlInput = form.querySelector('input[name="urlInput"]');

    if (!textInput || !numberInput || !alphaInput || !urlInput) {
        console.error('Estrutura do formulário inválida: campos esperados não encontrados.');
        return;
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        try {
            // Exemplo de criação de um script seguro utilizando o nonce atual
            const secureScript = document.createElement('script');
            secureScript.nonce = currentNonce;
            secureScript.textContent = `console.log("Script seguro executado.");`;
            document.body.appendChild(secureScript);

            // Processa os inputs usando as funções de sanitização e escapamento
            const textOutput = escapeHTML(sanitizeInput(textInput.value, 'string'));
            const numberOutput = sanitizeInput(numberInput.value, 'number');
            const alphaOutput = sanitizeInput(alphaInput.value, 'alphanumeric');
            const urlOutput = sanitizeURL(urlInput.value);

            // Limpa a área de resultados e adiciona os valores sanitizados
            resultsDiv.innerHTML = '';
            const addSafeLine = (label, value) => {
                const p = document.createElement('p');
                p.innerHTML = `<strong>${label}:</strong> ${value}`;
                resultsDiv.appendChild(p);
            };

            addSafeLine('Texto Sanitizado', textOutput);
            addSafeLine('Número Sanitizado', numberOutput);
            addSafeLine('Alfanumérico Sanitizado', alphaOutput);
            addSafeLine('URL Sanitizada', urlOutput);
        } catch (error) {
            console.error('Erro ao processar entradas no submit do formulário:', error);
            resultsDiv.innerHTML = '<p class="error">Houve um problema ao processar os dados. Por favor, tente novamente.</p>';
        }
    });
});

// ============== EXPORTAÇÕES ==============
export {
    sanitizeInput,
    escapeHTML,
    escapeJS,
    escapeCSS,
    sanitizeURL,
    applyCSP
};