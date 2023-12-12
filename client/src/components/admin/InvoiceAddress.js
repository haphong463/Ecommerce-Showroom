import { Stack, Typography } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import EmailIcon from "@mui/icons-material/Email";
export function InvoiceAddress() {
  return (
    <Stack>
      <Stack direction="row" alignItems="center" spacing={1}>
        <HomeIcon />
        <Typography
          variant="body2"
          sx={{
            width: "330px",
          }}
        >
          590 Cach Mang Thang Tam Str, District 3, Ho Chi Minh City, Vietnam
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={1}>
        <PhoneIcon />
        <Typography variant="body2">0347337941</Typography>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={1}>
        <EmailIcon />
        <Typography variant="body2">autocar@gmail.com</Typography>
      </Stack>
    </Stack>
  );
}
