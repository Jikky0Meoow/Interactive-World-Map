import { useCallback } from 'react';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

/**
 * Animated particle background using tsparticles
 * Creates a subtle cyberpunk/neon effect
 */
export default function BackgroundParticles() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      className="fixed inset-0 -z-10"
      options={{
        fullScreen: { enable: false },
        fpsLimit: 60,
        particles: {
          number: {
            value: 50,
            density: { enable: true, area: 800 }
          },
          color: {
            value: ["#00f0ff", "#b300ff", "#ff00e5"]
          },
          shape: {
            type: "circle"
          },
          opacity: {
            value: 0.2,
            random: true,
            anim: {
              enable: true,
              speed: 0.5,
              opacity_min: 0.05,
              sync: false
            }
          },
          size: {
            value: 2,
            random: true,
            anim: {
              enable: true,
              speed: 1,
              size_min: 0.5,
              sync: false
            }
          },
          links: {
            enable: true,
            distance: 150,
            color: "#00f0ff",
            opacity: 0.1,
            width: 0.5
          },
          move: {
            enable: true,
            speed: 0.5,
            direction: "none",
            random: true,
            straight: false,
            outModes: "out"
          }
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "repulse"
            }
          },
          modes: {
            repulse: {
              distance: 100,
              duration: 0.4
            }
          }
        },
        retina_detect: true
      }}
    />
  );
}
