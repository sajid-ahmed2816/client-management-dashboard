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
import { getClients, deleteClient } from "../../store/slices/clientSlice";
import ClientDialog from "../../components/dialogs/client_dialog";
import Loader from "../../components/loader";
import { Delete, Edit } from "@mui/icons-material";
import type { ClientType } from "../../store/slices/clientSlice";
import { confirmDelete } from "../../components/swal";

const tableHead = ["Sr. No", "Name", "Email", "Company", "Actions"];

function Client() {
  const [isClientDialogOpen, setIsClientDialogOpen] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<ClientType | null>(null);
  const { clients, loading } = useAppSelector((state) => state.client)
  const dispatch = useAppDispatch();

  const handleClientDialog = (data: ClientType | null = null) => {
    setIsClientDialogOpen((prev) => !prev);
    setSelectedData(data);
  };

  const handleDelete = async (id: string) => {
    await confirmDelete({
      deleteAction: async () => {
        return await dispatch(deleteClient(id)).unwrap();
      },
      title: "Delete Client?"
    });
  };

  useEffect(() => {
    dispatch(getClients());
  }, [dispatch]);

  return (
    <Fragment>
      <ClientDialog
        isOpen={isClientDialogOpen}
        handleClose={handleClientDialog}
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
              Clients
            </Typography>
            <Button
              variant={"contained"}
              onClick={() => handleClientDialog(null)}
            >
              Create Client
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
                  {clients.map((client, ind) => (
                    <TableRow key={client.id}>
                      <TableCell>{ind + 1}</TableCell>
                      <TableCell>{client.name}</TableCell>
                      <TableCell>{client.email}</TableCell>
                      <TableCell>{client.company}</TableCell>
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
                            onClick={() => handleClientDialog(client)}
                          >
                            <Edit sx={{ width: "20px", height: "20px" }} />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(client.id)}
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

export default Client;