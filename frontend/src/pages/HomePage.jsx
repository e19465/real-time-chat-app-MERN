import MainLayout from "../layouts/MainLayout";

const HomePage = () => {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-between w-full h-full">
        <h1>Home Page</h1>
        <button type="button">logout</button>
      </div>
    </MainLayout>
  );
};

export default HomePage;
