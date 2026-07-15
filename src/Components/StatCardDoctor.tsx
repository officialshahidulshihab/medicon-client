import { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  iconBg: string;
  value: string;
  label: string;
  badge: string;
};
const StatCardDoctor = ({ icon, iconBg, value, label, badge }: Props) => {
    return (
         <div className="bg-[#0d1526] border border-white/10 rounded-2xl p-5">

      
      <div className="flex items-center justify-between mb-4">
        <div className={`${iconBg} w-10 h-10 rounded-xl flex items-center justify-center text-lg`}>
          {icon}
        </div>
        <span className="text-xs font-semibold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded-full">
          {badge}
        </span>
      </div>

      
      <p className="text-3xl font-bold text-white mb-1">{value}</p>

      <p className="text-gray-400 text-sm">{label}</p>

    </div>
    );
};

export default StatCardDoctor;