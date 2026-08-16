import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ShadcnButton } from "@/components/ui/Button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import * as BrandIcons from "@/components/ui/BrandIcons";
import { Mail, Lock, User, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";

interface AuthModalProps {
  defaultTab?: "login" | "signup";
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  defaultTab = "login",
  children,
  open: externalOpen,
  onOpenChange: externalOnOpenChange,
}) => {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isOpen = externalOpen !== undefined ? externalOpen : internalOpen;
  const setOpen = externalOnOpenChange || setInternalOpen;

  const [tab, setTab] = React.useState<"login" | "signup">(defaultTab);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [successMsg, setSuccessMsg] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("");

  React.useEffect(() => {
    setTab(defaultTab);
  }, [defaultTab]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!email || !password || (tab === "signup" && !name)) {
      setErrorMsg("Please fill out all required fields.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccessMsg(
        tab === "login"
          ? "Successfully logged in! Redirecting to workspace..."
          : "Account created successfully! Welcome to Puku."
      );
      setTimeout(() => {
        setOpen(false);
        setSuccessMsg("");
      }, 1800);
    }, 1000);
  };

  const handleSocialAuth = (provider: string) => {
    setLoading(true);
    setErrorMsg("");
    setTimeout(() => {
      setLoading(false);
      setSuccessMsg(`Authenticated with ${provider}! Redirecting...`);
      setTimeout(() => {
        setOpen(false);
        setSuccessMsg("");
      }, 1500);
    }, 900);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="sm:max-w-[440px] p-6 bg-white border border-[#E5E5E8] rounded-[2px] shadow-none">
        <DialogHeader className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <img src="/puku-mark.svg" alt="Puku" className="h-7 w-auto object-contain" />
            <span className="text-xl font-extrabold tracking-tight text-[#0F0F11] font-display">
              Puku
            </span>
            <Badge variant="secondary" className="text-[10px] px-2 py-0.5 bg-[#F4F2FF] text-[#6E56CF] font-semibold border border-[#E4DDFE]">
              AI Platform
            </Badge>
          </div>
          <DialogTitle className="text-2xl font-semibold text-[#0F0F11]">
            {tab === "login" ? "Welcome back" : "Create your account"}
          </DialogTitle>
          <DialogDescription className="text-[16px] font-normal text-[#4A4A52] leading-relaxed">
            {tab === "login"
              ? "Log in to your Puku workspace to manage your AI pair agents."
              : "Get started with your free 14-day Puku Pro trial."}
          </DialogDescription>
        </DialogHeader>

        {successMsg ? (
          <div className="py-8 text-center space-y-3" role="alert">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <p className="text-base font-semibold text-[#0F0F11]">{successMsg}</p>
          </div>
        ) : (
          <Tabs value={tab} onValueChange={(v) => setTab(v as "login" | "signup")} className="w-full mt-2">
            <TabsList className="grid grid-cols-2 w-full min-h-[44px] bg-[#FAFAFC] p-1 border border-[#E5E5E8] rounded-[2px]">
              <TabsTrigger value="login" className="min-h-[44px] font-semibold text-sm rounded-[2px] data-[state=active]:bg-white data-[state=active]:text-[#0F0F11] data-[state=active]:border data-[state=active]:border-[#E5E5E8] shadow-none">
                Log In
              </TabsTrigger>
              <TabsTrigger value="signup" className="min-h-[44px] font-semibold text-sm rounded-[2px] data-[state=active]:bg-white data-[state=active]:text-[#0F0F11] data-[state=active]:border data-[state=active]:border-[#E5E5E8] shadow-none">
                Sign Up
              </TabsTrigger>
            </TabsList>

            {/* Social Auth Buttons */}
            <div className="grid grid-cols-2 gap-3 mt-5">
              <ShadcnButton
                type="button"
                variant="outline"
                onClick={() => handleSocialAuth("GitHub")}
                className="min-h-[44px] border-[#E5E5E8] text-[#0F0F11] hover:bg-[#FAFAFC] hover:border-[#6E56CF] font-semibold text-sm flex items-center justify-center gap-3 rounded-[2px]"
                aria-label="Continue with GitHub"
              >
                <BrandIcons.GitHubIcon className="h-4 w-4" />
                <span>GitHub</span>
              </ShadcnButton>

              <ShadcnButton
                type="button"
                variant="outline"
                onClick={() => handleSocialAuth("Google")}
                className="min-h-[44px] border-[#E5E5E8] text-[#0F0F11] hover:bg-[#FAFAFC] hover:border-[#6E56CF] font-semibold text-sm flex items-center justify-center gap-3 rounded-[2px]"
                aria-label="Continue with Google"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Google</span>
              </ShadcnButton>
            </div>

            <div className="relative my-5 flex items-center justify-center">
              <Separator className="w-full" />
              <span className="absolute bg-white px-3 text-xs font-semibold text-[#4A4A52] uppercase tracking-wider">
                Or continue with email
              </span>
            </div>

            {errorMsg && (
              <div className="p-3 mb-4 rounded-[2px] bg-red-50 border border-red-200 text-red-700 text-sm font-semibold" role="alert">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {tab === "signup" && (
                <div className="space-y-1.5">
                  <label htmlFor="modal-name" className="text-sm font-semibold text-[#0F0F11]">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 h-4 w-4 text-[#0F0F11]" />
                    <Input
                      id="modal-name"
                      type="text"
                      placeholder="Sarah Connor"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10 min-h-[44px] border-[#E5E5E8] text-[#0F0F11] font-normal focus-visible:ring-[#6E56CF] rounded-[2px]"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label htmlFor="modal-email" className="text-sm font-semibold text-[#0F0F11]">
                  Work Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-[#0F0F11]" />
                  <Input
                    id="modal-email"
                    type="email"
                    placeholder="sarah@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 min-h-[44px] border-[#E5E5E8] text-[#0F0F11] font-normal focus-visible:ring-[#6E56CF] rounded-[2px]"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="modal-password" className="text-sm font-semibold text-[#0F0F11]">
                    Password
                  </label>
                  {tab === "login" && (
                    <button
                      type="button"
                      onClick={() => alert("Password reset link sent to your email!")}
                      className="text-xs font-semibold text-[#6E56CF] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6E56CF]"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-[#0F0F11]" />
                  <Input
                    id="modal-password"
                    type="password"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 min-h-[44px] border-[#E5E5E8] text-[#0F0F11] font-normal focus-visible:ring-[#6E56CF] rounded-[2px]"
                    required
                  />
                </div>
              </div>

              <ShadcnButton
                type="submit"
                disabled={loading}
                className="w-full min-h-[44px] bg-[#0F0F11] hover:bg-[#6E56CF] text-white font-semibold text-base transition-colors flex items-center justify-center gap-3 rounded-[2px] shadow-none focus-visible:ring-2 focus-visible:ring-[#6E56CF] focus-visible:ring-offset-2"
              >
                {loading ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <span>{tab === "login" ? "Log In to Workspace" : "Create Free Account"}</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </ShadcnButton>
            </form>

            <div className="mt-4 pt-3 text-center border-t border-[#E5E5E8]">
              <p className="text-xs text-[#4A4A52] flex items-center justify-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-[#6E56CF]" />
                <span>SOC2 Type II Certified & End-to-end Encrypted</span>
              </p>
            </div>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
};
