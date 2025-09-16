import { ChevronDown, HelpCircle, LogOut, Settings, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ProfileSheet } from "./ProfileSheet";

export const ProfileDropdown = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-12 items-center gap-3 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl px-3 py-2 transition-all duration-200 group"
        >
          <div className="hidden md:block text-right">
            <div className="font-medium text-sm">{user?.name || "User"}</div>
            <div className="text-xs text-slate-400 truncate max-w-24">
              {user?.email}
            </div>
          </div>
          <div className="relative">
            <Avatar className="h-8 w-8 ring-2 ring-slate-700 group-hover:ring-purple-500/50 transition-all duration-200">
              <AvatarImage src={user?.image} alt={user?.name} />
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white font-semibold">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900" />
          </div>
          <ChevronDown className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity duration-200" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-64 rounded-2xl bg-slate-800/95 backdrop-blur-xl border border-slate-700/50 shadow-2xl shadow-black/20 p-2 animate-in slide-in-from-top-2 duration-200"
      >
        <DropdownMenuLabel className="text-slate-300 text-sm px-3 py-2">
          <div className="font-medium">{user?.name || "User"}</div>
          <div className="text-xs text-slate-400 mt-1">{user?.email}</div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-slate-700/50 mx-2" />

        <DropdownMenuItem
          onClick={() => {
            setOpen(true);
          }}
          className="flex items-center gap-3 text-slate-200 hover:bg-white hover:text-white rounded-xl px-3 py-2.5 cursor-pointer transition-all duration-150 group"
        >
          <div className="p-1.5 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors duration-150">
            <User className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <div className="font-medium">Profile</div>
            <div className="text-xs text-slate-400">Manage your account</div>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center gap-3 text-slate-200 hover:bg-white hover:text-white rounded-xl px-3 py-2.5 cursor-pointer transition-all duration-150 group">
          <div className="p-1.5 bg-slate-500/20 rounded-lg group-hover:bg-slate-500/30 transition-colors duration-150">
            <Settings className="w-4 h-4 text-slate-400" />
          </div>
          <div>
            <div className="font-medium">Settings</div>
            <div className="text-xs text-slate-400">Preferences & privacy</div>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center gap-3 text-slate-200 hover:bg-white hover:text-white rounded-xl px-3 py-2.5 cursor-pointer transition-all duration-150 group">
          <div className="p-1.5 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition-colors duration-150">
            <HelpCircle className="w-4 h-4 text-green-400" />
          </div>
          <div>
            <div className="font-medium">Help & Support</div>
            <div className="text-xs text-slate-400">Get assistance</div>
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-slate-700/50 mx-2 my-2" />

        <DropdownMenuItem
          onClick={() => {
            logout();
            navigate("/auth");
          }}
          className="flex items-center gap-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl px-3 py-2.5 cursor-pointer transition-all duration-150 group"
        >
          <div className="p-1.5 bg-red-500/20 rounded-lg group-hover:bg-red-500/30 transition-colors duration-150">
            <LogOut className="w-4 h-4" />
          </div>
          <div>
            <div className="font-medium">Sign Out</div>
            <div className="text-xs text-red-400/70">End your session</div>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
      <ProfileSheet open={open} setOpen={setOpen} />
    </DropdownMenu>
  );
};
