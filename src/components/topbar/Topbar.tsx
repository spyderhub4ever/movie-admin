import { useAuthStore } from "@/store/useAuthStore";
import {
  ChevronDown,
  Filter,
  HelpCircle,
  LogOut,
  Plus,
  Search,
  Settings,
  User,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  return (
    <header className="h-16 bg-[#1a1d23] flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search movies, reviews, users..."
            className="pl-10 bg-gray-800 text-gray-100 placeholder-gray-400 border-0 focus-visible:ring-2 focus-visible:ring-purple-500/50"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Movie</span>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="text-gray-400 hover:text-white"
        >
          <Filter className="w-5 h-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 hover:bg-gray-600 text-gray-300 hover:text-white"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatarUrl} alt={user?.name} />
                <AvatarFallback className="bg-purple-500 text-white">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <span className="hidden md:block font-medium">
                {user?.name || "User"}
              </span>
              <ChevronDown className="w-4 h-4 opacity-70" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-56 rounded-xl bg-gray-800 border border-gray-700 shadow-lg p-2"
          >
            <DropdownMenuLabel className="text-gray-400 text-sm px-2 py-1">
              {user?.email}
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-700" />

            <DropdownMenuItem className="flex items-center gap-2 text-gray-200 hover:bg-gray-700 rounded-md px-2 py-2">
              <User className="w-4 h-4" /> Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 text-gray-200 hover:bg-gray-700 rounded-md px-2 py-2">
              <Settings className="w-4 h-4" /> Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 text-gray-200 hover:bg-gray-700 rounded-md px-2 py-2">
              <HelpCircle className="w-4 h-4" /> Help
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-gray-700" />

            <DropdownMenuItem
              onClick={() => {
                logout();
                navigate("/auth");
              }}
              className="flex items-center gap-2 text-red-500 hover:bg-red-600/20 rounded-md px-2 py-2"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
