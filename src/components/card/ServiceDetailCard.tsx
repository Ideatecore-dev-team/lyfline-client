"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import IconButton from "@/components/IconButton";

interface ServiceDetailCardProps {
    icon: string;
    title: string;
    description: string;
    bullets?: string[];
    isOpen?: boolean;
    onToggle?: () => void;
}

export const ServiceDetailCard: React.FC<ServiceDetailCardProps> = ({
    icon,
    title,
    description,
    bullets = [],
    isOpen: controlledIsOpen,
    onToggle,
}) => {
    const [localIsOpen, setLocalIsOpen] = useState(false);
    const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : localIsOpen;
    const handleToggle = onToggle || (() => setLocalIsOpen(!localIsOpen));

    // Helper to format the icon filename and map generic names to actual assets
    const getIconSrc = (iconName: string) => {
        const mapping: Record<string, string> = {
            Calendar: "Nurse.svg",
            Home: "Medical Shield.svg",
            Truck: "Ambulance - Fast.svg",
            UserCheck: "Stethoscope.svg",
            Plane: "LocationMed.svg",
            ShieldCheck: "Checkup.svg",
        };
        const mappedName = mapping[iconName] || iconName;
        const formattedName = mappedName.endsWith(".svg") ? mappedName : `${mappedName}.svg`;
        return `/icons/${formattedName}`;
    };

    return (
        <div className="self-stretch p-6 relative bg-white rounded-3xl border border-gray-200 flex flex-col justify-start items-start overflow-hidden transition-all duration-300 shadow-[0px_2px_2px_0px_rgba(0,0,0,0.05)] hover:shadow-md">

            {/* Main card header row */}
            <div
                className="self-stretch inline-flex justify-between items-start gap-6 z-10 w-full cursor-pointer select-none"
                onClick={handleToggle}
            >
                <div className="flex-1 flex flex-col md:flex-row justify-start items-start gap-6">
                    {/* Service Icon Box */}
                    <div className="p-4 bg-primary text-white rounded-2xl flex justify-start items-center gap-2.5 shrink-0 shadow-sm">
                        <span
                            style={{
                                maskImage: `url("${getIconSrc(icon)}")`,
                                WebkitMaskImage: `url("${getIconSrc(icon)}")`,
                            }}
                            className="size-6 bg-current mask-contain mask-no-repeat mask-center shrink-0"
                            aria-hidden="true"
                        />
                    </div>

                    {/* Title and Description */}
                    <div className="flex-1 flex flex-col justify-start items-start gap-2">
                        <h3 className="self-stretch justify-start text-red-600 text-xl font-semibold font-poppins leading-tight">
                            {title}
                        </h3>
                        <p className="self-stretch justify-start text-black text-base font-normal font-poppins leading-relaxed">
                            {description}
                        </p>
                    </div>
                </div>

                {/* Accordion Toggle Chevron (using IconButton) */}
                <IconButton
                    variant="primary"
                    icon="Down 2"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleToggle();
                    }}
                    aria-label={isOpen ? "Collapse details" : "Expand details"}
                    className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                />
            </div>

            {/* Accordion expansion block */}
            <motion.div
                initial={false}
                animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden w-full z-10"
            >
                <div className="pt-6 flex flex-col gap-6 w-full">
                    {/* Divider line */}
                    <hr className="w-full border-t border-primary/10" />

                    {/* Value points / bullets list */}
                    {bullets.length > 0 && (
                        <div className="w-full flex flex-col justify-start items-start gap-4 md:pl-20">
                            {bullets.map((bullet, idx) => (
                                <div
                                    key={idx}
                                    className="px-3 py-2 bg-primary/10 rounded-[100px] inline-flex justify-start items-center gap-4 max-w-full"
                                >
                                    <span
                                        style={{
                                            maskImage: 'url("/icons/Tick Square.svg")',
                                            WebkitMaskImage: 'url("/icons/Tick Square.svg")',
                                        }}
                                        className="size-6 bg-primary mask-contain mask-no-repeat mask-center shrink-0"
                                        aria-hidden="true"
                                    />
                                    <span className="justify-start text-primary text-sm font-medium font-poppins text-left">
                                        {bullet}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </motion.div>

        </div>
    );
};

export default ServiceDetailCard;
