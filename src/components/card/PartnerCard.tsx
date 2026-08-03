"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { isVideoUrl } from "@/lib/media";

interface PartnerCardProps {
    name: string;
    location: string;
    phone: string;
    email: string;
    logoUrl?: string;
    href?: string;
}

export const PartnerCard: React.FC<PartnerCardProps> = ({
    name,
    location,
    logoUrl,
    href = "#",
}) => {
    return (
        <div className="w-full min-w-[254px] max-w-[288px] h-full bg-white rounded-3xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.10)] outline -outline-offset-2 outline-stone-50 flex flex-col justify-between items-start overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-md">

            {/* Partner Logo Container */}
            <Link
                href={href}
                className="self-stretch h-36 relative bg-slate-50 rounded-3xl outline -outline-offset-2 outline-gray-200 overflow-hidden flex items-center justify-center cursor-pointer z-10"
            >
                {logoUrl ? (
                    <>
                        {isVideoUrl(logoUrl) ? (
                            <video
                                src={logoUrl}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <Image
                                src={logoUrl}
                                alt={`${name} Logo`}
                                fill
                                className="object-cover"
                            />
                        )}
                    </>
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-primary font-poppins text-lg font-semibold px-4 text-center">
                        {name}
                    </div>
                )}
            </Link>

            {/* Content Area */}
            <div className="self-stretch p-6 rounded-bl-[32px] rounded-br-[32px] grow flex flex-col justify-between items-start gap-6 overflow-hidden">

                {/* Name and Location */}
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                    <h3 className="justify-start text-primary text-base font-semibold font-poppins">
                        {name}
                    </h3>
                    <div className="justify-start text-black text-sm font-normal font-poppins">
                        {location}
                    </div>
                </div>

                {/* Action Link */}
                <Link
                    href={href}
                    className="self-stretch inline-flex justify-center items-center gap-2 text-primary text-sm underline font-medium font-poppins hover:text-primary/50 transition-colors group"
                >
                    View Details
                    <span
                        style={{
                            maskImage: 'url("/icons/Right 1.svg")',
                            WebkitMaskImage: 'url("/icons/Right 1.svg")',
                        }}
                        className="size-4 bg-primary mask-contain mask-no-repeat mask-center shrink-0 group-hover:translate-x-1 transition-all"
                        aria-hidden="true"
                    />
                </Link>
            </div>

        </div>
    );
};

export default PartnerCard;
