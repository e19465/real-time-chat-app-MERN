import { Loader } from "lucide-react";

const LoadingText = ({ loading, loadingText, notLoadingText }) => {
  return (
    <>
      {loading ? (
        <>
          <span>{loadingText}</span>
          <Loader size={16} className="animate-spin" />
        </>
      ) : (
        <>
          <span>{notLoadingText}</span>
        </>
      )}
    </>
  );
};

export default LoadingText;
