import offlineIcon from '../assets/pause.png';
import onlineIcon from '../assets/online.png';

interface StatusBadgeProps {
  isOnline: boolean;
}

export function StatusBadge({ isOnline }: StatusBadgeProps) {
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