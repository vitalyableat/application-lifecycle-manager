namespace NodeJS {
  interface ProcessEnv {
    SERVER_BASE_URL: string;
    JWT_ACCESS_SECRET: string;
    JWT_REFRESH_SECRET: string;
    MONGODB_URI: string;
  }
}
