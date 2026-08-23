import accountIcon from '../assets/account_circle.png';
import type { Employee } from '../types';
import { departmentColors } from '../constants';

interface MetaInformationProps {
  employee: Employee;
}

export function MetaInformation({ employee }: MetaInformationProps) {
  return (
    <div className="mb-4 flex flex-row items-start">
      <img
        className="w-16 h-16 shrink-0 rounded-full object-cover mr-4"
        src={accountIcon}
        alt={`${employee.name} avatar`}
      />
      <div className="w-auto flex-1">
        <p className="text-left text-[0.7rem] text-[#9ca3af] m-0">EMP-{employee.id}</p>
        <h2 className="text-left text-[1.1rem] font-bold text-[#0f172a] m-0">{employee.name}</h2>
        <p className="text-left text-[0.85rem] text-[#6b7280] mb-2 font-normal">{employee.role}</p>
        <div
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.8rem] font-semibold"
          style={{
            backgroundColor: departmentColors[employee.department]?.bg,
            color: departmentColors[employee.department]?.color,
          }}
        >
          <img
            src={departmentColors[employee.department]?.icon}
            alt={`${employee.department} icon`}
            className="w-3.5 h-3.5"
          />
          <span>{employee.department}</span>
        </div>
      </div>
    </div>
  );
}