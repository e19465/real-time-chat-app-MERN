const InputContainer = ({
  children,
  label,
  Icon,
  classNameP = "",
  classNameContainer = "",
  classNameLabel = "",
}) => {
  return (
    <div
      className={`w-full flex flex-col items-start justify-start ${classNameContainer}`}
    >
      <p className={`text-left capitalize ${classNameP}`}>{label}</p>
      <label
        className={`w-full h-[45px] input input-bordered flex items-center gap-2 ${classNameLabel}`}
      >
        <Icon size={24} className="text-primary" />
        <div className="flex-grow flex items-center justify-between">
          {children}
        </div>
      </label>
    </div>
  );
};

export default InputContainer;
