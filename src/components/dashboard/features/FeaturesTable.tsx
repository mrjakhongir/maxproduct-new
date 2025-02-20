import { db } from "@/config/firebase";
import { Feature } from "@/types/area";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import FeatureSkeleton from "./FeatureSkeleton";

const FeaturesTable = () => {
  const [features, setFeatures] = useState<Feature[]>([]);

  async function getFeatures() {
    try {
      const res = await getDocs(collection(db, "features"));

      const data = res.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      }) as Feature[];
      setFeatures(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getFeatures();
  }, []);
  return (
    <div className='mt-5 px-5'>
      {features.length > 0 ? (
        <Accordion type='single' collapsible className='w-full'>
          {features.map((feature) => (
            <AccordionItem key={feature.id} value={feature.name}>
              <AccordionTrigger>{feature.name}</AccordionTrigger>
              {feature.data.map((item) => (
                <AccordionContent
                  key={item}
                  className='bg-[#F2F3F6] pl-4 py-2 '
                >
                  {item}
                </AccordionContent>
              ))}
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <FeatureSkeleton />
      )}
    </div>
  );
};

export default FeaturesTable;
