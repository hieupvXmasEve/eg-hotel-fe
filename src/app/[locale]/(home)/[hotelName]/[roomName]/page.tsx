"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import Photos from "./components/photos";
import Overview from "./components/overview";
import Map from "./components/map";
import Amenities from "./components/amenities";
import Accessibility from "./components/accessibility";
import Policies from "./components/policies";
import BookNow from "./components/book-now";

type Section = "overview" | "accessibility" | "policies" | "amenities";

export default function RoomPage() {
  const [activeSection, setActiveSection] = useState<Section>("overview");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const sectionRefs: Record<Section, React.RefObject<HTMLElement>> = {
    overview: useRef(null),
    accessibility: useRef(null),
    policies: useRef(null),
    amenities: useRef(null),
  };

  useEffect(() => {
    const observers = Object.entries(sectionRefs).map(([id, ref]) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id as Section);
            }
          });
        },
        { threshold: 0.5 },
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return observer;
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToSection = (sectionId: Section) => {
    sectionRefs[sectionId].current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const navItems: { title: Section; component: React.ReactNode }[] = [
    { title: "overview", component: <Overview /> },
    { title: "amenities", component: <div>Popular amenities</div> },
    { title: "accessibility", component: <div>Accessibility</div> },
    { title: "policies", component: <div>Policies</div> },
  ];

  return (
    <>
      <div className="pb-10">
        <section ref={sectionRefs.overview}>
          <Photos />
        </section>
        <nav className="sticky top-0 z-10 mt-2 w-full overflow-x-auto border-b border-gray-300 bg-white">
          <ul className="flex justify-start">
            {navItems.map((item) => (
              <li key={item.title}>
                <div
                  onClick={() => scrollToSection(item.title)}
                  className={cn(
                    "cursor-pointer px-4 py-2 capitalize transition-colors",
                    activeSection === item.title
                      ? "border-b-2 border-primary text-primary"
                      : "border-b-2 border-transparent hover:border-b-2 hover:border-gray-500",
                  )}
                >
                  {item.title}
                </div>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-4">
            <div className="col-span-4 md:col-span-3">
              <section className="">
                <Overview />
              </section>
              <section ref={sectionRefs.amenities} className="mt-4">
                <Amenities />
              </section>
            </div>
            <div className="col-span-4 md:col-span-1">
              <Map />
            </div>
          </div>
          <section ref={sectionRefs.accessibility} className="">
            <Accessibility />
          </section>
          <section ref={sectionRefs.policies} className="">
            <Policies />
          </section>
          <div className="sticky bottom-20 mx-auto flex w-full justify-center md:bottom-4">
            <BookNow />
          </div>
        </div>
      </div>
    </>
  );
}
