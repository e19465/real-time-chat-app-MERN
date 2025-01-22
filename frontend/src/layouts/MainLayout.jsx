import Navbar from "../components/common/Navbar";

const MainLayout = ({ children }) => {
  return (
    <div className="w-full h-screen  flex flex-col">
      <div className="w-full h-[50px]">
        <Navbar />
      </div>
      <div className="w-full min-h-[calc(100%-50px)] h-auto overflow-y-auto flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
