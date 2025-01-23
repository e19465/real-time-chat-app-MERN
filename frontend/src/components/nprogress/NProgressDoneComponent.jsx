import { useEffect, Suspense } from "react";
import { useLocation } from "react-router-dom";
import NProgress from "nprogress";

function NProgressDone() {
  const location = useLocation(); // React Router hook to track route changes

  useEffect(() => {
    NProgress.done();
  }, [location]); // Re-run effect when the route changes

  return null;
}

const NProgressDoneComponent = () => (
  <Suspense fallback={null}>
    <NProgressDone />
  </Suspense>
);

export default NProgressDoneComponent;
