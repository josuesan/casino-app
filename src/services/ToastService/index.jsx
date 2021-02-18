import { toast } from 'react-toastify';

const basicConfig = {
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
};

const ToastService = {
  success: (message, position = 'top-right', className = '') => {
    toast.success(message, {
      position,
      ...basicConfig,
      className,
    });
  },
  error: (message, position = 'top-right') => {
    toast.error(message, {
      position,
      ...basicConfig,
    });
  },
};

export default ToastService;
