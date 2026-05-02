import {
  Box,
  Button,
  Grid,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import type { SongFormat } from "../Types/SongFormat";
import VisuallyHiddenInput from "./VisuallyHiddenInput";
import {
  useForm,
  type SubmitHandler,
  type UseFormReset,
  type UseFormSetValue,
} from "react-hook-form";
import { Image, Save } from "@mui/icons-material";
import NoAlbumCover from "./NoAlbumCover";
import { useState } from "react";
import imageToUrl from "../utils/imageToUrl";
import AutoFillModal from "./AutoFillModal";
import useTempAudio from "../Context/TempAudio/useTempAudio";
import ExportAudio from "../lib/ExportAudio";

function EditingForm({ audio }: { audio: SongFormat }) {
  const { register, watch, setValue, reset, handleSubmit } =
    useForm<SongFormat>({
      defaultValues: audio,
    });

  const { audioBuffer } = useTempAudio();

  const onSubmit: SubmitHandler<SongFormat> = (data) => {
    if (!audioBuffer) {
      throw new Error("No audio found");
    }
    ExportAudio(data, audioBuffer);
  };

  const imageUrl = watch("imageUrl");

  return (
    <Grid
      container
      sx={{ marginTop: "3rem", px: 2 }}
      rowSpacing={2}
      columnSpacing={4}
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid size={{ xs: 12, md: 4 }}>
        <Typography variant="h5">Album Cover</Typography>
      </Grid>
      <Grid
        size={{ xs: 12, md: 8 }}
        sx={{ display: "flex", justifyContent: "end" }}
      >
        <AutoFillModalController formResetFunction={reset} />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <ImageSection imageUrl={imageUrl} setValue={setValue} />
      </Grid>
      <Grid size={{ xs: 12, md: 8 }} sx={{ marginTop: { xs: 3, md: 0 } }}>
        <Stack spacing={2} sx={{ width: "100%" }}>
          <TextField
            label="Title"
            {...register("title", {
              required: "Title is required",
            })}
          />
          <TextField label="Album" {...register("album")} />
          <TextField label="Artist" {...register("artist")} />
          <TextField label="Date" {...register("date")} />
          <TextField label="Genre" {...register("genre")} />
          <TextField label="Track Number" {...register("track")} />
          <TextField label="Album Artist" {...register("albumArtist")} />
        </Stack>
      </Grid>
      <Grid
        size={12}
        sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}
      >
        <Button variant="contained" startIcon={<Save />} type="submit">
          Save
        </Button>
      </Grid>
    </Grid>
  );
}

export default EditingForm;

const ImageSection = function ({
  imageUrl,
  setValue,
}: {
  imageUrl?: string;
  setValue: UseFormSetValue<SongFormat>;
}) {
  const ImageToUrl: React.ChangeEventHandler<
    HTMLInputElement,
    HTMLInputElement
  > = async (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    const url = await imageToUrl(file, imageUrl);
    setValue("imageUrl", url);
  };
  return (
    <>
      <ContentImage url={imageUrl} />

      <Button
        component="label"
        role={undefined}
        variant="contained"
        color="secondary"
        tabIndex={-1}
        startIcon={<Image />}
        sx={{ mt: 2 }}
      >
        Upload Image
        <VisuallyHiddenInput
          type="file"
          accept="image/*"
          onChange={ImageToUrl}
        />
      </Button>
    </>
  );
};

const ContentImage = function ({ url }: { url?: string }) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  if (error) {
    return <NoAlbumCover />;
  }
  return (
    <>
      {loading && (
        <Skeleton
          variant="rectangular"
          sx={{ aspectRatio: "1/1", width: "100%" }}
        />
      )}
      <Box
        component={"img"}
        src={url}
        sx={{
          height: "auto",
          width: "100%",
          display: loading ? "none" : "block",
        }}
        loading="eager"
        onLoad={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setError(true);
        }}
      />
    </>
  );
};

const AutoFillModalController = ({
  formResetFunction,
}: {
  formResetFunction: UseFormReset<SongFormat>;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <Button color="inherit" onClick={() => setIsOpen(true)}>
        Auto Fill
      </Button>
      <AutoFillModal
        open={isOpen}
        handleClose={handleClose}
        formResetFunction={formResetFunction}
      />
    </>
  );
};
