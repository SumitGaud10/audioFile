import { Box, Container } from "@mui/material";
import TopBar from "../Componenets/TopBar";
import useTempAudio from "../Context/TempAudio/useTempAudio";
import EditingForm from "../Componenets/EditingForm";

function EditingPage() {
  const { audio } = useTempAudio();
  if (!audio) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100dvh",
        }}
      >
        Unable to read Audio
      </Box>
    );
  }
  return (
    <>
      <TopBar />
      <Container maxWidth="lg">
        <EditingForm audio={audio} />
      </Container>
    </>
  );
}

export default EditingPage;
