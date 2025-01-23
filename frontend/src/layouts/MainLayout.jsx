import Navbar from "../components/common/Navbar";

const MainLayout = ({ children }) => {
  return (
    <div className="w-full h-screen overflow-hidden flex flex-col">
      {/* Sticky Navbar */}
      <div className="w-full h-[50px] sticky top-0 z-50 bg-white">
        <Navbar />
      </div>

      {/* Scrollable content */}
      <div className="w-full flex-1 overflow-auto">{children}</div>
    </div>
  );
};

export default MainLayout;
