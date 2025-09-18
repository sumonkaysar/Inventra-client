import type { RootState } from "@/redux/store";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface ThemeState {
  mode: "light" | "dark" | "system";
}

const LOCAL_THEME_KEY = "inventra_theme";

const getInitialTheme = (): ThemeState => {
  try {
    const localTheme = localStorage.getItem(LOCAL_THEME_KEY);
    if (localTheme) return JSON.parse(localTheme) as ThemeState;
  } catch (err) {
    console.log(err);
  }
  return { mode: "system" };
};

const initialState: ThemeState = getInitialTheme();

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<ThemeState["mode"]>) {
      state.mode = action.payload;
      try {
        localStorage.setItem(LOCAL_THEME_KEY, JSON.stringify(state));
      } catch (err) {
        console.log(err);
      }
    },
    toggleTheme(state) {
      state.mode = state.mode === "dark" ? "light" : "dark";
      try {
        localStorage.setItem(LOCAL_THEME_KEY, JSON.stringify(state));
      } catch (err) {
        console.log(err);
      }
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;

export const selectTheme = (state: RootState) => state.theme.mode;

export default themeSlice.reducer;
