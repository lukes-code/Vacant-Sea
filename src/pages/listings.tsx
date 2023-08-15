import React from "react";
import JobCard from "@/components/jobCard";
import StatCard from "@/components/statCard";
import { useContentfulContext } from "@/context/contentful";
import { useJobsContext } from "@/context/jobs";
import Filter from "@/components/filter";

const Listings = () => {
  const { likedJobs, dislikedJobs } = useJobsContext();
  const { total, filteredJobs } = useContentfulContext();

  return (
    <main className="flex flex-col items-center justify-center min-h-[95vh] p-4 dark:text-white text-black">
      <JobCard />
      <div className="flex justify-between">
        <div className="hidden desktop:flex my-4 space-x-4 absolute bottom-7 left-8 items-center">
          <p>Filter</p>
          <Filter />
        </div>
        <div className="hidden desktop:flex my-4 space-x-4 absolute bottom-0 right-5">
          <StatCard primary={total} secondary="Total Jobs" />
          {filteredJobs.length !== total && (
            <StatCard primary={filteredJobs.length} secondary="Filtered Jobs" />
          )}
          <StatCard primary={likedJobs.length} secondary="Liked" />
          <StatCard primary={dislikedJobs.length} secondary="Disliked" />
        </div>
      </div>
    </main>
  );
};

export default Listings;
