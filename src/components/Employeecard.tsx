import accountIcon from '../assets/account_circle.png';
import offlineIcon from '../assets/pause.png';
import onlineIcon from '../assets/online.png';
import type { Employee } from '../types';
import { departmentColors } from '../types';

function StatusBadge({ isOnline }: { isOnline: boolean }) {
  const statusColor = isOnline ? '#79BD96' : '#B7B7B7';
  const status = isOnline ? 'Online' : 'Offline';
  const statusIcon = isOnline ? onlineIcon : offlineIcon;

  return (
    <span
      className="inline-flex items-center gap-1.5 text-white px-3 py-1 rounded-full text-xs font-semibold"
      style={{ backgroundColor: statusColor }}
    >
      <img src={statusIcon} alt={status} className="w-3.5 h-3.5" />
      {status}
    </span>
  );
}

function CardMenuButton() {
  return (
    <button className="bg-transparent border-none text-black font-bold text-lg leading-none cursor-pointer px-1 hover:text-[#0b2540]">
      ...
    </button>
  );
}

function MetaInformation({ employee }: { employee: Employee }) {
  return (
    <div className="mb-4 flex flex-row items-start">
      <img
        className="w-16 h-16 shrink-0 rounded-full object-cover mr-4"
        src={accountIcon}
        alt={`${employee.name} avatar`}
      />
      <div className="w-auto flex-1">
        <p className="text-left text-[0.7rem] text-[#9ca3af] m-0">EMP-{employee.id}</p>
        <h2 className="text-left text-[1.1rem] text-[#9ca3af] sfont-bold m-0">{employee.name}</h2>
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

function SkillsList({ skills }: { skills: string[] }) {
  return (
    <div className="text-left flex flex-row gap-4 items-start">
      <p className="font-bold text-[0.85rem] text-[#0f172a] m-0 pt-1">Skills</p>
      <div className="flex flex-wrap gap-1.5">
        {skills.map((skill) => (
          <span key={skill} className="bg-[#001F3E] text-white px-2.5 py-0 rounded-full text-[0.7rem]">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export function EmployeeCard({ employee }: { employee: Employee }) {
  return (
    <div className="bg-white rounded-2xl px-8 py-6 relative font-['Geologica']">
      <div className="flex justify-between items-center mb-4">
        <StatusBadge isOnline={employee.isOnline} />
        <CardMenuButton />
      </div>
      <MetaInformation employee={employee} />
      <hr className="border-none border-t-2 border-[#0f172a] w-full my-4" />
      <SkillsList skills={employee.skills} />
    </div>
  );
}