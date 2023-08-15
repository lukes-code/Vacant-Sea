import { useContentfulContext } from "@/context/contentful";
import { useEffect, useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { HamburgerMenuIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useJobsContext } from "@/context/jobs";

const Filter = () => {
  const { jobs, setFilteredJobs } = useContentfulContext();
  const { selectedTechnology, setSelectedTechnology } = useJobsContext();

  const availableTechnologies = Array.from(
    new Set(jobs.flatMap((job) => job.technologies))
  );

  useEffect(() => {
    if (typeof localStorage === "undefined") {
      return; // Do not use localStorage on the server
    }

    const likedJobs = JSON.parse(localStorage.getItem("likedJobs") || "[]");
    const dislikedJobs = JSON.parse(
      localStorage.getItem("dislikedJobs") || "[]"
    );

    const filteredJobs = jobs.filter(
      (job) =>
        !likedJobs.includes(job.id) &&
        !dislikedJobs.includes(job.id) &&
        (selectedTechnology === "" ||
          job.technologies.includes(selectedTechnology))
    );
    setFilteredJobs(filteredJobs);
  }, [selectedTechnology]);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="rounded-full w-[35px] h-[35px] inline-flex items-center justify-center text-lightBlue bg-white shadow-[0_2px_10px] shadow-blackA7 outline-none hover:bg-white focus:shadow-[0_0_0_2px] focus:shadow-black"
          aria-label="Customise options"
        >
          <HamburgerMenuIcon />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}
        >
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger className="group text-[13px] leading-none text-lightBlue rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[state=open]:bg-blue data-[state=open]:text-lightBlue data-[disabled]:text-lightBlue data-[disabled]:pointer-events-none data-[highlighted]:bg-lightBlue data-[highlighted]:text-white data-[highlighted]:data-[state=open]:bg-lightBlue data-[highlighted]:data-[state=open]:text-white">
              Technologies
              <div className="ml-auto pl-[20px] text-lightBlue group-data-[highlighted]:text-white group-data-[disabled]:text-white">
                <ChevronRightIcon />
              </div>
            </DropdownMenu.SubTrigger>
            <DropdownMenu.Portal>
              <DropdownMenu.SubContent
                className="min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                sideOffset={2}
                alignOffset={-5}
              >
                {availableTechnologies.map((tech) => (
                  <DropdownMenu.Item
                    onClick={() => setSelectedTechnology(tech)}
                    key={tech}
                    className="group text-[13px] leading-none text-lightBlue rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-white data-[disabled]:pointer-events-none data-[highlighted]:bg-lightBlue data-[highlighted]:text-white"
                  >
                    {tech}
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.SubContent>
            </DropdownMenu.Portal>
          </DropdownMenu.Sub>
          <DropdownMenu.Arrow className="fill-white" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default Filter;
