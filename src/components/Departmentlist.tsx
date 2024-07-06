import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Checkbox,
  styled,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

// Define interface for Department object
interface Department {
  department: string;
  sub_departments: string[];
}

// Define props interface for DepartmentList component
interface DepartmentListProps {
  departments: Department[];
}

// Styled component for Checkbox with white border
const WhiteBorderCheckbox = styled(Checkbox)({
  '&.Mui-checked': {
    color: '#fff', // Change the fill color when checked
  },
  '&.MuiCheckbox-root': {
    color: '#fff', // Change the border color
  },
});

const DepartmentList: React.FC<DepartmentListProps> = ({ departments }) => {
  // State to manage selected items (sub-departments)
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // State to manage open/close state of departments
  const [open, setOpen] = useState<{ [key: string]: boolean }>({});

  // Handle toggling selection of a sub-department
  const handleToggle = (item: string) => () => {
    const currentIndex = selectedItems.indexOf(item);
    const newSelected = [...selectedItems];

    // Toggle selection
    if (currentIndex === -1) {
      newSelected.push(item);
    } else {
      newSelected.splice(currentIndex, 1);
    }

    setSelectedItems(newSelected);
  };

  // Handle clicking on department to expand/collapse sub-departments
  const handleClick = (department: string) => () => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      [department]: !prevOpen[department], // Toggle open state for clicked department
    }));
  };

  // Check if a sub-department is selected
  const isSelected = (item: string) => selectedItems.indexOf(item) !== -1;

  // Handle selecting/unselecting a department and its sub-departments
  const selectDepartment = (department: string) => () => {
    const allSubDepartments = departments.find((dep) => dep.department === department)?.sub_departments;
    if (allSubDepartments) {
      const allSelected = allSubDepartments.every((sub) => isSelected(sub));
      const newSelected = [...selectedItems];
      if (allSelected) {
        // Unselect all sub-departments if all are currently selected
        allSubDepartments.forEach((sub) => {
          const index = newSelected.indexOf(sub);
          if (index !== -1) {
            newSelected.splice(index, 1);
          }
        });
      } else {
        // Select all sub-departments if not all are selected
        newSelected.push(...allSubDepartments);
      }
      setSelectedItems(newSelected);
    }
  };

  // Render sub-departments within a Collapse component
  const renderSubDepartments = (sub_departments: string[], department: string) => (
    <Collapse in={open[department]} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        {sub_departments.map((sub, index) => (
          <ListItem key={index} button onClick={handleToggle(sub)}>
            <ListItemIcon>
              <WhiteBorderCheckbox
                edge="start"
                checked={isSelected(sub)}
                tabIndex={-1}
               
              />
            </ListItemIcon>
            <ListItemText primary={sub} />
          </ListItem>
        ))}
      </List>
    </Collapse>
  );

  // Render departments with expand/collapse icons and checkboxes
  const renderDepartments = () =>
    departments.map(({ department, sub_departments }) => (
      <div key={department}>
        <ListItem >
          <ListItemIcon onClick={selectDepartment(department)}>
            <WhiteBorderCheckbox
              edge="start"
              checked={sub_departments.every((sub) => isSelected(sub))}
              tabIndex={-1}
             
            />
          </ListItemIcon>
          <ListItemText primary={department} />
          {open[department] ? (
          <ExpandLess onClick={handleClick(department)} sx={{
            cursor:"pointer",
          }}/>
        ) : (
          <ExpandMore onClick={handleClick(department)}  sx={{
            cursor:"pointer",
          }} />
        )}
        </ListItem>
        {renderSubDepartments(sub_departments, department)}
      </div>
    ));

  // Render the main list of departments
  return (
    <>
    <h1>JSON Nested Checkbox List</h1>
    <List>
      {renderDepartments()}
    </List>
    </>
  );
};

export default DepartmentList;
