import Link from "next/link";
import { Phone } from "lucide-react";
import { memo } from "react";

const CallButton = memo(function CallButton({ phone }) {
  if (!phone) return null;

  return (
    <div 
      className="grid md:hidden fixed bottom-0 left-0 right-0 z-50 p-2 bg-white"
      style={{ contain: 'layout' }} // Prevent layout shifts
    >
      <div className="w-full bg-gradient-to-b from-green-700 via-lime-600 to-green-600 rounded-md flex flex-col items-center justify-center py-3">
        <Link
          title="Call Button"
          href={`tel:${phone}`}
          className="flex flex-col text-white items-center justify-center w-full font-barlow"
          prefetch={false} // Don't prefetch tel: links
        >
          <div className="flex items-center mb-1">
            <Phone className="w-8 h-8 mr-3" aria-hidden="true" />
            <div className="uppercase text-4xl font-extrabold">
              CALL US NOW
            </div>
          </div>
          <div className="text-3xl font-semibold">
            {phone}
          </div>
        </Link>
      </div>
    </div>
  );
});

export default CallButton;