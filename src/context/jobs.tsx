import React, { createContext, useContext, useState } from "react";
import { Job } from "./contentful";

type JobsContextType = {
  likedJobs: Job[];
  dislikedJobs: Job[];
  addLikedJob: (job: Job) => void;
  addDislikedJob: (job: Job) => void;
};

const JobsContext = createContext<JobsContextType | undefined>(undefined);

export const useJobsContext = () => {
  const context = useContext(JobsContext);
  if (!context)
    throw new Error("useJobsContext must be used within a JobsProvider");
  return context;
};

type JobsProviderProps = {
  children: React.ReactNode;
};

export const JobsProvider: React.FC<JobsProviderProps> = ({ children }) => {
  const [likedJobs, setLikedJobs] = useState<Job[]>([]);
  const [dislikedJobs, setDislikedJobs] = useState<Job[]>([]);

  const addLikedJob = (job: Job) => {
    setLikedJobs([...likedJobs, job]);
  };

  const addDislikedJob = (job: Job) => {
    setDislikedJobs([...dislikedJobs, job]);
  };

  const value: JobsContextType = {
    likedJobs,
    dislikedJobs,
    addLikedJob,
    addDislikedJob,
  };

  return <JobsContext.Provider value={value}>{children}</JobsContext.Provider>;
};
