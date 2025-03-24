// xssProtecao.js
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
    if (input === undefined || input === null) return type === 'number' ? NaN : '';
    const str = String(input);
    const maxLength = 1000;
    const limitedStr = str.length > maxLength ? str.substring(0, maxLength) : str;

    switch (type) {
        case 'number':
            const numMatch = limitedStr.match(/^[-+]?[0-9]*\.?[0-9]+/);
            return numMatch ? parseFloat(numMatch[0]) : NaN;
            
        case 'alphanumeric':
            return limitedStr.replace(/[^a-zA-ZÀ-ÿ0-9]/g, '');
            
        default:
            return limitedStr;
    }
}
/**
 * Escapa o conteúdo para ser inserido em CSS.
 * Remove keywords perigosas e permite somente caracteres alfanuméricos e espaços.
 */
function escapeHTML(input) {
    return String(input)
    .replace(/[&<>"'`]/g, c => HTML_ESCAPE[c])
    .replace(/url|expression|javascript/gi, '') // Bloqueia palavras-chave perigosas

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
    const str = String(input).trim();
    
    // Bloqueia protocolos perigosos
    if (/^(javascript|data|vbscript):/i.test(str)) return '#';
    
    try {
        const url = new URL(str, window.location.href);
        
        // Permite apenas protocolos seguros
        if (['http:', 'https:', 'ftp:'].includes(url.protocol)) {
            return url.href;
        }
        return '#';
    } catch (e) {
        // Mantém URLs relativas seguras
        return str.startsWith('/') || str.startsWith('#') ? str : '#';
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
    const csp = `
        default-src 'none';
        script-src 'self' 'strict-dynamic' https:;
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
        font-src 'self' https://fonts.gstatic.com;
        img-src 'self' data:;
        connect-src 'self';
        form-action 'self';
        base-uri 'none';
    `.replace(/\s+/g, ' ');

    // Tenta aplicar via header HTTP (melhor método)
    if (typeof Headers !== 'undefined' && document.headers) {
        document.headers.set('Content-Security-Policy', cspPolicy);
    } 
    // Fallback para meta tag (caso headers não estejam disponíveis)
    else {
        const existingMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
        if (existingMeta) existingMeta.remove();

        const meta = document.createElement('meta');
        meta.httpEquiv = 'Content-Security-Policy';
        meta.content = cspPolicy;
        document.head.prepend(meta);
    }
}
// ============== INTEGRAÇÃO SEGURA NO DOM ==============
document.addEventListener('DOMContentLoaded', () => {
    // Aplica a CSP o mais cedo possível

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