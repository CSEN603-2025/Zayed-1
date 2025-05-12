import React from 'react';
import { FaCheckCircle, FaTimes, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';
import * as Styles from '../Styles';

const ToastNotifications = ({ toasts, removeToast }) => {
  return (
    <Styles.ToastContainer>
      {toasts.map(toast => (
        <Styles.Toast key={toast.id} type={toast.type}>
          <Styles.ToastIcon>
            {toast.type === 'success' && <FaCheckCircle />}
            {toast.type === 'error' && <FaTimes />}
            {toast.type === 'warning' && <FaExclamationTriangle />}
            {toast.type === 'info' && <FaInfoCircle />}
          </Styles.ToastIcon>
          <Styles.ToastContent>
            <Styles.ToastMessage>{toast.message}</Styles.ToastMessage>
          </Styles.ToastContent>
          <Styles.ToastCloseButton onClick={() => removeToast(toast.id)}>
            &times;
          </Styles.ToastCloseButton>
        </Styles.Toast>
      ))}
    </Styles.ToastContainer>
  );
};

export default ToastNotifications; 