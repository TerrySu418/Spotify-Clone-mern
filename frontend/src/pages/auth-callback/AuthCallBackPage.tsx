import { axiosInstance } from "@/lib/axios";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const AuthCallBackPage = () => {
  const { isLoaded, user } = useUser();
  const navigate = useNavigate();
  const syncAttempted = useRef<string | null>(null);

  useEffect(() => {
    const syncUser = async () => {
      // Check if current user is already synced
      if (!isLoaded || !user || syncAttempted.current === user.id) return;

      try {
        console.log("Sending user data:", {
          // Add this debug log
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl,
        });

        const response = await axiosInstance.post("/auth/callback", {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl,
        });

        syncAttempted.current = user.id; // Store the synced user's ID

        console.log("Response:", response.data); // Add debug log
      } catch (error) {
        console.log("Error in auth callback", error);
      } finally {
        navigate("/");
      }
    };

    syncUser();
  }, [isLoaded, user, navigate]);

  return (
    <div className="h-screen w-full bg-black flex items-center justify-center">
      <Card className="w-[90%] max-w-md bg-zinc-900 border-zinc-800">
        <CardContent className="flex flex-col items-center gap-4 pt-6">
          <Loader className="size-6 text-emerald-500 animate-spin" />
          <h3 className="text-zinc-400 text-xl font-bold">Logging you in</h3>
          <p className="text-zinc-400 text-sm">Redirecting...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthCallBackPage;
