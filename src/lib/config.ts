export const ENVIRONMENT = process.env.NODE_ENV;

//Website
export const WEBSITE_DOMAIN = String(process.env.NEXT_PUBLIC_WEBSITE_DOMAIN);

//Giscus
export const GISCUS_REPO = String(process.env.NEXT_PUBLIC_GISCUS_REPO);
export const GISCUS_REPO_ID = String(process.env.NEXT_PUBLIC_GISCUS_REPO_ID);
export const GISCUS_CATEGORY_ID = String(
  process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID
);

//Splitbee
export const SPLITBEE_TOKEN = String(process.env.NEXT_PUBLIC_SPLITBEE_TOKEN);

//Spotify
export const SPOTIFY_CLIENT_ID = String(process.env.SPOTIFY_CLIENT_ID);
export const SPOTIFY_CLIENT_SECRET = String(process.env.SPOTIFY_CLIENT_SECRET);
export const SPOTIFY_REFRESH_TOKEN = String(process.env.SPOTIFY_REFRESH_TOKEN);

//Email
export const EMAIL_HOST = String(process.env.EMAIL_HOST);
export const EMAIL_USER = String(process.env.EMAIL_USER);
export const EMAIL_PASSWORD = String(process.env.EMAIL_PASSWORD);
export const EMAIL_TO = String(process.env.EMAIL_TO);
