'use client';

import { useEffect } from "react";
import Menu from "@/components/Menu";
import Head from "next/head";

export default function Projects() {
  useEffect(() => {
    const svg = document.querySelector('svg.squiggle');
    const path = svg?.querySelector('path');

    const scroll = () => {
      if (!svg || !path) return;

      const distance = window.scrollY;
      const totalDistance = svg.clientHeight - window.innerHeight;
      const percentage = distance / totalDistance;
      const pathLength = path.getTotalLength();

      path.style.strokeDasharray = `${pathLength}`;
      path.style.strokeDashoffset = `${pathLength * (1 - percentage)}`;
    };

    scroll();
    window.addEventListener('scroll', scroll);

    return () => {
      window.removeEventListener('scroll', scroll);
    };
  }, []);

  return (
    <main className="w-screen grid">
      <Menu />
      
      <svg
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "200vw",
        zIndex: 1,
      }}
      width="1000"
      height="2000"
      viewBox="0 0 1000 2000"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="squiggle"
    >
      <path
        d="M-24.5 101C285 315 5.86278 448.291 144.223 631.238C239.404 757.091 559.515 782.846 608.808 617.456C658.101 452.067 497.627 367.073 406.298 426.797C314.968 486.521 263.347 612.858 322.909 865.537C384.086 1125.06 79.3992 1007.94 100 1261.99C144.222 1807.35 819 1325 513 1142.5C152.717 927.625 -45 1916.5 1191.5 1852"
        stroke="#1A365D"
        stroke-width="30"
        stroke-linejoin="round"
        stroke-linecap="round"
      />
    </svg>

      <div className=" z-50 h-screen ">
        <h1 className="text-9xl text-gray-800">Hello</h1>
      </div>
      <div className="h-screen bg-blue-400"></div>
      <div className="h-screen bg-blue-300"></div>
      <div className="h-screen bg-blue-200"></div>
    </main>
  );
}
