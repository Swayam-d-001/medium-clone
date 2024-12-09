/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_BACKEND_URL: string; // Define your Vite-specific env variables here
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  