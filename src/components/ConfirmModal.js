const ConfirmModal = ({
  setDeleteConfirm,
  deleteFn,
  current,
  confirmMessage,
}) => (
  <div>
    <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
      <div className="bg-slate-900 border-solid border-slate border-2 rounded px-16 py-14 rounded-md text-center">
        <h1 className="text-xl mb-4 font-bold text-white">{confirmMessage}</h1>
        <button
          onClick={() => setDeleteConfirm(false)}
          className="bg-red-500 px-4 py-2 rounded-md text-md text-white"
        >
          Cancel
        </button>
        <button
          onClick={() => deleteFn(current)}
          className="bg-blue-600 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
        >
          Ok
        </button>
      </div>
    </div>
  </div>
);

export default ConfirmModal;
