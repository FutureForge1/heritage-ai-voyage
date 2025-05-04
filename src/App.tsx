
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import GuidePage from "./pages/GuidePage";
import CreatePage from "./pages/CreatePage";
import ProfilePage from "./pages/ProfilePage";
import HeritageDetailPage from "./pages/HeritageDetailPage";
import StoryCreationPage from "./pages/StoryCreationPage";
import AIDrawingPage from "./pages/AIDrawingPage";
import MusicPage from "./pages/MusicPage";
import LoginPage from "./pages/LoginPage";
import VerifyCodePage from "./pages/VerifyCodePage";
import NotFound from "./pages/NotFound";
import FavoritesPage from "./pages/FavoritesPage";
import QuizPage from "./pages/QuizPage";
import CommunityPage from "./pages/CommunityPage";
import FriendsPage from "./pages/FriendsPage";

// Create a new QueryClient instance
const queryClient = new QueryClient();

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/guide" element={<GuidePage />} />
              <Route path="/guide/:id" element={<HeritageDetailPage />} />
              <Route path="/create" element={<CreatePage />} />
              <Route path="/create/story" element={<StoryCreationPage />} />
              <Route path="/create/drawing" element={<AIDrawingPage />} />
              <Route path="/create/music" element={<MusicPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/friends" element={<FriendsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/verify" element={<VerifyCodePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
