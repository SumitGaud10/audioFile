import TextField from "@mui/material/TextField";
import { Controller, type Control } from "react-hook-form";
import type { SongFormat } from "../Types/SongFormat";

function CustomFIeld({
  control,
  name,
  label,
  helperText,
}: {
  control: Control<SongFormat, any, SongFormat>;
  name: keyof SongFormat;
  label: string;
  helperText?: string;
}) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <TextField {...field} label={label} helperText={helperText} fullWidth />
      )}
    />
  );
}

export default CustomFIeld;
