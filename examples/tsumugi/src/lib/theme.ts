// テーマ設定: tauri-plugin-store に保存し、<html data-theme="light|dark"> に反映する。
// "system" のときは OS 設定（prefers-color-scheme）に追従する。
import { LazyStore } from "@tauri-apps/plugin-store";
import { useEffect, useState } from "react";

import type { Theme } from "./types";

// app_data_dir/settings.json に書かれる（autoSave 既定 100ms）
const store = new LazyStore("settings.json");
const KEY = "theme";
const media = window.matchMedia("(prefers-color-scheme: dark)");

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("system");
  const [systemDark, setSystemDark] = useState(media.matches);

  useEffect(() => {
    store.get<Theme>(KEY).then((v) => v && setThemeState(v));
    const onChange = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const resolved: "light" | "dark" = theme === "system" ? (systemDark ? "dark" : "light") : theme;

  useEffect(() => {
    document.documentElement.dataset.theme = resolved;
  }, [resolved]);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    void store.set(KEY, t);
  };

  return { theme, resolved, setTheme };
}
