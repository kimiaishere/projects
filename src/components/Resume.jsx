import TechBackground from "./TechBackground";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../context/ThemeContext";
import { useState, useEffect, useRef } from "react";
import Form from "./Form";
import { motion } from "framer-motion";

// تعریف انیمیشن‌های مورد نیاز
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// کامپوننت انیمیشن اسکرول ساده برای سایر بخش‌ها
const AnimateOnScroll = ({ children, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-16 scale-95"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

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
        title: "فرم ثبت اطلاعات",
        description: "فرم کامل ثبت اطلاعات با اعتبارسنجی، تقویم شمسی و ذخیره داده‌ها",
        github: "https://github.com/kimiaishere/form",
        tech: ["React", "Tailwind", "Yup", "Axios"],
        features: ["اعتبارسنجی پیشرفته", "تقویم شمسی", "مودال", "دارک/لایت مود"]
    },
    {
        title: "اپلیکیشن Todo",
        description: "مدیریت وظایف روزانه با قابلیت افزودن، حذف و ویرایش",
        github: "https://github.com/kimiaishere/todo",
        tech: ["React", "Tailwind", "LocalStorage"],
        features: ["افزودن/حذف وظیفه", "ویرایش", "ذخیره در مرورگر"]
    },
    {
        title: "Gapgpt",
        description: "پروژه هوش مصنوعی و چت‌بات با قابلیت‌های پیشرفته",
        github: "https://github.com/kimiaishere/Gapgpt",
        tech: ["React", "AI", "Tailwind"],
        features: ["چت با هوش مصنوعی", "رابط کاربری زیبا"]
    },
    {
        title: "رزومه شخصی",
        description: "وبسایت رزومه شخصی با قابلیت‌های تعاملی و تم دارک/لایت",
        github: "https://github.com/kimiaishere/portfolio",
        tech: ["React", "Tailwind", "Context API"],
        features: ["تم دارک/لایت", "فرم تماس", "انیمیشن‌ها"]
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
                font-AzarMehr
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
                <AnimateOnScroll>
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
                            
                            <div className="md:text-center">
                                <h1 className="text-4xl md:text-6xl font-black mb-4">
                                    کیمیا بذرافشان
                                </h1>

                                <h2 className={`text-xl md:text-2xl mb-6 ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
                                    Front-End Developer in Progress 🚀
                                </h2>

                                <p className={`leading-8 dir-rtl text-center ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                                    من یک توسعه‌دهنده فرانت‌اند هستم
                                    که از تبدیل ایده‌ها به تجربه‌های کاربری جذاب و کاربردی لذت می‌برم.
                                    همواره تلاش می‌کنم با یادگیری مستمر و استفاده از فناوری‌های مدرن،
                                    محصولاتی با کیفیت و عملکرد بالا ایجاد کنم.
                                </p>

                                <div className="flex gap-4 mt-8 justify-center md:justify-center">
                                    <button className={`
                                        px-6 py-3 
                                        rounded-xl 
                                        cursor-pointer 
                                        transition-all 
                                        duration-300 
                                        font-medium
                                        hover:scale-105
                                        ${theme === "dark"
                                            ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/30"
                                            : "bg-gradient-to-r from-pink-200 to-rose-200 hover:from-pink-300 hover:to-rose-300 text-slate-700 shadow-lg shadow-pink-200/40"
                                        }
                                    `}>
                                        دانلود رزومه
                                    </button>

                                    <button className={`
                                        px-6 py-3 
                                        rounded-xl 
                                        cursor-pointer 
                                        border-2
                                        transition-all 
                                        duration-300 
                                        font-medium
                                        hover:scale-105
                                        ${theme === "dark"
                                            ? "border-white/30 hover:border-blue-500/50 hover:bg-blue-500/10 text-white"
                                            : "border-pink-200 hover:border-pink-300 hover:bg-pink-50/40 text-slate-600"
                                        }
                                    `}>
                                        مشاهده پروژه‌ها
                                    </button>
                                </div>
                            </div>

                            {/* Avatar Section - بدون انیمیشن ورود */}
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
                                        <div className="bottom-0 absolute h-[90%] w-full overflow-visible">
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
                                                "
                                            />
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
                </AnimateOnScroll>

                {/* ABOUT */}
                <AnimateOnScroll delay={100}>
                    <section className="max-w-6xl mx-auto px-6 py-20">
                        <div className={`${sectionClass} text-center p-8 dir-rtl md:p-12`}>
                            <h2 className="text-3xl font-bold mb-6">درباره من</h2>
                            
                            <div className="max-w-3xl mx-auto space-y-4 text-right">
                                <p className={`leading-8 ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
                                    <span className="font-bold text-lg">سلام! من کیمیا هستم.</span> 
                                    {' '}مهندس عمران که همیشه عاشق دنیای کد بودم. از ۱۹ سالگی آرزوی برنامه‌نویس شدن رو داشتم، 
                                    اما مسیر زندگی من رو به راه‌های دیگه برد. تا اینکه در ۲۴ سالگی تصمیم گرفتم 
                                    بالاخره به این اشتیاق قدیمی پاسخ بدم و از صفر شروع کردم.
                                </p>
                                
                                <p className={`leading-8 ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
                                    الان دو ماهه که دارم با تمام وجود برنامه‌نویسی یاد می‌گیرم و هر روز بیشتر عاشقش می‌شوم. 
                                    از ساخت فرم‌های ساده شروع کردم و الان دارم به سمت پروژه‌های پیچیده‌تر و جذاب‌تر می‌رم.
                                </p>
                                
                                <p className={`leading-8 ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
                                    <span className="font-semibold">چشم‌انداز من:</span> 
                                    {' '}تبدیل شدن به یک توسعه‌دهنده فول‌استک که توی حوزه هوش مصنوعی و 
                                    <span className="font-medium text-rose-400"> Three.js</span> 
                                    {' '}تخصص داره. دوست دارم روزی بتونم به‌صورت ریموت کار کنم و توی پروژه‌های بین‌المللی مشارکت داشته باشم.
                                </p>
                                
                                <div className={`pt-4 mt-4 border-t ${theme === "dark" ? "border-white/10" : "border-slate-200"}`}>
                                    <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                                        💫 "هیچ‌وقت برای شروع دیر نیست، فقط کافیه با عشق شروع کنی."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </AnimateOnScroll>

                {/* JOURNEY SECTION - با انیمیشن از سمت مخالف خط وسط */}
                <motion.section 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                    variants={fadeInUp}
                    className="text-center max-w-6xl mx-auto px-6 py-20"
                >
                    <motion.h2 
                        initial={{ opacity: 0, y: -30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.6 }}
                        className="text-center text-3xl font-bold mb-16"
                    >
                        مسیر من
                    </motion.h2>
                    <div className="relative">
                        <div className={`
                            absolute right-1/2 
                            w-0.5 h-full 
                            ${theme === "dark" 
                                ? "bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500" 
                                : "bg-gradient-to-b from-rose-300 via-pink-300 to-rose-200"
                            }
                            translate-x-1/2
                        `} />
                        
                        {/* آیتم اول - تحصیلات (از راست به چپ) */}
                        <motion.div 
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, amount: 0.3 }}
                            variants={fadeInRight}
                            className="flex items-center justify-between mb-16 relative"
                        >
                            <div className="w-[45%]"></div>
                            <motion.div 
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: false }}
                                transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                                className={`
                                absolute right-1/2 translate-x-1/2
                                w-6 h-6 rounded-full border-4 z-10
                                ${theme === "dark" 
                                    ? "bg-blue-500 border-blue-300 shadow-lg shadow-blue-500/50" 
                                    : "bg-rose-300 border-white shadow-lg shadow-rose-200/60"
                                }
                                animate-pulse
                            `} />
                            <motion.div 
                                whileHover={{ scale: 1.05 }}
                                className={`
                                w-[45%] p-8 rounded-3xl backdrop-blur-xl border
                                transform transition-all duration-500
                                ${theme === "dark"
                                    ? "bg-white/5 border-white/10 hover:border-blue-500/30"
                                    : "bg-white/70 border-rose-200 shadow-lg hover:shadow-rose-200/30"
                                }
                            `}>
                                <div className="text-5xl mb-3">🎓</div>
                                <h3 className="text-2xl font-bold mb-2">تحصیلات</h3>
                                <p className={`text-lg ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                                    لیسانس مهندسی عمران
                                </p>
                                <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                                    اما قلبم همیشه جای دیگه بود...
                                </p>
                            </motion.div>
                        </motion.div>
                        
                        {/* آیتم دوم - شروع تازه (از چپ به راست) */}
                        <motion.div 
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, amount: 0.3 }}
                            variants={fadeInLeft}
                            className="flex items-center justify-between mb-16 relative"
                        >
                            <motion.div 
                                whileHover={{ scale: 1.05 }}
                                className={`
                                w-[45%] p-8 rounded-3xl backdrop-blur-xl border
                                transform transition-all duration-500
                                ${theme === "dark"
                                    ? "bg-white/5 border-white/10 hover:border-purple-500/30"
                                    : "bg-white/70 border-pink-200 shadow-lg hover:shadow-pink-200/30"
                                }
                            `}>
                                <div className="text-5xl mb-3">🚀</div>
                                <h3 className="text-2xl font-bold mb-2">شروع تازه</h3>
                                <p className={`text-lg ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                                    از بهار ۱۴۰۵
                                </p>
                                <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                                    شروع از صفر مطلق با عشق
                                </p>
                            </motion.div>
                            <motion.div 
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: false }}
                                transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                                className={`
                                absolute right-1/2 translate-x-1/2
                                w-6 h-6 rounded-full border-4 z-10
                                ${theme === "dark" 
                                    ? "bg-purple-500 border-purple-300 shadow-lg shadow-purple-500/50" 
                                    : "bg-pink-300 border-white shadow-lg shadow-pink-200/60"
                                }
                                animate-pulse
                            `} />
                            <div className="w-[45%]"></div>
                        </motion.div>
                        
                        {/* آیتم سوم - هدف نهایی (از راست به چپ) */}
                        <motion.div 
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, amount: 0.3 }}
                            variants={fadeInRight}
                            className="flex items-center justify-between relative"
                        >
                            <div className="w-[45%]"></div>
                            <motion.div 
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: false }}
                                transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                                className={`
                                absolute right-1/2 translate-x-1/2
                                w-6 h-6 rounded-full border-4 z-10
                                ${theme === "dark" 
                                    ? "bg-pink-500 border-pink-300 shadow-lg shadow-pink-500/50" 
                                    : "bg-rose-300 border-white shadow-lg shadow-rose-200/60"
                                }
                                animate-pulse
                            `} />
                            <motion.div 
                                whileHover={{ scale: 1.05 }}
                                className={`
                                w-[45%] p-8 rounded-3xl backdrop-blur-xl border
                                transform transition-all duration-500
                                ${theme === "dark"
                                    ? "bg-white/5 border-white/10 hover:border-pink-500/30"
                                    : "bg-white/70 border-rose-200 shadow-lg hover:shadow-rose-200/30"
                                }
                            `}>
                                <div className="text-5xl mb-3">🎯</div>
                                <h3 className="text-2xl font-bold mb-2">هدف نهایی</h3>
                                <p className={`text-lg ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                                    Full-Stack Developer
                                </p>
                                <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                                    + تخصص در AI و Three.js
                                </p>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.section>

                {/* PROJECTS */}
                <AnimateOnScroll delay={300}>
                    <section className="dir-rtl max-w-6xl mx-auto px-6 py-20">
                        <h2 className="text-center text-3xl font-bold mb-10">پروژه‌ها</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {projects.map((project) => (
                                <div
                                    key={project.title}
                                    className={`
                                        p-8
                                        rounded-3xl
                                        backdrop-blur-xl
                                        border
                                        transition-all
                                        duration-300
                                        hover:-translate-y-2
                                        rtl
                                        text-right
                                        ${theme === "dark"
                                            ? "bg-white/5 border-white/10 hover:border-blue-500/50"
                                            : "bg-white/65 border-slate-200 shadow-md hover:shadow-xl"
                                        }
                                    `}
                                >
                                    <div className="flex justify-between h-[48px] items-start mb-3">
                                        <h3 className="text-2xl font-bold">{project.title}</h3>
                                    </div>
                                    
                                    <p className={`mb-4 ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                                        {project.description}
                                    </p>
                                    
                                    {project.features && (
                                        <div className="mb-4 h-[120px]">
                                            <p className={`text-sm font-semibold mb-2 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                                                ✨ ویژگی‌ها:
                                            </p>
                                            <ul className="space-y-1">
                                                {project.features.map((feature, index) => (
                                                    <li key={index} className={`text-sm flex items-center gap-2 ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                                                        <span className={`${theme === "dark" ? "text-blue-400" : "text-pink-300"}`}>•</span>
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.tech && project.tech.map((tech) => (
                                            <span 
                                                key={tech}
                                                className={`
                                                    px-3 py-1 
                                                    rounded-full 
                                                    text-xs 
                                                    font-medium
                                                    ${theme === "dark"
                                                        ? "bg-white/10 text-slate-300 border border-white/5"
                                                        : "bg-pink-50/50 text-slate-700 border border-pink-200"
                                                    }
                                                `}
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`
                                            inline-flex 
                                            items-center 
                                            gap-2 
                                            px-4 
                                            py-2.5 
                                            rounded-xl 
                                            transition-all 
                                            duration-300
                                            font-medium
                                            hover:scale-105
                                            ${theme === "dark"
                                                ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/25"
                                                : "bg-gradient-to-r from-pink-200 to-rose-200 hover:from-pink-300 hover:to-rose-300 text-slate-700 shadow-pink-200/40"
                                            }
                                        `}
                                    >
                                        <span>📂</span>
                                        مشاهده در GitHub
                                    </a>
                                </div>
                            ))}
                        </div>
                    </section>
                </AnimateOnScroll>

                {/* WHAT I'M LEARNING */}
                <AnimateOnScroll delay={400}>
                    <section className="dir-rtl max-w-6xl mx-auto px-6 py-12">
                        <div className={`${sectionClass} p-10`}>
                            <h2 className="text-center text-3xl font-bold mb-6"> الان دارم یاد می‌گیرم</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className={`p-6 rounded-2xl border transition-all duration-300 hover:scale-105 ${theme === "dark" ? "border-white/10" : "border-rose-100 bg-rose-50/30"}`}>
                                    <h3 className="text-xl font-bold mb-2">🎨 Three.js</h3>
                                    <p className={`text-sm ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
                                        عاشق ترکیب هنر و کدم! می‌خوام با Three.js تجربه‌های سه‌بعدی جذاب بسازم.
                                    </p>
                                </div>
                                <div className={`p-6 rounded-2xl border transition-all duration-300 hover:scale-105 ${theme === "dark" ? "border-white/10" : "border-rose-100 bg-rose-50/30"}`}>
                                    <h3 className="text-xl font-bold mb-2">🧠 هوش مصنوعی</h3>
                                    <p className={`text-sm ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
                                        هدفم تسلط به AI و ساخت اپلیکیشن‌های هوشمنده. توی Gapgpt اولین قدم رو برداشتم.
                                    </p>
                                </div>
                                <div className={`p-6 rounded-2xl border transition-all duration-300 hover:scale-105 ${theme === "dark" ? "border-white/10" : "border-rose-100 bg-rose-50/30"}`}>
                                    <h3 className="text-xl font-bold mb-2">⚛️ Next.js</h3>
                                    <p className={`text-sm ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
                                        دارم فریم‌ورک‌های جدید رو یاد می‌گیرم تا پروژه‌های حرفه‌ای‌تر بسازم.
                                    </p>
                                </div>
                                <div className={`p-6 rounded-2xl border transition-all duration-300 hover:scale-105 ${theme === "dark" ? "border-white/10" : "border-rose-100 bg-rose-50/30"}`}>
                                    <h3 className="text-xl font-bold mb-2">🌐 Backend</h3>
                                    <p className={`text-sm ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
                                        قدم‌های اولیه برای تبدیل شدن به یه فول‌استک واقعی.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </AnimateOnScroll>

                {/* CONTACT */}
                <AnimateOnScroll delay={500}>
                    <section className="max-w-6xl mx-auto px-6 pb-24">
                        <div className={`${sectionClass} p-10 text-center`}>
                            <button
                                onClick={() => setShowForm(true)}
                                className={`
                                    px-8 
                                    py-3.5 
                                    transition-all 
                                    duration-300
                                    cursor-pointer 
                                    rounded-xl 
                                    transform 
                                    hover:scale-105 
                                    shadow-lg 
                                    mb-8
                                    font-medium
                                    ${theme === 'dark'
                                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-blue-500/30'
                                        : 'bg-gradient-to-r from-pink-200 to-rose-200 hover:from-pink-300 hover:to-rose-300 text-slate-700 shadow-pink-200/40'
                                    }
                                `}
                            >
                                 ثبت اطلاعات
                            </button>
                            
                            <div className="flex flex-col gap-4">
                                <p className={theme === "dark" ? "text-slate-400" : "text-slate-600"}>
                                    <span className="ml-2 mr-2">📧</span>
                                    <a 
                                        href="mailto:Kimiaaa.is.here@gmail.com" 
                                        className={`transition-colors ${theme === "dark" ? "hover:text-blue-400" : "hover:text-pink-400"}`}
                                    >
                                        Kimiaaa.is.here@gmail.com
                                    </a>
                                </p>

                                <p className={theme === "dark" ? "text-slate-400" : "text-slate-600"}>
                                    <span className="ml-2 mr-1">📱</span>
                                    <a 
                                        href="tel:+989106865853" 
                                        className={`transition-colors ${theme === "dark" ? "hover:text-blue-400" : "hover:text-pink-400"}`}
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
                                        className={`transition-colors ${theme === "dark" ? "hover:text-blue-400" : "hover:text-pink-400"}`}
                                    >
                                        t.me/Kimia_is_here
                                    </a>
                                </p>
                            </div>
                        </div>
                    </section>
                </AnimateOnScroll>

                {showForm && <Form onClose={() => setShowForm(false)} theme={theme} />}

            </main>
        </div>
    );
}