import { Link } from "react-router-dom";
import { useTypingStore } from "../zustand";
import NumberFlow from "@number-flow/react";
import { motion, useReducedMotion } from "framer-motion";
import confetti from "canvas-confetti";
import { useEffect } from "react";

interface props {
  status: "NEW_PERSONAL_BEST" | "FIRST_TEST" | "RESULTS";
}

export const ResultsComponenet = ({ status }: props) => {
  const { test, resetTest, setTypingState } = useTypingStore();
  const { wpm, accuracy, chars, errors } = test;
  const shouldReduceMotion = useReducedMotion();

  // Trigger confetti for new personal best
  useEffect(() => {
    if (status === "NEW_PERSONAL_BEST" && !shouldReduceMotion) {
      const colors = [
        "hsl(214, 100%, 55%)", // blue-600
        "hsl(140, 63%, 57%)", // green-500
        "hsl(49, 85%, 70%)",  // yellow-400
        "hsl(354, 63%, 57%)", // red-500
      ];

      confetti({
        particleCount: window.innerWidth < 768 ? 35 : 75,
        angle: 90,
        spread: 100,
        origin: { x: 0.5, y: 0.8 },
        colors,
        gravity: 0.8,
        drift: 0.1,
        ticks: 200,
      });
    }
  }, [status, shouldReduceMotion]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: (shouldReduceMotion ? "tween" : "spring") as "tween" | "spring",
        stiffness: shouldReduceMotion ? undefined : 100,
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: (shouldReduceMotion ? "tween" : "spring") as "tween" | "spring",
        stiffness: shouldReduceMotion ? undefined : 120,
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: (shouldReduceMotion ? "tween" : "spring") as "tween" | "spring",
        stiffness: shouldReduceMotion ? undefined : 200,
        ...(status === "NEW_PERSONAL_BEST" && !shouldReduceMotion && {
          scale: [1, 1.2, 1.1, 1],
          transition: {
            duration: 0.6,
            times: [0, 0.3, 0.6, 1],
            ease: "easeOut" as const,
          },
        }),
        ...(status === "FIRST_TEST" && !shouldReduceMotion && {
          scale: [0, 1.1, 1],
          rotate: [0, 5, -5, 0],
          transition: {
            duration: 0.8,
            ease: "easeOut" as const,
          },
        }),
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: shouldReduceMotion ? 0 : 0.8,
        type: (shouldReduceMotion ? "tween" : "spring") as "tween" | "spring",
        stiffness: shouldReduceMotion ? undefined : 150,
      },
    },
  };

  const starVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: shouldReduceMotion ? 0 : 1.2,
        duration: shouldReduceMotion ? 0.2 : 0.5,
        ease: "easeOut" as const,
      },
      ...(status !== "NEW_PERSONAL_BEST" && !shouldReduceMotion && {
        animate: {
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0],
        },
        transition: {
          y: { duration: 3, repeat: Infinity as number, ease: "easeInOut" as const },
          rotate: { duration: 4, repeat: Infinity as number, ease: "easeInOut" as const },
        },
      }),
    },
  };

  const confettiBgVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: shouldReduceMotion ? 0 : 1.5,
        duration: shouldReduceMotion ? 0.3 : 0.8,
        ease: "easeOut" as const,
      },
      ...(status === "NEW_PERSONAL_BEST" && !shouldReduceMotion && {
        animate: {
          scale: [1, 1.05, 1],
        },
        transition: {
          scale: { duration: 2, repeat: Infinity as number, ease: "easeInOut" as const },
        },
      }),
    },
  };

  return (
    <motion.div
      className="flex flex-col items-center w-full md:gap-12 gap-10 relative flex-1"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={iconVariants}>
        {status !== "NEW_PERSONAL_BEST" ? (
          <div className="rounded-full h-36 w-36 bg-green-500/10 flex items-center justify-center">
            <div className="h-25 w-25 rounded-full bg-green-500/20 flex items-center justify-center">
              <img src="/images/icon-completed.svg" alt="Completed Icon" />
            </div>
          </div>
        ) : (
          <motion.img
            src="/images/icon-new-pb.svg"
            alt="New Personal Best Icon"
            whileHover={!shouldReduceMotion ? { scale: 1.05 } : undefined}
            className="drop-shadow-lg"
            style={{
              filter: "drop-shadow(0 0 20px hsl(214, 100%, 55%))",
            }}
          />
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="text-center flex flex-col gap-2.5">
        <h1 className="font-bold! md:text-[40px] text-[24px]">
          {status === "FIRST_TEST"
            ? "Baseline Established!"
            : status === "NEW_PERSONAL_BEST"
            ? "High Score Smashed!"
            : "Test Complete!"}
        </h1>
        <p className="md:text-[20px] text-[16px] text-neutral-400">
          {status === "FIRST_TEST"
            ? "You've set the bar. Now the real challenge begins—time to beat it."
            : status === "NEW_PERSONAL_BEST"
            ? "You’re getting faster. That was incredible typing."
            : "Solid run. Keep pushing to beat your high score."}
        </p>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="flex md:items-center gap-6 flex-col md:flex-row w-full md:justify-center"
      >
        <motion.div
          className="border rounded-[8px] p-6 border-neutral-700 md:w-1/3! lg:w-70! w-full!"
          variants={itemVariants}
          whileHover={!shouldReduceMotion ? { y: -5, transition: { duration: 0.2 } } : undefined}
        >
          <h2 className="flex flex-col items-start gap-3 text-3xl! font-light!">
            <span className="text-neutral-500">WPM: </span>
            <span className="font-extrabold">
              <NumberFlow format={{ notation: "compact" }} value={wpm} />
            </span>
          </h2>
        </motion.div>
        <motion.div
          className="border rounded-[8px] p-6 border-neutral-700 md:w-1/3! lg:w-70! w-full!"
          variants={itemVariants}
          whileHover={!shouldReduceMotion ? { y: -5, transition: { duration: 0.2 } } : undefined}
        >
          <h2 className="flex flex-col items-start gap-3 text-3xl! font-light!">
            <span className="text-neutral-500">Accuracy: </span>
            <span className={`font-extrabold text-red-500`}>{accuracy}%</span>
          </h2>
        </motion.div>
        <motion.div
          className="border rounded-[8px] p-6 border-neutral-700 md:w-1/3! lg:w-70! w-full!"
          variants={itemVariants}
          whileHover={!shouldReduceMotion ? { y: -5, transition: { duration: 0.2 } } : undefined}
        >
          <h2 className="flex flex-col items-start gap-3 text-3xl! text-neutral-500 font-light!">
            <span className="">Characters </span>
            <span className="flex items-center">
              <span className={`font-extrabold text-green-500`}>{chars}</span> /{" "}
              <span className={`font-extrabold text-red-500`}>{errors}</span>
            </span>
          </h2>
        </motion.div>
      </motion.div>

      <motion.div variants={buttonVariants}>
        <Link to="/" className="decoration-0">
          <motion.button
            className="font-semibold py-5 px-6 rounded-[12px] text-neutral-900 bg-neutral-0 text-xl flex items-center gap-4 md:mt-8! mt-2!"
            whileHover={!shouldReduceMotion ? { scale: 1.05, transition: { duration: 0.2 } } : undefined}
            whileTap={!shouldReduceMotion ? { scale: 0.95 } : undefined}
            onClick={() => {
              resetTest();
              setTypingState("NEW");
            }}
          >
            <span>{status !== "RESULTS" ? "Beat This Score" : "Go Again"}</span>
            <img
              className="invert-1"
              src="/images/icon-undo.svg"
              alt="Restart Icon"
            />
          </motion.button>
        </Link>
      </motion.div>

      {status !== "NEW_PERSONAL_BEST" && (
        <>
          <motion.img
            src="/images/pattern-star-1.svg"
            alt="Star 1 Icon"
            className="absolute bottom-0 right-0"
            variants={starVariants}
          />
          <motion.img
            src="/images/pattern-star-2.svg"
            alt="Star 2 Icon"
            className="absolute top-0 left-0"
            variants={starVariants}
          />
        </>
      )}

      {status === "NEW_PERSONAL_BEST" && (
        <motion.img
          src="/images/pattern-confetti.svg"
          alt="Confetti Pattern Icon"
          className="fixed bottom-0 self-center w-full -z-10 md:h-auto h-56 object-fill"
          variants={confettiBgVariants}
        />
      )}
    </motion.div>
  );
};
