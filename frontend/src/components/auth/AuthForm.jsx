import { Loader } from "lucide-react";

const AuthForm = ({
  children,
  TopIcon,
  handleSubmit,
  topTitle,
  topSubtitle,
  loading,
  loadingBtnText,
  notLoadingBtnText,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-auto flex flex-col items-center justify-center"
    >
      <TopIcon size={64} className="size-8 text-primary mb-1" />
      <h1 className="text-xl font-semibold text-center">{topTitle}</h1>
      <p className="text-primary">{topSubtitle}</p>

      <div className="w-full h-auto flex flex-col items-center justify-center gap-4 mt-2 px-6 text-sm">
        {children}
      </div>

      <div className="w-full h-auto flex items-center justify-center mt-4 px-6">
        <button
          className="btn w-full border border-gray-700 tracking-widest
          
          flex items-center justify-center gap-2"
          type="submit"
        >
          {loading ? (
            <>
              <span>{loadingBtnText}</span>
              <Loader size={16} className="animate-spin" />
            </>
          ) : (
            <>
              <span>{notLoadingBtnText}</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default AuthForm;
