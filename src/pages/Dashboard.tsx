import { motion } from "framer-motion";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

const Dashboard = () => {
  const { toast } = useToast();
  const { user: profile, loading } = useAuth();

  useEffect(() => {
    if (!profile && !loading) {
      toast({
        title: "Not signed in",
        description: "Please sign in to view your dashboard.",
        variant: "destructive",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile, loading]);

  return (
    <div className='min-h-screen bg-background text-foreground py-12'>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className='container mx-auto px-4 max-w-4xl'
      >
        <h1 className='text-3xl font-display font-bold mb-4'>Dashboard</h1>
        <p className='text-muted-foreground mb-6'>
          Welcome to your HT NEXUS AI dashboard.
        </p>

        {profile ? (
          <div className='glass p-6 rounded-xl'>
            <h2 className='text-xl font-semibold'>
              Hello, {profile.first_name || profile.username}
            </h2>
            <p className='text-sm text-muted-foreground mt-2'>
              Email: {profile.email}
            </p>
          </div>
        ) : (
          <div className='glass p-6 rounded-xl'>
            <p className='text-muted-foreground'>Loading profile...</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;
