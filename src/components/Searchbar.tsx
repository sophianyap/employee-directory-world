import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="flex gap-2 ml-8">
      <div className="relative w-[260px] max-w-full">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9ca3af]" />
        <input
          type="text"
          className="w-full text-[#777676] pl-10 pr-3.5 py-2 bg-white border border-[#d1d5db] rounded-[20px] text-sm font-['Geologica'] font-normal outline-none"
          placeholder="Search by name, role, or dept..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}