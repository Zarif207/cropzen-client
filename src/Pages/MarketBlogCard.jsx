import React from "react";

const MarketBlogCard = ({ image, title, category, date, description }) => {
  return (
    <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition break-inside-avoid mb-6">
      
      {/* Image with natural height */}
      <img
        src={image}
        alt={title}
        className="w-full object-cover"
      />

      <div className="p-4">
        <p className="text-xs uppercase tracking-wide text-green-700 font-semibold">
          {category} · {date}
        </p>

        <h3 className="mt-2 font-semibold text-lg text-gray-900 leading-snug">
          {title}
        </h3>

        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    </article>
  );
};

export default MarketBlogCard;