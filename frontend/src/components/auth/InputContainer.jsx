import React from "react";

const InputContainer = ({ children, label, Icon }) => {
  return (
    <div className="w-full flex flex-col items-start justify-start">
      <p className="text-left capitalize">{label}</p>
      <label className="w-full h-[45px] input input-bordered flex items-center gap-2">
        <Icon size={24} className="text-primary" />
        {children}
      </label>
    </div>
  );
};

export default InputContainer;
