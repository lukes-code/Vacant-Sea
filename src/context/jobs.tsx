import React, { createContext, useContext, useState, useEffect } from "react";
import { Job } from "./contentful";

type JobsContextType = {
  likedJobs: number[];
  dislikedJobs: number[];
  addLikedJob: (id: number) => void;
  addDislikedJob: (id: number) => void;
  setLikedJobs: React.Dispatch<React.SetStateAction<number[]>>;
  setDislikedJobs: React.Dispatch<React.SetStateAction<number[]>>;
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
  const [likedJobs, setLikedJobs] = useState<number[]>([]);
  const [dislikedJobs, setDislikedJobs] = useState<number[]>([]);

  const addLikedJob = (id: number) => {
    setLikedJobs([...likedJobs, id]);
  };

  const addDislikedJob = (id: number) => {
    setDislikedJobs([...dislikedJobs, id]);
  };

  useEffect(() => {
    // Load likedJobs and dislikedJobs from localStorage
    const storedLikedJobs = JSON.parse(
      localStorage.getItem("likedJobs") || "[]"
    );
    const storedDislikedJobs = JSON.parse(
      localStorage.getItem("dislikedJobs") || "[]"
    );
    setLikedJobs(storedLikedJobs);
    setDislikedJobs(storedDislikedJobs);
  }, []);

  const value: JobsContextType = {
    likedJobs,
    dislikedJobs,
    addLikedJob,
    addDislikedJob,
    setLikedJobs,
    setDislikedJobs,
  };

  return <JobsContext.Provider value={value}>{children}</JobsContext.Provider>;
};
