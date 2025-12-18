// This automatically switches between localhost and the Vercel/Render URL
// provided via VITE_API_URL environment variable.


export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

