export function isOwner(profile, user) {
  if (user === null) {
    return false;
  }
  if (user.uid == profile.uid) {
    return true;
  } else {
    return false;
  }
}
