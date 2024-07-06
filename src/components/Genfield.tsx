import React from "react";
import TextField from "@mui/material/TextField";

interface GenfieldProps {
  formData: {
    name: string;
    phone: string;
    email: string;
  };
  errors: {
    name: string;
    phone: string;
    email: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTouchedState: (field: string) => void; // Change type to accept string
}

const Genfield: React.FC<GenfieldProps> = ({ formData, errors, handleChange, handleTouchedState }) => {
  return (
    <>
      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        margin="normal"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        error={!!errors.name}
        helperText={errors.name}
        onBlur={() => handleTouchedState("name")} // Pass string value
      />
      <TextField
        label="Phone"
        variant="outlined"
        fullWidth
        margin="normal"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        type="tel"
        required
        error={!!errors.phone}
        helperText={errors.phone}
        onBlur={() => handleTouchedState("phone")} // Pass string value
      />
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        name="email"
        value={formData.email}
        onChange={handleChange}
        type="email"
        required
        error={!!errors.email}
        helperText={errors.email}
        onBlur={() => handleTouchedState("email")} // Pass string value
      />
    </>
  );
};

export default Genfield;
