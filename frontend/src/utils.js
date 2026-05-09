import { toast } from 'react-toastify';

export const handleSuccess = (msg) => {
    toast.success(msg, {
        position: 'top-right'
    });
};

export const handleError = (msg) => {
    toast.error(msg, {
        position: 'top-right'
    });
};

// ✅ Uses env variable injected at build time by Create React App
// In production (Vercel): set REACT_APP_API_URL=https://your-backend.onrender.com
// In development: set REACT_APP_API_URL=http://localhost:8080 in frontend/.env
export const APIUrl = process.env.REACT_APP_API_URL || 'http://localhost:8080';
