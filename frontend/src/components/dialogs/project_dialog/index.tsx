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
import { createProject, updateProject } from "../../../store/slices/projectSlice";
import { Close } from "@mui/icons-material";
import type { ProjectType } from "../../../store/slices/projectSlice";
import { useEffect } from "react";
import colors from "../../../assets/colors";
import TextField from "../../textfield";
import Button from "../../button";

interface ProjectFormValues {
  id?: string;
  name: string;
  description: string;
  status: string;
  clientId: string;
  file?: File;
};

interface ProjectProps {
  isOpen: boolean;
  handleClose: () => void;
  data: ProjectType | null;
};

export const statusOptions = [
  { name: "Pending", value: "pending" },
  { name: "In-Progress", value: "in-progress" },
  { name: "Completed", value: "completed" }
];

function ProjectDialog({
  isOpen,
  handleClose,
  data
}: ProjectProps) {
  const { loading } = useAppSelector((state) => state.project);
  const { clients } = useAppSelector((state) => state.client);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control
  } = useForm<ProjectFormValues>({
    defaultValues: {
      id: "",
      name: "",
      description: "",
      status: "",
      clientId: "",
      file: undefined,
    },
  });

  const onSubmit = async (formData: ProjectFormValues) => {
    const payload = new FormData();

    payload.append("name", formData.name);
    payload.append("description", formData.description);
    payload.append("status", formData.status);
    payload.append("clientId", formData.clientId);

    if (formData.file) {
      payload.append("file", formData.file);
    }

    const result = data
      ? await dispatch(
        updateProject({
          id: data.id,
          data: payload,
        })
      )
      : await dispatch(
        createProject(payload)
      );

    if (createProject.fulfilled.match(result) || updateProject.fulfilled.match(result)) {
      handleClose();
      reset();
    };
  };

  useEffect(() => {
    if (data) {
      reset({
        id: data.id,
        name: data.name,
        description: data.description,
        status: data.status,
        clientId: data.client?.id,
      });
    } else {
      reset({
        id: "",
        name: "",
        description: "",
        status: "",
        clientId: "",
      });
    }
  }, [data]);

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth={"sm"}
      fullWidth={true}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 24px 0 24px"
        }}
      >
        <Typography
          variant="h2"
          component={"h2"}
          sx={{
            fontSize: "20px",
            fontWeight: 600
          }}
        >
          {data == null ? "Create Project" : "Update Project"}
        </Typography>
        <IconButton
          onClick={() => handleClose()}
        >
          <Close sx={{ color: colors.error }} />
        </IconButton>
      </Box>
      <DialogContent>
        <Box
          component={"form"}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack spacing={2.5}>
            <TextField
              label={"Name"}
              type={"text"}
              {...register("name", {
                required: "Name is required",
              })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />

            <Controller
              name="status"
              control={control}
              rules={{
                required: "Status is required",
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  select={true}
                  label={"Select Status"}
                  error={!!errors.status}
                  helperText={errors.status?.message}
                  options={statusOptions}
                />
              )}
            />

            <Controller
              name="clientId"
              control={control}
              rules={{
                required: "Client is required",
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  select={true}
                  label={"Select Client"}
                  error={!!errors.clientId}
                  helperText={errors.clientId?.message}
                  options={clients.map(client => ({ name: client.name, value: client.id }))}
                />
              )}
            />

            <Controller
              name="file"
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
                    Project File
                  </Typography>

                  <input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files?.[0];

                      field.onChange(file);
                    }}
                  />

                  {/* New selected file */}
                  {field.value && (
                    <Typography
                      sx={{
                        mt: 1,
                        fontSize: "13px",
                        color: colors.lightGray,
                      }}
                    >
                      Selected: {field.value.name}
                    </Typography>
                  )}

                  {/* Existing file */}
                  {!field.value && data?.file && (
                    <Typography
                      sx={{
                        mt: 1,
                        fontSize: "13px",
                        color: colors.lightGray,
                      }}
                    >
                      Current file:{" "}
                      <a
                        href={data.file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: colors.primary,
                          textDecoration: "none",
                        }}
                      >
                        {data.file.name}
                      </a>
                    </Typography>
                  )}
                </Box>
              )}
            />

            <TextField
              multiline={true}
              label={"Description"}
              type={"text"}
              rows={3}
              {...register("description", {
                required: "Company is required",
              })}
              error={!!errors.description}
              helperText={errors.description?.message}
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
};

export default ProjectDialog;