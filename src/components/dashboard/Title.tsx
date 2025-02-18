type TitleProps = {
  content: string;
  className?: string;
};
const Title: React.FC<TitleProps> = ({ content, className }) => {
  return (
    <h2 className={`${className} text-2xl text-slate-800 font-semibold`}>
      {content}
    </h2>
  );
};

export default Title;
