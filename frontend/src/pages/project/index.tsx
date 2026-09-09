import { Fragment, useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getProjects, deleteProject } from "../../store/slices/projectSlice";
import ProjectDialog from "../../components/dialogs/project_dialog";
import Loader from "../../components/loader";
import { Delete, Edit } from "@mui/icons-material";
import type { ProjectType } from "../../store/slices/projectSlice";
import { confirmDelete } from "../../components/swal";
import { getClients } from "../../store/slices/clientSlice";
import Chip from "../../components/chip";

const tableHead = ["Sr. No", "Name", "Client", "Status", "Actions"];

function Project() {
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<ProjectType | null>(null);
  const { projects, loading } = useAppSelector((state) => state.project)
  const dispatch = useAppDispatch();

  const handleProjectDialog = (data: ProjectType | null = null) => {
    setIsProjectDialogOpen((prev) => !prev);
    setSelectedData(data);
  };

  const handleDelete = async (id: string) => {
    await confirmDelete({
      deleteAction: async () => {
        return await dispatch(deleteProject(id)).unwrap();
      },
      title: "Delete Project?"
    });
  };

  useEffect(() => {
    dispatch(getProjects());
    dispatch(getClients());
  }, [dispatch]);

  return (
    <Fragment>
      <ProjectDialog
        isOpen={isProjectDialogOpen}
        handleClose={handleProjectDialog}
        data={selectedData}
      />
      <Grid container spacing={2}>
        <Grid size={12}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: "20px",
                fontWeight: 500
              }}
            >
              Projects
            </Typography>
            <Button
              variant={"contained"}
              onClick={() => handleProjectDialog(null)}
            >
              Create Project
            </Button>
          </Box>
        </Grid>
        <Grid size={12}>
          {loading ? (
            <Loader />
          ) : (
            <TableContainer
              component={Paper}
              elevation={2}
              sx={{
                width: { md: "calc(100vw - 282px)", xs: "calc(100vw - 108px)" },
                height: "calc(100vh - 150px)",
                overflow: "auto",
              }}
            >
              <Table size="small" stickyHeader>
                <TableHead>
                  <TableRow>
                    {tableHead.map((head) => (
                      <TableCell
                        key={head}
                        sx={{
                          textAlign: head === "Actions" ? "center" : "start"
                        }}
                      >
                        {head}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {projects.map((project, ind) => (
                    <TableRow key={project.id}>
                      <TableCell>{ind + 1}</TableCell>
                      <TableCell>{project.name}</TableCell>
                      <TableCell>{project.client.name}</TableCell>
                      <TableCell>
                        <Chip status={project.status} />
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                          }}
                        >
                          <IconButton
                            size="small"
                            onClick={() => handleProjectDialog(project)}
                          >
                            <Edit sx={{ width: "20px", height: "20px" }} />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(project.id)}
                          >
                            <Delete sx={{ width: "20px", height: "20px" }} />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Project;