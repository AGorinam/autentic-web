import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";

function Hero() {
  const [sourceIndex, setSourceIndex] = useState(0);
  const feedbackSources = useMemo(
    () => [
      "Sales calls",
      "CS tickets",
      "Emails",
      "CS calls",
      "Reviews"
    ],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (sourceIndex === feedbackSources.length - 1) {
        setSourceIndex(0);
      } else {
        setSourceIndex(sourceIndex + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [sourceIndex, feedbackSources]);

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
          <div>
            <Button variant="secondary" size="sm" className="gap-4">
              Read our launch article <MoveRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
              <span className="text-spektr-cyan-50">Convert your</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
                {feedbackSources.map((source, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      sourceIndex === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: sourceIndex > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {source}
                  </motion.span>
                ))}
              </span>
              <span className="text-spektr-cyan-50 block md:inline"> into product feedback</span>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
              Managing a small business today is already tough. Avoid further
              complications by ditching outdated, tedious trade methods. Our
              goal is to streamline SMB trade, making it easier and faster than
              ever.
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <Button size="lg" className="gap-4" variant="outline">
              Jump on a call <PhoneCall className="w-4 h-4" />
            </Button>
            <Button size="lg" className="gap-4">
              Sign up here <MoveRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero }; 