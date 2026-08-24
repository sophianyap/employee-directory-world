import engineeringIcon from './assets/engineering.png';
import designIcon from './assets/design.png';
import qaIcon from './assets/qa.png';
import managementIcon from './assets/management.png';

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: "Engineering" | "Design" | "Quality Assurance" | "Management";
  isOnline: boolean;
  skills: string[];
}

export const departmentColors: Record<string, { bg: string; color: string; icon: string }> = {
  Engineering: { bg: "#74C465", color: "#00804D", icon: engineeringIcon },
  Design: { bg: "#C7CAFE", color: "#8C69F8", icon: designIcon },
  "Quality Assurance": { bg: "#C8EEFF", color: "#4397D3", icon: qaIcon },
  Management: { bg: "#FBFF8F", color: "#A8BD0F", icon: managementIcon },
};

export const getNextId = (employees: Employee[]): string => {
  if (employees.length === 0) return "001";
  const maxId = Math.max(...employees.map((emp) => Number(emp.id)));
  return String(maxId + 1).padStart(3, "0");
};

export const emptyForm = (employees: Employee[]): Employee => ({
  id: getNextId(employees),
  name: "",
  role: "",
  department: "Engineering",
  isOnline: true,
  skills: [],
});