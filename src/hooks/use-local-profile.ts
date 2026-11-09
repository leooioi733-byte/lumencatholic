import { useCallback, useEffect, useState } from "react";
import { PROFILE_CHANGED_EVENT, PROFILE_STORAGE_KEY, parseProfile, updatePersonalProfile, type ProfileEdit } from "@/lib/profile";

export function useLocalProfile() {
  const [profile, setProfile] = useState(() => parseProfile(null));
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const read = () => { try { setProfile(parseProfile(localStorage.getItem(PROFILE_STORAGE_KEY))); } catch { /* Local profile remains editable. */ } };
    read();
    setReady(true);
    const sync = (event: StorageEvent) => {
      if (event.key === PROFILE_STORAGE_KEY || event.key === null) read();
    };
    window.addEventListener("storage", sync);
    window.addEventListener(PROFILE_CHANGED_EVENT, read);
    return () => { window.removeEventListener("storage", sync); window.removeEventListener(PROFILE_CHANGED_EVENT, read); };
  }, []);
  const saveProfile = useCallback((patch: ProfileEdit) => {
    if (!ready || !patch.nickname.trim()) return false;
    try {
      const latest = parseProfile(localStorage.getItem(PROFILE_STORAGE_KEY));
      const next = updatePersonalProfile(latest, patch);
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(next));
      setProfile(next);
      window.dispatchEvent(new Event(PROFILE_CHANGED_EVENT));
      return true;
    } catch { return false; }
  }, [ready]);
  return { profile, ready, saveProfile };
}