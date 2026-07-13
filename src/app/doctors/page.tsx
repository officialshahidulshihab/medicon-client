
import AllDoctorClient from '@/Components/AllDoctorClient';
import { getAllDoctors } from '@/lib/data';


const AllDoctorPage = async() => {
    const doctors = await getAllDoctors()
    return (
        <AllDoctorClient doctors={doctors} />
    );
};

export default AllDoctorPage;