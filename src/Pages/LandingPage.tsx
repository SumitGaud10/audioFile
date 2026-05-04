import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import ColorLens from "@mui/icons-material/ColorLens";
import FileCopyOutlined from "@mui/icons-material/FileCopyOutlined";
import GitHub from "@mui/icons-material/GitHub";
import Person from "@mui/icons-material/Person";
import StartEditingModal from "../Componenets/StartEditingModal";
import { useState } from "react";
import useColorMode from "../Context/ColorMode/useColorMode";

function LandingPage() {
  const { themeChanger, mode } = useColorMode();

  return (
    <>
      <Box
        sx={{
          height: "100dvh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <MusicNoteIcon fontSize={"large"} />
          <Typography variant="h4" sx={{ marginLeft: "0.5rem" }}>
            Audio File
          </Typography>
        </Box>
        <Stack
          spacing={1}
          sx={{
            width: "100%",
            maxWidth: "20rem",
          }}
        >
          <Typography variant="subtitle1">Actions</Typography>
          <StartEditingModalController />
          <Button startIcon={<GitHub />} sx={{ justifyContent: "start" }}>
            Explore Repository
          </Button>
          <Button startIcon={<Person />} sx={{ justifyContent: "start" }}>
            About Developer
          </Button>
          <Button
            startIcon={<ColorLens />}
            sx={{ justifyContent: "start" }}
            onClick={() => themeChanger(mode == "dark" ? "light" : "dark")}
          >
            Change Theme
          </Button>
        </Stack>
      </Box>
    </>
  );
}

export default LandingPage;

function StartEditingModalController() {
  const [modal, setModal] = useState(false);
  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);
  const startEditing = () => {
    openModal();
  };
  return (
    <>
      <Button
        startIcon={<FileCopyOutlined />}
        sx={{ justifyContent: "start" }}
        onClick={startEditing}
      >
        Start
      </Button>
      <StartEditingModal open={modal} handleClose={closeModal} />
    </>
  );
}
