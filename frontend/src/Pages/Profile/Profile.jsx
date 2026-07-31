import { useState } from "react";

import {
  AddressSection,
  AvatarSection,
  ContactSection,
  PasswordSection,
  PersonalInfo,
  ProfileHeader,
  ProfileSidebar,
} from "../../components/Profile/index.js";

import "./Profile.css";
const PROFILE_SECTION = {
  PERSONAL: "personal",
  AVATAR: "avatar",
  CONTACT: "contact",
  ADDRESS: "address",
  PASSWORD: "password",
};

const Profile = () => {
  const [activeSection, setActiveSection] = useState(PROFILE_SECTION.PERSONAL);

  const renderSection = () => {
    switch (activeSection) {
      case PROFILE_SECTION.PERSONAL:
        return <PersonalInfo />;

      case PROFILE_SECTION.AVATAR:
        return <AvatarSection />;

      case PROFILE_SECTION.CONTACT:
        return <ContactSection />;

      case PROFILE_SECTION.ADDRESS:
        return <AddressSection />;

      case PROFILE_SECTION.PASSWORD:
        return <PasswordSection />;

      default:
        return <PersonalInfo />;
    }
  };

  return (
    <main className="profile-page">
      <div className="profile-container">
        <ProfileHeader />

        <div className="profile-layout">
          <ProfileSidebar
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />

          <div className="profile-content">{renderSection()}</div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
