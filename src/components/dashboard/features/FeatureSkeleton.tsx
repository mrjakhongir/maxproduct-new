import { Skeleton } from "@/components/ui/skeleton";

const FeatureSkeleton = () => {
  return (
    <div>
      <div className='flex flex-col space-y-2 mb-2'>
        <Skeleton className='h-10' />
        <Skeleton className='h-10' />
        <Skeleton className='h-10' />
        <Skeleton className='h-10' />
      </div>
    </div>
  );
};

export default FeatureSkeleton;
