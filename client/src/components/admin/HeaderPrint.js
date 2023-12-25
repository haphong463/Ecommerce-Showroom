import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";

export function HeaderPrint(props) {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Stack>
        {!props.isAddRowVisible ? (
          <Stack>
            <Typography fontWeight={600} variant="body1">
              {props.selectedAccount?.name}
            </Typography>
            <Typography variant="body1">
              {props.selectedAccount?.phone}
            </Typography>
            <Typography variant="body1">
              {props.selectedAccount?.email}
            </Typography>
          </Stack>
        ) : (
          <Stack direction="row" spacing={1}>
            <Select
              value={props.selectedAccount?.accountId ?? "Select customer"}
              onChange={(e) => {
                props.setDataToPost({
                  ...props.dataToPost,
                  accountId: e.target.value,
                });
              }}
              MenuProps={props.MenuProps}
            >
              <MenuItem disabled value="Select customer">
                Select customer
              </MenuItem>
              {props.listAccount.map((item) => (
                <MenuItem key={item.accountId} value={item.accountId}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
            <FormControl
              sx={{
                width: 300,
              }}
            >
              <InputLabel id="demo-multiple-checkbox-label">Service</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                label="Service"
                id="demo-multiple-checkbox"
                multiple
                value={props.service}
                onChange={props.handleChange}
                renderValue={(selected) =>
                  selected
                    .map(
                      (id) =>
                        props.listService.find((item) => item.serviceId === id)
                          .name
                    )
                    .join(", ")
                }
                MenuProps={props.MenuProps}
              >
                {props.listService.map((item, index) => (
                  <MenuItem key={index} value={item.serviceId}>
                    <Checkbox
                      checked={props.service.indexOf(item.serviceId) > -1}
                    />
                    <ListItemText primary={item.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        )}
      </Stack>
      <Stack>
        <Typography variant="body2">Issued by {props.Name}</Typography>
      </Stack>
    </Stack>
  );
}
