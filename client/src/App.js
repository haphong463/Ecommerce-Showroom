import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./assets/styles/Body.css";
import { ThemeProvider, createTheme } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { publicRoutes } from "./route/Route";
import { ToastContainer } from "react-toastify";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, sans-serif",
    h3: {
      fontWeight: "bold",
      marginTop: "20px",
    },
  },
});
function App() {
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   // Simulate an API call or any asynchronous operation
  //   const fetchData = async () => {
  //     try {
  //       // Perform your data fetching logic here
  //       // For example, you can use fetch or axios
  //       // await fetch('https://api.example.com/data');
  //       // Or any other async operation

  //       // Simulate a delay
  //       await new Promise((resolve) => setTimeout(resolve, 2000));

  //       // Set loading to false when the data is fetched
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div
        className="bg-gray"
        style={{
          overflow: "hidden",
        }}
      >
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              {publicRoutes.map((route) => (
                <Route
                  key={route.path}
                  element={route.component}
                  exact
                  path={route.path}
                />
              ))}
            </Routes>
          </BrowserRouter>
          <ToastContainer />
        </ThemeProvider>
      </div>
    </LocalizationProvider>
  );
}

export default App;
