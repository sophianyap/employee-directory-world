import type { Employee } from './types';

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