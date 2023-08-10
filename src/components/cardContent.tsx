import { useContentfulContext } from "@/context/contentful";
import ActionButtons, { actionStatus } from "./actionButtons";
import { useJobsContext } from "@/context/jobs";
import { SewingPinIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import fishingSvg from "../images/fishing.svg";
import Pill from "./pill";

type Props = {
  goBack: boolean;
};

const CardContent = (props: Props) => {
  const { goBack } = props;

  const { jobs, setJobs } = useContentfulContext();
  const { addLikedJob, addDislikedJob } = useJobsContext();

  const handleLike = (e: React.ChangeEvent<HTMLButtonElement>) => {
    const isLiked = e.target.value === actionStatus.LIKE;
    if (jobs.length > 0) {
      isLiked ? addLikedJob(jobs[0]) : addDislikedJob(jobs[0]);
      setJobs(jobs.slice(1));
    }
  };

  console.log(jobs[0]?.technologies);
  const pills = jobs[0]?.technologies.map((tech) => (
    <Pill key={tech}>{tech}</Pill>
  ));

  return !goBack ? (
    <>
      <h2 className={titleStyle}>{jobs[0]?.title}</h2>
      <div className={locationSizeStyle}>
        <p className={locationStyle}>
          <SewingPinIcon />
          {jobs[0]?.location}
        </p>
        <p className={sizeStyle}>{jobs[0]?.companySize}</p>
      </div>
      <div className={hooklineStyle}>
        <div className={hooklineContentStyle}>
          <p className={hooklineTitleStyle}>hook</p>
          <p>"{jobs[0]?.hookline}"</p>
        </div>
        <div className={hooklineImageStyle}>
          <Image src={fishingSvg} alt="fishing" height={180} width={180} />
        </div>
      </div>
      <ActionButtons handleLike={handleLike} />
    </>
  ) : (
    <div className={secondPageStyle}>
      <div className={pillStyle}>{pills}</div>
      <div className={secondPageDivStyle}>
        <h3 className={aboutHeadingStyle}>About Us</h3>
        <p>{jobs[0]?.about}</p>
        <p>Salary {jobs[0]?.salary}</p>
      </div>
    </div>
  );
};

const secondPageDivStyle = "flex flex-col space-y-2";

const pillStyle = "flex space-x-2";

const titleStyle =
  "font-medium text-xl text-center my-1 dark:text-gray-300 text-black mt-6";

const secondPageStyle =
  "p-4 flex flex-col space-y-2 h-[300px] mt-3 overflow-y-scroll";

const aboutHeadingStyle = "font-medium";

const sizeStyle = "dark:text-gray-300 text-gray-700 italic";

const hooklineImageStyle = "absolute right-[-40px] top-[-30px]";

const hooklineStyle =
  "rounded-lg bg-lightBlue dark:text-gray-300 text-white py-3 px-4 my-12 flex relative";

const hooklineTitleStyle = "italic text-sm font-normal";

const hooklineContentStyle = "w-[75%] leading-[20px] text-sm";

const locationSizeStyle = "flex justify-between w-[75%] m-auto text-sm";

const locationStyle = "flex items-center text-softYellow italic";

export default CardContent;
