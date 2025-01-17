"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import Introduction from "../components/help/Introduction";
import MainHelpTopics from "../components/help/MainHelpTopics";
import FAQs from "../components/help/FAQs";
import ContactSupport from "../components/help/ContactSupport";
import InteractiveTutorials from "../components/help/InteractiveTutorials";

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [language, setLanguage] = useState("en");

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality here
    console.log("Searching for:", searchQuery);
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "vi" ? "en" : "vi"));
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {language === "vi" ? "Trung tâm trợ giúp" : "Help Center"}
          </h1>
          <Button onClick={toggleLanguage}>
            {language === "vi" ? "English" : "Tiếng Việt"}
          </Button>
        </div>

        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative">
            <Input
              type="text"
              placeholder={
                language === "vi"
                  ? "Tìm kiếm trợ giúp..."
                  : "Search for help..."
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </form>

        <Introduction language={language} />

        <Tabs defaultValue="main-topics" className="mt-8">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="main-topics">
              {language === "vi" ? "Chủ đề chính" : "Main Topics"}
            </TabsTrigger>
            <TabsTrigger value="faqs">
              {language === "vi" ? "Câu hỏi thường gặp" : "FAQs"}
            </TabsTrigger>
            <TabsTrigger value="tutorials">
              {language === "vi" ? "Hướng dẫn" : "Tutorials"}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="main-topics">
            <MainHelpTopics language={language} />
          </TabsContent>
          <TabsContent value="faqs">
            <FAQs language={language} />
          </TabsContent>
          <TabsContent value="tutorials">
            <InteractiveTutorials language={language} />
          </TabsContent>
        </Tabs>

        <ContactSupport language={language} />
      </div>
    </div>
  );
}
