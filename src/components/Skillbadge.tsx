interface SkillBadgeProps {
  skill: string;
}

export function SkillBadge({ skill }: SkillBadgeProps) {
  return (
    <span className="bg-[#001F3E] text-white px-2.5 py-0 rounded-full text-[0.7rem]">
      {skill}
    </span>
  );
}