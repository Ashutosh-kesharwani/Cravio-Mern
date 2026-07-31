import { Camera, Trash2, User } from "lucide-react";

import useAvatar from "../../hooks/profile/useAvatar.js";

const AvatarSection = () => {
  const {
    user,

    inputRef,

    isUploading,

    openFilePicker,

    handleAvatarChange,

    handleDeleteAvatar,
  } = useAvatar();

  return (
    <section className="card">
      <h2 className="section-title">Profile Photo</h2>

      <p className="section-subtitle">
        Upload a profile picture so other users can recognize you.
      </p>

      <div className="profile-avatar">
        {user?.avatar?.url ? (
          <img
            src={user.avatar.url}
            alt={user.fullName}
            className="profile-avatar__image"
          />
        ) : (
          <div className="profile-avatar__placeholder">
            <User size={60} />
          </div>
        )}

        <div className="profile-avatar__actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={openFilePicker}
            disabled={isUploading}
          >
            <Camera size={18} />

            {user?.avatar?.url ? "Change Photo" : "Upload Photo"}
          </button>

          {user?.avatar?.url && (
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDeleteAvatar}
              disabled={isUploading}
            >
              <Trash2 size={18} />
              Delete
            </button>
          )}
        </div>

        <input
          ref={inputRef}
          type="file"
          hidden
          accept="image/*"
          onChange={handleAvatarChange}
        />
      </div>
    </section>
  );
};

export default AvatarSection;
