import { useEffect } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // Auto-close toast after 3 seconds
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-5 right-5 z-50 flex items-center gap-3 rounded-lg px-4 py-3 shadow-md 
        ${type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"}
      `}
    >
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 text-white">
        ✖
      </button>
    </div>
  );
};

export default Toast;
