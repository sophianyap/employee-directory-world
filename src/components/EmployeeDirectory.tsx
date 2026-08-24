import { Search } from 'lucide-react';
import type { Employee } from '../types';
import { EmployeeForm } from './EmployeeForm';
import { EmployeeCard } from './EmployeeCard';

export function EmployeeDirectory({
  employees,
  searchQuery,
  onSearchChange,
  allEmployees,
  onAddEmployee,
}: {
  employees: Employee[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  allEmployees: Employee[];
  onAddEmployee: (employee: Employee) => void;
}) {
  return (
    <div className="font-['Geologica'] font-bold w-full min-h-screen bg-[#f3f4f6]">
      <div className="flex justify-between items-center flex-wrap gap-4 p-4">
        <h1 className="text-left text-[2rem] font-bold m-4 text-[#0f172a] font-['Geologica']">
          Employee Directory
        </h1>
      </div>

      <div className="gap-4 w-full flex flex-row items-center">
        <div className="flex gap-2 ml-8">
          <div className="relative w-[260px] max-w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9ca3af]" />
            <input
              type="text"
              className="w-full text-[#777676] pl-10 pr-3.5 py-2 bg-white border border-[#d1d5db] rounded-[20px] text-sm font-['Geologica'] font-normal outline-none"
              placeholder="Search by name, role, or dept..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>
        <EmployeeForm employees={allEmployees} onAddEmployee={onAddEmployee} />
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(380px,1fr))] gap-5 p-6">
        {employees.length > 0 ? (
          employees.map((employee) => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))
        ) : (
          <p className="text-[#6b7280] p-8">No employees match your search.</p>
        )}
      </div>
    </div>
  );
}