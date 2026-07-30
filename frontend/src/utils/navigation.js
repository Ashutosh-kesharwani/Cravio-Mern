export const navigateToSection = (sectionId, location, navigate) => {
  if (location.pathname === "/") {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  } else {
    navigate("/", {
      state: {
        scrollTo: sectionId,
      },
    });
  }
};
