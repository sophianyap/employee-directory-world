import type { Employee } from '../types';
import { EmployeeCardHeader } from './EmployeeCardHeader';
import { MetaInformation } from './MetaInformation';
import { SkillsList } from './SkillsList';

interface EmployeeCardProps {
  employee: Employee;
}

export function EmployeeCard({ employee }: EmployeeCardProps) {
  return (
    <div className="bg-white rounded-2xl px-8 py-6 relative font-['Geologica']">
      <EmployeeCardHeader employee={employee} />
      <MetaInformation employee={employee} />
      <hr className="border-none border-t-2 border-[#0f172a] w-full my-4" />
      <SkillsList skills={employee.skills} />
    </div>
  );
}