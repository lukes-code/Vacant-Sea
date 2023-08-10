import JobCard from "@/components/jobCard";
import { useJobsContext } from "@/context/jobs";

const Listings = () => {
  const { likedJobs, dislikedJobs } = useJobsContext();

  return (
    <main className={mainStyle}>
      <JobCard />
      <div className={jobStatusStyle}>
        <p>{likedJobs.length} liked</p>
        <p>{dislikedJobs.length} disliked</p>
      </div>
    </main>
  );
};

const jobStatusStyle = "flex my-4 space-x-4";

const mainStyle =
  "flex flex-col items-center justify-center min-h-screen p-4 dark:text-white text-black";

export default Listings;
