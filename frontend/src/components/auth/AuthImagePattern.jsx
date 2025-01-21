const AuthImagePattern = ({ title, subtitle, animation = "animate-pulse" }) => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-base-200 p-12 rounded-r-lg">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-3 mb-8 place-items-center">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`w-16 h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 2xl:w-32 2xl:h-32 aspect-square rounded-2xl bg-primary/10 ${animation}`}
            />
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
