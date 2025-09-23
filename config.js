// --- ENCRYPTED STATIC DATA & CONFIGURATION ---
const ENCRYPTED_API_KEY = 'ZjdkMDRiNTQxZjY5YmMxZjMyZDFjZGZkODFjMjUwOGU=';
const ENCRYPTED_SERIALS = 'S1MtMjAyNC1QUkVNSVVNX18jI19fS1MtREVNTy1VU0VSLTAxX18jI19fS0FJU0VSLU1BWC1BQ0NFU1M=';

// --- DECODER FUNCTION ---
const decode = (str) => {
    try {
        return atob(str);
    } catch (e) {
        console.error("Failed to decode string:", e);
        return '';
    }
};

// --- DECODED CONFIGURATION ---
export const API_KEY = decode(ENCRYPTED_API_KEY);
export const API_URL = 'https://api.themoviedb.org/3';
export const IMAGE_URL = 'https://image.tmdb.org/t/p';
export const VALID_SERIAL_KEYS = new Set(decode(ENCRYPTED_SERIALS).split('__##__'));

export const genres = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 14, name: 'Fantasy' },
    { id: 36, name: 'History' },
    { id: 27, name: 'Horror' },
    { id: 10402, name: 'Music' },
    { id: 9648, name: 'Mystery' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Science Fiction' },
    { id: 10770, name: 'TV Movie' },
    { id: 53, name: 'Thriller' },
    { id: 10752, name: 'War' },
    { id: 37, name: 'Western' },
    { id: 10759, name: 'Action & Adventure' },
    { id: 10765, name: 'Sci-Fi & Fantasy' },
];

export const SERVERS = [
    { name: 'AutoEmbed', movieUrl: 'https://player.autoembed.cc/embed/movie/{id}', tvUrl: 'https://player.autoembed.cc/embed/tv/{id}/{season}/{episode}' },
    { name: 'VidSrc', movieUrl: 'https://vidsrc.xyz/embed/movie/{id}', tvUrl: 'https://vidsrc.xyz/embed/tv/{id}/{season}-{episode}' },
    { name: '2Embed', movieUrl: 'https://www.2embed.cc/embed/movie?tmdb_id={id}', tvUrl: 'https://www.2embed.cc/embed/tv?tmdb_id={id}&s={season}&e={episode}' },
];
