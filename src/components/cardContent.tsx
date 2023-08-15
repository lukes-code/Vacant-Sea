import { useContentfulContext } from "@/context/contentful";
import ActionButtons, { actionStatus } from "./actionButtons";
import { useJobsContext } from "@/context/jobs";
import { SewingPinIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import fishingSvg from "../images/fishing.svg";
import Pill from "./pill";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useEffect } from "react";

type Props = {
  goBack: boolean;
};

const CardContent = (props: Props) => {
  const { goBack } = props;

  const { jobs, setJobs } = useContentfulContext();
  const { addLikedJob, addDislikedJob } = useJobsContext();

  const likedJobs = JSON.parse(localStorage.getItem("likedJobs") || "[]");
  const dislikedJobs = JSON.parse(localStorage.getItem("dislikedJobs") || "[]");

  useEffect(() => {
    // Filter out jobs with IDs present in likedJobs or dislikedJobs localstorage
    const filteredJobs = jobs.filter(
      (job) => !likedJobs.includes(job.id) && !dislikedJobs.includes(job.id)
    );
    setJobs(filteredJobs);
  }, []);

  const handleLike = (e: React.ChangeEvent<HTMLButtonElement>) => {
    const isLiked = e.target.value === actionStatus.LIKE;
    if (jobs.length > 0) {
      const jobId = jobs[0].id;

      if (!likedJobs.includes(jobId) && !dislikedJobs.includes(jobId)) {
        if (isLiked) {
          likedJobs.push(jobId);
          localStorage.setItem("likedJobs", JSON.stringify(likedJobs));
        } else {
          dislikedJobs.push(jobId);
          localStorage.setItem("dislikedJobs", JSON.stringify(dislikedJobs));
        }
      }

      isLiked ? addLikedJob(jobs[0].id) : addDislikedJob(jobs[0].id);
      setJobs(jobs.slice(1));
    }
  };

  const pills = jobs[0]?.technologies.map((tech) => (
    <Pill key={tech}>{tech}</Pill>
  ));

  const firstPage = (
    <>
      <h2 className="font-medium text-xl text-center my-1 dark:text-gray-300 text-black mt-3">
        {jobs[0]?.title}
      </h2>
      <div className="flex justify-between desktop:w-[75%] w-[85%] m-auto text-sm">
        <p className="flex items-center text-softYellow italic">
          <SewingPinIcon />
          {jobs[0]?.location}
        </p>
        <p className="dark:text-gray-300 text-gray-700 italic">
          {jobs[0]?.companySize}
        </p>
      </div>
      <div className="rounded-lg bg-lightBlue dark:text-gray-300 text-white py-3 px-4 desktop:my-12 my-6 flex relative">
        <div className="w-[75%] leading-[20px] text-sm">
          <p className="italic text-sm font-normal">hook</p>
          <p>"{jobs[0]?.hookline}"</p>
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
          <h3 className="font-medium mt-1 underline">{jobs[0]?.companyName}</h3>
          <ReactMarkdown>{jobs[0]?.about}</ReactMarkdown>
          <p>Salary {jobs[0]?.salary}</p>
        </div>
      </div>
    </>
  );

  return !goBack ? firstPage : secondPage;
};

export default CardContent;
