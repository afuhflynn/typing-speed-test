import { Header } from "../components/home/header";
import { HomeUtils } from "../components/home/home-utils";

const HomePage = () => {
  return (
    <div className="flex flex-col h-full w-full padding gap-16">
      <Header />
      <HomeUtils />
    </div>
  );
};

export default HomePage;
