import { Bell, Brain, Lock, Video } from "lucide-react";
import React from "react";

function Feature() {
  return (
    <div id="Features" className="bg-[#F5F7FA] py-20 grid justify-center items-center h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#1A365D]">How It Works</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI-powered system ensures safety compliance with a simple,
            privacy-focused approach
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Feature 1 */}
          <div className="bg-white rounded-lg shadow-md p-6 transition duration-300 hover:shadow-lg">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#4299E1] bg-opacity-20 flex items-center justify-center">
              <Video className=" text-center text-3xl font-bold " />
            </div>
            <h3 className="mt-5 text-xl font-semibold text-[#1A365D] text-center">
              Live Monitoring
            </h3>
            <p className="mt-3 text-gray-600 text-center">
              Access your device's camera to capture real-time images of workers
              in their environment
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-lg shadow-md p-6 transition duration-300 hover:shadow-lg">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#4299E1] bg-opacity-20 flex items-center justify-center">
              <Brain className=" text-center text-3xl font-bold " />
            </div>
            <h3 className="mt-5 text-xl font-semibold text-[#1A365D] text-center">
              Instant Analysis
            </h3>
            <p className="mt-3 text-gray-600 text-center">
              Our AI instantly analyzes images to detect safety gear including
              helmets, gloves, and more
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-lg shadow-md p-6 transition duration-300 hover:shadow-lg">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#4299E1] bg-opacity-20 flex items-center justify-center">
              <Lock className=" text-center text-3xl font-bold " />
            </div>
            <h3 className="mt-5 text-xl font-semibold text-[#1A365D] text-center">
              Privacy First
            </h3>
            <p className="mt-3 text-gray-600 text-center">
              All processing happens on your device — no images are ever
              uploaded to external servers
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white rounded-lg shadow-md p-6 transition duration-300 hover:shadow-lg">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#4299E1] bg-opacity-20 flex items-center justify-center">
              <Bell className=" text-center text-3xl font-bold " />
            </div>
            <h3 className="mt-5 text-xl font-semibold text-[#1A365D] text-center">
              Real-time Alerts
            </h3>
            <p className="mt-3 text-gray-600 text-center">
              Get immediate feedback on compliance status with clear visual
              indicators
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feature;
