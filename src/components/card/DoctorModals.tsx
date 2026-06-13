"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { Doctor } from "@/data/mockData";

interface DoctorModalsProps {
    isOpen: boolean;
    doctor: Doctor | null;
    onClose: () => void;
}

const getFlagUrl = (country: string) => {
    switch (country.toLowerCase()) {
        case "indonesia":
            return "/Flags/ID-Indonesia icon.png";
        case "india":
            return "/Flags/IN-India icon.png";
        case "korea":
        case "south korea":
            return "/Flags/KR-Korea icon.png";
        case "malaysia":
            return "/Flags/MY-malaysia icon.png";
        case "thailand":
            return "/Flags/TH-Thailand icon.png";
        default:
            return null;
    }
};

export const DoctorModals: React.FC<DoctorModalsProps> = ({
    isOpen,
    doctor,
    onClose,
}) => {
    if (!doctor) return null;

    const flagUrl = getFlagUrl(doctor.region || "");

    // Mock qualifications and languages if not present
    const qualifications = (doctor as any).qualifications || ["MBBS", "M.Medicine (MAL)"];
    const languages = (doctor as any).languages || ["English", "Malay"];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
                    {/* Backdrop Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 cursor-pointer"
                    />

                    {/* Modal Card Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 15 }}
                        transition={{ type: "spring", duration: 0.4 }}
                        className="w-full max-w-[800px] p-6 bg-white rounded-[32px] outline-1 outline-offset-[-1px] outline-gray-200 flex flex-col justify-start items-start gap-6 relative z-10 shadow-2xl"
                    >
                        {/* Header */}
                        <div className="self-stretch inline-flex justify-between items-center w-full">
                            <span className="justify-start text-primary/50 text-sm font-semibold font-poppins tracking-wider">
                                DOCTOR DETAILS
                            </span>
                            <button
                                onClick={onClose}
                                className="size-6 text-primary hover:text-slate-700 transition-colors flex items-center justify-center cursor-pointer"
                                aria-label="Close modal"
                            >
                                <span
                                    style={{
                                        maskImage: 'url("/icons/Close.svg")',
                                        WebkitMaskImage: 'url("/icons/Close.svg")',
                                    }}
                                    className="size-4 bg-current mask-contain mask-no-repeat mask-center shrink-0"
                                />
                            </button>
                        </div>

                        {/* Divider line */}
                        <hr className="w-full border-t border-gray-200" />

                        {/* Main Content Layout */}
                        <div className="self-stretch flex flex-col md:flex-row justify-start items-stretch gap-8 w-full">

                            {/* Left Column: Image and Name info */}
                            <div className="w-64 shrink-0 flex flex-col justify-start items-start gap-6">
                                {/* Doctor Image Container */}
                                <div className="w-64 h-48 relative bg-indigo-50 rounded-3xl outline-2 outline-gray-200 overflow-hidden">
                                    <div className="size-14 left-[213px] top-[138.50px] absolute bg-primary/5 z-10" />
                                    <div className="size-28 left-[-60px] top-[-59.50px] absolute bg-primary/5 rounded-full z-10" />

                                    {doctor.imageUrl ? (
                                        <Image
                                            src={doctor.imageUrl}
                                            alt={doctor.name}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 256px"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-b from-indigo-100 to-indigo-50" />
                                    )}
                                </div>

                                {/* Name and Specialty */}
                                <div className="self-stretch flex flex-col justify-start items-start gap-1">
                                    <h3 className="justify-start text-slate-800 text-2xl font-semibold font-poppins">
                                        {doctor.name}
                                    </h3>
                                    <div className="px-2.5 py-1.5 bg-indigo-50 border border-indigo-100 rounded-2xl inline-flex justify-center items-center gap-2">
                                        <span className="justify-start text-primary text-sm font-normal font-poppins">
                                            {doctor.specialty}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Spec / qualifications / languages */}
                            <div className="flex-1 flex flex-col justify-between items-start gap-6">

                                {/* Specialty */}
                                <div className="self-stretch flex flex-col justify-start items-start gap-1">
                                    <span className="justify-start text-primary/50 text-sm font-semibold font-poppins tracking-wider">
                                        Speciality
                                    </span>
                                    <Badge
                                        text={doctor.specialty}
                                        variant="green"
                                        showDot={true}
                                    />
                                </div>

                                {/* Qualifications & Languages */}
                                <div className="self-stretch inline-flex justify-between items-start gap-4">

                                    {/* Qualifications Stack */}
                                    <div className="flex-1 inline-flex flex-col justify-start items-start gap-1">
                                        <span className="justify-start text-primary/50 text-sm font-semibold font-poppins tracking-wider">
                                            Qualifications
                                        </span>
                                        <div className="flex flex-col gap-1.5 items-start">
                                            {qualifications.map((q: string, idx: number) => (
                                                <div
                                                    key={idx}
                                                    className="px-3 py-1.5 bg-primary/10 rounded-[64px] inline-flex justify-center items-center gap-2"
                                                >
                                                    <span className="justify-start text-primary text-sm font-normal font-poppins">
                                                        {q}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Languages Stack */}
                                    <div className="flex-1 inline-flex flex-col justify-start items-start gap-1">
                                        <span className="justify-start text-primary/50 text-sm font-semibold font-poppins tracking-wider">
                                            Languages
                                        </span>
                                        <div className="flex flex-col gap-1.5 items-start">
                                            {languages.map((l: string, idx: number) => (
                                                <div
                                                    key={idx}
                                                    className="px-3 py-1.5 bg-primary/10 rounded-[64px] inline-flex justify-center items-center gap-2"
                                                >
                                                    <span className="justify-start text-primary text-sm font-normal font-poppins">
                                                        {l}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                </div>

                                {/* Hospital details */}
                                <div className="self-stretch h-14 flex flex-col justify-start items-start gap-1">
                                    <span className="justify-start text-primary/50 text-sm font-semibold font-poppins tracking-wider">
                                        Hospital
                                    </span>
                                    <div className="h-8 px-2.5 py-1.5 bg-white rounded-2xl outline-1 outline-offset-[-1px] outline-gray-200 inline-flex justify-center items-center gap-2">
                                        {flagUrl ? (
                                            <div className="w-4 h-3 relative overflow-hidden rounded-[1px]">
                                                <Image
                                                    src={flagUrl}
                                                    alt={`${doctor.region} flag`}
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>
                                        ) : (
                                            <div className="w-4 h-3 relative bg-white rounded-[1px] outline-1 outline-black overflow-hidden">
                                                <div className="w-4 h-3 left-0 top-0 absolute bg-slate-50" />
                                                <div className="w-4 h-1.5 left-0 top-0 absolute bg-red-600" />
                                            </div>
                                        )}
                                        <span className="justify-start text-primary text-sm font-normal font-poppins">
                                            {doctor.hospital}
                                        </span>
                                    </div>
                                </div>

                                {/* CTA Button */}
                                <a href="#appointment" onClick={onClose} className="w-full mt-2">
                                    <Button
                                        variant="primary"
                                        text="Make an Appointment"
                                        className="w-full font-poppins text-base font-semibold"
                                    />
                                </a>

                            </div>

                        </div>

                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default DoctorModals;
