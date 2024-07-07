import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


import Genfield from "./Genfield";

// Define types for form data and errors
interface FormData {
  name: string;
  phone: string;
  email: string;
}

interface Errors {
  name: string;
  phone: string;
  email: string;
}

// Dark theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Signin: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state?.message || "";
  const [open, setOpen] = useState(true);

  const handleClose = () => {
      setOpen(false);
    }
  // State Definitions
  
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState<Errors>({
    name: "",
    phone: "",
    email: "",
  });

  // Touched State
  const [touched, setTouched] = useState({
    name: false,
    phone: false,
    email: false,
  });

  // Field Validation
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const validateField = (name: keyof FormData, value: string) => {
    let error = "";
    switch (name) {
      case "name":
        if (!value && touched.name) error = "Name is required";
        break;
      case "phone":
        if ((!value || !/^\d{10}$/.test(value)) && touched.phone)
          error = "A valid 10-digit phone number is required";
        break;
      case "email":
        if ((!value || !/\S+@\S+\.\S+/.test(value)) && touched.email)
          error = "A valid email is required";
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  // useEffect to handle validation
  useEffect(() => {
    if(message === ""){
      setOpen(false);
   
    }else{
      //
    }
    Object.keys(formData).forEach((key) => {
      const fieldName = key as keyof FormData;
      const value = formData[fieldName];
      validateField(fieldName, value);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData, touched,validateField]);

  // Change Handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handle Touched State
  const handleTouchedState = (field: string) => {
    setTouched((prevTouch) => ({
      ...prevTouch,
      [field]: true,
    }));
  };

  // Submit Handler
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    let hasError = false;
    let  allFieldsTouched = true;
    Object.keys(errors).forEach((key) => {
      if (errors[key as keyof Errors]) {
        hasError = true;
      }
      if (!touched[key as keyof FormData]) {
    allFieldsTouched = false;
  }
    });

    if (hasError || !allFieldsTouched ) {
      //empty
    } else {
      localStorage.setItem("formData", JSON.stringify(formData));

      // Navigate to success page
      navigate("/success", { replace: true });
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
     
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        {open && (
        <Alert variant="outlined" severity="error" sx={{   position: "fixed",
          top: 10,
          zIndex: 9999,  }}>
         {message}
          <IconButton aria-label="close" color="inherit" size="small" onClick={handleClose}>
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </Alert>
      )}
     
        <Card sx={{ maxWidth: 500 }}>
          <CardContent>
            <Typography
              gutterBottom
              variant="h3"
              component="div"
              sx={{ textAlign: "center" }}
            >
           FORM
            </Typography>
            <Genfield
              formData={formData}
              errors={errors}
              handleChange={handleChange}
              handleTouchedState={handleTouchedState}
            />
            <form onSubmit={handleSubmit}>
              <CardActions sx={{ justifyContent: "center" }}>
                <Button fullWidth size="large" type="submit" variant="outlined">
                  Submit
                </Button>
              </CardActions>
            </form>
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  );
};

export default Signin;
