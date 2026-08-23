import type { Employee } from '../types';
import { SearchBar } from './Searchbar';
import { EmployeeFormPopUp } from './Employeeformpopup';
import { EmployeeCard } from './Employeecard';

interface EmployeeDirectoryProps {
  employees: Employee[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  allEmployees: Employee[];
  onAddEmployee: (employee: Employee) => void;
}

export function EmployeeDirectory({
  employees,
  searchQuery,
  onSearchChange,
  allEmployees,
  onAddEmployee,
}: EmployeeDirectoryProps) {
  return (
    <div className="font-['Geologica'] font-bold w-full min-h-screen bg-[#f3f4f6]">
      <div className="flex justify-between items-center flex-wrap gap-4 p-4">
        <h1 className="text-left text-[2rem] font-bold m-4 text-[#0f172a] font-['Geologica']">
          Employee Directory
        </h1>
      </div>
      <div className="gap-4 w-full flex flex-row items-center">
        <SearchBar value={searchQuery} onChange={onSearchChange} />
        <EmployeeFormPopUp employees={allEmployees} onAddEmployee={onAddEmployee} />
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