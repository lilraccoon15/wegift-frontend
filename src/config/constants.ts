import { CLIENT_ENV } from "./clientEnv";

export const DEFAULT_PICTURES = {
  user: "/uploads/profilePictures/default-profile.jpg",
  wishlist: "/uploads/wishlistPictures/default-wishlist.png",
  exchange: "/uploads/exchangePictures/default-exchange.png",
  wish: "/uploads/wishPictures/default-wish.png",
};

export const BACKEND_URLS = {
  user: CLIENT_ENV.VITE_BACKEND_URL_USER,
  wishlist: CLIENT_ENV.VITE_BACKEND_URL_WISHLIST,
  exchange: CLIENT_ENV.VITE_BACKEND_URL_EXCHANGE,
  auth: CLIENT_ENV.VITE_BACKEND_URL_AUTH,
};
