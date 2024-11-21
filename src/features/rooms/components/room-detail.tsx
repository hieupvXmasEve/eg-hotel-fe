"use client";

import Accessibility from "@/features/rooms/components/accessibility";
import Amenities from "@/features/rooms/components/amenities";
import BookNow from "@/features/rooms/components/book-now";
import { Skeleton } from "@/components/ui/skeleton";
import Overview from "@/features/rooms/components/overview";
import Photos from "@/features/rooms/components/photos";
import Policies from "@/features/rooms/components/policies";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { RoomDetail } from "../data/get-room-detail";

const MapComponent = dynamic(() => import("@/features/rooms/components/map"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center">
      <Skeleton className="h-64 w-full" />
    </div>
  ),
});

type Section = "overview" | "accessibility" | "policies" | "amenities";

export default function RoomDetailComponent({
  data,
  date_from,
  date_to,
}: {
  data: RoomDetail;
  date_from: string;
  date_to: string;
}) {
  const [activeSection, setActiveSection] = useState<Section>("overview");
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
        { threshold: 0.5, rootMargin: "20% 0px 0px 0px" },
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
              <MapComponent
                longitude={data.longitude}
                latitude={data.latitude}
              />
            </div>
          </div>
          <section ref={sectionRefs.accessibility} className="">
            <Accessibility data={data} />
          </section>
          <section ref={sectionRefs.policies} className="">
            <Policies data={data} />
          </section>
          <div className="sticky bottom-20 mx-auto flex w-full justify-center md:bottom-4">
            <BookNow data={data} date_from={date_from} date_to={date_to} />
          </div>
        </div>
      </div>
    </>
  );
}
