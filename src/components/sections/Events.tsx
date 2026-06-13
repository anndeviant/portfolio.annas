"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useMemo } from "react";

import type { EventRow } from "../../types/database";

type EventsProps = {
  events: EventRow[];
};

export default function Events({ events }: EventsProps) {
  const sortedEvents = useMemo(
    () =>
      [...events].sort((first, second) => {
        const firstOrder = first.sort_order ?? Number.MAX_SAFE_INTEGER;
        const secondOrder = second.sort_order ?? Number.MAX_SAFE_INTEGER;

        if (firstOrder !== secondOrder) {
          return firstOrder - secondOrder;
        }

        return first.id - second.id;
      }),
    [events],
  );
  const twoColumnEvents = useMemo(
    () => distributeEvents(sortedEvents, 2),
    [sortedEvents],
  );
  const threeColumnEvents = useMemo(
    () => distributeEvents(sortedEvents, 3),
    [sortedEvents],
  );

  return (
    <section id="events" className="relative px-4 py-18 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-9 flex flex-col justify-between gap-5 md:mb-20 md:gap-8 lg:flex-row lg:items-end">
          <div>
            <p className="mb-3 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-pink-200/80 md:mb-5 md:text-xs md:tracking-[0.22em]">
              Events & Achievements
            </p>
            <h2 className="max-w-4xl text-balance text-4xl font-black leading-[0.95] text-white md:text-8xl">
              Public learning, competitions, and technical growth.
            </h2>
          </div>
          <p className="max-w-sm text-pretty text-sm leading-7 text-white/60 md:text-base">
            A curated record of seminars, bootcamps, competitions, and community
            milestones.
          </p>
        </div>

        <div className="space-y-4 md:hidden">
          {sortedEvents.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>

        <div className="hidden gap-4 md:grid md:grid-cols-2 lg:hidden">
          {twoColumnEvents.map((column, columnIndex) => (
            <div
              key={columnIndex}
              className={`space-y-4 ${columnIndex === 1 ? "pt-12" : ""}`}
            >
              {column.map(({ event, index }) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </div>
          ))}
        </div>

        <div className="hidden gap-4 lg:grid lg:grid-cols-3">
          {threeColumnEvents.map((column, columnIndex) => (
            <div
              key={columnIndex}
              className={`space-y-4 ${columnIndex === 1 ? "pt-12" : columnIndex === 2 ? "pt-24" : ""}`}
            >
              {column.map(({ event, index }) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

type EventCardProps = {
  event: EventRow;
  index: number;
};

function EventCard({ event, index }: EventCardProps) {
  return (
    <motion.article
      className="group overflow-hidden border border-white/10 bg-white/[0.035]"
      initial={{ opacity: 0, y: 42 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.05,
        duration: 0.68,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[linear-gradient(135deg,rgba(244,114,182,0.14),rgba(103,232,249,0.10),rgba(255,255,255,0.04))]">
        {event.image_url ? (
          <Image
            src={event.image_url}
            alt={`${event.title} event`}
            fill
            loading={index < 4 ? "eager" : "lazy"}
            sizes="(min-width: 1024px) 26rem, (min-width: 768px) 50vw, 92vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-end p-5">
            <span className="text-6xl font-black text-white/20">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        )}
      </div>

      <div className="p-4 md:p-6">
        <div className="mb-4 flex items-center justify-between gap-3 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-white/50 md:mb-5 md:text-xs md:tracking-[0.16em]">
          <span>{event.event_type ?? "Event"}</span>
          <span>{event.display_date ?? "Featured"}</span>
        </div>
        <h3 className="break-words text-xl font-black leading-tight text-white md:text-2xl">
          {event.title}
        </h3>
        {event.description ? (
          <p className="mt-4 text-sm leading-7 text-white/70">
            {event.description}
          </p>
        ) : null}
      </div>
    </motion.article>
  );
}

function distributeEvents(
  events: EventRow[],
  columnCount: number,
): Array<Array<{ event: EventRow; index: number }>> {
  return events.reduce<Array<Array<{ event: EventRow; index: number }>>>(
    (columns, event, index) => {
      columns[index % columnCount].push({ event, index });
      return columns;
    },
    Array.from({ length: columnCount }, () => []),
  );
}
