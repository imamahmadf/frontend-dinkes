import { extendBaseTheme, theme as chakraTheme } from "@chakra-ui/react";

const theme = extendBaseTheme({
  ...chakraTheme,
  fonts: {
    ...chakraTheme.fonts,
    heading: "Overpass, sans-serif",
    body: "Overpass, sans-serif",
  },
});

export default theme;
