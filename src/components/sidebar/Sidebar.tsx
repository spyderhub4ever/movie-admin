import {
  Film,
  Users,
  Star,
  BarChart3,
  Settings,
  Home,
  FileText,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  LogOut,
  UserStar,
} from "lucide-react";
import { useState } from "react";

type SidebarProps = {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
};

export default function Sidebar({
  isCollapsed = false,
  setIsCollapsed = () => {},
}: SidebarProps) {
  const [activeItem, setActiveItem] = useState("dashboard");

  const menuItems = [
    { id: "dashboard", icon: Home, label: "Dashboard", badge: null },
    { id: "admins", icon: UserStar, label: "Admins", badge: null },
    { id: "users", icon: Users, label: "Users", badge: null },
    { id: "movies", icon: Film, label: "Movies", badge: "1,234" },
    { id: "categories", icon: FileText, label: "Categories", badge: null },
    { id: "reviews", icon: Star, label: "Reviews", badge: "89" },
    { id: "comments", icon: MessageSquare, label: "Comments", badge: "12" },
    { id: "analytics", icon: BarChart3, label: "Analytics", badge: null },
  ];

  const bottomItems = [
    { id: "settings", icon: Settings, label: "Settings" },
    { id: "logout", icon: LogOut, label: "Logout" },
  ];

  return (
    <div className="flex">
      <div
        className={`${
          isCollapsed ? "w-20" : "w-64"
        } h-screen transition-all duration-200 ease-out bg-gradient-to-b from-[#1a1d23] to-[#0f1114] flex flex-col relative z-10`}
      >
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Film className="w-6 h-6 text-white" />
              </div>
              {!isCollapsed && (
                <div>
                  <h1 className="text-xl font-bold text-white">CineAdmin</h1>
                  <p className="text-xs text-gray-400">Movie Reviews</p>
                </div>
              )}
            </div>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1.5 rounded-lg hover:bg-gray-800/50 text-gray-400 hover:text-white transition-colors duration-150"
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-6">
          <nav className="pl-3 relative">
            <div className="space-y-1 relative">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeItem === item.id;
                return (
                  <div key={item.id} className="relative">
                    <button
                      onClick={() => setActiveItem(item.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-3 rounded-l-xl text-left transition-all duration-150 ease-out group relative ${
                        isActive
                          ? "bg-gradient-to-r from-purple-500/20 to-transparent text-white border-r-2 border-purple-400"
                          : "text-gray-400 hover:text-white hover:bg-gray-800/30"
                      }`}
                    >
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/15 to-transparent rounded-l-xl" />
                      )}

                      <Icon
                        className={`${
                          isCollapsed ? "w-6 h-6" : "w-5 h-5"
                        } relative z-10 transition-colors duration-150 ${
                          isActive
                            ? "text-purple-400"
                            : "group-hover:text-purple-400"
                        }`}
                      />
                      {!isCollapsed && (
                        <span className="flex-1 font-medium relative z-10 transition-colors duration-150">
                          {item.label}
                        </span>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </nav>
        </div>

        <div className="border-t border-gray-800 p-3">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-l-xl text-left transition-all duration-150 ease-out group ${
                  isActive
                    ? "bg-gradient-to-r from-purple-500/20 to-transparent text-white border-r-2 border-purple-400"
                    : "text-gray-400 hover:text-white hover:bg-gray-800/30"
                }`}
              >
                <Icon
                  className={`${
                    isCollapsed ? "w-6 h-6" : "w-5 h-5"
                  } relative z-10 transition-colors duration-150 ${
                    isActive ? "text-purple-400" : "group-hover:text-purple-400"
                  }`}
                />
                {!isCollapsed && (
                  <span className="font-medium relative z-10">
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
