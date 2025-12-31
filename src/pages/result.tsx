import { Header } from "../components/home/header";
import { ResultsComponenet } from "../components/results-component";

const Results = () => {
  return (
    <div className="flex flex-col h-full w-full padding lg:gap-16 md:gap-20 gap-8 overflow-auto overflow-x-hidden">
      <Header />
      <ResultsComponenet status="FIRST_TEST" />
    </div>
  );
};

export default Results;
