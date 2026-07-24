export const AUTH_MODE = {
  LOGIN: "login",
  REGISTER: "register",
  FORGOT_PASSWORD: "forgot-password",
  RESET_PASSWORD: "reset-password",
};

export const AUTH_HEADER = {
  [AUTH_MODE.LOGIN]: {
    title: "Welcome Back ",
    subtitle: "Sign in to continue ordering your favourite meals.",
  },

  [AUTH_MODE.REGISTER]: {
    title: "Create your Account",
    subtitle: "Join Cravio and discover delicious food around you.",
  },

  [AUTH_MODE.FORGOT_PASSWORD]: {
    title: "Forgot Password?",
    subtitle: "Enter your registered mobile number to reset your password.",
  },

  [AUTH_MODE.RESET_PASSWORD]: {
    title: "Create New Password",
    subtitle: "Choose a strong password for your account.",
  },
};
