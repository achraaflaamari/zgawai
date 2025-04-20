import SafetyNotifications from "@/components/SafetyNotifications";
import { SmoothCursor } from "@/components/SmoothCursor";
import ActionCall from "@/section/ActionCall";
import AIInfoSection from "@/section/AIInfoSession";
import Check from "@/section/Check";
import Feature from "@/section/Feature";
import Footer from "@/section/Footer";
import Hero from "@/section/Hero";
import Menu from "@/section/Menu";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell } from "lucide-react"
export default function App() {
  const [showNotif, setShowNotif] = useState(false);
  const notifRef = useRef(null);
  const show =()=>{
    setShowNotif(!showNotif)
  }
  return (
    <div className="min-h-screen bg-gray-50 scroll-smooth">
      <SmoothCursor />
      <Menu show={show}/>
      <Hero />
      <Feature />
      <AIInfoSection />
      <Check />
      <ActionCall />
      <Footer />
      
      {/* Notification panel with animation */}
      <AnimatePresence>
        {!showNotif && (
          <motion.div
            ref={notifRef}
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-16 right-0 z-50 h-full w-full sm:w-96 md:w-2/5 lg:w-1/3 xl:w-1/4"
          >
            <div className="bg-[#b0c4e0] h-full flex flex-col">
              <SafetyNotifications onClose={() => setShowNotif(false)}/>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      
    </div>
  );
}