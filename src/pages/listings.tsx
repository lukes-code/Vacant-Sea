import JobCard from "@/components/jobCard";
import { useJobsContext } from "@/context/jobs";

const Listings = () => {
  const { likedJobs, dislikedJobs } = useJobsContext();

  return (
    <main className={mainStyle}>
      <JobCard />
      <p>{likedJobs.length} liked jobs</p>
      <p>{dislikedJobs.length} disliked jobs</p>
    </main>
  );
};

const mainStyle =
  "flex flex-col items-center justify-center min-h-screen p-4 dark:text-white text-black";

export default Listings;
