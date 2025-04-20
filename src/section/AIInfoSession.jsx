import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShieldCheck, Factory, HardHat, Eye } from "lucide-react";

const AIInfoSection = () => {
  return (
    <section id ='info' className="py-20  h-screen grid justify-center items-center    ">
      <div className=" container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8">
          <Card className="border-0 shadow-lg text-[#1A365D]">
            <CardHeader className="pb-2 flex flex-col justify-center items-center">
              <CardTitle className="text-2xl text-safety-dark">
                How Our AI Technology Works
              </CardTitle>
              <CardDescription>
                Advanced machine learning for safety monitoring
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6 p-2 text-[#1A365D]">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-lg mr-4">
                    <Eye className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-safety-dark mb-1">
                      Computer Vision Detection
                    </h3>
                    <p className="text-safety-gray text-sm">
                      Our AI uses advanced computer vision algorithms to detect
                      and classify safety equipment such as helmets, gloves, and
                      vests in real-time image frames.
                    </p>
                  </div>
                </div>

                <div className="flex items-start ">
                  <div className="bg-green-100 p-2 rounded-lg mr-4">
                    <HardHat className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-safety-dark mb-1">
                      Object Classification
                    </h3>
                    <p className="text-safety-gray text-sm">
                      The system can differentiate between various types of
                      safety equipment and verify proper usage, even in
                      challenging industrial environments with variable
                      lighting.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-purple-100 p-2 rounded-lg mr-4">
                    <Factory className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-safety-dark mb-1">
                      Environment Adaptation
                    </h3>
                    <p className="text-safety-gray text-sm">
                      Our models are trained on diverse industrial environments,
                      enabling accurate detection across warehouses,
                      construction sites, manufacturing plants, and more.
                    </p>
                  </div>
                </div>

               
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AIInfoSection;
