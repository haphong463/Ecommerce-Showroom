import React, { useState } from "react";
import { Box, Paper, Stack, Fab } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import { useReactToPrint } from "react-to-print";
import { Sidebar } from "../../components/admin/Sidebar";
import Navbar from "../../components/admin/Navbar";
import { InvoicePrintable } from "../../components/admin/InvoicePrintable";
import SaveIcon from "@mui/icons-material/Save";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { dangerMessage } from "../../components/Message";
import { postOrder } from "../../components/Order/OrderLibrary";

export const Invoice = () => {
  const [isAddRowVisible, setIsAddRowVisible] = useState(false);
  const [dataToPost, setDataToPost] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [listItem, setListItem] = useState([]);

  const componentRef = React.useRef();

  const handlePrint = useReactToPrint({
    content: () => {
      if (listItem.length === 0) {
        dangerMessage("List is empty. You can not print.");
        return null;
      }
      if (isEditMode) {
        dangerMessage("Please save before printing.");
        return null;
      }
      if (!dataToPost.accountId) {
        dangerMessage("Select customer.");
        return null;
      }
      return componentRef.current;
    },
    onAfterPrint: () => {
      postOrder(dataToPost).then((data) => {
        console.log(data);
      });
      console.log("After print");
    },
  });

  const handleAddRow = () => {
    setIsAddRowVisible(!isAddRowVisible);
    setIsEditMode(!isEditMode);
  };
  console.log(dataToPost);
  return (
    <>
      <Navbar />
      <Box height={70} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Stack
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              spacing={2}
            >
              <Fab
                color="primary"
                size="medium"
                aria-label="add"
                onClick={handlePrint}
              >
                <PrintIcon />
              </Fab>
              <Fab
                color="primary"
                size="medium"
                aria-label="add"
                onClick={handleAddRow}
              >
                {isEditMode ? <SaveIcon /> : <BorderColorIcon />}
              </Fab>
            </Stack>
          </Box>

          {/* Invoice display section */}
          <Paper elevation={3} style={{ padding: 16, marginTop: 16 }}>
            <InvoicePrintable
              ref={componentRef}
              isAddRowVisible={isAddRowVisible}
              listItem={listItem}
              setListItem={setListItem}
              dataToPost={dataToPost}
              setDataToPost={setDataToPost}
            />
          </Paper>
        </Box>
      </Box>
    </>
  );
};
