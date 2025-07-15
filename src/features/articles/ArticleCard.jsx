/* eslint-disable react/prop-types */
function ArticleCard({ url, image, title, desc }) {
  return (
    <a
      href={url}
      className="flex  max-w-xs cursor-pointer flex-col rounded-xl bg-articleBg  hover:shadow-lg"
      target="_blank"
      rel="noreferrer"
    >
      <img
        src={image}
        className=" h-[160px] rounded-b-xl rounded-t-lg "
        alt=""
      />
    </a>
  );
}

export default ArticleCard;
