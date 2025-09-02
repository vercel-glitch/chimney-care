import Container from "./common/Container";
import FullContainer from "./common/FullContainer";

const CheckIcon = ({ filled }) => (
  <span
    className={`inline-flex items-center justify-center w-5 h-5 rounded border-2 border-blue-900 mt-1.5 ${
      filled ? "bg-blue-900" : "bg-white"
    }`}
  >
    <svg
      className={`w-4 h-4 ${filled ? "text-white" : "text-blue-900"}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        d="M5 13l4 4L19 7"
      />
    </svg>
  </span>
);

const PromotionCard = ({
  title,
  price,
  originalPrice,
  serviceTitle,
  features,
  isMainCard = false,
  whyUsData,
  filled,
}) => {
  return (
    <div
      className={`relative flex flex-col h-full border-2 border-dashed border-blue-950 rounded-md p-6 transition-all duration-200 ${
        isMainCard
          ? "bg-blue-950 text-white shadow-xl z-10 scale-105"
          : "bg-white text-blue-950"
      }`}
    >
      {title && (
        <div className="mb-3 text-center">
          <h3 className="text-3xl font-extrabold tracking-tight mb-2">
            {title}
          </h3>
          {whyUsData && whyUsData.subheading && (
            <p className="text-2xl font-bold mb-2">{whyUsData.subheading}</p>
          )}
          <div className="border-b border-dotted border-blue-950 w-3/4 mx-auto my-4" />
        </div>
      )}

      {price && (
        <div className=" text-center">
          <div className="flex flex-col items-center justify-center">
            <span className="text-5xl font-extrabold">
              {" "}
              {price !== "Free Estimate" && "$"}
              {price}
            </span>
          </div>
          {serviceTitle && (
            <div className="uppercase text-2xl font-semibold mt-2 leading-tight">
              {serviceTitle}
            </div>
          )}
          {originalPrice && (
            <div className="mt-2 text-lg font-semibold">
              <span className="relative inline-block align-middle">
                <span
                  className={`${
                    isMainCard ? "text-white" : "text-blue-950"
                  } text-2xl font-extrabold`}
                >
                  ${originalPrice}
                </span>

                <svg
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-14 h-[0.25em] pointer-events-none"
                  width="100%"
                  height="0.25em"
                  viewBox="0 0 100 8"
                  preserveAspectRatio="none"
                  style={{
                    minWidth: 40,
                    minHeight: 8,
                    transform: "rotate(-25deg)",
                  }}
                >
                  <line
                    x1="0"
                    y1="7"
                    x2="100"
                    y2="1"
                    stroke="#FF0000"
                    strokeWidth="3"
                  />
                </svg>
              </span>
            </div>
          )}
          <div className="border-b border-dotted border-white/60 border-blue-950 w-3/4 mx-auto my-4" />
        </div>
      )}

      <div className="space-y-3 flex-1">
        {(Array.isArray(features) ? features : [])?.map((feature, index) => (
          <div
            key={index}
            className={`flex items-start gap-2 text-sm font-medium ${
              isMainCard ? "" : "text-black"
            }`}
          >
            <CheckIcon filled={filled} />
            <span className="pt-0.5">{feature}</span>
          </div>
        ))}
      </div>

      <button
        className={`w-full mt-6 py-2 rounded font-bold text-xl tracking-wide transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 ${
          isMainCard
            ? "bg-white text-blue-950 hover:bg-blue-100"
            : "bg-blue-950 text-white hover:bg-blue-800"
        }`}
      >
        Call For Redeem
      </button>
    </div>
  );
};

const FullMonthPromotion = ({ prices }) => {
  // Check if we have a third price or why_choose_us
  const hasThirdPrice = !!prices?.price3;
  const hasWhyChooseUs = !!prices?.why_choose_us;

  return (
    <FullContainer id="promo">
      <Container>
        <div className="w-full py-12">
          <h2 className="text-4xl font-extrabold text-center text-blue-950 mb-8 tracking-tight">
            Full Month Promotion
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 w-full">
            {/* Left Card - Either Why Choose Us or Price3 */}
            {hasWhyChooseUs ? (
              <PromotionCard
                title={prices.why_choose_us.heading}
                whyUsData={prices.why_choose_us}
                features={prices.why_choose_us.features}
                filled={true}
              />
            ) : hasThirdPrice ? (
              <PromotionCard
                price={prices.price1.price_now?.replace("$", "")}
                originalPrice={prices.price1.original_price?.replace("$", "")}
                serviceTitle={prices.price1.service_title}
                features={prices.price1.features}
                filled={true}
              />
            ) : (
              <div /> // Empty div as fallback if neither is present
            )}

            {/* Middle Card - Always Price1 */}
            <PromotionCard
              price={prices?.price2?.price_now?.replace("$", "")}
              originalPrice={prices?.price2?.original_price?.replace("$", "")}
              serviceTitle={prices?.price2?.service_title}
              features={prices?.price2?.features}
              isMainCard={true}
            />

            {/* Right Card - Always Price2 */}
            <PromotionCard
              price={prices?.price3?.price_now?.replace("$", "")}
              originalPrice={prices?.price3?.original_price?.replace("$", "")}
              serviceTitle={prices?.price3?.service_title}
              features={prices?.price3?.features}
              filled={true}
            />
          </div>
        </div>
      </Container>
    </FullContainer>
  );
};

export default FullMonthPromotion;
