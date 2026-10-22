// default to same origin: Vite proxies these in dev, nginx in production
export const backendUrl = import.meta.env.VITE_BACKEND_URL || "/api/v1";
export const socketUrl = import.meta.env.VITE_SOCKET || "/";
