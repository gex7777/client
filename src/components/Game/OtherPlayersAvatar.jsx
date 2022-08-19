import React from "react";

const OtherPlayersAvatar = ({ number }) => {
  if (number === 0) return null;

  function renderAvatars() {
    const avatars = [];

    for (var i = 0; i < number; i++) {
      avatars.push(
        <div key={i} className="avatar placeholder">
          <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
            <span>Player</span>
          </div>
        </div>
      );
    }
    return avatars;
  }
  return <>{renderAvatars()}</>;
};

export default OtherPlayersAvatar;
