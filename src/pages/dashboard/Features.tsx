import Title from "@/components/dashboard/Title";
import { MoveLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Features = () => {
  return (
    <section>
      <Link
        to='..'
        className='inline-flex items-center justify-start gap-2 px-3 py-1 group border border-transparent hover:border-slate-400 rounded-md'
      >
        <MoveLeft
          color='#333'
          size={25}
          className='transition-transform group-hover:-translate-x-1'
        />
        <Title content='Features' />
      </Link>
    </section>
  );
};

export default Features;
