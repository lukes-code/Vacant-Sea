import { useContentfulContext } from "@/context/contentful";
import { useJobsContext } from "@/context/jobs";
import * as Tabs from "@radix-ui/react-tabs";
import React from "react";

const JobCard: React.FC = () => {
  const { jobs, setJobs, isLoading } = useContentfulContext();
  const { addLikedJob, addDislikedJob, likedJobs, dislikedJobs } =
    useJobsContext();

  //Loading set by the gql handler
  if (isLoading) {
    return <p>Loading...</p>;
  }

  //Handle when the job is liked / disliked
  const handleLike = (isLiked: boolean) => {
    if (jobs.length > 0) {
      isLiked ? addLikedJob(jobs[0]) : addDislikedJob(jobs[0]);

      setJobs(jobs.slice(1));
    }
  };

  //Return if no jobs are found to begin with
  if (!jobs && !likedJobs && !dislikedJobs) return <p>No jobs...</p>;

  const card = (
    <Tabs.Root className={rootStyle} defaultValue="tab1">
      <Tabs.List className={listStyle} aria-label="Manage your account">
        <Tabs.Trigger className={triggerStyle} value="tab1">
          Job
        </Tabs.Trigger>
        <Tabs.Trigger className={triggerStyle} value="tab2">
          Spec
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content className={contentStyle} value="tab1">
        <p>{jobs[0]?.jobTitle}</p>
        <div className={buttonWrapperStyle}>
          <button
            onClick={() => handleLike(true)}
            className={buttonStyle(true)}
          >
            Like
          </button>
          <button
            onClick={() => handleLike(false)}
            className={buttonStyle(false)}
          >
            Dislike
          </button>
        </div>
      </Tabs.Content>
      <Tabs.Content className={contentStyle} value="tab2">
        <p>Content in second tab</p>
      </Tabs.Content>
    </Tabs.Root>
  );

  //Returns jobs if set
  return jobs.length > 0 ? (
    card
  ) : (
    //Returns no more jobs after viewing them all (setting liked/disliked)
    <p>No more jobs...</p>
  );
};

//Sets default button style as well as dynamic colours for liked/disliked
const buttonStyle = (isLiked: boolean) => {
  return `${isLiked ? "bg-blue-500" : "bg-red-500"} text-white p-2 rounded m-2`;
};

const rootStyle = "flex flex-col w-[300px] shadow-[0_2px_10px]shadow-blackA4";

const listStyle = "shrink-0 flex ";

const triggerStyle =
  "dark:bg-gray-900 bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-violet11 data-[state=active]:text-violet11 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] dark:data-[state=active]:focus:shadow-white data-[state=active]:focus:shadow-black outline-none cursor-default";

const contentStyle =
  "min-h-[400px] grow p-5 dark:bg-gray-900 dark:border-white border border-gray-500 bg-white dark:text-white text-black rounded-b-md outline-none focus:shadow-[0_0_0_2px] focus:shadow-black";

const buttonWrapperStyle = "flex flex-col";

export default JobCard;
