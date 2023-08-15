type Props = {
  handleLike: (e: any) => void;
};

export enum actionStatus {
  LIKE = "like",
  DISLIKE = "dislike",
}

const ActionButtons = (props: Props) => {
  const { handleLike } = props;
  return (
    <div className="flex justify-between text-4xl space-x-2">
      <button
        onClick={handleLike}
        className={`${buttonStyle} bg-white border-2 dark:border-white border-lightBlue`}
        value={actionStatus.DISLIKE}
      >
        &#128169;
      </button>
      <button
        onClick={handleLike}
        className={`${buttonStyle} bg-lightBlue`}
        value={actionStatus.LIKE}
      >
        &#128293;
      </button>
    </div>
  );
};

const buttonStyle = "mt-3 px-2 py-1 w-full rounded-lg";

export default ActionButtons;
