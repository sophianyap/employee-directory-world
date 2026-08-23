import { useState } from 'react';
import accountIcon from './assets/account_circle.png';
import offlineIcon from './assets/pause.png';
import onlineIcon from './assets/online.png';
import engineeringIcon from './assets/engineering.png';
import designIcon from './assets/design.png';
import qaIcon from './assets/qa.png';
import managementIcon from './assets/management.png';

// NOTE: Add this to your global CSS (or index.html <link> tags) since Tailwind
// utility classes can't load the Google Font itself:
//
// @import url('https://fonts.googleapis.com/css2?family=Geologica:wght,CRSV@100..900,0&display=swap');
//
// Also add to tailwind.config.js:
//   theme: { extend: { fontFamily: { geologica: ['Geologica', 'sans-serif'] } } }
// This file uses font-['Geologica'] arbitrary values so it works even without that config step.

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
      <button
        className="text-[#777676] px-3.5 py-2 bg-white border border-[#d1d5db] rounded-[20px] text-sm w-[260px] max-w-full font-['Geologica'] font-normal hover:text-white hover:bg-[#777676] transition-colors"
        onClick={openPopup}
      >
        + Add Employee
      </button>

      {isOpen && (
        <div className="fixed inset-0 w-screen h-screen bg-black/40 flex items-center justify-center z-[1000]">
          <div className="bg-white rounded-[20px] px-7 py-6 w-[340px] shadow-[0_8px_24px_rgba(0,0,0,0.15)] font-sans">
            <p>New ID: {form.id}</p>

            <p className="text-[#8a8a8a] text-xs font-semibold tracking-wide mt-3 mb-1">NAME</p>
            <input
              className="w-full font-['Geologica'] border-none bg-white border-b border-[#eee] text-[15px] py-1 outline-none text-black box-border"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <p className="text-[#8a8a8a] text-xs font-semibold tracking-wide mt-3 mb-1">POSITION</p>
            <input
              className="w-full font-['Geologica'] border-none bg-white border-b border-[#eee] text-[15px] py-1 outline-none text-black box-border"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            />

            <p className="text-[#8a8a8a] text-xs font-semibold tracking-wide mt-3 mb-1">DEPARTMENT</p>
            <select
              className="font-['Geologica'] mt-2 px-3 py-1.5 rounded-[20px] border-none bg-[#f0f1f1] text-[#252525] font-semibold text-[13px]"
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

            <div className="mt-5 border-t-2 border-[#0b2540] pt-3">
              <p className="text-[#8a8a8a] text-xs font-semibold tracking-wide mt-3 mb-1">SKILLS</p>
              <input
                className="border-none bg-white text-black border-b border-[#eee] text-sm py-1 outline-none mr-2"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                placeholder="Enter a skill"
              />
              <button
                className="border-none bg-transparent text-[#8a8a8a] text-[13px] cursor-pointer hover:text-[#0b2540]"
                onClick={() => addSkill(skillInput)}
              >
                Add
              </button>
              <ul className="list-disc mt-2 ml-[18px] p-0">
                {form.skills.map((skill, i) => (
                  <li key={i} className="font-semibold text-[#0b2540] text-sm mb-1">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            <button
              className="text-[#777676] px-[5px] py-[5px] bg-white border border-[#d1d5db] rounded-[20px] text-sm w-[100px] max-w-full font-['Geologica'] font-normal hover:text-white hover:bg-[#777676] transition-colors mt-4 mr-2"
              onClick={handleSubmit}
            >
              Save
            </button>
            <button
              className="text-[#777676] px-[5px] py-[5px] bg-white border border-[#d1d5db] rounded-[20px] text-sm w-[100px] max-w-full font-['Geologica'] font-normal hover:text-white hover:bg-[#777676] transition-colors mt-4"
              onClick={closePopup}
            >
              Cancel
            </button>
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
  return (
    <span className="bg-[#001F3E] text-white px-2.5 py-0 rounded-full text-[0.7rem]">
      {skill}
    </span>
  );
}

interface EmployeeCardProps {
  employee: Employee;
}

function StatusBadge({ isOnline }: { isOnline: boolean }) {
  const statusColor = isOnline ? '#79BD96' : '#B7B7B7';
  const status = isOnline ? 'Online' : 'Offline';
  const statusIcon = isOnline ? onlineIcon : offlineIcon;

  return (
    <span
      className="inline-flex items-center gap-1.5 text-white px-3 py-1 rounded-full text-xs font-semibold hover:opacity-80 transition-opacity"
      style={{ backgroundColor: statusColor }}
    >
      <img src={statusIcon} alt={status} className="w-3.5 h-3.5" />
      {status}
    </span>
  );
}

function EmployeeCardMenu() {
  return (
    <div className="text-lg cursor-pointer">
      <button className="bg-white font-bold text-base rounded-full border-none text-black pb-2 hover:bg-[#f3f4f6] hover:text-black transition-colors">
        ...
      </button>
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
    <div className="mb-4 flex flex-row items-start">
      <img
        className="w-[35%] shrink-0 rounded-full object-cover mr-4"
        src={accountIcon}
        alt={`${employee.name} avatar`}
      />
      <div className="w-auto flex-1">
        <p className="text-left text-[0.7rem] text-[#9ca3af] m-0">EMP-{employee.id}</p>
        <h2 className="text-left text-[1.1rem] font-bold text-[#0f172a]">{employee.name}</h2>
        <p className="text-left text-[0.85rem] text-[#6b7280]">{employee.role}</p>
        <div
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[20px] text-[0.85rem] font-semibold mb-[10px]"
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

function SkillsList({ skills }: { skills: string[] }) {
  return (
    <div className="text-left flex flex-row gap-4">
      <p className="font-bold text-[0.85rem] text-[#0f172a]">Skills</p>
      <div className="flex flex-wrap gap-1.5">
        {skills.map((skill) => (
          <SkillBadge key={skill} skill={skill} />
        ))}
      </div>
    </div>
  );
}

export function EmployeeCardHeader({ employee }: EmployeeCardProps) {
  return (
    <div className="flex justify-between items-center mb-4">
      <StatusBadge isOnline={employee.isOnline} />
      <EmployeeCardMenu />
    </div>
  );
}

export function EmployeeCard({ employee }: EmployeeCardProps) {
  return (
    <div className="bg-white rounded-2xl px-8 py-6 relative font-['Geologica'] font-bold">
      <EmployeeCardHeader employee={employee} />
      <MetaInformation employee={employee} />
      <hr className="border-none border-t-2 border-[#0f172a] w-full my-4" />
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
    <div className="flex gap-2 ml-8">
      <input
        type="text"
        className="text-[#777676] px-3.5 py-2 bg-white border border-[#d1d5db] rounded-[20px] text-sm w-[260px] max-w-full font-['Geologica'] font-normal"
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

      <div className="font-['Geologica'] font-bold w-full min-h-screen bg-[#f3f4f6]">
        <div className="flex justify-between items-center flex-wrap gap-4 p-4">
          <h1 className="text-left text-[2rem] font-bold m-4 text-[#0f172a] font-['Geologica']">
            Employee Directory
          </h1>
        </div>
        <div className="gap-4 w-full flex flex-row">
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
    </>
  );
}