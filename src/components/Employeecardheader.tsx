

import type { Employee } from '../types';
import { StatusBadge } from './Statusbadge';
import { EmployeeCardMenu } from './Employeecardmenu';
 
interface EmployeeCardHeaderProps {
  employee: Employee;
}
 
export function EmployeeCardHeader({ employee }: EmployeeCardHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-4">
      <StatusBadge isOnline={employee.isOnline} />
      <EmployeeCardMenu />
    </div>
  );
}
 