import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { createClient, updateClient } from "../../../store/slices/clientSlice";
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
}

interface ClientProps {
  isOpen: boolean;
  handleClose: () => void;
  data: ClientType | null;
}

function ClientDialog({
  isOpen,
  handleClose,
  data
}: ClientProps) {
  const { loading } = useAppSelector((state) => state.client)
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ClientFormValues>({
    defaultValues: {
      id: "",
      name: "",
      email: "",
      company: "",
    },
  });

  const onSubmit = async (formData: ClientFormValues) => {
    const result = data ? await dispatch(updateClient({
      id: data.id!,
      name: formData.name,
      email: formData.email,
      company: formData.company,
    })) : await dispatch(createClient({
      name: formData.name,
      email: formData.email,
      company: formData.company,
    }));

    if (createClient.fulfilled.match(result) || updateClient.fulfilled.match(result)) {
      handleClose();
      reset();
    }
  };

  useEffect(() => {
    reset(data ?? {
      id: "",
      name: "",
      email: "",
      company: "",
    });
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
          {data == null ? "Create Client" : "Update Client"}
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

            <TextField
              label={"Email"}
              type={"email"}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value:
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message:
                    "Please enter a valid email address",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              label={"Company"}
              type={"text"}
              {...register("company", {
                required: "Company is required",
              })}
              error={!!errors.company}
              helperText={errors.company?.message}
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

export default ClientDialog;