"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
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
            return "/Flags/ID - Indonesia.svg";
        case "india":
            return "/Flags/IN - India.svg";
        case "korea":
        case "south korea":
            return "/Flags/KR - Korea (South).svg";
        case "malaysia":
            return "/Flags/MY - Malaysia.svg";
        case "thailand":
            return "/Flags/TH - Thailand.svg";
        case "singapore":
            return "/Flags/SG - Singapore.svg";
        case "china":
            return "/Flags/CN - China.svg";
        case "united kingdom":
        case "uk":
            return "/Flags/GB-UKM - United Kingdom.svg";
        case "japan":
            return "/Flags/JP - Japan.svg";
        case "taiwan":
            return "/Flags/TW - Taiwan.svg";
        default:
            return null;
    }
};

const getHospitalSlug = (hospitalName: string) => {
    const clean = hospitalName.toLowerCase().trim();
    if (clean.includes("siloam")) return "siloam-hospitals";
    if (clean.includes("mayapada")) return "mayapada-hospital";
    if (clean.includes("prince court") || clean.includes("princecourt")) return "prince-court";
    if (clean.includes("apollo")) return "apollo-hospitals";
    if (clean.includes("ready plastic") || clean.includes("readyplastic")) return "ready-plastic-surgery";
    if (clean.includes("sam hospital") || clean.includes("singapore institute") || clean.includes("sam")) return "sam-hospital";
    if (clean.includes("nulook")) return "nulook-clinic";
    if (clean.includes("royal progress") || clean.includes("royalprogress")) return "royal-progress";
    return hospitalName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
};

export const DoctorModals: React.FC<DoctorModalsProps> = ({
    isOpen,
    doctor,
    onClose,
}) => {
    if (!doctor) return null;

    const flagUrl = getFlagUrl(doctor.region || "");

    // Mock qualifications and languages if not present
    const qualifications = doctor.qualifications || ["MBBS", "M.Medicine (MAL)"];
    const languages = doctor.languages || ["English", "Malay"];

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
                        className="w-full max-w-[800px] p-6 bg-white rounded-[32px] outline-1 -outline-offset-1 outline-gray-200 flex flex-col justify-start items-start gap-6 relative z-10 shadow-2xl"
                    >
                        {/* Header */}
                        <div className="self-stretch inline-flex justify-between items-center w-full">
                            <span className="justify-start text-primary/50 text-sm font-poppins tracking-wider">
                                DOCTOR DETAILS
                            </span>
                            <button
                                onClick={onClose}
                                className="size-8 text-slate-500 hover:bg-slate-100 hover:text-slate-700 rounded-lg transition-all flex items-center justify-center cursor-pointer border-none bg-transparent"
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
                                <div className="w-64 h-48 relative bg-[#EBEFFA] rounded-3xl outline-2 outline-gray-200 overflow-hidden">
                                    {/* Background Decorative Shapes */}
                                    <span
                                        style={{
                                            maskImage: 'url("/icons/assets/lyflineQuarterCircle.svg")',
                                            WebkitMaskImage: 'url("/icons/assets/lyflineQuarterCircle.svg")',
                                        }}
                                        className="absolute top-0 left-0 size-12 pointer-events-none select-none bg-primary/5 mask-contain mask-no-repeat mask-center shrink-0"
                                        aria-hidden="true"
                                    />
                                    <span
                                        style={{
                                            maskImage: 'url("/icons/assets/lyflineHeart.svg")',
                                            WebkitMaskImage: 'url("/icons/assets/lyflineHeart.svg")',
                                        }}
                                        className="absolute bottom-0 right-0 size-14 pointer-events-none select-none bg-primary/5 mask-contain mask-no-repeat mask-center shrink-0"
                                        aria-hidden="true"
                                    />

                                    {doctor.imageUrl ? (
                                        <Image
                                            src={doctor.imageUrl}
                                            alt={doctor.name}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 256px"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-linear-to-b from-indigo-100 to-indigo-50" />
                                    )}
                                </div>

                                {/* Name and Title */}
                                <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
                                    <h3 className="justify-start text-primary text-2xl font-semibold font-poppins">
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
                                    <div className="h-8 px-2.5 py-1.5 bg-white rounded-2xl outline-1 -outline-offset-1 outline-gray-200 inline-flex justify-center items-center gap-2">
                                        {flagUrl ? (
                                            <div className="w-4 h-3 relative overflow-hidden rounded-[2px] outline outline-black">
                                                <Image
                                                    src={flagUrl}
                                                    alt={`${doctor.region} flag`}
                                                    fill
                                                    className="object-contain"
                                                    unoptimized
                                                />
                                            </div>
                                        ) : (
                                            <div className="w-4 h-3 relative bg-white rounded-[2px] outline outline-black overflow-hidden">
                                                <div className="w-4 h-1.5 left-0 top-0 absolute bg-slate-50" />
                                                <div className="w-4 h-1.5 left-0 top-0 absolute bg-red-600" />
                                            </div>
                                        )}
                                        <Link
                                            href={`/partners/${getHospitalSlug(doctor.hospital)}`}
                                            className="justify-start text-primary text-sm font-normal font-poppins hover:underline hover:text-primary-hover transition-colors"
                                        >
                                            {doctor.hospital}
                                        </Link>
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
