"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";

interface RecentSearch {
  id: number;
  hotel_name: string;
  image: string;
  dateRange: string;
  people: number;
  timestamp: number;
}

export default function RecentSearch() {
  const t = useTranslations("home");
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);

  useEffect(() => {
    // Get recent searches from localStorage
    const searches = JSON.parse(localStorage.getItem("recentSearches") || "[]");
    setRecentSearches(searches);
  }, []);

  if (recentSearches.length === 0) {
    return null;
  }

  return (
    <div className="mx-auto my-6 w-full">
      <h2 className="mb-2 text-lg font-semibold text-slate-600">
        {t("title-recent-search")}
      </h2>
      <div className="2xl:grid-cols-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {recentSearches.map((search) => (
          <Link href="#" key={search.id} className="block">
            <Card key={search.id} className="overflow-hidden">
              <CardContent className="p-3">
                <div className="flex items-center space-x-4 rounded-lg bg-white">
                  <div className="aspect-square">
                    <Image
                      src={search.image}
                      alt={`${search.hotel_name} image`}
                      width={80}
                      height={80}
                      className="h-full rounded-lg"
                      unoptimized
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="text-lg font-semibold">
                      {search.hotel_name}
                    </h3>
                    <p className="text-gray-500">
                      {search.dateRange}, {search.people}{" "}
                      {t("search-form.adult")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
