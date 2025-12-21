import { Header } from "../components/home/header";
import { HomeUtils } from "../components/home/home-utils";
import { TypingCanvas } from "../components/typing-canvas";

const HomePage = () => {
  return (
    <div className="flex flex-col h-full w-full padding gap-10">
      <div className="w-full flex flex-col gap-16">
        <Header />
        <HomeUtils />
      </div>
      <TypingCanvas />
    </div>
  );
};

export default HomePage;
