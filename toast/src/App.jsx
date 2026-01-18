import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  X,
  CheckCircle,
  AlertCircle,
  Info,
  AlertTriangle,
  Plus,
} from "lucide-react";

/**
 * Toast Component
 * Handles the individual toast lifecycle, animations, and layout collapse.
 */
const Toast = ({ id, message, type, onClose, duration = 5000 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const timerRef = useRef(null);

  // Trigger entrance animation
  useEffect(() => {
    // Small delay to allow the DOM node to be painted before triggering transition
    const timer = setTimeout(() => setIsVisible(true), 10);

    // Auto-dismiss logic
    timerRef.current = setTimeout(() => {
      handleClose();
    }, duration);

    return () => {
      clearTimeout(timer);
      clearTimeout(timerRef.current);
    };
  }, [duration]);

  const handleClose = () => {
    setIsRemoving(true);
    // Wait for the exit and layout-collapse animations to finish before removing from state
    setTimeout(() => {
      onClose(id);
    }, 400); // Slightly longer than the CSS transition (300ms)
  };

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500" />,
  };

  const bgColors = {
    success: "bg-green-50 border-green-100",
    error: "bg-red-50 border-red-100",
    info: "bg-blue-50 border-blue-100",
    warning: "bg-amber-50 border-amber-100",
  };

  return (
    <div
      className={`
        grid transition-all duration-300 ease-in-out
        ${
          isRemoving
            ? "grid-rows-[0fr] mb-0 opacity-0"
            : "grid-rows-[1fr] mb-3 opacity-100"
        }
      `}
    >
      <div className="overflow-hidden">
        <div
          className={`
            relative flex items-center w-80 p-4 rounded-xl border shadow-lg transition-all duration-300 ease-out transform
            ${bgColors[type] || "bg-white border-gray-100"}
            ${
              isVisible && !isRemoving
                ? "translate-x-0 opacity-100 scale-100"
                : "translate-x-full opacity-0 scale-95"
            }
          `}
        >
          <div className="flex-shrink-0 mr-3">{icons[type]}</div>
          <div className="flex-1 text-sm font-medium text-gray-800">
            {message}
          </div>
          <button
            onClick={handleClose}
            className="flex-shrink-0 ml-4 p-1 rounded-full hover:bg-black/5 transition-colors text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 h-1 bg-black/5 w-full overflow-hidden rounded-b-xl">
            <div
              className={`h-full transition-all linear ${
                type === "success"
                  ? "bg-green-500"
                  : type === "error"
                    ? "bg-red-500"
                    : type === "info"
                      ? "bg-blue-500"
                      : "bg-amber-500"
              }`}
              style={{
                width: isVisible && !isRemoving ? "0%" : "100%",
                transitionDuration: `${duration}ms`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Main App Component
 */
export default function App() {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "info") => {
    const id = Date.now();
    setToasts((prev) => [{ id, message, type }, ...prev]);
  };

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const demoToasts = [
    {
      label: "Success Toast",
      type: "success",
      msg: "Operation completed successfully!",
    },
    {
      label: "Error Toast",
      type: "error",
      msg: "Something went wrong. Please try again.",
    },
    {
      label: "Info Toast",
      type: "info",
      msg: "New update available for download.",
    },
    {
      label: "Warning Toast",
      type: "warning",
      msg: "Your storage is almost full.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">
          Toast Notifications
        </h1>
        <p className="text-gray-500 text-center mb-8">
          Click buttons to trigger animated toasts. Watch them slide out and
          restack smoothly.
        </p>

        <div className="grid grid-cols-1 gap-3">
          {demoToasts.map((toast) => (
            <button
              key={toast.type}
              onClick={() => addToast(toast.msg, toast.type)}
              className="flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all group active:scale-95"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-2 h-2 rounded-full ${
                    toast.type === "success"
                      ? "bg-green-500"
                      : toast.type === "error"
                        ? "bg-red-500"
                        : toast.type === "info"
                          ? "bg-blue-500"
                          : "bg-amber-500"
                  }`}
                />
                <span className="font-medium text-gray-700">{toast.label}</span>
              </div>
              <Plus className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
            </button>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <button
            onClick={() => setToasts([])}
            className="text-sm text-gray-400 hover:text-red-500 transition-colors"
          >
            Clear all toasts
          </button>
        </div>
      </div>

      {/* Toast Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
        <div className="flex flex-col items-end pointer-events-auto">
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              id={toast.id}
              message={toast.message}
              type={toast.type}
              onClose={removeToast}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
