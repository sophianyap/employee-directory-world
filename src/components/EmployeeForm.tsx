import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import accountIcon from '../assets/account_circle.png';
import type { Employee } from '../types';
import { departmentColors, emptyForm } from '../types';
import { employeeFormSchema, departmentOptions, type EmployeeFormValues } from '../schemas/employeeFormSchema';

export function EmployeeForm({
  employees,
  onAddEmployee,
}: {
  employees: Employee[];
  onAddEmployee: (employee: Employee) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [skillInput, setSkillInput] = useState('');
 
  const [baseEmployee, setBaseEmployee] = useState<Employee>(() => emptyForm(employees));

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: toFormValues(baseEmployee),
  });

  const skills = watch('skills');
  const department = watch('department');

  const openPopup = () => {
    const next = emptyForm(employees);
    setBaseEmployee(next);
    reset(toFormValues(next));
    setSkillInput('');
    setIsOpen(true);
  };

  const closePopup = () => setIsOpen(false);

  const addSkill = (newSkill: string) => {
    const trimmed = newSkill.trim();
    if (trimmed === '') return;
    setValue('skills', [...skills, trimmed], { shouldValidate: true });
    setSkillInput('');
  };

  const onSubmit = (data: EmployeeFormValues) => {
    onAddEmployee({ ...baseEmployee, ...data });
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
          <form
            className="bg-white rounded-[20px] px-7 py-6 w-[360px] shadow-[0_8px_24px_rgba(0,0,0,0.15)] font-['Geologica']"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[1.05rem] font-bold text-[#0f172a] m-0">Add New Employee</h3>
              <button
                type="button"
                className="bg-transparent border-none text-[#8a8a8a] font-bold text-lg cursor-pointer hover:text-[#0b2540]"
                onClick={closePopup}
              >
                ...
              </button>
            </div>

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
                      {...register('name')}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-[0.65rem] mt-0.5">{errors.name.message}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-end justify-between gap-2 mt-2">
                  <div className="flex-1">
                    <p className="text-[#8a8a8a] text-[0.65rem] font-semibold tracking-wide mb-0.5">
                      POSITION
                    </p>
                    <input
                      className="w-full font-['Geologica'] border-none bg-transparent border-b border-[#eee] text-[13px] font-normal py-1 outline-none text-black box-border"
                      {...register('role')}
                    />
                    {errors.role && (
                      <p className="text-red-500 text-[0.65rem] mt-0.5">{errors.role.message}</p>
                    )}
                  </div>

                  <select
                    className="shrink-0 font-['Geologica'] px-2.5 py-1 rounded-full border-none text-[11px] font-semibold outline-none"
                    style={{
                      backgroundColor: departmentColors[department]?.bg,
                      color: departmentColors[department]?.color,
                    }}
                    {...register('department')}
                  >
                    {departmentOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.department && (
                  <p className="text-red-500 text-[0.65rem] mt-0.5 text-right">
                    {errors.department.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-5 border-t border-[#0b2540] pt-3">
              <p className="text-[#8a8a8a] text-xs font-semibold tracking-wide mb-2">SKILLS</p>

              <ul className="p-0 m-0 mb-2">
                {skills.map((skill, i) => (
                  <li
                    key={`${skill}-${i}`}
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
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addSkill(skillInput);
                    }
                  }}
                  placeholder="+ add new skill"
                />
                <button
                  type="button"
                  className="border-none bg-transparent text-[#8a8a8a] text-[13px] cursor-pointer hover:text-[#0b2540]"
                  onClick={() => addSkill(skillInput)}
                >
                  Add
                </button>
              </div>
              {errors.skills && (
                <p className="text-red-500 text-[0.65rem] mt-0.5">{errors.skills.message}</p>
              )}
            </div>

            <div className="flex gap-2 mt-5">
              <button
                type="submit"
                className="flex-1 text-white px-4 py-2 bg-[#0b2540] border-none rounded-[20px] text-sm font-['Geologica'] font-semibold hover:bg-[#0f2f52] transition-colors"
              >
                Save
              </button>
              <button
                type="button"
                className="flex-1 text-[#777676] px-4 py-2 bg-white border border-[#d1d5db] rounded-[20px] text-sm font-['Geologica'] font-normal hover:bg-[#f3f4f6] transition-colors"
                onClick={closePopup}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

function toFormValues(employee: Employee): EmployeeFormValues {
  return {
    name: employee.name,
    role: employee.role,
    department: employee.department,
    skills: employee.skills,
  };
}