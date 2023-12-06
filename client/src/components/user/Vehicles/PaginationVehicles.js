import { Box, Pagination } from "@mui/material";

export function PaginationVehicles({
  searchData,
  vehiclesPerPage,
  currentPage,
  handlePageChange,
}) {
  return (
    <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
      <Pagination
        count={Math.ceil(searchData.length / vehiclesPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        color="secondary"
        showFirstButton
        showLastButton
      />
    </Box>
  );
}
