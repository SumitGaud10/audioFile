import MusicNote from "@mui/icons-material/MusicNote";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

function NoAlbumCover({
  size,
  varient,
}: {
  size?: number;
  varient?: "small" | "inherit" | "large" | "medium";
}) {
  const { palette } = useTheme();
  return (
    <Box
      sx={{
        height: size,
        width: size || "100%",
        aspectRatio: size ? undefined : "1/1",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: palette.action.hover,
      }}
    >
      <MusicNote fontSize={varient || "large"} />
    </Box>
  );
}

export default NoAlbumCover;
