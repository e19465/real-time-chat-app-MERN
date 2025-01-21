const LeftRegionContainer = ({ children }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center border-[5px] border-base-200 rounded-l-lg">
      {children}
    </div>
  );
};

export default LeftRegionContainer;
