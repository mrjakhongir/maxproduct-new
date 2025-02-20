import { Skeleton } from "@/components/ui/skeleton";

const ItemSkeleton = () => {
  return (
    <div className='flex flex-col space-y-3 mb-2'>
      <Skeleton className='h-48 rounded-xl' />
      <div className='space-y-2'>
        <Skeleton className='h-10' />
      </div>
    </div>
  );
};

export default ItemSkeleton;
