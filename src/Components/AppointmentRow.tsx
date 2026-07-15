type Props = {
  id: string;
  patient: string;
  date: string;
  time: string;
  status: "Confirmed" | "Pending" | "Cancelled";
};


const statusStyles = {
  Confirmed: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
  Pending:   "bg-yellow-500/20  text-yellow-400  border border-yellow-500/30",
  Cancelled: "bg-red-500/20     text-red-400     border border-red-500/30",
};
const AppointmentRow = ({ id, patient, date, time, status }: Props) => {
    return (
        <tr className="border-t border-white/5 hover:bg-white/5 transition-colors">

      <td className="py-4 px-4 text-cyan-400 text-sm font-medium">
        #{id}
      </td>

      <td className="py-4 px-4 text-white font-semibold text-sm">
        {patient}
      </td>

      
      <td className="py-4 px-4 text-gray-400 text-sm">
        {date}
      </td>

  
      <td className="py-4 px-4 text-gray-400 text-sm">
        {time}
      </td>

      <td className="py-4 px-4">
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusStyles[status]}`}>
          {status}
        </span>
      </td>

    </tr>
    );
};

export default AppointmentRow;