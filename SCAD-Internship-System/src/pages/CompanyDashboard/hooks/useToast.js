import { useState } from 'react';

const useToast = () => {
  const [toasts, setToasts] = useState([]);
  
  const showToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };
  
  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };
  
  return { toasts, showToast, removeToast };
};

export default useToast;