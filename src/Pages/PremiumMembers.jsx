import React from "react";

const plans = [
  {
    name: "Starter Plan",
    price: "$99",
    duration: "/month",
    features: [
      "Crop Listing Access",
      "Buyer Interest Requests",
      "Basic Crop Analytics",
      "Seasonal Support",
      "Dashboard Overview",
    ],
    highlighted: false,
  },
  {
    name: "Growth Plan",
    price: "$199",
    duration: "/month",
    features: [
      "Unlimited Crop Listings",
      "Priority Buyer Requests",
      "Advanced Crop Analytics",
      "Seasonal Monitoring",
      "Performance Reports",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise Plan",
    price: "$399",
    duration: "/season",
    features: [
      "Premium Listings",
      "Direct Buyer Connections",
      "Market Trend Insights",
      "Dedicated Support",
      "Revenue Optimization",
    ],
    highlighted: false,
  },
];

const PremiumMembers = () => {
  const handlePlanClick = (planName) => {
    console.log(`Selected plan: ${planName}`);
    // later → navigate("/checkout") or Stripe session
  };

  return (
    <section className="bg-[#f3f7f4] py-20 px-4">
      {/* Header */}
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-semibold text-green-900">
          <span className="text-4xl font-extrabold italic tracking-wide">Cropzen</span> — Choose Your
        </h2>
        <p className="text-3xl md:text-4xl font-bold text-green-600 mt-2">
          Pricing Plan
        </p>

        <p className="max-w-2xl mx-auto mt-5 text-green-800 text-sm md:text-base">
          A flexible pricing system built for farmers and buyers to trade crops
          efficiently through a simple, secure, and modern dashboard.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <div
            key={index}
            onClick={() => handlePlanClick(plan.name)}
            className={`cursor-pointer rounded-2xl p-8 shadow-lg transition-all duration-300
              hover:-translate-y-2 hover:shadow-2xl
              ${
                plan.highlighted
                  ? "bg-green-600 text-white scale-105"
                  : "bg-white text-green-900"
              }`}
          >
            <h3 className="text-2xl font-semibold mb-6">{plan.name}</h3>

            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span
                    className={`mt-1 h-2 w-2 rounded-full
                      ${
                        plan.highlighted
                          ? "bg-white"
                          : "bg-green-600"
                      }`}
                  ></span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="border-t border-green-200 pt-6">
              <p className="text-4xl font-bold">
                {plan.price}
                <span className="text-sm font-medium ml-1">
                  {plan.duration}
                </span>
              </p>

              <button
                className={`mt-6 w-full py-3 rounded-lg font-medium transition
                  ${
                    plan.highlighted
                      ? "bg-white text-green-700 hover:bg-green-100"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
              >
                Get Started
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PremiumMembers;