import { useContentfulContext } from "@/context/contentful";
import { useJobsContext } from "@/context/jobs";
import Image from "next/image";
import React from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import CardContent from "./cardContent";
import Spinner from "./spinner";

const JobCard: React.FC = () => {
  const { jobs, isLoading } = useContentfulContext();
  const { likedJobs, dislikedJobs } = useJobsContext();

  const [goBack, setGoBack] = React.useState(false);

  if (isLoading) return <Spinner />;

  if (!jobs && !likedJobs && !dislikedJobs) return <p>No jobs...</p>;

  return jobs.length > 0 ? (
    <section className="relative rounded-lg desktop:w-[400px] w-[335px] desktop:h-[595px] h-[550px] p-4 mx-6 dark:bg-slate-800 shadow-[0_0_20px_5px_rgba(0,0,0,0.1)]">
      <Image
        src={jobs[0]?.backgroundImage.url}
        alt="company image"
        className="rounded-md shadow-[0_5px_60px_-65px_rgba(0,0,0,0.3)] h-[240px]"
        height={100}
        width={400}
      />
      <Image
        src={jobs[0]?.companyLogo.url}
        alt="company image"
        className="absolute top-2 left-5 h-[65px] w-[65px] mx-auto my-3 bg-white p-1 rounded-[999px]"
        height={150}
        width={150}
      />
      <button
        className={getBackButtonStyle(goBack)}
        onClick={() => setGoBack(!goBack)}
      >
        <ArrowLeftIcon />
      </button>
      <div className="flex justify-center text-lg mt-4 space-x-3">
        <span className={navSpanStyle(true, goBack)} />
        <span className={navSpanStyle(false, goBack)} />
      </div>
      <button
        className={getForwardButtonStyle(goBack)}
        onClick={() => setGoBack(!goBack)}
      >
        <ArrowRightIcon />
      </button>
      <CardContent goBack={goBack} />
    </section>
  ) : (
    <p>No more jobs...</p>
  );
};

const navSpanStyle = (leftIcon?: boolean, goBack?: boolean) => {
  return `${
    (leftIcon && !goBack) || (!leftIcon && goBack)
      ? "dark:border-white border-black"
      : "border-gray-500"
  } border-b-[3px] rounded w-8`;
};

const getBackButtonStyle = (goBack: boolean) => {
  return `${goBack ? "" : "hidden"} ${navStyle} left-[-15px]`;
};

const getForwardButtonStyle = (goBack: boolean) => {
  return `${goBack ? "hidden" : ""} ${navStyle} right-[-15px]`;
};

const navStyle =
  "bg-softYellow p-2 rounded-full absolute desktop:top-[43%] top-[47%] text-black";

export default JobCard;
