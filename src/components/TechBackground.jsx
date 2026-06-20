import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";

const languages = [
  "React",
  "Vue",
  "Angular",
  "Tailwind",
  "JavaScript",
  "CSS",
  "HTML",
  "TypeScript",
  "Node.js",
  "Python",
  "Django",
  "Flask",
  "Next.js",
  "Nuxt",
  "Svelte",
];

const darkColors = [
  "#FF3366",
  "#FF6B35",
  "#FFD700",
  "#00C851",
  "#00BFFF",
  "#9B59B6",
  "#E74C3C",
  "#1ABC9C",
  "#F39C12",
  "#3498DB",
];

const lightColors = [
  "#FF006E",
  "#FB5607",
  "#FFBE0B",
  "#3A86FF",
  "#8338EC",
  "#06D6A0",
  "#EF476F",
  "#118AB2",
  "#F72585",
  "#7209B7",
];

function generateItems(width, height, colors) {
  const items = [];
  const positions = [];

  const repetitions =
    width < 768 ? 4 : 6;

  const minDistance =
    width < 768 ? 80 : 130;

  const overlaps = (x, y) => {
    return positions.some((pos) => {
      const dx = pos.x - x;
      const dy = pos.y - y;

      return (
        Math.sqrt(dx * dx + dy * dy) <
        minDistance
      );
    });
  };

  languages.forEach((lang) => {
    for (let i = 0; i < repetitions; i++) {
      let x;
      let y;
      let attempts = 0;

      do {
        x = 50 + Math.random() * (width - 100);
        y = 50 + Math.random() * (height - 100);

        attempts++;
      } while (
        overlaps(x, y) &&
        attempts < 100
      );

      positions.push({ x, y });

      items.push({
        id: `${lang}-${i}`,
        name: lang,
        x,
        y,
        size: 16 + Math.random() * 24,
        rotate: -25 + Math.random() * 50,
        blur: 15 + Math.random() * 20,
        duration: 2 + Math.random() * 1,
        color:
          colors[
            Math.floor(
              Math.random() * colors.length
            )
          ],
      });
    }
  });

  return items;
}

export default function TechBackground() {
  const { theme } = useTheme();

  const [items, setItems] = useState([]);

  useEffect(() => {
    const colors =
      theme === "dark"
        ? darkColors
        : lightColors;

    const generate = () => {
      setItems(
        generateItems(
          window.innerWidth,
          document.body.scrollHeight,
          colors
        )
      );
    };

    generate();

    window.addEventListener(
      "resize",
      generate
    );

    return () =>
      window.removeEventListener(
        "resize",
        generate
      );
  }, [theme]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">

{theme === "dark" ? (
  <>
    <div className="absolute top-10 left-10 w-72 h-72 bg-orange-300/10 rounded-full blur-3xl" />
    <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl" />
    <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-blue-300/10 rounded-full blur-3xl" />
  </>
) : (
  <>
    <div className="absolute -top-20 -left-20 w-[550px] h-[550px] bg-pink-400/25 rounded-full blur-3xl" />

    <div className="absolute bottom-0 right-0 w-[650px] h-[650px] bg-cyan-400/25 rounded-full blur-3xl" />

    <div className="absolute top-1/3 left-1/2 w-[500px] h-[500px] bg-yellow-300/20 rounded-full blur-3xl" />
  </>
)}

      {items.map((item) => (
        <div
          key={item.id}
          className="absolute font-black whitespace-nowrap tech-float"
          style={{
            left: item.x,
            top: item.y,
          
            color: item.color,
          
            fontSize: `${
              theme === "dark"
                ? item.size
                : item.size * 1.15
            }px`,
          
            transform: `rotate(${item.rotate}deg)`,
          
            opacity:
              theme === "dark"
                ? 0.18
                : 0.22,
          
            textShadow:
              theme === "dark"
                ? `
                    0 0 ${item.blur}px ${item.color},
                    0 0 ${item.blur * 2}px ${item.color}40
                  `
                : `
                    0 0 ${item.blur * 1.5}px ${item.color},
                    0 0 ${item.blur * 3}px ${item.color}66
                  `,
          
            filter:
              theme === "dark"
                ? "none"
                : "saturate(1.3)",
          
            animationDuration: `${item.duration}s`,
          }}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
}