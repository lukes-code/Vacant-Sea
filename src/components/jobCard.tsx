import { useContentfulContext } from "@/context/contentful";
import { useJobsContext } from "@/context/jobs";
import Image from "next/image";
import React from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import CardContent from "./cardContent";

const JobCard: React.FC = () => {
  const { jobs, isLoading } = useContentfulContext();
  const { likedJobs, dislikedJobs } = useJobsContext();

  const [goBack, setGoBack] = React.useState(false);

  if (isLoading) return <p>Loading...</p>;

  if (!jobs && !likedJobs && !dislikedJobs) return <p>No jobs...</p>;

  return jobs.length > 0 ? (
    <section className={cardStyle}>
      <Image
        src={jobs[0]?.backgroundImage.url}
        alt="company image"
        className={backgroundImageStyle}
        height={100}
        width={400}
      />
      <Image
        src={jobs[0]?.companyLogo.url}
        alt="company image"
        className={companyLogoStyle}
        height={150}
        width={150}
      />
      <button
        className={getBackButtonStyle(goBack)}
        onClick={() => setGoBack(!goBack)}
      >
        <ArrowLeftIcon />
      </button>
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

const companyLogoStyle =
  "absolute top-2 left-5 h-[65px] w-[65px] mx-auto my-3 bg-white p-1 rounded-[999px]";

const cardStyle =
  "relative rounded-lg w-[400px] h-[595px] p-4 dark:shadow-gray-800/50 shadow-[0_0_20px_5px_rgba(0,0,0,0.1)]";

const backgroundImageStyle =
  "rounded-md shadow-[0_5px_60px_-65px_rgba(0,0,0,0.3)] h-[240px]";

const getBackButtonStyle = (goBack: boolean) => {
  return `${goBack ? "" : "hidden"} ${navStyle} left-[-15px]`;
};

const getForwardButtonStyle = (goBack: boolean) => {
  return `${goBack ? "hidden" : ""} ${navStyle} right-[-15px]`;
};

const navStyle = "bg-gray-300 dark:bg-gray-800 p-2 rounded-full absolute";

export default JobCard;
