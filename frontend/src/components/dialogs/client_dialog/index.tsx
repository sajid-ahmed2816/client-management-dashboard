import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { createClient, updateClient, } from "../../../store/slices/clientSlice";
import { Close } from "@mui/icons-material";
import type { ClientType } from "../../../store/slices/clientSlice";
import { useEffect } from "react";
import colors from "../../../assets/colors";
import TextField from "../../textfield";
import Button from "../../button";

interface ClientFormValues {
  id?: string;
  name: string;
  email: string;
  company: string;
  files: File[];
}

interface ClientProps {
  isOpen: boolean;
  handleClose: () => void;
  data: ClientType | null;
}

function ClientDialog({ isOpen, handleClose, data, }: ClientProps) {
  const { loading } = useAppSelector((state) => state.client);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<ClientFormValues>({
    defaultValues: {
      id: "",
      name: "",
      email: "",
      company: "",
      files: [],
    },
  });

  const onSubmit = async (formData: ClientFormValues) => {
    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("email", formData.email);
    payload.append("company", formData.company);
    // Multiple files 
    formData.files.forEach((file) => {
      payload.append("files", file);
    });
    const result = data ?
      await dispatch(updateClient({ id: data.id, data: payload, })) :
      await dispatch(createClient(payload));

    if (createClient.fulfilled.match(result) || updateClient.fulfilled.match(result)) {
      handleClose();
      reset();
    };
  };

  useEffect(() => {
    if (data) {
      reset({
        id: data.id,
        name: data.name,
        email: data.email,
        company: data.company,
        files: [],
      });
    } else {
      reset({
        id: "",
        name: "",
        email: "",
        company: "",
        files: [],
      });
    }
  }, [data, reset]);
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 24px 0 24px",
        }}
      >
        <Typography
          variant="h2"
          component="h2"
          sx={{
            fontSize: "20px",
            fontWeight: 600,
          }}
        >
          {data == null ? "Create Client" : "Update Client"}
        </Typography>
        <IconButton
          onClick={handleClose}
        >
          <Close sx={{ color: colors.error }} />
        </IconButton>
      </Box>
      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack spacing={2.5}>
            <TextField
              label="Name"
              type="text"
              {...register("name", {
                required: "Name is required",
              })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <TextField
              label="Email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              label="Company"
              type="text"
              {...register("company", {
                required: "Company is required",
              })}
              error={!!errors.company}
              helperText={errors.company?.message}
            />
            <Controller
              name="files"
              control={control}
              render={({ field }) => (
                <Box>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 500,
                      mb: 1,
                    }}
                  >
                    Client Files
                  </Typography>
                  <input
                    type="file"
                    multiple
                    onChange={(e) => {
                      const newFiles = Array.from(e.target.files ?? []);
                      const existingFiles = field.value ?? [];
                      const mergedFiles = [...existingFiles, ...newFiles,];
                      const uniqueFiles = mergedFiles.filter((file, index, self) => index === self.findIndex(
                        (item) => item.name === file.name && item.size === file.size && item.lastModified === file.lastModified
                      ));
                      field.onChange(uniqueFiles);
                      e.target.value = "";
                    }}
                  /> {/* Newly selected files */}
                  {field.value?.length > 0 && (
                    <Box
                      sx={{ mt: 1 }}>
                      <Typography
                        sx={{
                          fontSize: "13px",
                          fontWeight: 500,
                          mb: 0.5,
                        }}
                      >
                        Selected files:
                      </Typography>
                      {field.value.map((file, index) => (
                        <Typography key={`${file.name}-${file.size}-${index}`}
                          sx={{
                            fontSize: "13px",
                            color: colors.lightGray,
                          }}
                        > • {file.name}
                        </Typography>
                      ))}
                    </Box>
                  )}
                  {/* Existing files */}
                  {data && data?.files?.length > 0 && (
                    <Box sx={{ mt: 1 }}>
                      <Typography
                        sx={{
                          fontSize: "13px",
                          fontWeight: 500, mb: 0.5,
                        }}
                      >
                        Current files:
                      </Typography>
                      {data?.files?.map((file, index) => (
                        <Typography
                          key={`${file.name}-${index}`}
                          sx={{ fontSize: "13px", }}
                        >
                          •{" "}
                          <a
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: colors.primary, textDecoration: "none", }}
                          >
                            {file.name}
                          </a>
                        </Typography>
                      ))}
                    </Box>
                  )}
                </Box>
              )}
            />
            <Button
              type="submit"
              title={data ? "Update" : "Submit"}
              disabled={loading}
              loading={loading}
            />
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
export default ClientDialog;