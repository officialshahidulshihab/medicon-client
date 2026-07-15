import MonthlyPerformanceChart from "./MonthlyPerformanceChart";
import AppointmentsBySpecialty from "./AppointmentsBySpecialty";

type Props = { doctorId: string };

const ChartsRow = ({ doctorId }: Props) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <div className="lg:col-span-2">
        
        <MonthlyPerformanceChart doctorId={doctorId} />
      </div>
      <div className="lg:col-span-1">
        <AppointmentsBySpecialty />
      </div>
    </div>
  );
};

export default ChartsRow;