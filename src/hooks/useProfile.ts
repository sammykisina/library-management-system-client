import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import { AuthAPI } from "@/api";

const useProfile = () => {
  /**
   * hook states
   */
  const { user } = useAuth();

  /**
   * hook functions
   */
  const { data: profile, isLoading: isFetchingProfile } = useQuery({
    queryKey: ["profile", user?.role],
    queryFn: async ({ queryKey }) => {
      const [_, role] = queryKey;

      if (role === "user") {
        return await AuthAPI.profile(user?.id || 0);
      }

      return null;
    },
  });

  return {
    profile,
    isFetchingProfile,
  };
};

export default useProfile;
