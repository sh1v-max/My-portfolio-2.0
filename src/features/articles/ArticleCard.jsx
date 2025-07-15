/* eslint-disable react/prop-types */
function ArticleCard({ url, image, title, desc }) {
  return (
    <a
      href={url}
      className="flex  max-w-xs cursor-pointer flex-col rounded-xl bg-articleBg  hover:shadow-lg"
      target="_blank"
      rel="noreferrer"
    >
    </a>
  );
}

export default ArticleCard;
