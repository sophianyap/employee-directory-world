import { useState } from 'react';
import accountIcon from '../assets/account_circle.png';
import type { Employee } from '../types';
import { departmentColors } from '../constants';
import { emptyForm } from '../utils';

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
          <div className="bg-white rounded-[20px] px-7 py-6 w-[360px] shadow-[0_8px_24px_rgba(0,0,0,0.15)] font-['Geologica']">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[1.05rem] font-bold text-[#0f172a] m-0">Add New Employee</h3>
              <button className="bg-transparent border-none text-[#8a8a8a] font-bold text-lg cursor-pointer hover:text-[#0b2540]">
                ...
              </button>
            </div>

            {/* Avatar + fields */}
            <div className="flex items-start gap-4">
              <img
                src={accountIcon}
                alt="New employee avatar"
                className="w-16 h-16 rounded-full object-cover shrink-0"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <p className="text-[#8a8a8a] text-[0.65rem] font-semibold tracking-wide mb-0.5">
                      FULL NAME
                    </p>
                    <input
                      className="w-full font-['Geologica'] border-none bg-transparent border-b border-[#eee] text-[15px] font-bold py-1 outline-none text-black box-border"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex items-end justify-between gap-2 mt-2">
                  <div className="flex-1">
                    <p className="text-[#8a8a8a] text-[0.65rem] font-semibold tracking-wide mb-0.5">
                      POSITION
                    </p>
                    <input
                      className="w-full font-['Geologica'] border-none bg-transparent border-b border-[#eee] text-[13px] font-normal py-1 outline-none text-black box-border"
                      value={form.role}
                      onChange={(e) => setForm({ ...form, role: e.target.value })}
                    />
                  </div>

                  <select
                    className="shrink-0 font-['Geologica'] px-2.5 py-1 rounded-full border-none text-[11px] font-semibold outline-none"
                    style={{
                      backgroundColor: departmentColors[form.department]?.bg,
                      color: departmentColors[form.department]?.color,
                    }}
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
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="mt-5 border-t border-[#0b2540] pt-3">
              <p className="text-[#8a8a8a] text-xs font-semibold tracking-wide mb-2">SKILLS</p>

              <ul className="p-0 m-0 mb-2">
                {form.skills.map((skill, i) => (
                  <li
                    key={i}
                    className="list-none font-bold text-[#0b2540] text-sm border-b border-[#eee] py-1"
                  >
                    {skill}
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-2">
                <input
                  className="flex-1 border-none bg-transparent text-[#8a8a8a] text-sm py-1 outline-none placeholder:text-[#8a8a8a]"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addSkill(skillInput)}
                  placeholder="+ add new skill"
                />
                <button
                  className="border-none bg-transparent text-[#8a8a8a] text-[13px] cursor-pointer hover:text-[#0b2540]"
                  onClick={() => addSkill(skillInput)}
                >
                  Add
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-5">
              <button
                className="flex-1 text-white px-4 py-2 bg-[#0b2540] border-none rounded-[20px] text-sm font-['Geologica'] font-semibold hover:bg-[#0f2f52] transition-colors"
                onClick={handleSubmit}
              >
                Save
              </button>
              <button
                className="flex-1 text-[#777676] px-4 py-2 bg-white border border-[#d1d5db] rounded-[20px] text-sm font-['Geologica'] font-normal hover:bg-[#f3f4f6] transition-colors"
                onClick={closePopup}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}