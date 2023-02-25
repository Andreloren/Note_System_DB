import * as React from "react";

import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Button, CssBaseline } from "@mui/material";

import PagesRoutes from "../../routes/PagesRoutes";
import { ThemeStyleButton } from "../themes/ThemeStyled";
import { Provider } from "react-redux";
import { minhaStore } from "../../store";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

export const MyButton: React.FC = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <ThemeStyleButton>
      <Button
        variant="outlined"
        onClick={colorMode.toggleColorMode}
        color="inherit"
      >
        {theme.palette.mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </Button>
    </ThemeStyleButton>
  );
};

const ToggleColorMode: React.FC = () => {
  const [mode, setMode] = React.useState<"light" | "dark">("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <Provider store={minhaStore}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MyButton />
          <PagesRoutes />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </Provider>
  );
};

export default ToggleColorMode;
