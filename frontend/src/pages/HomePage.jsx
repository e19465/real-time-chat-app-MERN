import MainLayout from "../layouts/MainLayout";

const HomePage = () => {
  return (
    <MainLayout>
      <div className="text-white">
        <h1>Home Page</h1>

        <button type="button">logout</button>
      </div>
    </MainLayout>
  );
};

export default HomePage;
