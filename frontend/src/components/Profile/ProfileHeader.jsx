import { Camera, Mail, ShieldCheck, User } from "lucide-react";

import { useAuthStore } from "../../context/authContext.js";
import { capitalize } from "../../utils/formatters.js";

const ProfileHeader = () => {
  const { user } = useAuthStore();

  return (
    <section className="card profile-header">
      <div className="profile-header__left">
        <div className="profile-header__avatar-wrapper">
          {user?.avatar?.url ? (
            <img
              src={user.avatar.url}
              alt={user.fullName}
              className="profile-header__avatar"
            />
          ) : (
            <div className="profile-header__avatar-fallback">
              <User size={45} />
            </div>
          )}

          <button
            type="button"
            className="profile-header__camera-btn"
            aria-label="Change Avatar"
          >
            <Camera size={16} />
          </button>
        </div>

        <div className="profile-header__info">
          <h1>
            {capitalize(user?.firstName)} {capitalize(user?.lastName)}
          </h1>

          <p>@{user?.username}</p>

          <div className="profile-header__meta">
            <span>
              <Mail size={16} />

              {user?.email}
            </span>

            <span className="badge badge-success">
              <ShieldCheck size={15} />

              {user?.role}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileHeader;
