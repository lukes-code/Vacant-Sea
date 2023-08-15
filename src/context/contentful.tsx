import { createContext, useContext, useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";

const query = gql`
  query {
    jobCollection {
      items {
        title
        technologies
        about
        location
        salary
        companyLogo {
          url
        }
        backgroundImage {
          url
        }
        companySize
        hookline
        companyName
        id
      }
      total
    }
  }
`;

export type Job = {
  title: string;
  technologies: string[];
  about: string;
  location: string;
  salary?: string;
  companyLogo: {
    url: string;
  };
  backgroundImage: {
    url: string;
  };
  companySize: string;
  hookline: string;
  companyName: string;
  total: number;
  id: number;
};

type ListingsContextType = {
  jobs: Job[];
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
  total: number;
  isLoading: boolean;
};

const ListingsContext = createContext<ListingsContextType | undefined>(
  undefined
);

export function useContentfulContext() {
  const context = useContext(ListingsContext);
  if (!context)
    throw new Error(
      "useListingsContext must be used within a ListingsProvider"
    );
  return context;
}

export function ContentfulProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, loading } = useQuery(query);

  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    if (data && data.jobCollection && data.jobCollection.items)
      setJobs(data.jobCollection.items);
  }, [data]);

  const value = {
    jobs,
    setJobs,
    total: data?.jobCollection?.total,
    isLoading: loading,
  };

  return (
    <ListingsContext.Provider value={value}>
      {children}
    </ListingsContext.Provider>
  );
}
