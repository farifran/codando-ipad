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
 * Sanitiza entradas com base no tipo esperado.
 * @param {*} input Entrada do usuário.
 * @param {string} type Tipo esperado: 'default', 'letters' ou 'number'.
 * @returns {string|number|null} Valor sanitizado.
 */
function sanitizeInput(input, type = 'default') {
    if (input === undefined || input === null) return type === 'number' ? null : '';

    const str = String(input).trim().substring(0, 1000); // Limite de caracteres

    switch (type) {
        case 'number':
            return /^[+-]?\d*\.?\d+$/.test(str) ? parseFloat(str) : null;
        case 'letters':
            return str.replace(/[^a-zA-ZÀ-ÿ\s]/g, ''); // Apenas letras e espaços
        default:
            return str; // Permite qualquer caractere
    }
}

/**
 * Escapa texto para evitar XSS em HTML.
 */
function escapeHTML(input) {
    return String(input).replace(/[&<>"'`]/g, c => HTML_ESCAPE[c]);
}

/**
 * Escapa entrada para CSS.
 */
function escapeCSS(input) {
    return String(input).replace(/[^a-zA-Z0-9_-]/g, '');
}

/**
 * Escapa entrada para JavaScript seguro.
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
 * Sanitiza URLs, impedindo protocolos perigosos.
 */
function sanitizeURL(input) {
    const str = String(input).trim();
    if (/^(javascript|data|vbscript):/i.test(str)) return '#';

    try {
        const url = new URL(str, window.location.origin);
        return ['http:', 'https:', 'ftp:'].includes(url.protocol) ? url.href : '#';
    } catch {
        return /^\/[\w-]/.test(str) || str.startsWith('#') ? str : '#';
    }
}

/**
 * Gera um nonce seguro.
 */
function generateNonce() {
    return Array.from(window.crypto.getRandomValues(new Uint8Array(16)))
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join('');
}

/**
 * Aplica a Política de Segurança de Conteúdo (CSP).
 */
function applyCSP() {
    const nonce = generateNonce();

    const cspPolicy = `
        default-src 'none';
        script-src 'self' 'strict-dynamic' 'nonce-${nonce}' https:;
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
        font-src 'self' https://fonts.gstatic.com;
        img-src 'self' data:;
        connect-src 'self';
        form-action 'self';
        base-uri 'none';
        frame-ancestors 'none'; // Proteção contra Clickjacking
    `.replace(/\s+/g, ' ');

    const meta = document.createElement('meta');
    meta.httpEquiv = 'Content-Security-Policy';
    meta.content = cspPolicy;
    document.head.prepend(meta);
}

/**
 * Configurações de Cookies Seguros.
 */
function setSecureCookie(name, value, days = 7) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; 
                       expires=${expires}; 
                       path=/; 
                       Secure; 
                       HttpOnly; 
                       SameSite=Strict`;
}

/**
 * Carrega dinamicamente um script externo com SRI e crossorigin seguro.
 */
function loadExternalScript(src, integrity, crossorigin = 'anonymous') {
    const script = document.createElement('script');
    script.src = src;
    script.integrity = integrity;
    script.crossOrigin = crossorigin;
    script.defer = true;
    document.head.appendChild(script);
}

// ============== INTEGRAÇÃO SEGURA NO DOM ==============
document.addEventListener('DOMContentLoaded', () => {
    applyCSP();

    // Exemplo: Carregar script externo de forma segura
    loadExternalScript(
        'https://cdn.example.com/lib.js',
        'sha384-abc123XYZ...'
    );

    const form = document.querySelector('#securityTestForm');
    const resultsDiv = document.querySelector('#results');

    if (!form || !resultsDiv) return;

    const textInput = form.querySelector('input[name="textInput"]');
    const numberInput = form.querySelector('input[name="numberInput"]');
    const letterInput = form.querySelector('input[name="letterInput"]');
    const urlInput = form.querySelector('input[name="urlInput"]');

    if (!textInput || !numberInput || !letterInput || !urlInput) return;

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        try {
            const textOutput = escapeHTML(sanitizeInput(textInput.value));
            const numberOutput = sanitizeInput(numberInput.value, 'number');
            const letterOutput = sanitizeInput(letterInput.value, 'letters');
            const urlOutput = sanitizeURL(urlInput.value);

            resultsDiv.innerHTML = `
                <p><strong>Texto Sanitizado:</strong> ${textOutput}</p>
                <p><strong>Número Sanitizado:</strong> ${numberOutput}</p>
                <p><strong>Apenas Letras:</strong> ${letterOutput}</p>
                <p><strong>URL Sanitizada:</strong> ${urlOutput}</p>
            `;
        } catch (error) {
            console.error('Erro ao processar o formulário:', error);
            resultsDiv.innerHTML = '<p class="error">Erro ao processar os dados.</p>';
        }
    });
});