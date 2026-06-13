"use client";

import {
  Particles,
  ParticlesProvider,
  type ParticlesPluginRegistrar,
} from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useMemo } from "react";
import type { ISourceOptions } from "@tsparticles/engine";

const initParticles: ParticlesPluginRegistrar = async (engine) => {
  await loadSlim(engine);
};

export default function ParticleBackground() {
  const options = useMemo<ISourceOptions>(
    () => ({
      background: {
        color: {
          value: "transparent",
        },
      },
      detectRetina: true,
      fpsLimit: 60,
      fullScreen: {
        enable: false,
      },
      interactivity: {
        detectsOn: "window",
        events: {
          onClick: {
            enable: false,
          },
          onHover: {
            enable: false,
          },
          resize: {
            enable: true,
          },
        },
      },
      particles: {
        color: {
          value: ["#14b8a6", "#2dd4bf", "#5eead4"],
        },
        links: {
          enable: false,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "out",
          },
          random: true,
          speed: 0.65,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 750,
          },
          value: 125,
        },
        opacity: {
          value: {
            min: 0.12,
            max: 0.5,
          },
        },
        shape: {
          type: "circle",
        },
        size: {
          value: {
            min: 1,
            max: 3,
          },
        },
      },
    }),
    [],
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[radial-gradient(circle_at_50%_35%,_#115e59_0%,_#052f2d_34%,_#020807_72%,_#000000_100%)]">
      <ParticlesProvider init={initParticles}>
        <Particles
          id="particle-background"
          className="absolute inset-0"
          options={options}
        />
      </ParticlesProvider>
    </div>
  );
}
