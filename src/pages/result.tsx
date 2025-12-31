import { useEffect } from "react";
import { Header } from "../components/home/header";
import { ResultsComponenet } from "../components/results-component";
import { useTypingStore } from "../zustand";
import { useNavigate } from "react-router-dom";

const Results = () => {
  const { typingState } = useTypingStore();
  const navigate = useNavigate();

  // users do not visit this page if they are not done typing
  useEffect(() => {
    if (typingState !== "COMPLETE") {
      navigate("/");
    }
  }, [navigate, typingState]);
  return (
    <div className="flex flex-col h-full w-full padding lg:gap-16 md:gap-20 gap-8 overflow-auto overflow-x-hidden">
      <Header />
      <ResultsComponenet status="NEW_PERSONAL_BEST" />
    </div>
  );
};

export default Results;
