import { useContentfulContext } from "@/context/contentful";
import { useJobsContext } from "@/context/jobs";
import Image from "next/image";
import React, { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import CardContent from "./cardContent";
import Spinner from "./spinner";
import { motion } from "framer-motion";

const JobCard: React.FC = () => {
  const { jobs, filteredJobs, isLoading } = useContentfulContext();
  const {
    likedJobs,
    dislikedJobs,
    selectedTechnology,
    shouldExitLeft,
    shouldExitRight,
    setLikedJobs,
    setDislikedJobs,
  } = useJobsContext();

  const [goBack, setGoBack] = useState(false);

  const currentJobs = filteredJobs.length ? filteredJobs : jobs;

  if (isLoading) return <Spinner />;

  if (!jobs && !likedJobs && !dislikedJobs) return <p>No jobs...</p>;

  const resetPreferences = () => {
    localStorage.removeItem("likedJobs");
    localStorage.removeItem("dislikedJobs");
    setLikedJobs([]);
    setDislikedJobs([]);
    window.location.reload();
  };

  const variants = {
    escapeLeft: {
      opacity: 0,
      x: [0, -1000, 0],
      y: [0, -300, 500],
      rotate: [0, -30, 0],
      scale: [1, 0.6, 1],
      transition: { duration: 0.5, opacity: 0.1 },
    },
    escapeRight: {
      opacity: 0,
      x: [0, 1000, 0],
      y: [0, -300, 500],
      rotate: [0, 30, 0],
      scale: [1, 0.6, 1],
      transition: { duration: 0.5, opacity: 0.1 },
    },
    default: {
      opacity: 1,
      x: 0,
      y: 0,
    },
  };

  return filteredJobs.length > 0 || (jobs.length > 0 && !selectedTechnology) ? (
    <motion.section
      initial={{ opacity: 0, y: 500 }}
      animate={
        shouldExitLeft
          ? "escapeLeft"
          : shouldExitRight
          ? "escapeRight"
          : "default"
      }
      variants={variants}
      transition={{ ease: "easeOut", duration: 0.2 }}
      className="relative rounded-lg desktop:w-[400px] w-[335px] desktop:h-[595px] h-[550px] p-4 mx-6 dark:bg-slate-800 shadow-[0_0_20px_5px_rgba(0,0,0,0.1)]"
    >
      <Image
        src={currentJobs[0]?.backgroundImage.url}
        alt="company image"
        className="rounded-md shadow-[0_5px_60px_-65px_rgba(0,0,0,0.3)] h-[240px]"
        height={100}
        width={400}
      />
      <Image
        src={currentJobs[0]?.companyLogo.url}
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
    </motion.section>
  ) : (
    <>
      <p className="max-w-sm text-center">
        There are no more jobs right now, please check back later or click to
        reset your matches
      </p>
      <button
        onClick={resetPreferences}
        className="py-2 px-4 rounded bg-lightBlue text-white m-2"
      >
        Reset
      </button>
    </>
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
