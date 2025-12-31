import { useEffect } from "react";
import { Header } from "../components/home/header";
import { ResultsComponenet } from "../components/results-component";
import { useTypingStore } from "../zustand";
import { useNavigate } from "react-router-dom";

const Results = () => {
  const { typingState, test } = useTypingStore();
  const navigate = useNavigate();
  const { isNewPersonalBest, isFirst } = test;

  // users do not visit this page if they are not done typing
  useEffect(() => {
    if (typingState !== "COMPLETE") {
      navigate("/");
    }
  }, [navigate, typingState]);
  return (
    <div className="flex flex-col h-full w-full padding lg:gap-16 md:gap-20 gap-8 overflow-auto overflow-x-hidden">
      <Header />
      <ResultsComponenet
        status={
          isNewPersonalBest
            ? "NEW_PERSONAL_BEST"
            : isFirst
            ? "FIRST_TEST"
            : "RESULTS"
        }
      />
    </div>
  );
};

export default Results;
