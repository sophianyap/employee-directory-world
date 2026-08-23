import { SkillBadge } from './Skillbadge';

interface SkillsListProps {
  skills: string[];
}

export function SkillsList({ skills }: SkillsListProps) {
  return (
    <div className="text-left flex flex-row gap-4 items-start">
      <p className="font-bold text-[0.85rem] text-[#0f172a] m-0 pt-1">Skills</p>
      <div className="flex flex-wrap gap-1.5">
        {skills.map((skill) => (
          <SkillBadge key={skill} skill={skill} />
        ))}
      </div>
    </div>
  );
}