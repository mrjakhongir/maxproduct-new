import { Skeleton } from "@/components/ui/skeleton";

const RowSkeleton = () => {
  return (
    <div className='flex flex-col space-y-3 mb-2'>
      <Skeleton className='h-10' />
      <div className='space-y-2'>
        <Skeleton className='h-[500px] rounded-xl' />
      </div>
    </div>
  );
};

export default RowSkeleton;
