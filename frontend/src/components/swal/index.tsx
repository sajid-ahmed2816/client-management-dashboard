import Swal from "sweetalert2";
import colors from "../../assets/colors";

interface ConfirmDeleteOptions {
  title: string;
  deleteAction: () => Promise<any>;
}

export const confirmDelete = async ({
  deleteAction,
  title,
}: ConfirmDeleteOptions) => {
  const result = await Swal.fire({
    title: title,
    text: "This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    confirmButtonColor: colors.error,
    cancelButtonText: "Cancel",
    cancelButtonColor: colors.primary,
  });

  if (!result.isConfirmed) return;

  try {
    const response = await deleteAction();

    await Swal.fire({
      title: "Deleted!",
      text: response.message,
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });

    return response;
  } catch (error) {
    await Swal.fire({
      title: "Error!",
      text: typeof error === "string"
        ? error
        : "Unable to delete.",
      icon: "error",
    });

    throw error;
  }
};