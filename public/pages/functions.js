function generateShortUrl(url) {
    const AVAILABLE_CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const CHARS_LENGTH = AVAILABLE_CHARS.length;

    shortUrl = '';
    for (let i = 0; i < 10; i++) {
        shortUrl += AVAILABLE_CHARS.charAt(Math.floor(Math.random() * CHARS_LENGTH));
    }

    return shortUrl;
}

module.exports = generateShortUrl;