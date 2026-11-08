import { useCallback, useEffect, useState } from "react";
import { PROFILE_STORAGE_KEY, parseProfile, updatePersonalProfile, type ProfileEdit } from "@/lib/profile";

export function useLocalProfile() {
  const [profile, setProfile] = useState(() => parseProfile(null));
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try { setProfile(parseProfile(localStorage.getItem(PROFILE_STORAGE_KEY))); } catch { /* Local profile remains editable. */ }
    setReady(true);
    const sync = (event: StorageEvent) => {
      if (event.key === PROFILE_STORAGE_KEY || event.key === null) setProfile(parseProfile(event.newValue));
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  const saveProfile = useCallback((patch: ProfileEdit) => {
    if (!ready || !patch.nickname.trim()) return false;
    try {
      const latest = parseProfile(localStorage.getItem(PROFILE_STORAGE_KEY));
      const next = updatePersonalProfile(latest, patch);
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(next));
      setProfile(next);
      return true;
    } catch { return false; }
  }, [ready]);
  return { profile, ready, saveProfile };
}