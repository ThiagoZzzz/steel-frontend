import { createContext, useState, useCallback, useContext } from 'react';
import { ToastContainer, ToastItem } from '../components/common/styles/toast';

const ToastContext = createContext(null);

let toastId = 0;

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, duration = 2000) => {
    const id = ++toastId;

    setToasts((prev) => {
      const newToasts = [...prev, { id, message, isExiting: false }];

      // evitar renderizado masivo de toasts
      if (newToasts.length > 3) {
        return newToasts.slice(newToasts.length - 3);
      }
      return newToasts;
    });

    setTimeout(() => {
      // iniciar animación de salida
      setToasts((prev) => prev.map(t => t.id === id ? { ...t, isExiting: true } : t));

      // eliminar del DOM después de que la animación termine
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 500);
    }, duration);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toasts.length > 0 && (
        <ToastContainer>
          {toasts.map((t) => (
            <ToastItem
              key={t.id}
              $isExiting={t.isExiting}
              role="status">
              {t.message}
            </ToastItem>
          ))}
        </ToastContainer>
      )}


    </ToastContext.Provider>
  );
};

export default ToastProvider;

// hook de acceso al contexto
export const useToast = () => {
  const contex = useContext(ToastContext);

  if (!contex) throw new Error('useToast must be used within ToastProvider');

  return contex;
};
