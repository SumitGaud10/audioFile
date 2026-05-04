import AudioFile from "@mui/icons-material/AudioFile";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import VisuallyHiddenInput from "./VisuallyHiddenInput";
import type { ChangeEventHandler } from "react";
import useAppState from "../Context/AppState/useAppState";
import NoAlbumCover from "./NoAlbumCover";
import useTempAudio from "../Context/TempAudio/useTempAudio";
import type { SongFormat } from "../Types/SongFormat";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: { xs: "100%", md: 600 },
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function StartEditingModal({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) {
  const { audio, changeAudio } = useTempAudio();
  const { changeState } = useAppState();

  const fileChangeHandler: ChangeEventHandler<
    HTMLInputElement,
    HTMLInputElement
  > = async (event) => {
    const file = event.target.files?.[0];
    if (!file) throw new Error("No file was uploaded");
    changeAudio(file);
  };

  const proceed = () => changeState("Editing");
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Upload File
        </Typography>
        <Box id="modal-modal-description" sx={{ mt: 2, width: "100%" }}>
          {audio ? <MusicStage audio={audio} /> : "Audio not available"}
        </Box>
        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "end",
            gap: 2,
          }}
        >
          <Button
            component="label"
            role={undefined}
            tabIndex={-1}
            startIcon={<AudioFile />}
          >
            Upload Audio
            <VisuallyHiddenInput
              type="file"
              onChange={fileChangeHandler}
              accept="audio/*"
              multiple
            />
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" disabled={!audio} onClick={proceed}>
            Proceed
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default StartEditingModal;

const MusicStage = ({ audio }: { audio: SongFormat }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignContent: { xs: "center", sm: "start" },
        width: "100%",
      }}
    >
      {audio.imageUrl ? (
        <Box
          component="img"
          src={audio.imageUrl}
          sx={{ p: { xs: 5, sm: 0 }, width: { xs: "100%", sm: 100 } }}
        />
      ) : (
        <NoAlbumCover size={100} />
      )}
      <Box
        sx={{ px: 2, width: "100", textAlign: { xs: "center", sm: "start" } }}
      >
        <Typography variant="h5">{audio.title || "No Title"}</Typography>
        <Typography variant="subtitle1">
          {audio.artist || "No artist"}
        </Typography>
      </Box>
    </Box>
  );
};
