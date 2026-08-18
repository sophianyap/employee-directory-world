import { useState } from 'react';
import './App.css';
import accountIcon from './assets/account_circle.png';
import offlineIcon from './assets/pause.png';
import onlineIcon from './assets/online.png';
import engineeringIcon from './assets/engineering.png';
import designIcon from './assets/design.png';
import qaIcon from './assets/qa.png';
import managementIcon from './assets/management.png';

interface Employee {
  id: string;
  name: string;
  role: string;
  department: "Engineering" | "Design" | "Quality Assurance" | "Management";
  isOnline: boolean;
  skills: string[];
}

export function App() {
  const [employees] = useState<Employee[]>([
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


  return (
    <EmployeeDirectory
      employees={filteredEmployees}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}

    />
  );
}

interface SkillBadgeProps {
  skill: string;
}

function SkillBadge({ skill }: SkillBadgeProps) {
  return <span className="skill-badge">{skill}</span>;
}

interface EmployeeCardProps {
  employee: Employee;
}

function StatusBadge({ isOnline }: { isOnline: boolean }) {
  const statusColor = isOnline ? '#79BD96' : '#B7B7B7';
  const status = isOnline ? 'Online' : 'Offline';
  const statusIcon = isOnline ? onlineIcon : offlineIcon;

  return (
    <span className="status-badge" style={{ backgroundColor: statusColor }}>
      <img src={statusIcon} alt={status} className="status-badge__icon" />
      {status}
    </span>
  );
}

function EmployeeCardMenu() {
  return (
    <div className="employee-card__menu">
      <button className="employee-card__menu-button">...</button>
    </div>
  );
}

const departmentColors: Record<string, { bg: string; color: string; icon: string }> = {
  Engineering: { bg: "#74C465", color: "#00804D", icon: engineeringIcon },
  Design: { bg: "#C7CAFE", color: "#8C69F8", icon: designIcon },
  "Quality Assurance": { bg: "#C8EEFF", color: "#4397D3", icon: qaIcon },
  Management: { bg: "#FBFF8F", color: "#A8BD0F", icon: managementIcon },
};

function MetaInformation({ employee }: EmployeeCardProps) {
  return (
    <div className="meta-information">
      <img className="meta-information__image" src={accountIcon} alt={`${employee.name} avatar`} />
      <div className="meta-information__details">
        <p className="employee-card__id">EMP-{employee.id}</p>
        <h2 className="employee-card__name">{employee.name}</h2>
        <p className="employee-card__role">{employee.role}</p>
        <div
          className="employee-card__department"
          style={{
            backgroundColor: departmentColors[employee.department]?.bg,
            color: departmentColors[employee.department]?.color,
          }}
        >
          <img
            src={departmentColors[employee.department]?.icon}
            alt={`${employee.department} icon`}
            className="employee-card__department-icon"
          />
          <span>{employee.department}</span>
        </div>
              </div>
            </div>
  );
}

function SkillsList({ skills }: { skills: string[] }) {
  return (
    <div className="employee-card__skills-wrapper">
      <p className="employee-card__skills-label">Skills</p>
      <div className="employee-card__skills">
        {skills.map((skill) => (
          <SkillBadge key={skill} skill={skill} />
        ))}
      </div>
    </div>
  );
}

export function EmployeeCardHeader({ employee }: EmployeeCardProps) {
  return (
    <div className="employee-card__header">
      <StatusBadge isOnline={employee.isOnline} />
      <EmployeeCardMenu />
    </div>
  );
}

export function EmployeeCard({ employee }: EmployeeCardProps) {
  return (
    <div className="employee-card">
      <EmployeeCardHeader employee={employee} />
      <MetaInformation employee={employee} />
      <hr className="employee-card__divider" />
      <SkillsList skills={employee.skills} />
    </div>
  );
}

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-bar__input"
        placeholder="Search by name, role, or dept..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      
    </div>
  );
  
}



interface EmployeeDirectoryProps {
  employees: Employee[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function EmployeeDirectory({ employees, searchQuery, onSearchChange }: EmployeeDirectoryProps) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Geologica:wght,CRSV@100..900,0&display=swap"
        rel="stylesheet"
      />

      <div className="employee-directory">
        <div className="employee-directory__header">
          <h1 className="employee-directory__title">Employee Directory</h1>
        </div>
        <div className='filter-section'>
          <SearchBar value={searchQuery} onChange={onSearchChange} />      
        </div>
        <div className="employee-directory__grid">
          {employees.length > 0 ? (
            employees.map((employee) => (
              <EmployeeCard key={employee.id} employee={employee} />
            ))
          ) : (
            <p className="employee-directory__empty">No employees match your search.</p>
          )}
        </div>
      </div>
    </>
  );
}