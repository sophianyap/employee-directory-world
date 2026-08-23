import { useState } from 'react';
import type { Employee } from './types';
import { EmployeeDirectory } from './components/EmployeeDirectory';

export function App() {
  const [employees, setEmployees] = useState<Employee[]>([
    { id: '001', name: 'Alice Chen', role: 'Frontend Engineer', department: 'Engineering', isOnline: true, skills: ['React', 'TypeScript', 'CSS'] },
    { id: '002', name: 'Marcus Johnson', role: 'Product Designer', department: 'Design', isOnline: false, skills: ['Figma', 'Prototyping', 'UX Research'] },
    { id: '003', name: 'Sarah Lopez', role: 'QA Tester', department: 'Quality Assurance', isOnline: true, skills: ['Cypress', 'Jest', 'Manual'] },
    { id: '004', name: 'David Kim', role: 'Backend Engineer', department: 'Engineering', isOnline: false, skills: ['Node.js', 'Express', 'PostgreSQL'] },
    { id: '005', name: 'Elena Rodriguez', role: 'Project Manager', department: 'Management', isOnline: true, skills: ['Agile', 'Jira', 'Scrum'] },
  ]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEmployees = employees.filter((employee) => {
    const query = searchQuery.toLowerCase();
    return (
      employee.name.toLowerCase().includes(query) ||
      employee.role.toLowerCase().includes(query) ||
      employee.department.toLowerCase().includes(query)
    );
  });

  const addEmployee = (employee: Employee) => {
    setEmployees([...employees, employee]);
  };

  return (
    <EmployeeDirectory
      employees={filteredEmployees}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      allEmployees={employees}
      onAddEmployee={addEmployee}
    />
  );
}

export default App;