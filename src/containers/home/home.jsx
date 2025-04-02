import MultiDevice from "./sections/multi-device";
import Download from "./sections/download";
import MultiUse from "./sections/multi-use";
import KidContent from "./sections/kid-content";
import Questions from "./sections/question";

const Home = () => {
  return (
    <>
      <MultiDevice />
      <Download />
      <MultiUse />
      <KidContent />
      <Questions />
    </>
  );
};

export default Home;