import React, { createContext, useContext, useState, useEffect } from "react";

type JobsContextType = {
  likedJobs: number[];
  dislikedJobs: number[];
  selectedTechnology: string;
  shouldExitLeft: boolean;
  shouldExitRight: boolean;
  addLikedJob: (id: number) => void;
  addDislikedJob: (id: number) => void;
  setLikedJobs: React.Dispatch<React.SetStateAction<number[]>>;
  setDislikedJobs: React.Dispatch<React.SetStateAction<number[]>>;
  setSelectedTechnology: React.Dispatch<React.SetStateAction<string>>;
  setShouldExitLeft: React.Dispatch<React.SetStateAction<boolean>>;
  setShouldExitRight: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [selectedTechnology, setSelectedTechnology] = useState("");
  const [shouldExitLeft, setShouldExitLeft] = useState(false);
  const [shouldExitRight, setShouldExitRight] = useState(false);

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
    selectedTechnology,
    shouldExitLeft,
    shouldExitRight,
    addLikedJob,
    addDislikedJob,
    setLikedJobs,
    setDislikedJobs,
    setSelectedTechnology,
    setShouldExitLeft,
    setShouldExitRight,
  };

  return <JobsContext.Provider value={value}>{children}</JobsContext.Provider>;
};
