import { DailySchedule } from "@/components/common/daily-schedule";

export default function Home() {
  return (
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start p-8">
        <DailySchedule />
      </main>
  );
}
