import * as React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { SEO } from "@/components/layout/SEO";
import { Input } from "@/components/ui/input";
import { ShadcnButton } from "@/components/ui/Button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import * as BrandIcons from "@/components/ui/BrandIcons";
import { Mail, Lock, User, ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Check } from "lucide-react";

export default function AuthPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const isSignUpMode = location.pathname.includes("signup");
  const [tab, setTab] = React.useState<"login" | "signup">(isSignUpMode ? "signup" : "login");

  React.useEffect(() => {
    setTab(location.pathname.includes("signup") ? "signup" : "login");
  }, [location.pathname]);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [successMsg, setSuccessMsg] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("");

  const handleTabChange = (mode: "login" | "signup") => {
    setTab(mode);
    navigate(mode === "login" ? "/login" : "/signup", { replace: true });
  };

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
          ? "Welcome back! Logged in successfully."
          : "Account created! Welcome to Puku."
      );
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }, 1000);
  };

  const handleSocialAuth = (provider: string) => {
    setLoading(true);
    setErrorMsg("");
    setTimeout(() => {
      setLoading(false);
      setSuccessMsg(`Authenticated via ${provider}! Redirecting...`);
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }, 900);
  };

  return (
    <>
      <SEO
        title={tab === "login" ? "Log In — Puku AI Workspace" : "Sign Up — Start Free Trial with Puku Pro"}
        description="Access your autonomous AI developer pair workspace or create a new account."
      />

      <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-[#FAFAFC] flex flex-col justify-center items-center">
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Branding & Value Proposition */}
          <div className="md:col-span-5 space-y-6 text-left">
            <Link to="/" className="inline-flex items-center gap-2.5" aria-label="Return to Puku homepage">
              <img src="/puku-mark.svg" alt="Puku Logo" className="h-8 w-auto object-contain" />
              <span className="text-2xl font-extrabold tracking-tight text-[#0F0F11] font-display">
                Puku
              </span>
            </Link>

            <div className="space-y-3">
              <Badge variant="secondary" className="bg-accent/20 text-[#6E56CF] font-semibold text-xs px-2.5 py-1">
                AI Pair Programmer
              </Badge>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F0F11] tracking-tight font-display">
                {tab === "login" ? "Ship software at 10x speed." : "Join thousands of AI-powered engineers."}
              </h1>
              <p className="text-base text-[#4A4A52] leading-relaxed">
                Connect your IDE, terminal, and GPU fleet in seconds. Puku acts as your autonomous pair engineer.
              </p>
            </div>

            {/* Value checklist */}
            <ul className="space-y-2.5 pt-2" aria-label="Puku features">
              {[
                "Autonomous bug resolution & refactoring",
                "Parallel GPU execution environment",
                "SOC2 Type II certified enterprise security",
                "100% WCAG AAA accessible workspace interface",
              ].map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2.5 text-sm font-medium text-[#0F0F11]">
                  <div className="h-5 w-5 rounded-full bg-[#6E56CF]/10 text-[#6E56CF] flex items-center justify-center shrink-0">
                    <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Auth Card */}
          <div className="md:col-span-7">
            <Card className="w-full bg-white border-[#E5E5E8] shadow-lg rounded-xl p-6 sm:p-8">
              <CardHeader className="p-0 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold text-[#0F0F11]">
                      {tab === "login" ? "Sign in to Puku" : "Create Puku Account"}
                    </CardTitle>
                    <CardDescription className="text-sm text-[#4A4A52] mt-1">
                      {tab === "login"
                        ? "Enter your email credentials to access your workspace."
                        : "Start your 14-day full access trial. No credit card required."}
                    </CardDescription>
                  </div>
                </div>

                {/* Navigation Pills between Login & Signup */}
                <div className="grid grid-cols-2 gap-1 bg-[#F3F3F5] p-1 rounded-lg mt-5 border border-[#E5E5E8]">
                  <button
                    type="button"
                    onClick={() => handleTabChange("login")}
                    className={`h-10 text-sm font-semibold rounded-md transition-all ${
                      tab === "login"
                        ? "bg-white text-[#0F0F11] shadow-sm"
                        : "text-[#666666] hover:text-[#0F0F11]"
                    }`}
                  >
                    Log In
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTabChange("signup")}
                    className={`h-10 text-sm font-semibold rounded-md transition-all ${
                      tab === "signup"
                        ? "bg-white text-[#0F0F11] shadow-sm"
                        : "text-[#666666] hover:text-[#0F0F11]"
                    }`}
                  >
                    Sign Up
                  </button>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                {successMsg ? (
                  <div className="py-10 text-center space-y-3" role="alert">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <CheckCircle2 className="h-7 w-7" />
                    </div>
                    <p className="text-lg font-bold text-[#0F0F11]">{successMsg}</p>
                  </div>
                ) : (
                  <>
                    {/* Social OAuth Controls */}
                    <div className="grid grid-cols-2 gap-3 mb-5">
                      <ShadcnButton
                        type="button"
                        variant="outline"
                        onClick={() => handleSocialAuth("GitHub")}
                        className="h-11 border-[#E5E5E8] text-[#0F0F11] hover:bg-[#FAFAFC] hover:border-[#6E56CF] font-semibold text-sm flex items-center justify-center gap-2"
                        aria-label="Continue with GitHub"
                      >
                        <BrandIcons.GitHubIcon className="h-4 w-4" />
                        <span>GitHub</span>
                      </ShadcnButton>

                      <ShadcnButton
                        type="button"
                        variant="outline"
                        onClick={() => handleSocialAuth("Google")}
                        className="h-11 border-[#E5E5E8] text-[#0F0F11] hover:bg-[#FAFAFC] hover:border-[#6E56CF] font-semibold text-sm flex items-center justify-center gap-2"
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
                      <span className="absolute bg-white px-3 text-xs font-medium text-[#4A4A52] uppercase tracking-wider">
                        Or continue with email
                      </span>
                    </div>

                    {errorMsg && (
                      <div className="p-3 mb-4 rounded-md bg-red-50 border border-red-200 text-red-700 text-sm font-medium" role="alert">
                        {errorMsg}
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                      {tab === "signup" && (
                        <div className="space-y-1.5">
                          <label htmlFor="auth-name" className="text-sm font-bold text-[#0F0F11]">
                            Full Name
                          </label>
                          <div className="relative">
                            <User className="absolute left-3.5 top-3.5 h-4 w-4 text-[#0F0F11]" />
                            <Input
                              id="auth-name"
                              type="text"
                              placeholder="Alex Mercer"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="pl-10 h-11 border-[#E5E5E8] text-[#0F0F11] font-medium focus-visible:ring-[#6E56CF]"
                              required
                            />
                          </div>
                        </div>
                      )}

                      <div className="space-y-1.5">
                        <label htmlFor="auth-email" className="text-sm font-bold text-[#0F0F11]">
                          Work Email
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-[#0F0F11]" />
                          <Input
                            id="auth-email"
                            type="email"
                            placeholder="alex@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="pl-10 h-11 border-[#E5E5E8] text-[#0F0F11] font-medium focus-visible:ring-[#6E56CF]"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label htmlFor="auth-password" className="text-sm font-bold text-[#0F0F11]">
                            Password
                          </label>
                          {tab === "login" && (
                            <button
                              type="button"
                              onClick={() => alert("Password reset link sent to your email!")}
                              className="text-xs font-bold text-[#6E56CF] hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#6E56CF]"
                            >
                              Forgot password?
                            </button>
                          )}
                        </div>
                        <div className="relative">
                          <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-[#0F0F11]" />
                          <Input
                            id="auth-password"
                            type="password"
                            placeholder="••••••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="pl-10 h-11 border-[#E5E5E8] text-[#0F0F11] font-medium focus-visible:ring-[#6E56CF]"
                            required
                          />
                        </div>
                      </div>

                      <ShadcnButton
                        type="submit"
                        disabled={loading}
                        className="w-full h-11 bg-[#0F0F11] hover:bg-[#6E56CF] text-white font-semibold text-base transition-colors flex items-center justify-center gap-2 rounded-lg"
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
                  </>
                )}
              </CardContent>
            </Card>

            <p className="mt-4 text-center text-xs text-[#4A4A52] flex items-center justify-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-[#6E56CF]" />
              <span>Protected by 256-bit SSL encryption & SOC2 Type II compliance.</span>
            </p>
          </div>

        </div>
      </div>
    </>
  );
}
