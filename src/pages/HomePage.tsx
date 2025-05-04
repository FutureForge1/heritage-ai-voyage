
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import SearchBar from "@/components/home/SearchBar";
import UserWelcome from "@/components/home/UserWelcome";
import QuizCard from "@/components/home/QuizCard";
import AIAssistantCard from "@/components/home/AIAssistantCard";
import SocialFeaturesCard from "@/components/home/SocialFeaturesCard";
import HeritageSlider from "@/components/home/HeritageSlider";
import CreativeWorkshop from "@/components/home/CreativeWorkshop";

const HomePage = () => {
  return (
    <div className="pb-20 min-h-screen bg-heritage-cream">
      <div className="mx-auto max-w-lg">
        <SearchBar />
        <UserWelcome />
        <QuizCard />
        <AIAssistantCard />
        <SocialFeaturesCard />
        <HeritageSlider />
        <CreativeWorkshop />
      </div>
      <Navigation />
    </div>
  );
};

export default HomePage;
