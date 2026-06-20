import TechBackground from "./TechBackground";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";
import Form from "./Form";

const skills = [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Tailwind",
    "Node.js",
    "Html",
    "Css",
];

const projects = [
    {
        title: "Portfolio Website",
        description:
            "Modern personal portfolio built with React and Tailwind.",
    },
    {
        title: "E-Commerce Dashboard",
        description:
            "Responsive dashboard with charts and analytics.",
    },
    {
        title: "Task Management App",
        description:
            "Drag and drop productivity application.",
    },
    {
        title: "Blog Platform",
        description:
            "SEO friendly blog platform with CMS integration.",
    },
];

export default function Resume() {
    const [showForm, setShowForm] = useState(false);
    const { theme } = useTheme();

    const sectionClass = `
    rounded-3xl
    backdrop-blur-xl
    border
    transition-all
    duration-300
    ${theme === "dark"
            ? "bg-white/5 border-white/10"
            : "bg-white/80 border-white shadow-xl"
        }
  `;

    return (
        <div
            className={`
        min-h-screen
        transition-colors
        duration-500
        relative
        overflow-hidden
        ${theme === "dark"
                    ? "bg-[#050816] text-white"
                    : "bg-slate-50 text-slate-900"
                }
      `}
        >
            <TechBackground />
            <ThemeToggle />

            <div
                className={`
          fixed inset-0 z-[1] backdrop-blur-[1px]
          ${theme === "dark"
                        ? "bg-black/35"
                        : "bg-white/15"
                    }
        `}
            />

            <main className="relative z-20">

                {/* HERO */}
                <section className="min-h-screen flex items-center justify-center px-6">
                    <div
                        className={`
              max-w-5xl w-full
              grid md:grid-cols-2 gap-10
              items-center
              p-10
              rounded-3xl
              backdrop-blur-xl
              border
              ${theme === "dark"
                                ? "bg-white/5 border-white/10"
                                : "bg-white/60 border-slate-200 shadow-lg"
                            }
            `}
                    >
                        
                        <div className="text-center  md:text-left">
                            <h1 className="text-4xl text-center md:text-6xl font-black mb-4">
                                کیمیا بذرافشان
                            </h1>

                            <h2 className={`text-xl text-center md:text-2xl mb-6 ${theme === "dark" ? "text-slate-300" : "text-slate-600"
                                }`}>
                                Front-End Developer
                            </h2>

                            <p className={`leading-8 dir-rtl text-right ${theme === "dark" ? "text-slate-400" : "text-slate-600"
                                }`}>
                                من یک توسعه‌دهنده فرانت‌اند هستم
                                که از تبدیل ایده‌ها به تجربه‌های کاربری جذاب و کاربردی لذت می‌برم.
                                همواره تلاش می‌کنم با یادگیری مستمر و استفاده از فناوری‌های مدرن،
                                محصولاتی با کیفیت و عملکرد بالا ایجاد کنم.

                            </p>

                            <div className="flex gap-4 mt-8 justify-center md:justify-center">
                                <button className="px-6 py-3 rounded-xl cursor-pointer  bg-cyan-500 text-white hover:bg-cyan-400 transition">
                                    Download CV
                                </button>

                                <button className={`px-6 py-3 cursor-pointer rounded-xl border transition ${theme === "dark"
                                    ? "border-white/20 hover:bg-white/5"
                                    : "border-slate-300 hover:bg-slate-100"
                                    }`}>
                                    Projects
                                </button>
                            </div>
                        </div>

                        
                        <div className="flex justify-center items-center relative">
                            
                            <div className={`
                relative
                w-[320px] h-[320px]
                md:w-[420px] md:h-[420px]
                rounded-full
                overflow-visible
                flex
                items-center
                justify-center
              `}>

                                <div className={`
                  relative
                  w-full
                  h-full
                  rounded-full
                  overflow-hidden
                  border-4
                  group
                  z-10
                  ${theme === "dark"
                                        ? "border-white/20"
                                        : "border-white shadow-xl"
                                    }
                 
                `}>
                                    <div className=" bottom-0 absolute h-[90%] w-full overflow-visible">
                                        <img
                                            src="/src/assets/profile.png"
                                            alt="Profile"
                                            className="
                      w-fit 
                      h-fit 
                      object-cover 
                      object-center
                      scale-110
                      group-hover:scale-135 
                      duration-700               
                    "/>

                                    </div>

                                    <div className="
                    absolute 
                    inset-0 
                    bg-gradient-to-tr 
                    from-cyan-500/5 
                    rounded-full
                    to-purple-500/5
                    mix-blend-overlay
                     pointer-events-none
                  " />
                                </div>

                                <div className="
                  absolute 
                  -inset-4 
                  rounded-full 
                  border-2 
                  border-dashed 
                  border-cyan-400/30
                  animate-[spin_30s_linear_infinite]
                  drop-shadow-[5px_1px_4px_white]

                " />

                                <div className="
                  absolute 
                  -inset-8 
                  rounded-full 
                  border-2 
                  border-dashed 
                  border-purple-400/20
                  animate-[spin_30s_linear_infinite_reverse]
                  drop-shadow-[5px_1px_4px_white]
                " />
                            </div>
                        </div>
                    </div>
                </section>

                {/* ABOUT */}
                <section className="max-w-6xl mx-auto px-6 py-20">
                    <div className={`${sectionClass} text-center p-8 dir-rtl md:p-12`}>
                        <h2 className="text-3xl font-bold mb-6">
                            درباره من
                        </h2>
                        <p
                            className={`
                leading-8
                ${theme === "dark"
                                    ? "text-slate-300"
                                    : "text-slate-600"
                                }
              `}
                        >
                            یه مهندس عمران که دوس داشت برنامه نویس بشه!
                            <br/>
                            (فعلا همین🙄)
                        </p>
                    </div>
                </section>

                {/* SKILLS */}
                <section className=" max-w-6xl mx-auto px-6 py-20">
                    <h2 className="text-end text-3xl font-bold mb-10">
                        مهارت ها
                    </h2>
                    <div className="backdrop-blur-xl grid grid-cols-2 md:grid-cols-4 gap-5">
                        {skills.map((skill) => (
                            <div
                                key={skill}
                                className={`
                  p-5
                  text-center
                  rounded-2xl
                  border
                  transition-all
                  duration-300
                  hover:scale-105
                  ${theme === "dark"
                                        ? "bg-white/5 border-white/10"
                                        : "bg-white/65 border-slate-200 shadow-md"
                                    }
                `}
                            >
                                {skill}
                            </div>
                        ))}
                    </div>
                </section>

                {/* PROJECTS */}
                <section className="max-w-6xl mx-auto px-6 py-20">
                    <h2 className="text-end text-3xl font-bold mb-10">
                        پروژه ها
                    </h2>
                    <div className="backdrop-blur-xl grid md:grid-cols-2 gap-8">
                        {projects.map((project) => (
                            <div
                                key={project.title}
                                className={`
                  p-8
                  rounded-3xl
                  border
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  cursor-pointer
                  ${theme === "dark"
                                        ? "bg-white/5 border-white/10"
                                        : "bg-white/65 border-slate-200 shadow-md"
                                    }
                `}
                            >
                                <h3 className="text-2xl font-bold mb-3">
                                    {project.title}
                                </h3>
                                <p
                                    className={
                                        theme === "dark"
                                            ? "text-slate-400"
                                            : "text-slate-600"
                                    }
                                >
                                    {project.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CONTACT */}
                <section className="max-w-6xl mx-auto px-6 pb-24">
  <div
    className={`
      p-10
      text-center
      ${sectionClass}
    `}
  >
    {/* دکمه باز کردن فرم */}
    <button
      onClick={() => setShowForm(true)}
      className={`px-8 py-3  transition-all cursor-pointer rounded-xl transform hover:scale-105 shadow-lg mb-6 ${
         theme === 'dark'
         ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.01]'
         : ' bg-cyan-500 text-white hover:bg-cyan-400'
      }`}
        
    >
    ثبت اطلاعات
    </button>
    <div className="flex flex-col gap-4">
    <p className={theme === "dark" ? "text-slate-400" : "text-slate-600"}>
  <span className="ml-2 mr-2">📧</span>
  <a 
    href="mailto:Kimiaaa.is.here@gmail.com" 
    className="hover:text-blue-500 transition-colors"
  >
    Kimiaaa.is.here@gmail.com
  </a>
</p>

<p className={theme === "dark" ? "text-slate-400" : "text-slate-600"}>
  <span className="ml-2 mr-1">📱</span>
  <a 
    href="tel:+989106865853" 
    className="hover:text-blue-500 transition-colors"
    dir="ltr"
  >
    +989106865853
  </a>
</p>

<p className={theme === "dark" ? "text-slate-400" : "text-slate-600"}>
  <span className="ml-2 mr-2">💬</span>
  <a 
    href="https://t.me/Kimia_is_here" 
    target="_blank" 
    rel="noopener noreferrer"
    className="hover:text-blue-500 transition-colors"
  >
    t.me/Kimia_is_here
  </a>
</p>
</div>
  </div>
</section>

{/* Modal Form */}
{showForm && <Form onClose={() => setShowForm(false)} theme={theme} />}

            </main>
        </div>
    );
}