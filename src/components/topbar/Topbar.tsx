import { Filter, Plus, Search, Bell, Moon, Sun } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ProfileDropdown } from "../sidebar/ProfileDropdown";

export default function Topbar() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <header className="h-16 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/50 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-900/90">
      <div className="flex items-center justify-between px-6 h-full">
        <div className="flex items-center space-x-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-purple-400 transition-colors duration-200" />
              <Input
                placeholder="Search movies, reviews, users..."
                className="w-80 pl-10 pr-4 py-2 bg-slate-800/80 hover:bg-slate-800 focus:bg-slate-800 text-slate-100 placeholder-slate-400 border border-slate-700 hover:border-slate-600 focus:border-purple-500 rounded-xl transition-all duration-200 focus-visible:ring-2 focus-visible:ring-purple-500/20 focus-visible:ring-offset-0"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-purple-500/25 transition-all duration-200 rounded-xl px-4 py-2 font-medium">
            <Plus className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Add Movie</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all duration-200 relative group"
          >
            <Filter className="w-5 h-5" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all duration-200 relative group"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all duration-200 relative group"
          >
            <Bell className="w-5 h-5" />
            <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </Button>
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
}
