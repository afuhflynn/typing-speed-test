import { Header } from "../components/home/header";
import { AppUtils } from "../components/home/app-utils";
import { TypingCanvas } from "../components/typing-canvas";
import { FooterSection } from "../components/footer";

const HomePage = () => {
  return (
    <div className="flex flex-col h-full w-full padding gap-8 overflow-x-hidden">
      <section className="w-full flex flex-col lg:gap-16 gap-8">
        <Header />
        <AppUtils />
      </section>
      <section className="w-full flex flex-col lg:gap-16 md:gap-10 gap-8 flex-1">
        <TypingCanvas />
        <FooterSection />
      </section>
    </div>
  );
};

export default HomePage;
