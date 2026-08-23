export interface Employee {
  id: string;
  name: string;
  role: string;
  department: "Engineering" | "Design" | "Quality Assurance" | "Management";
  isOnline: boolean;
  skills: string[];
}