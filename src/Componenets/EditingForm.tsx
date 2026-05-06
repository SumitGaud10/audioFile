import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import type { SongFormat } from "../Types/SongFormat";
import VisuallyHiddenInput from "./VisuallyHiddenInput";
import {
  useForm,
  useWatch,
  type SubmitHandler,
  type UseFormReset,
  type UseFormSetValue,
} from "react-hook-form";
import Image from "@mui/icons-material/Image";
import Save from "@mui/icons-material/Save";
import NoAlbumCover from "./NoAlbumCover";
import { useState } from "react";
import imageToUrl from "../utils/imageToUrl";
import AutoFillModal from "./AutoFillModal";
import useTempAudio from "../Context/TempAudio/useTempAudio";
import ExportAudio from "../lib/ExportAudio";
import Tooltip from "@mui/material/Tooltip";
import CustomFIeld from "./CustomFIeld";

function EditingForm({ audio }: { audio: SongFormat }) {
  const { control, setValue, reset, handleSubmit } = useForm<SongFormat>({
    defaultValues: audio,
  });

  const { audioBuffer, fileExtension } = useTempAudio();

  const onSubmit: SubmitHandler<SongFormat> = (data) => {
    if (!audioBuffer) {
      throw new Error("No audio found");
    }
    ExportAudio(data, audioBuffer, fileExtension);
  };

  const imageUrl = useWatch({
    control,
    name: "imageUrl",
  });

  return (
    <Grid
      container
      sx={{ marginTop: "3rem", px: 2, marginBottom: 10 }}
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
          <CustomFIeld label="Title" name="title" control={control} />
          <CustomFIeld label="Album" name="album" control={control} />
          <CustomFIeld
            label="Artist"
            name="artist"
            helperText="Seperate artists with ( ; )"
            control={control}
          />
          <CustomFIeld label="Year" name="year" control={control} />
          <CustomFIeld
            label="Genre"
            helperText="Seperate genre with ( ; )"
            name="genre"
            control={control}
          />
          <CustomFIeld label="Track Number" name="track" control={control} />
          <CustomFIeld
            label="Album Artist"
            name="albumArtist"
            control={control}
          />
        </Stack>
      </Grid>
      <Grid
        size={12}
        sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}
      >
        <Tooltip title="Download new file with modified tags">
          <Button variant="contained" startIcon={<Save />} type="submit">
            Save
          </Button>
        </Tooltip>
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
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");

  if (state == "error" || !url) {
    return <NoAlbumCover />;
  }
  return (
    <>
      {state == "loading" && (
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%", height: "auto", aspectRatio: "1/1" }}
        />
      )}
      <Box
        key={url}
        component={"img"}
        src={url}
        sx={{
          height: "auto",
          width: "100%",
          display: state == "loading" ? "none" : "block",
        }}
        loading="eager"
        onLoad={() => setState("ready")}
        onError={() => {
          setState("error");
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
