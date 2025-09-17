import { Phone } from "lucide-react";
import React from "react";
import Link from "next/link";

export default function PrimaryPhone({ phone }) {
  return (
    <Link href={`tel:${phone}`}>
      <button className="flex items-center justify-center sm:justify-start gap-2 px-6 py-3 min-w-[205px] rounded-full bg-[#1A2956] text-white font-semibold text-lg shadow hover:bg-[#22397a] transition-al">
        <Phone className="w-5 h-5" />
        {phone}
      </button>
    </Link>
  );
}
