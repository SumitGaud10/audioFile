import { Close, Search, Warning } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  NativeSelect,
  Select,
  Skeleton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState, type SubmitEventHandler } from "react";
import NoAlbumCover from "./NoAlbumCover";
import type { SongFormat } from "../Types/SongFormat";
import MusicInfoFetcher, {
  type MusicInfoFetcherArgs,
} from "../lib/MusicInfoFetcher";
import type { UseFormReset } from "react-hook-form";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: { xs: "100%", md: 800 },
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  maxHeight: { xs: "100%", md: 600 },
  height: "100%",
  display: "flex",
  flexDirection: "column",
};

const AutoFillModal = React.memo(function ({
  open,
  handleClose,
  formResetFunction,
}: {
  open: boolean;
  handleClose: () => void;
  formResetFunction: UseFormReset<SongFormat>;
}) {
  const [result, setResult] = useState<SongFormat[]>();
  const [error, setError] = useState<string | null>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [value, setValue] = useState<string>("");
  const [source, setSource] = useState<MusicInfoFetcherArgs>("ItunesHelper");

  const handleSubmit = async () => {
    setError(null);
    if (!value) {
      setError("Please enter something in order to search");
      return;
    }

    if (!source) {
      setError("Please select a source");
      return;
    }
    try {
      setIsLoading(true);
      const result = await MusicInfoFetcher[source](value.toString());
      setResult(result);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("There was an error while making request");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 1,
          }}
        >
          <Typography variant="h6">Automatic Fill</Typography>
          <IconButton aria-label="close auto fill modal" onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>
        <Grid container rowSpacing={2} columnSpacing={2}>
          <Grid size={{ xs: 4, md: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={source}
                label="Age"
                onChange={(e) => setSource(e.target.value)}
              >
                <MenuItem value={"ItunesHelper"}>iTunes</MenuItem>
                <MenuItem value={"MusicBrainzHelper"}>MusicBrainz</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 8, md: 8 }}>
            <TextField
              sx={{ width: "100%", marginTop: "auto" }}
              label="Search"
              name="search"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <Button
              sx={{ width: "100%", height: "100%" }}
              type="submit"
              startIcon={<Search />}
              variant="contained"
              onClick={handleSubmit}
            >
              Search
            </Button>
          </Grid>
        </Grid>
        <Box sx={{ flex: "1", minHeight: 0, overflow: "hidden" }}>
          {isLoading && <Loading />}
          {error && <ErrorContent error={error} />}
          {result && !isLoading && !error && (
            <ContentArea
              data={result}
              handleClose={handleClose}
              formResetFunction={formResetFunction}
            />
          )}
        </Box>
      </Box>
    </Modal>
  );
});

export default AutoFillModal;

function Loading() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <CircularProgress />
    </Box>
  );
}

function ErrorContent({ error }: { error: string }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 2,
        height: "100%",
      }}
    >
      <Warning fontSize="large" />
      <Typography>{error}</Typography>
    </Box>
  );
}

const ContentArea = React.memo(function ({
  data,
  handleClose,
  formResetFunction,
}: {
  data: SongFormat[];
  handleClose: () => void;
  formResetFunction: UseFormReset<SongFormat>;
}) {
  const theme = useTheme();

  const updateAudio = (data: SongFormat) => {
    formResetFunction(data);
    handleClose();
  };

  return (
    <Grid
      container
      sx={{
        overflowY: "auto",
        mt: 2,
        overflowX: "hidden",
        height: "100%",
      }}
    >
      {data.map((value) => (
        <Grid
          key={value.id}
          size={{ xs: 12, md: 4 }}
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            minWidth: 0,
            ":hover": { backgroundColor: theme.palette.action.hover },
            cursor: "pointer",
            padding: 1,
          }}
          component={"a"}
          onClick={() => updateAudio(value)}
        >
          <ContentImage url={value.previewImageUrl} />
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                width: "100%",
              }}
            >
              {value.title}
            </Typography>
            <Typography
              color="textSecondary"
              variant="subtitle1"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                width: "100%",
              }}
            >
              {value.artist}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
});

const ContentImage = React.memo(function ({ url }: { url?: string }) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  if (error) {
    return <NoAlbumCover size={40} varient="medium" />;
  }
  return (
    <>
      {loading && (
        <Skeleton variant="rectangular" sx={{ height: 40, width: 40 }} />
      )}
      <Box
        component={"img"}
        src={url}
        sx={{ height: 40, width: 40, display: loading ? "none" : "block" }}
        loading="eager"
        onLoad={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setError(true);
        }}
      />
    </>
  );
});
