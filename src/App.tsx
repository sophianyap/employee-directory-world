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

const getNextId = (employees: Employee[]): string => {
  if (employees.length === 0) return "001";
  const maxId = Math.max(...employees.map((emp) => Number(emp.id)));
  return String(maxId + 1).padStart(3, "0");
};

const emptyForm = (employees: Employee[]): Employee => ({
  id: getNextId(employees),
  name: "",
  role: "",
  department: "Engineering",
  isOnline: true,
  skills: [],
});



interface EmployeeFormPopUpProps {
  employees: Employee[];
  onAddEmployee: (employee: Employee) => void;
}

export function EmployeeFormPopUp({ employees, onAddEmployee }: EmployeeFormPopUpProps) {
  const [form, setForm] = useState<Employee>(emptyForm(employees));
  const [isOpen, setIsOpen] = useState(false);
  const [skillInput, setSkillInput] = useState("");

  const openPopup = () => {
    setForm(emptyForm(employees));
    setIsOpen(true);
  };

  const closePopup = () => setIsOpen(false);

  const addSkill = (newSkill: string) => {
    if (newSkill.trim() === "") return;
    setForm({ ...form, skills: [...form.skills, newSkill] });
    setSkillInput("");
  };

  const handleSubmit = () => {
    onAddEmployee(form);
    setIsOpen(false);
  };

  return (
    <div>
      <button className="add-newbtn" onClick={openPopup}>+ Add Employee</button>

      {isOpen && (
        <div className="popup-overlay">
          <div className="emp-form-popup">
            <p>New ID: {form.id}</p>

            <p className='form-names-title'>NAME</p>
            <input
              className='new-emp-name'
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <p className='form-names-title'>POSITION</p>
            <input
              className='new-emp-post'
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            />
            <p className='form-names-title'>DEPARTMENT</p>
            <select
              className="department-dropdwn"
              value={form.department}
              onChange={(e) =>
                setForm({ ...form, department: e.target.value as Employee["department"] })
              }
            >
              <option>Engineering</option>
              <option>Design</option>
              <option>Quality Assurance</option>
              <option>Management</option>
            </select>

            <div className='new-skills'>
              <p className='form-names-title'>SKILLS</p>
              <input
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                placeholder="Enter a skill"
              />
              <button className="add-new-skill" onClick={() => addSkill(skillInput)}>
                Add
              </button>
              <ul>
                {form.skills.map((skill, i) => (
                  <li key={i}>{skill}</li>
                ))}
              </ul>
            </div>

            <button className="cardbtn" onClick={handleSubmit}>Save</button>
            <button className="cardbtn" onClick={closePopup}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export function App() {
  const [employees, setEmployees] = useState<Employee[]>([
    { id: '001', name: 'Alice Chen', role: 'Frontend Engineer', department: 'Engineering', isOnline: true, skills: ['React', 'TypeScript', 'CSS'] },
    { id: '002', name: 'Marcus Johnson', role: 'Product Designer', department: 'Design', isOnline: false, skills: ['Figma', 'Prototyping', 'UX Research'] },
    { id: '003', name: 'Sarah Lopez', role: 'QA Tester', department: 'Quality Assurance', isOnline: true, skills: ['Cypress', 'Jest', 'Manual'] },
    { id: '004', name: 'David Kim', role: 'Backend Engineer', department: 'Engineering', isOnline: false, skills: ['Node.js', 'Express', 'PostgreSQL'] },
    { id: "005", name: 'Elena Rodriguez', role: 'Project Manager', department: 'Management', isOnline: true, skills: ['Agile', 'Jira', 'Scrum'] },
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
  allEmployees: Employee[];
  onAddEmployee: (employee: Employee) => void;
}


export function EmployeeDirectory({ employees, searchQuery, onSearchChange, allEmployees, onAddEmployee }: EmployeeDirectoryProps) {
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
          <EmployeeFormPopUp employees={allEmployees} onAddEmployee={onAddEmployee} />        </div>
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