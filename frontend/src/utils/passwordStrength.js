export const getPasswordStrength = (password = "") => {
  let score = 0;

  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  switch (score) {
    case 0:
    case 1:
      return {
        score,
        label: "Weak",
        color: "#ef4444",
      };

    case 2:
    case 3:
      return {
        score,
        label: "Medium",
        color: "#f59e0b",
      };

    case 4:
    case 5:
      return {
        score,
        label: "Strong",
        color: "#22c55e",
      };

    default:
      return {
        score: 0,
        label: "",
        color: "#e5e7eb",
      };
  }
};
