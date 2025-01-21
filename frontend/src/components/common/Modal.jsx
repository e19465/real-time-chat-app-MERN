const Modal = ({
  dialogText = null,
  dialogQuestion,
  handleClose,
  isModelOpen,
  isLoading,
  handleAccept,
  Icon,
  loadingText,
  notLoadingText,
}) => {
  return (
    <>
      {isModelOpen && (
        <div
          className="fixed inset-0 z-[5000] flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleClose}
        >
          <div
            className="bg-gray-900 rounded-lg shadow-lg w-full max-w-sm p-6 mx-4 border border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center justify-center">
              <span className="text-white bg-blue-500/10 w-12 h-12 rounded-full flex items-center justify-center p-2">
                <Icon className="size-6" />
              </span>
              <h2 className="font-bold text-lg mt-2">{dialogQuestion}</h2>
              {dialogText && <p className="mt-2 text-center">{dialogText}</p>}
              <div className="flex items-center justify-center gap-3 w-full mt-6">
                <button
                  disabled={isLoading}
                  onClick={handleClose}
                  className={`border border-red-500 px-6 py-2.5 rounded text-sm shadow-sm hover:bg-red-500 transition-colors duration-300 text-red-500 hover:text-white ${
                    isLoading && "cursor-not-allowed"
                  }`}
                >
                  Cancel
                </button>
                <button
                  disabled={isLoading}
                  onClick={handleAccept}
                  className={`bg-base-200 border border-gray-400 px-6 py-2.5 text-sm text-white rounded shadow-sm hover:bg-white hover:text-black transition-colors duration-300 ${
                    isLoading && "cursor-not-allowed"
                  }`}
                >
                  {isLoading ? loadingText : notLoadingText}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
