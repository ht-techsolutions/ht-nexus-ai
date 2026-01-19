import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";

const AuthComplete = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const handleAuthComplete = async () => {
      try {
        // If the OAuth callback returned a token/code/credential in the URL,
        // prefer consuming/exchanging it first. Otherwise attempt /user which
        // should succeed when a browser cookie (HttpOnly) was set by backend.
        const params = new URLSearchParams(window.location.search);

        // If a plain token was included in the redirect, store it locally.
        const plainToken = params.get("token");
        if (plainToken) {
          localStorage.setItem("ht_nexus_token", plainToken);
        }

        // If an authorization `code` or Google `credential` exists, try exchanging
        // it for a token via the API token exchange endpoints.
        const code = params.get("code");
        const credential = params.get("credential");
        if (code || credential) {
          try {
            const payload: any = {};
            if (code) payload.code = code;
            if (credential) payload.credential = credential;
            // Provide redirect_uri in case backend needs it
            payload.redirect_uri =
              window.location.origin + window.location.pathname;

            const exchange = await api.post("/auth/google/token", payload);
            if (exchange.data?.data?.token) {
              localStorage.setItem("ht_nexus_token", exchange.data.data.token);
            }
          } catch (ex) {
            console.warn(
              "Token exchange failed, will still try cookie-based /user:",
              ex,
            );
          }
        }

        // Finally verify by fetching the current user. This relies on either
        // the HttpOnly cookie being present (withCredentials) or the local token.
        const response = await api.get("/user");

        if (response.data.status === "success") {
          // Store token if provided in response (fallback)
          if (response.data.data.token) {
            localStorage.setItem("ht_nexus_token", response.data.data.token);
          }

          toast({
            title: "Welcome!",
            description: "Successfully authenticated via OAuth.",
          });

          // Check if there's a return URL in the state
          const returnUrl = (location.state as any)?.returnUrl || "/";
          const plan = (location.state as any)?.plan;

          // Small delay to show success state
          setTimeout(() => {
            navigate(returnUrl, { state: plan ? { plan } : undefined });
          }, 1000);
        } else {
          throw new Error("Authentication verification failed");
        }
      } catch (rawError) {
        const error: any = rawError;
        // Helpful debug info when 401/other occurs
        console.error("Auth complete error:", error);
        if (error?.response) {
          console.error("Response data:", error.response.data);
          console.error("Response headers:", error.response.headers);
          console.error("Status:", error.response.status);
        }

        toast({
          variant: "destructive",
          title: "Authentication failed",
          description:
            "There was an error completing your authentication. Please try again.",
        });
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    };

    handleAuthComplete();
  }, [navigate, location, toast]);

  return (
    <div className='min-h-screen flex items-center justify-center bg-background relative overflow-hidden'>
      {/* Background Glows */}
      <div className='absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden'>
        <div className='absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyber-primary/10 dark:bg-cyber-primary/20 rounded-full blur-[120px] animate-pulse-glow' />
        <div className='absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/10 dark:bg-accent/20 rounded-full blur-[120px] animate-pulse-glow delay-300' />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className='relative z-10 text-center'
      >
        <div className='glass p-12 rounded-3xl border-cyber-primary/10 shadow-2xl shadow-cyber-primary/5'>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className='mb-6 flex justify-center'
          >
            <div className='relative'>
              <Loader2 className='w-16 h-16 text-cyber-primary animate-spin' />
              <CheckCircle className='w-8 h-8 text-accent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
            </div>
          </motion.div>
          <h1 className='text-2xl font-bold font-display mb-2 text-foreground'>
            Completing Authentication
          </h1>
          <p className='text-muted-foreground'>
            Please wait while we verify your credentials...
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthComplete;
