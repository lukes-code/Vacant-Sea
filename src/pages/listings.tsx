import JobCard from "@/components/jobCard";
import StatCard from "@/components/statCard";
import { useContentfulContext } from "@/context/contentful";
import { useJobsContext } from "@/context/jobs";

const Listings = () => {
  const { likedJobs, dislikedJobs } = useJobsContext();
  const { total } = useContentfulContext();

  return (
    <main className={mainStyle}>
      <JobCard />
      <div className={jobStatusStyle}>
        <StatCard primary={total} secondary="Jobs" />
        <StatCard primary={likedJobs.length} secondary="Liked" />
        <StatCard primary={dislikedJobs.length} secondary="Disliked" />
      </div>
    </main>
  );
};

const jobStatusStyle =
  "hidden desktop:flex my-4 space-x-4 absolute bottom-0 left-5";

const mainStyle =
  "flex flex-col items-center justify-center min-h-[95vh] p-4 dark:text-white text-black";

export default Listings;
