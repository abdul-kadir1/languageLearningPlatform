import { useState } from "react";
import { ShipWheelIcon } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [forgotPasswordMessage, setForgotPasswordMessage] = useState("");
  const { isPending, error, loginMutation } = useLogin();
  const navigate = useNavigate();

  // Submit login form with native validation on required fields
  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  // Forgot password button click handler
  const handleForgotPassword = (e) => {
    e.preventDefault();
    const emailInput = document.getElementById("email-input");

    // reset message on each click
    setForgotPasswordMessage("");

    if (!emailInput.checkValidity()) {
      emailInput.reportValidity();
      return;
    }

    // If both email and password are filled
    if (loginData.email && loginData.password) {
      setForgotPasswordMessage(
        "If your password is correct click on Sign In,If not Don't Enter Password "
      );
      // Hide message after 1 second (1000 ms)
      setTimeout(() => {
        setForgotPasswordMessage("");
      }, 2000);
      return;
    }

    // If only email filled but password empty, redirect to forgot-password page
    navigate("/forgot-password", { state: { email: loginData.email } });
  };

  return (
    <div
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
      data-theme="forest"
    >
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* LOGIN FORM SECTION */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          {/* LOGO */}
          <div className="mb-4 flex items-center justify-start gap-2">
            <ShipWheelIcon className="size-9 text-primary" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              Streamify
            </span>
          </div>

          {/* ERROR MESSAGE DISPLAY */}
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error.response.data.message}</span>
            </div>
          )}

          {/* Forgot Password info message */}
          {forgotPasswordMessage && (
            <div className="alert alert-info mb-4">
              <span>{forgotPasswordMessage}</span>
            </div>
          )}

          <div className="w-full">
            <form id="login-form" onSubmit={handleLogin}>
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">Welcome Back</h2>
                  <p className="text-sm opacity-70">
                    Sign in to your account to continue your language journey
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="form-control w-full space-y-2">
                    <label className="label" htmlFor="email-input">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      id="email-input"
                      placeholder="hello@example.com"
                      className="input input-bordered w-full"
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData({ ...loginData, email: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="form-control w-full space-y-2">
                    <label className="label" htmlFor="password-input">
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      type="password"
                      id="password-input"
                      placeholder="••••••••"
                      className="input input-bordered w-full"
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData({ ...loginData, password: e.target.value })
                      }
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-full"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <>
                        <span className="loading loading-spinner loading-xs"></span>
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </button>

                  {/* Forgot Password clickable button */}
                  <div style={{ marginTop: "1rem", textAlign: "center" }}>
                    <button
                      type="button"
                      style={{
                        background: "none",
                        border: "none",
                        color: "#7B61FF",
                        cursor: "pointer",
                        textDecoration: "underline",
                        padding: 0,
                      }}
                      onClick={handleForgotPassword}
                    >
                      Forgot Password?
                    </button>
                  </div>

                  <div className="text-center mt-4">
                    <p className="text-sm">
                      Don't have an account?{" "}
                      <Link
                        to="/signup"
                        className="text-primary hover:underline"
                      >
                        Create one
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* IMAGE SECTION */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            <div className="text-center space-y-3 mt-6 relative  ">
              {/* Floating colorful circles */}
              <span className="absolute top-0 left-1/4 w-6 h-6 bg-purple-400 rounded-full animate-ping"></span>
              <span className="absolute top-10 right-1/3 w-8 h-8 bg-pink-400 rounded-full animate-ping delay-300"></span>
              <span className="absolute bottom-0 left-1/2 w-4 h-4 bg-blue-400 rounded-full animate-ping delay-500"></span>

              {/* Heading with bounce and fade-in */}
              <h2 className="text-3xl font-bold text-white animate-bounce">
                Connect with language partners worldwide
              </h2>

              {/* Paragraph with fade-in effect */}
              <p className="opacity-70 animate-[fade_2s_ease-in-out_1]">
                Practice conversations, make friends, and improve your language
                skills together
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
