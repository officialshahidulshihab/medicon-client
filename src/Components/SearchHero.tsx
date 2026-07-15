"use client";
 
import { FiSearch } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import DropDown from "./DropDown";

 
const DIVISIONS = [
  "All Divisions",
  "Dhaka",
  "Chattogram",
  "Sylhet",
  "Rajshahi",
  "Khulna",
  "Barishal",
  "Rangpur",
  "Mymensingh",
];
 
type Props = {
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  selectedDivision: string;
  setSelectedDivision: (v: string) => void;
};
const SearchHero = ({
  searchQuery,
  setSearchQuery,
  selectedDivision,
  setSelectedDivision,
}: Props) => {
    return (
        <section className="bg-[#0d1526] border-b border-white/5 px-6 py-12 md:px-12 lg:px-20">
      <h1 className="text-white font-extrabold text-3xl md:text-4xl mb-2 tracking-tight">
        Find a Doctor
      </h1>
      <p className="text-gray-400 text-sm mb-8">
        Search from 500+ verified specialist doctors across Bangladesh.
      </p>
 
      <div className="flex flex-col sm:flex-row gap-3 max-w-3xl">
       
        <div className="relative flex-1">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search by name or specialty..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#131b2e] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/60 transition-colors"
          />
        </div>
 
       
        <DropDown
          label=""
          options={DIVISIONS}
          value={selectedDivision}
          onChange={setSelectedDivision}
          prefix={<IoLocationOutline className="text-gray-400" />}
        />
      </div>
    </section>
    );
};

export default SearchHero;