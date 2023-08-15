import { useContentfulContext } from "@/context/contentful";
import ActionButtons, { actionStatus } from "./actionButtons";
import { useJobsContext } from "@/context/jobs";
import { SewingPinIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import fishingSvg from "../images/fishing.svg";
import Pill from "./pill";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useEffect, useState } from "react";

type Props = {
  goBack: boolean;
};

const CardContent = (props: Props) => {
  const { goBack } = props;

  const { jobs, filteredJobs, setFilteredJobs, setJobs } =
    useContentfulContext();
  const { addLikedJob, addDislikedJob } = useJobsContext();

  const likedJobs = JSON.parse(localStorage.getItem("likedJobs") || "[]");
  const dislikedJobs = JSON.parse(localStorage.getItem("dislikedJobs") || "[]");

  const currentJobs = filteredJobs.length ? filteredJobs : jobs;

  useEffect(() => {
    // Filter out jobs with IDs present in likedJobs or dislikedJobs localstorage
    const filteredJobs = jobs.filter(
      (job) => !likedJobs.includes(job.id) && !dislikedJobs.includes(job.id)
    );
    setJobs(filteredJobs);
  }, []);

  const handleLike = (e: React.ChangeEvent<HTMLButtonElement>) => {
    const isLiked = e.target.value === actionStatus.LIKE;
    if (currentJobs.length > 0) {
      const jobId = currentJobs[0].id;

      if (!likedJobs.includes(jobId) && !dislikedJobs.includes(jobId)) {
        if (isLiked) {
          likedJobs.push(jobId);
          localStorage.setItem("likedJobs", JSON.stringify(likedJobs));
        } else {
          dislikedJobs.push(jobId);
          localStorage.setItem("dislikedJobs", JSON.stringify(dislikedJobs));
        }
      }

      isLiked
        ? addLikedJob(currentJobs[0].id)
        : addDislikedJob(currentJobs[0].id);
      filteredJobs.length > 0
        ? setFilteredJobs(filteredJobs.slice(1))
        : setJobs(jobs.slice(1));
    }
  };

  const pills = currentJobs[0]?.technologies.map((tech) => (
    <Pill key={tech}>{tech}</Pill>
  ));

  const firstPage = (
    <>
      <h2 className="font-medium text-xl text-center my-1 dark:text-gray-300 text-black mt-3">
        {currentJobs[0]?.title}
      </h2>
      <div className="flex justify-between desktop:w-[75%] w-[85%] m-auto text-sm">
        <p className="flex items-center text-softYellow italic">
          <SewingPinIcon />
          {currentJobs[0]?.location}
        </p>
        <p className="dark:text-gray-300 text-gray-700 italic">
          {currentJobs[0]?.companySize}
        </p>
      </div>
      <div className="rounded-lg bg-lightBlue dark:text-gray-300 text-white py-3 px-4 desktop:my-12 my-6 flex relative">
        <div className="w-[75%] leading-[20px] text-sm">
          <p className="italic text-sm font-normal">hook</p>
          <p>"{currentJobs[0]?.hookline}"</p>
        </div>
        <div className="absolute right-[-40px] top-[-30px]">
          <Image src={fishingSvg} alt="fishing" height={180} width={180} />
        </div>
      </div>
      <ActionButtons handleLike={handleLike} />
    </>
  );

  const secondPage = (
    <>
      <div className="p-4 flex flex-col space-y-2 desktop:h-[300px] h-[250px] mt-3 overflow-y-scroll">
        <div className="flex flex-wrap">{pills}</div>
        <div className="flex flex-col space-y-">
          <h3 className="font-medium mt-1 underline">
            {currentJobs[0]?.companyName}
          </h3>
          <ReactMarkdown>{currentJobs[0]?.about}</ReactMarkdown>
          <p>Salary {currentJobs[0]?.salary}</p>
        </div>
      </div>
    </>
  );

  return !goBack ? firstPage : secondPage;
};

export default CardContent;
