import { useContentfulContext } from "@/context/contentful";
import * as Tabs from "@radix-ui/react-tabs";

const Tab = () => {
  const { jobs, isLoading } = useContentfulContext();

  if (isLoading) return <p>Loading...</p>;

  return (
    <Tabs.Root className={rootStyle} defaultValue="tab1">
      <Tabs.List className={listStyle} aria-label="Manage your account">
        <Tabs.Trigger className={triggerStyle} value="tab1">
          Job
        </Tabs.Trigger>
        <Tabs.Trigger className={triggerStyle} value="tab2">
          Spec
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content className={contentStyle} value="tab1">
        <img src={jobs[0]?.backgroundImage.url} alt="company image" />
        <img src={jobs[0]?.companyLogo.url} alt="logo" />
      </Tabs.Content>
      <Tabs.Content className={contentStyle} value="tab2">
        <p>{jobs[0]?.about}</p>
      </Tabs.Content>
    </Tabs.Root>
  );
};

const rootStyle = "flex flex-col w-[300px] shadow-[0_2px_10px]shadow-blackA4";

const listStyle = "shrink-0 flex ";

const triggerStyle =
  "dark:bg-gray-900 bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-violet11 data-[state=active]:text-violet11 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] dark:data-[state=active]:focus:shadow-white data-[state=active]:focus:shadow-black outline-none cursor-default";

const contentStyle =
  "min-h-[400px] grow p-5 dark:bg-gray-900 dark:border-white border border-gray-500 bg-white dark:text-white text-black rounded-b-md outline-none focus:shadow-[0_0_0_2px] focus:shadow-black";

export default Tab;
