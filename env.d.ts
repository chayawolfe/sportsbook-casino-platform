interface ImportMetaEnv {
    readonly VITE_HOST_API: string;
    readonly VITE_LOCAL_HOST_API: string;
    readonly MODE: string; // Vite's mode (development, production, etc.)
    // Add other VITE_* variables here as needed
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}