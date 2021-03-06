const SERVER = process.env.NEXT_PUBLIC_SERVER_API;

export const SEARCH_MARKET_API = `${SERVER}/search`;
export const CANDLE_API = `${SERVER}/api/candle`;
export const INFO_API = `${SERVER}/api/info`;
export const QUOTE_API = `${SERVER}/api/quote`;
export const NEWS_API = `${SERVER}/api/news`;

export const REGISTER_API = `${SERVER}/api/auth/local/register`;
export const LOGIN_API = `${SERVER}/api/auth/local`;
export const WATCHLISTS_API = `${SERVER}/api/watchlists`;
export const LIKES_API = `${SERVER}/api/likes`;
export const COMMENTS_API = `${SERVER}/api/comments`;
