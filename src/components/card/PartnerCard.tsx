"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

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
    phone,
    email,
    logoUrl,
    href = "#",
}) => {
    return (
        <div className="w-64 bg-white rounded-3xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.10)] outline -outline-offset-2 outline-stone-50 inline-flex flex-col justify-start items-start overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-md">

            {/* Partner Logo Container */}
            <div className="self-stretch h-36 relative bg-linear-to-b from-blue-800/0 to-blue-800/10 rounded-3xl outline -outline-offset-2 outline-gray-200 overflow-hidden flex items-center justify-center">
                {logoUrl ? (
                    <Image
                        src={logoUrl}
                        alt={`${name} Logo`}
                        width={224}
                        height={56}
                        unoptimized
                        className="w-56 h-14 object-contain"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-primary font-poppins text-lg font-semibold px-4 text-center">
                        {name}
                    </div>
                )}
            </div>

            {/* Content Area */}
            <div className="self-stretch p-6 rounded-bl-[32px] rounded-br-[32px] flex flex-col justify-start items-start gap-6 overflow-hidden">

                {/* Name and Location */}
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                    <h3 className="justify-start text-primary text-base font-semibold font-poppins">
                        {name}
                    </h3>
                    <div className="justify-start text-black text-sm font-normal font-poppins">
                        {location}
                    </div>
                </div>

                {/* Contact Info */}
                <div className="self-stretch flex flex-col justify-start items-start gap-3">

                    {/* Phone (No Telp) */}
                    <div className="px-2.5 py-1.5 bg-primary/10 rounded-[64px] inline-flex justify-center items-center gap-2">
                        <span
                            style={{
                                maskImage: 'url("/icons/Message 18.svg")',
                                WebkitMaskImage: 'url("/icons/Message 18.svg")',
                            }}
                            className="size-4 bg-primary mask-contain mask-no-repeat mask-center shrink-0"
                            aria-hidden="true"
                        />
                        <span className="justify-start text-primary text-sm font-normal font-poppins">
                            {phone}
                        </span>
                    </div>

                    {/* Email */}
                    <div className="px-2.5 py-1.5 bg-primary/10 rounded-[64px] inline-flex justify-center items-center gap-2">
                        <span
                            style={{
                                maskImage: 'url("/icons/Message 36.svg")',
                                WebkitMaskImage: 'url("/icons/Message 36.svg")',
                            }}
                            className="size-4 bg-primary mask-contain mask-no-repeat mask-center shrink-0"
                            aria-hidden="true"
                        />
                        <span className="justify-start text-primary text-sm font-normal font-poppins">
                            {email}
                        </span>
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
