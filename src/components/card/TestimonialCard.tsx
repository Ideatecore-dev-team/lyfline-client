import React from "react";

import { motion } from "framer-motion";

interface TestimonialCardProps {
    quote: string;
    name: string;
    role: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, name, role }) => {
    return (
        <motion.div
            className="w-80 h-96 shrink-0 p-6 relative bg-white rounded-3xl flex flex-col justify-between items-start overflow-hidden border border-slate-100/50 shadow-[0px_2px_2px_0px_rgba(0,0,0,0.05)] cursor-pointer"
            whileHover={{
                y: -10,
                rotateX: 8,
                rotateY: -8,
                boxShadow: "0px 20px 30px rgba(0,0,0,0.12)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{ transformStyle: "preserve-3d", perspective: 1000 }}
        >
            {/* Quote Icon */}
            <div className="relative z-10 animate-fade-in-up" style={{ transform: "translateZ(20px)" }}>
                <span
                    style={{
                        maskImage: 'url("/icons/Quotes.svg")',
                        WebkitMaskImage: 'url("/icons/Quotes.svg")',
                    }}
                    className="w-6 h-5 bg-primary/80 mask-contain mask-no-repeat mask-center block"
                    aria-hidden="true"
                />
            </div>

            {/* Quote Text */}
            <div className="self-stretch flex flex-col justify-start items-start gap-6 relative z-10 flex-1 my-4 overflow-y-auto no-scrollbar" style={{ transform: "translateZ(10px)" }}>
                <p className="self-stretch text-primary text-sm font-normal font-poppins leading-relaxed whitespace-pre-line">
                    {quote}
                </p>
            </div>

            {/* User Info Signature */}
            <div className="flex justify-start items-stretch gap-3 relative z-10 w-full mt-auto" style={{ transform: "translateZ(15px)" }}>
                <div className="w-0 border-l-2 border-primary shrink-0"></div>
                <div className="w-44 inline-flex flex-col justify-start items-start">
                    <div className="self-stretch justify-start text-primary text-base font-medium font-poppins truncate w-full">
                        {name}
                    </div>
                    <div className="self-stretch justify-start text-primary text-sm font-normal font-poppins truncate w-full">
                        {role}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default TestimonialCard;
