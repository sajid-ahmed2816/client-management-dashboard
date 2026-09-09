import { useEffect, useMemo, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getProjects } from "../../store/slices/projectSlice";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography
} from "@mui/material";
import { statusOptions } from "../../components/dialogs/project_dialog";
import Loader from "../../components/loader";
import colors from "../../assets/colors";
import Chip from "../../components/chip";
import TextField from "../../components/textfield";
import { debounce } from "../../utils/Debounce";

function Dashboard() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const dispatch = useAppDispatch();
  const { projects, loading } = useAppSelector((state) => state.project);
  const isInitialRender = useRef(true);

  const debouncedGetProjects = useMemo(() => debounce((search: string, status: string) => {
    dispatch(
      getProjects({
        search,
        status: status === "all" ? "" : status,
      })
    );
  }, 500), [dispatch]);

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    debouncedGetProjects(search, status);
  }, [search, status]);

  return (
    <Grid container>
      <Grid size={12}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ mb: 3 }}
        >
          <TextField
            label={"Search Projects"}
            placeholder={"Search by project name or description..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <TextField
            fullWidth={false}
            select={true}
            label={"Status"}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            sx={{ minWidth: 200 }}
            options={[{ name: "All", value: "all" }, ...statusOptions]}
          />
        </Stack>
      </Grid>
      <Grid size={12}>
        <Box
          sx={{
            height: "calc(100vh - 176px)",
            overflowY: "auto"
          }}
        >
          {loading ? (
            <Loader />
          ) : projects.length > 0 ? (
            <Grid container spacing={2}>
              {projects.map((project) => (
                <Grid size={{ xl: 3, lg: 4, md: 6, sm: 6, xs: 12 }} key={project.id} sx={{ display: 'flex' }}>
                  <Card
                    variant="outlined"
                    sx={{ flex: 1 }}
                  >
                    <CardContent
                      sx={{
                        p: "16px !important",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: 1
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ fontSize: "18px" }}
                      >
                        {project.name}
                      </Typography>

                      <Typography
                        variant="caption"
                        sx={{ mb: 1, color: colors.lightGray }}
                      >
                        {project.description}
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: 1,
                          marginTop: "auto"
                        }}
                      >
                        <Typography variant="body2">
                          <strong>Client:</strong>{" "}
                          {project.client?.name ?? "N/A"}
                        </Typography>

                        <Chip status={project.status} />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography color="text.secondary">
              No projects found
            </Typography>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Dashboard;