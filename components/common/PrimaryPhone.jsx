import { Phone } from "lucide-react";
import React from "react";
import Link from "next/link";

export default function PrimaryPhone({ phone }) {
  return (
    <Link href={`tel:${phone}`}>
      <button className="flex items-center justify-center sm:justify-start gap-2 px-6 py-3 rounded-full bg-[#1A2956] text-white font-semibold text-lg shadow hover:bg-[#22397a] transition-al">
        <Phone className="w-6 h-6" />
        {phone}
      </button>
    </Link>
  );
}
