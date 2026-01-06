import React, { useEffect, useState } from "react";
import MarketBlogCard from "./MarketBlogCard";

/* ================== UNIQUE NEWS DATA ================== */
const allBlogs = [
  {
    image:
      "https://www.povertyactionlab.org/media/image/increasing-small-scale-farmers-access-agricultural-markets",
    title: "Small Farmers Driving Local Market Stability",
    category: "Farmers",
    date: "July 21, 2024",
    description:
      "Smallholder farmers remain the backbone of rural economies, supplying fresh produce directly to nearby markets and stabilizing prices.",
  },
  {
    image: "https://images.unsplash.com/photo-1560493676-04071c5f467b",
    title: "Crop Rotation Reshaping Seasonal Prices",
    category: "Crops",
    date: "July 20, 2024",
    description:
      "Farmers adopting rotation strategies are influencing supply cycles and reducing long-term soil degradation.",
  },
  {
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/040/941/034/small_2x/ai-generated-fruits-and-vegetables-for-sale-at-the-farmers-market-in-the-village-photo.jpg",
    title: "Village Markets Remain Rural Trade Centers",
    category: "Markets",
    date: "July 19, 2024",
    description:
      "Despite urban expansion, weekly village markets continue to dominate agricultural trade in many regions.",
  },
  {
    image:
      "https://phycoterra.com/wp-content/uploads/2024/10/smaller-GettyImages-483630279-scaled.jpeg",
    title: "Seed Shops Influence Yield More Than Weather",
    category: "Agri Shops",
    date: "July 18, 2024",
    description:
      "Access to certified seeds and fertilizers has become a key factor in yield success across farming zones.",
  },
  {
    image:
      "https://i0.wp.com/geographicbook.com/wp-content/uploads/2024/10/Agricultural-Inputs-and-Productivity.jpg?fit=1168%2C657&ssl=1",
    title: "Urban Demand Pressures Rural Supply Chains",
    category: "Economy",
    date: "July 17, 2024",
    description:
      "Rising urban consumption is forcing farmers to rethink storage, transport, and harvesting schedules.",
  },
  {
    image:
      "https://media.post.rvohealth.io/wp-content/uploads/2021/10/bananas-banana-shopping-grocery-store-732x549-thumbnail-732x549.jpg",
    title: "Organic Produce Builds Consumer Confidence",
    category: "Sustainability",
    date: "July 16, 2024",
    description:
      "Traceability and certification are pushing organic produce into mainstream markets.",
  },

  /* -------- PAGE 2 -------- */
  {
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399",
    title: "Monsoon Forecast Impacts Crop Planning",
    category: "Weather",
    date: "July 15, 2024",
    description:
      "Farmers are delaying planting decisions as unpredictable rainfall patterns raise concerns.",
  },
  {
    image:
      "https://media.istockphoto.com/id/2209841249/photo/refrigeration-chamber-with-close-up-of-fruits-and-vegetables-in-the-crates.jpg?s=612x612&w=0&k=20&c=CS28iKyYfuXcINu4kQ_Ck_VQQWJR2GJdpuI1GREepAU=",
    title: "Cold Storage Shortages Raise Vegetable Prices",
    category: "Infrastructure",
    date: "July 14, 2024",
    description:
      "Limited cold storage capacity continues to cause post-harvest losses and price spikes.",
  },
  {
    image:
      "https://img.freepik.com/premium-photo/watering-vegetable-garden-two-women-gardener-gloves-waters-beds-with-organic-vegetables-caring-tomatoes-plants-home-greenhouse_230311-46890.jpg",
    title: "Women Farmers Lead Community Markets",
    category: "Farmers",
    date: "July 13, 2024",
    description:
      "Women-led cooperatives are transforming how produce reaches local and regional buyers.",
  },
  {
    image:
      "https://media.licdn.com/dms/image/v2/D5622AQF96ldpPe1GVQ/feedshare-shrink_800/B56ZnQ7YIEHUAg-/0/1760146856461?e=2147483647&v=beta&t=QsPGi-GVSezZjRkDl2SXjT1vVpbTqTldYrprb9kwCsc",
    title: "Rising Fuel Costs Hit Transport Margins",
    category: "Economy",
    date: "July 12, 2024",
    description:
      "Transporters warn of higher food prices as fuel costs squeeze already thin margins.",
  },
  {
    image:
      "https://frmenu.net/wp-content/uploads/2025/11/From-Stall-to-Sale-6-Essential-Digital-Tools-Every-Farmers-Market-Stand-Should-Use.jpg",
    title: "Wholesale Markets Shift to Digital Auctions",
    category: "Markets",
    date: "July 11, 2024",
    description:
      "Digital bidding systems are slowly replacing open-cry auctions in wholesale mandis.",
  },
  {
    image:
      "https://static.independent.co.uk/2021/08/18/15/newFile-1.jpg?width=1200&height=1200&fit=crop",
    title: "Demand Grows for Climate-Resilient Seeds",
    category: "Innovation",
    date: "July 10, 2024",
    description:
      "Seed companies report growing interest in drought-resistant and flood-tolerant crops.",
  },

  /* -------- PAGE 3 -------- */
  {
    image:
      "https://www.dtnpf.com/mydtn-public-core-portlet/servlet/GetStoredImage?category=CMS&symbolicName=originalX12032YsiteXDTNYcatalogXcatalog",
    title: "Farmers Turn to Direct-to-Consumer Sales",
    category: "Markets",
    date: "July 9, 2024",
    description:
      "Direct sales models help farmers avoid middlemen and improve profit margins.",
  },
  {
    image:
      "https://st5.depositphotos.com/62628780/62352/i/450/depositphotos_623523076-stock-photo-farm-handshake-closeup-partnership-collaboration.jpg",
    title: "Agri Startups Expand Rural Employment",
    category: "Startups",
    date: "July 8, 2024",
    description:
      "New agri-tech startups are creating local jobs and modernizing rural supply chains.",
  },
  {
    image: "https://kj1bcdn.b-cdn.net/media/69304/bgk.png",
    title: "Water Scarcity Alters Cropping Patterns",
    category: "Environment",
    date: "July 7, 2024",
    description:
      "Farmers are shifting to less water-intensive crops amid growing scarcity.",
  },
  {
    image: "https://images.unsplash.com/photo-1492496913980-501348b61469",
    title: "Market Committees Push for Price Transparency",
    category: "Policy",
    date: "July 6, 2024",
    description:
      "New regulations aim to make daily pricing data accessible to farmers.",
  },
  {
    image:
      "https://thumbs.dreamstime.com/b/portrait-traditional-organic-rice-farmer-his-tools-shoot-bali-island-40699791.jpg",
    title: "Traditional Tools Still Dominate Small Farms",
    category: "Farmers",
    date: "July 5, 2024",
    description:
      "Despite mechanization efforts, many small farms rely on traditional equipment.",
  },
  {
    image: "https://media.licdn.com/dms/image/v2/D4E22AQHb6ldA48kfJg/feedshare-shrink_800/B4EZkyaJAcIMAg-/0/1757487339734?e=2147483647&v=beta&t=tQJ2SJ0o7vZxKd2K3nG9sEiB7FNV4i2MhvZyB2-THFA",
    title: "Post-Harvest Losses Remain a Major Challenge",
    category: "Infrastructure",
    date: "July 4, 2024",
    description:
      "Experts warn that nearly 30% of produce is lost before reaching markets.",
  },
];

/* ================== PAGINATION ================== */
const PER_PAGE = 6;

const Marketplace = () => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const totalPages = Math.ceil(allBlogs.length / PER_PAGE);
  const start = (page - 1) * PER_PAGE;
  const visibleBlogs = allBlogs.slice(start, start + PER_PAGE);

  /* Loader */
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  /* Smooth scroll on page change */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  /* LOADING UI */
  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
          <p className="text-green-700 font-semibold tracking-wide">
            Loading Market News...
          </p>
        </div>
      </section>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900">
          Market Place Insights
        </h1>
        <p className="text-gray-600 mt-2">
          Agricultural news, farmer stories & market movements
        </p>
      </div>

      {/* Masonry Layout */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
        {visibleBlogs.map((blog, index) => (
          <MarketBlogCard key={`${blog.title}-${index}`} {...blog} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-3 mt-12">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-4 py-2 rounded-md font-medium transition ${
              page === i + 1
                ? "bg-green-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;