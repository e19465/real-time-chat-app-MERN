import MainLayout from "../layouts/MainLayout";
import { ProgressLink } from "../components/nprogress/NProgressHandler";

const NotFoundPage = () => {
  return (
    <MainLayout>
      <div className="w-full h-full flex flex-col items-center justify-center gap-1">
        {/* Image */}
        <div className="animate-pulse w-full h-auto flex items-center justify-center">
          <img
            src="/404.png"
            alt="Not Found"
            loading="lazy"
            className="w-1/2 sm:w-1/4 h-auto object-contain mb-4"
          />
        </div>

        {/* 404 Heading */}
        <h1 className="text-6xl font-extrabold">404</h1>

        {/* Message */}
        <p className="text-base sm:text-lg text-center px-12">
          The page you are looking for cannot be found.
        </p>

        {/* Button */}
        <ProgressLink
          to="/"
          className="bg-primary/10 px-6 py-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 hover:bg-primary/20 transition-colors duration-300 mt-4"
        >
          Back to Home
        </ProgressLink>
      </div>
    </MainLayout>
  );
};

export default NotFoundPage;
