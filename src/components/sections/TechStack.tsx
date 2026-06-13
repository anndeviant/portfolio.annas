"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import techStacks from "../../data/tech_stacks.json";

type StackItem = {
  name: string;
  icon: string;
};

type StackGroup = {
  title: string;
  stack: StackItem[];
};

const stackGroups = techStacks satisfies StackGroup[];
const dataGroup = getStackGroup("Data/AI");
const fullstackGroup = getStackGroup("Fullstack");
const toolsGroup = getStackGroup("Tools");
const genAiGroup = getStackGroup("GenAI");

export default function TechStack() {
  return (
    <section id="tech-stack" className="relative px-4 py-18 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-9 grid gap-5 md:mb-12 lg:grid-cols-12 lg:items-start lg:gap-10">
          <div className="lg:col-span-7">
            <p className="mb-3 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-lime-200/80 md:mb-5 md:text-xs md:tracking-[0.22em]">
              Technical Stack
            </p>
            <h2 className="max-w-3xl text-balance text-4xl font-black leading-[0.95] text-white md:text-8xl">
              Built across data intelligence and product systems.
            </h2>
          </div>
          <div className="flex lg:col-span-5 lg:col-start-8 lg:h-full lg:items-center">
            <GenAIPanel group={genAiGroup} />
          </div>
        </div>

        <div className="grid gap-5 xl:grid-cols-2 xl:items-start">
          <StackPanel group={dataGroup} index={1} columns="three" />
          <StackPanel group={fullstackGroup} index={2} columns="three" />
          <ToolsMarqueePanel
            group={toolsGroup}
            index={3}
            className="xl:col-span-2"
          />
        </div>
      </div>
    </section>
  );
}

function ToolsMarqueePanel({
  className = "",
  group,
  index,
}: {
  className?: string;
  group: StackGroup;
  index: number;
}) {
  return (
    <motion.article
      className={`relative overflow-hidden border border-white/10 bg-white/[0.035] p-4 md:p-6 ${className}`}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.08,
        duration: 0.68,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ once: true, amount: 0.14 }}
    >
      <div className="mb-5 flex items-start justify-between gap-4 md:mb-6 md:gap-5">
        <div>
          <span className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-white/45 md:text-xs md:tracking-[0.22em]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-2 text-3xl font-black leading-none text-white md:mt-3 md:text-4xl">
            Tools & Platforms
          </h3>
        </div>
        <div className="hidden border border-white/10 bg-black/20 px-3 py-2 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white/55 sm:block">
          {group.stack.length} Tools
        </div>
      </div>

      <div className="tools-marquee-panel relative overflow-hidden py-1">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#06110f] to-transparent md:w-16" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[#06110f] to-transparent md:w-16" />
        <div className="tools-marquee-track flex w-max">
          {[0, 1].map((copyIndex) => (
            <div key={copyIndex} className="flex gap-2 pr-2 md:gap-3 md:pr-3">
              {group.stack.map((item) => (
                <div
                  key={`${copyIndex}-${item.name}`}
                  className="flex min-h-16 w-35 shrink-0 items-center gap-2 border border-white/10 bg-black/35 px-2.5 py-3 transition hover:border-cyan-200/35 hover:bg-cyan-100/[0.055] sm:w-44 md:w-52 md:gap-3 md:px-4 lg:w-56"
                >
                  <StackItemCard item={item} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

type StackPanelProps = {
  className?: string;
  columns?: "auto" | "three";
  group: StackGroup;
  index: number;
  title?: string;
};

function StackPanel({
  className = "",
  columns = "auto",
  group,
  index,
  title,
}: StackPanelProps) {
  const gridClass =
    columns === "three"
      ? "grid-cols-2 lg:grid-cols-3"
      : "grid-cols-2 sm:grid-cols-[repeat(auto-fit,minmax(11rem,1fr))]";

  return (
    <motion.article
      className={`relative overflow-hidden border border-white/10 bg-white/[0.035] p-4 md:p-6 ${className}`}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.08,
        duration: 0.68,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ once: true, amount: 0.14 }}
    >
      <div className="mb-5 flex items-start justify-between gap-4 md:mb-6 md:gap-5">
        <div>
          <span className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-white/45 md:text-xs md:tracking-[0.22em]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-2 text-3xl font-black leading-none text-white md:mt-3 md:text-4xl">
            {title ?? group.title}
          </h3>
        </div>
        <div className="hidden border border-white/10 bg-black/20 px-3 py-2 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white/55 sm:block">
          {group.stack.length} Tools
        </div>
      </div>

      <div className={`grid gap-2 ${gridClass}`}>
        {group.stack.map((item, itemIndex) => (
          <motion.div
            key={item.name}
            className="flex min-h-16 items-center gap-2 border border-white/10 bg-black/35 px-2.5 py-3 transition hover:border-cyan-200/35 hover:bg-cyan-100/[0.055] sm:min-h-18 sm:gap-3 sm:px-4"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: itemIndex * 0.025,
              duration: 0.4,
              ease: "easeOut",
            }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <StackItemCard item={item} />
          </motion.div>
        ))}
      </div>
    </motion.article>
  );
}

function StackItemCard({ item }: { item: StackItem }) {
  return (
    <>
      <IconImage item={item} size={34} />
      <span className="min-w-0 break-words text-[0.62rem] font-black uppercase leading-4 tracking-[0.02em] text-white/78 sm:text-xs sm:leading-5 sm:tracking-[0.08em]">
        {item.name}
      </span>
    </>
  );
}

function GenAIPanel({ group }: { group: StackGroup }) {
  return (
    <motion.article
      className="grid w-full gap-5 border border-cyan-100/15 bg-cyan-100/[0.045] p-4 md:grid-cols-[1fr_auto] md:items-center md:p-5"
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.12, duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.18 }}
    >
      <div>
        <span className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-cyan-100/55 md:text-xs md:tracking-[0.22em]">
          01
        </span>
        <h3 className="mt-2 text-3xl font-black leading-none text-white md:mt-3 md:text-4xl">
          {group.title}
        </h3>
        <p className="mt-3 max-w-xl text-pretty text-sm leading-6 text-white/62 md:text-[0.95rem] md:leading-7">
          For brainstorming, refining ideas, and getting mentor-like guidance
          when exploring concepts, solving problems, or shaping better technical
          decisions.
        </p>
      </div>

      <div className="grid grid-cols-5 gap-2 md:w-40 md:grid-cols-3 md:justify-items-end">
        {group.stack.map((item, index) => (
          <motion.a
            key={item.name}
            href={item.icon}
            target="_blank"
            rel="noreferrer"
            aria-label={`${item.name} icon source`}
            className="grid size-11 place-items-center border border-white/10 bg-black/20 transition hover:border-cyan-200/50 hover:bg-cyan-100/10 md:size-12"
            initial={{ opacity: 0, scale: 0.86 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.18 + index * 0.04,
              duration: 0.35,
              ease: "easeOut",
            }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <IconImage item={item} size={34} variant="bare" />
          </motion.a>
        ))}
      </div>
    </motion.article>
  );
}

type IconImageProps = {
  item: StackItem;
  size: number;
  variant?: "boxed" | "bare";
};

function IconImage({ item, size, variant = "boxed" }: IconImageProps) {
  if (variant === "bare") {
    return (
      <Image
        src={item.icon}
        alt={`${item.name} icon`}
        width={size}
        height={size}
        unoptimized
        className="size-8 object-contain md:size-9"
      />
    );
  }

  return (
    <span className="grid size-9 shrink-0 place-items-center bg-white sm:size-11">
      <Image
        src={item.icon}
        alt={`${item.name} icon`}
        width={size}
        height={size}
        unoptimized
        className="size-6 object-contain sm:size-8"
      />
    </span>
  );
}

function getStackGroup(title: string): StackGroup {
  return (
    stackGroups.find(
      (group) => group.title.toLowerCase() === title.toLowerCase(),
    ) ?? {
      title,
      stack: [],
    }
  );
}
