"use client";
import Hero from "@/components/hero/Hero";
import LatestDrops from "./latest-drops/LatestDrops";
import WeeklyPick from "./weekly-picks/WeeklyPicks";
import Sale from "./sale/Sale";

export default function HomePage() {
    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-col items-center w-full gap-10 lg:gap-32">
                <Hero />
                <LatestDrops />
                <WeeklyPick />
                <Sale />
            </div>
        </div>
    );
}
