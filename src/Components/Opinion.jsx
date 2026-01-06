import React, { useState } from "react";

const slides = [
  {
    left: {
      title: "The Best Farm I Trust Uses Products",
      text: `Having been a host farmer for three seasons, we’ve seen firsthand the
      difference this internship makes in beginning farmers and host farms alike.
      As a farmer it is difficult to weigh the benefits of hosting young farmers.
      Fresh energy and enthusiasm.`,
      name: "Christine Rose",
      role: "Director, Radical Orange Pty Ltd.",
      img: "https://i.pravatar.cc/100?img=12",
    },
    right: {
      title: "Rogue Farm Crops Has Helped Us Recruit And Retain Great!",
      text: `As you know I am an organic wheat farmer here in Wyoming and we had one
      of the driest and coldest winters on record. I used your MycoApply granular
      on my winter wheat and I am very pleased at what I am seeing.`,
      name: "Sincerely",
      role: "General Agriculture Crop Consultant",
      img: "https://i.pravatar.cc/100?img=32",
    },
  },
  {
    left: {
      title: "Reliable Support For Organic Farmers",
      text: `The quality and consistency of the products exceeded expectations.
      Soil health and crop resilience improved noticeably within a short time.`,
      name: "Jonathan Green",
      role: "Organic Farm Owner",
      img: "https://i.pravatar.cc/100?img=45",
    },
    right: {
      title: "Proven Results In Difficult Conditions",
      text: `Even under extreme climate stress, the results remained strong.
      Root depth and nutrient uptake were significantly better.`,
      name: "Emily Watson",
      role: "Crop Research Specialist",
      img: "https://i.pravatar.cc/100?img=18",
    },
  },
  {
    left: {
      title: "Trusted By Professionals",
      text: `We rely on these products season after season.
      The performance and service quality have been consistently excellent.`,
      name: "Michael Scott",
      role: "Agricultural Consultant",
      img: "https://i.pravatar.cc/100?img=22",
    },
    right: {
      title: "Noticeable Yield Improvement",
      text: `Crop yield and soil quality improved noticeably.
      These products have become a permanent part of our process.`,
      name: "Sarah Bloom",
      role: "Sustainable Farm Manager",
      img: "https://i.pravatar.cc/100?img=27",
    },
  },
];

const Opinion = () => {
  const [index, setIndex] = useState(0);

  const prev = () =>
    setIndex(index === 0 ? slides.length - 1 : index - 1);
  const next = () =>
    setIndex(index === slides.length - 1 ? 0 : index + 1);

  return (
    <section className="bg-[#fbfbf6] py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* HEADER */}
        <div className="mb-20">
          <p className="text-green-700 font-semibold italic mb-3 tracking-wide">
            Testimonials From People Who Have Experienced It
          </p>

          <div className="flex items-center justify-between flex-wrap gap-6">
            <h2 className="text-4xl md:text-5xl font-serif font-semibold text-gray-900">
              What Customers Says?
            </h2>

            <div className="text-right">
              <p className="italic text-gray-500 text-sm">Trust By Clients</p>
              <h3 className="text-4xl font-semibold text-green-700 italic">
                12,980+
              </h3>
            </div>
          </div>
        </div>

        {/* SLIDER */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-[900ms] ease-[cubic-bezier(0.25,0.8,0.25,1)]"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {slides.map((slide, i) => (
                <div
                  key={i}
                  className="min-w-full grid grid-cols-1 md:grid-cols-2 gap-16"
                >
                  {[slide.left, slide.right].map((item, idx) => (
                    <div key={idx}>
                      <h3 className="text-lg font-semibold text-gray-900 mb-5 italic">
                        {item.title}
                      </h3>

                      <p className="text-gray-600 italic leading-relaxed mb-10">
                        {item.text}
                      </p>

                      <div className="flex items-center gap-4">
                        <img
                          src={item.img}
                          alt=""
                          className="w-14 h-14 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-semibold italic text-gray-900">
                            {item.name}
                          </p>
                          <p className="text-sm italic text-gray-500">
                            {item.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* FANCY ARROWS */}
          <button
            onClick={prev}
            className="absolute -left-14 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-green-600 text-green-700 flex items-center justify-center text-xl hover:bg-green-600 hover:text-white transition-all duration-300 shadow-md"
          >
            ❮
          </button>

          <button
            onClick={next}
            className="absolute -right-14 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-green-600 text-green-700 flex items-center justify-center text-xl hover:bg-green-600 hover:text-white transition-all duration-300 shadow-md"
          >
            ❯
          </button>
        </div>
      </div>
    </section>
  );
};

export default Opinion;