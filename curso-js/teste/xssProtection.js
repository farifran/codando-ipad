// securityModule.js

const HTML_ESCAPE = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
};

/**
 * Gera um token aleatório seguro usando a API Crypto.
 * Pode ser usado para nonce de CSP e tokens CSRF.
 * @param {number} length Tamanho do token (em bytes, padrão 32).
 * @returns {string} Token gerado em formato hexadecimal.
 */
function generateRandomToken(length = 32) {
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);
    return Array.from(array, byte =>
        byte.toString(16).padStart(2, '0')
    ).join('');
}

// Nonce para CSP
let currentNonce = generateRandomToken();

// Token CSRF (deve ser armazenado no lado do servidor para validação)
let csrfToken = generateRandomToken();

/**
 * Sanitiza a entrada com base no tipo esperado.
 * @param {*} input Valor de entrada.
 * @param {string} type Tipo esperado ('default', 'letters', 'number').
 * @returns {string|number|null} Valor sanitizado.
 */
function sanitizeInput(input, type = 'default') {
    if (input === undefined || input === null) return type === 'number' ? null : '';

    const str = String(input).trim();
    const maxLength = 1000;
    const limitedStr = str.substring(0, maxLength);

    switch (type) {
        case 'number':
            const numMatch = limitedStr.match(/^[-+]?[0-9]*\.?[0-9]+$/);
            return numMatch ? parseFloat(numMatch[0]) : null;

        case 'letters':
            return limitedStr.replace(/[^a-zA-ZÀ-ÿ\s]/g, ''); // Apenas letras e espaços

        default:
            return limitedStr; // Permite qualquer caractere permitido
    }
}

/**
 * Escapa o conteúdo para ser inserido em HTML.
 */
function escapeHTML(input) {
    return String(input)
        .replace(/[&<>"'`]/g, c => HTML_ESCAPE[c])
        .replace(/(javascript|expression|vbscript):/gi, ''); // Remove protocolos perigosos
}

/**
 * Escapa o conteúdo para ser inserido em CSS.
 */
function escapeCSS(input) {
    return String(input)
        .replace(/url|expression|javascript/gi, '')
        .replace(/[^a-zA-Z0-9_-]/g, ''); 
}

/**
 * Escapa o conteúdo para ser inserido em código JavaScript.
 */
function escapeJS(input) {
    return String(input)
        .replace(/\\/g, '\\\\')
        .replace(/'/g, '\\\'')
        .replace(/"/g, '\\"')
        .replace(/</g, '\\u003C')
        .replace(/>/g, '\\u003E')
        .replace(/&/g, '\\u0026');
}

/**
 * Sanitiza e valida URLs.
 * Retorna '#' se a URL for considerada insegura ou inválida.
 */
function sanitizeURL(input) {
    const str = String(input).trim();
    if (!str) return ' ';

    if (/^(javascript|data|vbscript):/i.test(str)) return '#';

    try {
        const url = new URL(str, window.location.origin);
        if (['http:', 'https:', 'ftp:'].includes(url.protocol)) {
            return url.href;
        }
    } catch (e) {
        if (/^\/[\w-]/.test(str) || str.startsWith('#')) return str;
    }
    return '#';
}

/**
 * Aplica a política de segurança de conteúdo (CSP) via meta tag.
 */
function applyCSP() {
    currentNonce = generateRandomToken();

    const cspPolicy = `
        default-src 'none';
        script-src 'self' 'strict-dynamic' 'nonce-${currentNonce}' https:;
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
        font-src 'self' https://fonts.gstatic.com;
        img-src 'self' data:;
        connect-src 'self';
        form-action 'self';
        base-uri 'none';
    `.replace(/\s+/g, ' ');

    const existingMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    if (existingMeta) existingMeta.remove();

    const meta = document.createElement('meta');
    meta.httpEquiv = 'Content-Security-Policy';
    meta.content = cspPolicy;
    document.head.prepend(meta);
}

/**
 * Adiciona um token CSRF ao formulário.
 * @param {HTMLFormElement} form Formulário alvo.
 */
function addCSRFToken(form) {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'csrf_token';
    input.value = csrfToken;
    form.appendChild(input);
}

/**
 * Valida o token CSRF antes do envio do formulário.
 * @param {string} token Token a ser validado.
 * @returns {boolean} true se for válido, false caso contrário.
 */
function validateCSRFToken(token) {
    return token === csrfToken;
}

// ============== INTEGRAÇÃO SEGURA NO DOM ==============
document.addEventListener('DOMContentLoaded', () => {
    applyCSP();

    const form = document.querySelector('#securityTestForm');
    const resultsDiv = document.querySelector('#results');

    if (!form || !resultsDiv) {
        console.error('Elementos do formulário não encontrados no DOM.');
        return;
    }

    addCSRFToken(form);

    const textInput = form.querySelector('input[name="textInput"]');
    const numberInput = form.querySelector('input[name="numberInput"]');
    const letterInput = form.querySelector('input[name="letterInput"]');
    const urlInput = form.querySelector('input[name="urlInput"]');

    if (!textInput || !numberInput || !letterInput || !urlInput) {
        console.error('Estrutura do formulário inválida: campos esperados não encontrados.');
        return;
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const submittedToken = form.querySelector('input[name="csrf_token"]').value;
        if (!validateCSRFToken(submittedToken)) {
            console.error('Falha na validação do token CSRF!');
            resultsDiv.innerHTML = '<p class="error">Erro de segurança: Token CSRF inválido.</p>';
            return;
        }

        try {
            const secureScript = document.createElement('script');
            secureScript.nonce = currentNonce;
            secureScript.textContent = `console.log("Script seguro executado.");`;
            document.body.appendChild(secureScript);

            const textOutput = escapeHTML(sanitizeInput(textInput.value));
            const numberOutput = sanitizeInput(numberInput.value, 'number');
            const letterOutput = sanitizeInput(letterInput.value, 'letters');
            const urlOutput = sanitizeURL(urlInput.value);

            resultsDiv.innerHTML = '';
            const addSafeLine = (label, value) => {
                const p = document.createElement('p');
                p.innerHTML = `<strong>${label}:</strong> ${value}`;
                resultsDiv.appendChild(p);
            };

            addSafeLine('Texto Sanitizado', textOutput);
            addSafeLine('Número Sanitizado', numberOutput);
            addSafeLine('Apenas Letras', letterOutput);
            addSafeLine('URL Sanitizada', urlOutput);
        } catch (error) {
            console.error('Erro ao processar entradas no submit do formulário:', error);
            resultsDiv.innerHTML = '<p class="error">Houve um problema ao processar os dados. Por favor, tente novamente.</p>';
        }
    });
});