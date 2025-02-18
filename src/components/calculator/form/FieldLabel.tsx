import { FormLabel } from "@/components/ui/form";

type FieldLabelProps = {
  content: string;
};

const FieldLabel: React.FC<FieldLabelProps> = ({ content }) => {
  return (
    <FormLabel className='flex-1 text-right md:text-xl text-slate-800 font-semibold'>
      {content}
    </FormLabel>
  );
};

export default FieldLabel;
