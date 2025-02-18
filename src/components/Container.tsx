type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};
const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <div className={`${className} mx-auto max-w-7xl px-5`}>{children}</div>
  );
};

export default Container;
