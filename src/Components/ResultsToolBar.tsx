"use client";
 
import { FiGrid, FiList } from "react-icons/fi";
import DropDown from "./DropDown";

 
const SORT_OPTIONS = ["Rating", "Experience", "Fee: Low to High", "Fee: High to Low"];
 
type ViewMode = "grid" | "list";
 
type Props = {
  count: number;
  sortBy: string;
  setSortBy: (v: string) => void;
  viewMode: ViewMode;
  setViewMode: (v: ViewMode) => void;
};
const ResultsToolBar = ({ count, sortBy, setSortBy, viewMode, setViewMode }: Props) => {
    return (
         <div className="flex items-center justify-between mb-6">
      <p className="text-sm text-gray-400">
        <span className="text-white font-semibold">{count}</span> doctors found
      </p>
 
      <div className="flex items-center gap-3">
        <DropDown
          label="Sort"
          options={SORT_OPTIONS}
          value={sortBy}
          onChange={setSortBy}
        />
 
        {/* Grid / List toggle */}
        <div className="flex items-center bg-[#131b2e] border border-white/10 rounded-xl p-1 gap-0.5">
          <button
            onClick={() => setViewMode("grid")}
            aria-label="Grid view"
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              viewMode === "grid"
                ? "bg-cyan-500/20 text-cyan-400"
                : "text-gray-500 hover:text-white"
            }`}
          >
            <FiGrid />
          </button>
          <button
            onClick={() => setViewMode("list")}
            aria-label="List view"
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              viewMode === "list"
                ? "bg-cyan-500/20 text-cyan-400"
                : "text-gray-500 hover:text-white"
            }`}
          >
            <FiList />
          </button>
        </div>
      </div>
    </div>
    );
};

export default ResultsToolBar;