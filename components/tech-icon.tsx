interface TechIconProps {
  icon: React.ReactNode;
  name: string;
}

export default function TechIcon({ icon, name }: TechIconProps) {
  return (
    <div className="flex items-center space-x-2 text-cyan-400">
      {icon}
      <span className="font-medium">{name}</span>
    </div>
  );
}