import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import React from "react";

export function VehicleSpec({ infoArray }) {
  return (
    <Box
      component="section"
      sx={{
        my: 4,
      }}
    >
      <Typography variant="h4" align="center" className="title-specs">
        <span className="title-text">Vehicle Specs</span>
      </Typography>

      <Divider sx={{ borderTop: "1px solid #333", mt: 1, mx: 30 }} />
      <Grid container columnSpacing={3}>
        {infoArray.map(
          (info, index) =>
            info.title !== "Name" &&
            info.title !== "Purchase Price" &&
            info.title !== "Description" && (
              <Grid key={index} item xs={12} sm={6}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{
                    borderBottom: "1px solid #333",
                    p: 1.5,
                  }}
                >
                  <Stack direction="row" spacing={2}>
                    {React.cloneElement(info.icon, {
                      style: { color: "rgb(190 140 9)" },
                    })}
                    <Typography variant="body2">{info.title}</Typography>
                  </Stack>
                  <Stack>
                    <Typography>{info.value}</Typography>
                  </Stack>
                </Stack>
              </Grid>
            )
        )}
      </Grid>
    </Box>
  );
}
