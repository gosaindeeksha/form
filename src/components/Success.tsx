import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Apitable from "./Apitable";
import DepartmentList from "./Departmentlist";

const SuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const departments = [
    {
      department: 'customer service',
      sub_departments: ['support', 'customer success'],
    },
    {
      department: 'design',
      sub_departments: ['graphic design', 'product design', 'web design'],
    },
  ];

  useEffect(() => {
    // Retrieve formData from localStorage
    const storedData = localStorage.getItem("formData");
    if (storedData) {
      const formDataFromStorage = JSON.parse(storedData);
      setFormData(formDataFromStorage);
    } else {
      // Handle case where formData is not found in localStorage
      navigate("/", { state: { message: "Please enter your details first!" } });
    }
  }, [navigate]);

  return (
    <div >
      <h1>Hi {formData.name} !</h1>
      <br />
      <Apitable/>
      <br />
      <DepartmentList departments={departments}/>
      <br />
    </div>
  );
};

export default SuccessPage;
