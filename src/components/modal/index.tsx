const Modal = ({
  isVisible,
  onClose,
  children,
}: {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  if (!isVisible) {
    return null;
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <button
          className="absolute text-gray-600 right-2 top-2 hover:text-gray-800"
          onClick={onClose}
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};
export default Modal;
