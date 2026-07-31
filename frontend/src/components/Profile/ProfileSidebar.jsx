import { House } from "lucide-react";

import { PROFILE_SIDEBAR_ITEMS } from "../../constants/profile.constants.js";

const ProfileSidebar = ({ activeSection, setActiveSection }) => {
  return (
    <aside className="profile-sidebar card">
      <div className="profile-sidebar__heading">
        <House size={20} />
        <span>My Account</span>
      </div>

      <nav className="profile-sidebar__nav">
        {PROFILE_SIDEBAR_ITEMS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            className={`profile-sidebar__item ${
              activeSection === id ? "profile-sidebar__item--active" : ""
            }`}
            onClick={() => setActiveSection(id)}
          >
            <Icon size={20} />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default ProfileSidebar;
