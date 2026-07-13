"use client"; 
import { useMemo, useState } from "react";
import DoctorCard from "@/Components/DoctorCard";
import DoctorPagination from "@/Components/DoctorPagination";
import FilterSideBar from "@/Components/FilterSideBar";
import ResultsToolBar from "@/Components/ResultsToolBar";
import SearchHero from "@/Components/SearchHero";
import { Doctor } from "@/lib/data";

const DOCTORS_PER_PAGE = 6;

const AllDoctorClient = ({ doctors }: { doctors: Doctor[] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("All Divisions");


  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties");
  const [maxFee, setMaxFee] = useState(5000);
  const [selectedRating, setSelectedRating] = useState("Any");

  
  const [sortBy, setSortBy] = useState("Rating");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");


  const [currentPage, setCurrentPage] = useState(1);



  const filteredAndSorted = useMemo(() => {
    const minRating =
      selectedRating === "4.8+"
        ? 4.8
        : selectedRating === "4.5+"
          ? 4.5
          : selectedRating === "4+"
            ? 4
            : 0;

    const filtered = doctors.filter((d) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.specialty.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDivision =
        selectedDivision === "All Divisions" || d.location === selectedDivision;

      const matchesSpecialty =
        selectedSpecialty === "All Specialties" ||
        d.specialty === selectedSpecialty;

      const matchesFee = d.consultationFee <= maxFee;
      const matchesRating = d.rating >= minRating;

      return (
        matchesSearch &&
        matchesDivision &&
        matchesSpecialty &&
        matchesFee &&
        matchesRating
      );
    });

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "Experience":
          return b.experience - a.experience;
        case "Fee: Low to High":
          return a.consultationFee - b.consultationFee;
        case "Fee: High to Low":
          return b.consultationFee - a.consultationFee;
        case "Rating":
        default:
          return b.rating - a.rating;
      }
    });
  }, [
    doctors,
    searchQuery,
    selectedDivision,
    selectedSpecialty,
    maxFee,
    selectedRating,
    sortBy,
  ]);

 
  const totalPages = Math.max(
    1,
    Math.ceil(filteredAndSorted.length / DOCTORS_PER_PAGE),
  );

  const paginatedDoctors = filteredAndSorted.slice(
    (currentPage - 1) * DOCTORS_PER_PAGE,
    currentPage * DOCTORS_PER_PAGE,
  );

  
  const handleFilterChange =
    <T,>(setter: (v: T) => void) =>
    (v: T) => {
      setter(v);
      setCurrentPage(1);
    };

  const handleReset = () => {
    setSelectedSpecialty("All Specialties");
    setMaxFee(5000);
    setSelectedRating("Any");
    setCurrentPage(1);
  };

  

  return (
    <div className="min-h-screen bg-[#0a0f1e] font-sans">
      <SearchHero
        searchQuery={searchQuery}
        setSearchQuery={handleFilterChange(setSearchQuery)}
        selectedDivision={selectedDivision}
        setSelectedDivision={handleFilterChange(setSelectedDivision)}
      />

      <div className="px-6 py-8 md:px-12 lg:px-20">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <FilterSideBar
            selectedSpecialty={selectedSpecialty}
            setSelectedSpecialty={handleFilterChange(setSelectedSpecialty)}
            maxFee={maxFee}
            setMaxFee={handleFilterChange(setMaxFee)}
            selectedRating={selectedRating}
            setSelectedRating={handleFilterChange(setSelectedRating)}
            onReset={handleReset}
          />

          <div className="flex-1 min-w-0">
            <ResultsToolBar
              count={filteredAndSorted.length}
              sortBy={sortBy}
              setSortBy={setSortBy}
              viewMode={viewMode}
              setViewMode={setViewMode}
            />

            {paginatedDoctors.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
                    : "flex flex-col gap-4"
                }
              >
                {paginatedDoctors.map((doctor) => (
                  <DoctorCard key={doctor._id} doctor={doctor} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <p className="text-white font-semibold text-lg mb-1">
                  No doctors found
                </p>
                <p className="text-gray-500 text-sm">
                  Try adjusting your filters or search terms.
                </p>
              </div>
            )}

            {paginatedDoctors.length > 0 && (
              <DoctorPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllDoctorClient;
