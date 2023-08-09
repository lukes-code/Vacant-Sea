import { useContentfulContext } from "@/context/contentfulContext";
import { useJobsContext } from "@/context/jobsContext";
import React from "react";

const JobCard: React.FC = () => {
  const { jobs, setJobs, isLoading } = useContentfulContext();
  const { addLikedJob, addDislikedJob, likedJobs, dislikedJobs } = useJobsContext();

  //Loading set by the gql handler
  if (isLoading) {
    return <p>Loading...</p>;
  }

  //Handle when the job is liked / disliked
  const handleLike = (isLiked: boolean) => {
    if (jobs.length > 0) {
      isLiked ?
        addLikedJob(jobs[0]) :
        addDislikedJob(jobs[0]);
        
      setJobs(jobs.slice(1));
    }
  };

  //Return if no jobs are found to begin with
  if (!jobs && !likedJobs && !dislikedJobs) {
    return <p>No jobs...</p>;
  }

  //Returns jobs if set
  return jobs.length > 0 ? (
    <div className={wrapperStyle}>
      <p>{jobs[0]?.jobTitle}</p>
      <div className={buttonWrapperStyle}>
        <button onClick={() => handleLike(true)} className={buttonStyle(true)}>
          Like
        </button>
        <button onClick={() => handleLike(false)} className={buttonStyle(false)}>
          Dislike
        </button>
      </div>
    </div>
  ) : (
    //Returns no more jobs after viewing them all (setting liked/disliked)
    <p>No more jobs...</p>
  );
};

//Sets default button style as well as dynamic colours for liked/disliked
const buttonStyle = (isLiked: boolean) => {
  return `${isLiked ? "bg-blue-500" : "bg-red-500"} text-white p-2 rounded m-2`;
}

const wrapperStyle = "bg-white p-4 rounded text-black block";

const buttonWrapperStyle = "flex flex-col";

export default JobCard;
