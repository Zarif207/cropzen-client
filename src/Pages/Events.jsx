import React, { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaUser,
  FaTag,
  FaArrowRight,
  FaSearch,
  FaClock,
  FaMapMarkerAlt,
} from "react-icons/fa";

const events = [
  {
    id: 1,
    title: "Sustainable Soil Management Workshop",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800",
    date: "December 15, 2025",
    time: "10:00 AM - 3:00 PM",
    location: "Green Valley Farm, Dhaka",
    author: "Dr. Karim Ahmed",
    tags: ["Biodiversity", "Soil fertility", "Workshop"],
    desc: "Learn advanced techniques for preparing and maintaining healthy soil. This hands-on workshop covers composting, crop rotation, and natural fertilization methods for sustainable farming.",
    attendees: 45,
  },
  {
    id: 2,
    title: "Organic Farming Conference 2024",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800",
    date: "December 20, 2025",
    time: "9:00 AM - 5:00 PM",
    location: "Agriculture Center, Chittagong",
    author: "Fatima Rahman",
    tags: ["Organic", "Conference", "Networking"],
    desc: "Join farmers and experts from across Bangladesh to discuss the latest trends in organic produce cultivation. Network with industry leaders and discover new market opportunities.",
    attendees: 120,
  },
  {
    id: 3,
    title: "Modern Livestock Management Seminar",
    image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800",
    date: "April 22, 2026",
    time: "2:00 PM - 6:00 PM",
    location: "Rural Development Center, Sylhet",
    author: "Mohammad Hasan",
    tags: ["Livestock", "Animal Care", "Ecosystem"],
    desc: "Explore modern livestock management practices focusing on animal welfare, sustainable grazing, and ecosystem balance. Perfect for small-scale farmers looking to expand.",
    attendees: 65,
  },
  {
    id: 4,
    title: "Smart Irrigation Technology Training",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800",
    date: "January 5, 2026",
    time: "11:00 AM - 4:00 PM",
    location: "Tech Agriculture Hub, Dhaka",
    author: "Eng. Tasnim Islam",
    tags: ["Technology", "Water Management", "Innovation"],
    desc: "Discover how to implement smart irrigation systems that save water and increase crop yields. Hands-on training with IoT sensors and automated watering systems.",
    attendees: 55,
  },
  {
    id: 5,
    title: "Crop Disease Prevention Masterclass",
    image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800",
    date: "January 10, 2025",
    time: "1:00 PM - 5:00 PM",
    location: "Agricultural Research Institute, Rajshahi",
    author: "Dr. Sabrina Akter",
    tags: ["Plant Health", "Disease Control", "Research"],
    desc: "Learn to identify and prevent common crop diseases using organic methods. Expert guidance on natural pest control and disease-resistant crop varieties.",
    attendees: 80,
  },
  {
    id: 6,
    title: "Vertical Farming Innovation Summit",
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800",
    date: "January 15, 2025",
    time: "10:00 AM - 6:00 PM",
    location: "Urban Farm Complex, Dhaka",
    author: "Rashed Khan",
    tags: ["Urban Farming", "Innovation", "Sustainability"],
    desc: "Explore the future of agriculture with vertical farming techniques. Learn how to grow more food in less space using innovative hydroponic and aeroponic systems.",
    attendees: 95,
  },
];

const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);

  const allTags = [
    "All Events",
    "Workshop",
    "Conference",
    "Technology",
    "Organic",
    "Livestock",
    "Plant Health",
    "Innovation",
    "Sustainability",
  ];

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200); // 1.2s loading simulation

    return () => clearTimeout(timer);
  }, []);

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag =
      !selectedTag ||
      selectedTag === "All Events" ||
      event.tags.some((tag) =>
        tag.toLowerCase().includes(selectedTag.toLowerCase())
      );
    return matchesSearch && matchesTag;
  });

  /* 🔄 LOADER UI — ADDED */
  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
          <p className="text-green-700 font-semibold tracking-wide">
            Loading Events...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className=" py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            Upcoming Events
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Join our farming community events, workshops, and conferences.
            Learn, network, and grow together! 🌱
          </p>
        </div>

        {/* SEARCH & FILTER */}
        <div className="mb-10 space-y-6">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Search events by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-4 border-2 border-gray-200 rounded-2xl outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 bg-white shadow-lg text-gray-900 placeholder-gray-400 font-medium"
            />
          </div>

          {/* Tag Filters */}
          <div className="flex flex-wrap gap-3 justify-center">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() =>
                  setSelectedTag(tag === "All Events" ? null : tag)
                }
                className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                  selectedTag === tag || (!selectedTag && tag === "All Events")
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg scale-105"
                    : "bg-white text-gray-700 hover:bg-gray-100 shadow"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-10">
          {/* LEFT: EVENTS GRID */}
          <div className="lg:col-span-3 grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 border-2 border-gray-100"
                >
                  {/* IMAGE */}
                  <div className="relative overflow-hidden h-56">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-4 py-2 rounded-full shadow-lg">
                      <span className="text-green-600 font-bold text-sm flex items-center gap-1">
                        <FaUser className="text-xs" /> {event.attendees}
                      </span>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-6 space-y-4">
                    {/* Meta Info */}
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-green-600" />
                        <span className="font-medium">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaClock className="text-green-600" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-green-600" />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 leading-snug group-hover:text-green-600 transition-colors">
                      {event.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                      {event.desc}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {event.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Author & Button */}
                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        By{" "}
                        <span className="font-semibold text-gray-700">
                          {event.author}
                        </span>
                      </span>
                      <button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold px-5 py-2 rounded-xl flex items-center gap-2 hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-md hover:shadow-lg">
                        Join <FaArrowRight className="text-sm" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <p className="text-gray-500 text-lg">
                  No events found matching your criteria. Try adjusting your
                  filters!
                </p>
              </div>
            )}
          </div>

          {/* RIGHT: SIDEBAR */}
          <aside className="space-y-8">
            {/* EVENT CALENDAR */}
            <div className="bg-white p-6 rounded-3xl shadow-lg border-2 border-gray-100">
              <h3 className="font-bold text-xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6 flex items-center gap-2">
                <FaCalendarAlt /> Event Calendar
              </h3>
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border-l-4 border-green-500">
                  <p className="font-bold text-gray-900">December 2024</p>
                  <p className="text-sm text-gray-600 mt-1">
                    3 upcoming events
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border-l-4 border-emerald-500">
                  <p className="font-bold text-gray-900">January 2025</p>
                  <p className="text-sm text-gray-600 mt-1">
                    3 upcoming events
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border-l-4 border-gray-300">
                  <p className="font-bold text-gray-900">February 2025</p>
                  <p className="text-sm text-gray-600 mt-1">Coming soon...</p>
                </div>
              </div>
            </div>

            {/* POPULAR TOPICS */}
            <div className="bg-white p-6 rounded-3xl shadow-lg border-2 border-gray-100">
              <h3 className="font-bold text-xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6">
                Popular Topics
              </h3>
              <div className="space-y-3">
                {[
                  { name: "Organic Farming", count: 24 },
                  { name: "Smart Agriculture", count: 18 },
                  { name: "Crop Management", count: 15 },
                  { name: "Livestock Care", count: 12 },
                  { name: "Sustainable Practices", count: 21 },
                ].map((topic) => (
                  <div
                    key={topic.name}
                    className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-gray-50 to-white hover:from-green-50 hover:to-emerald-50 transition-all duration-300 cursor-pointer group"
                  >
                    <span className="font-medium text-gray-700 group-hover:text-green-600 transition-colors">
                      {topic.name}
                    </span>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                      {topic.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* NEWSLETTER */}
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-3xl shadow-lg text-white">
              <h3 className="font-bold text-xl mb-3">Stay Updated! 📬</h3>
              <p className="text-sm mb-4 text-green-50">
                Subscribe to get notified about upcoming events and workshops.
              </p>
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-3 rounded-xl mb-3 text-gray-900 outline-none"
              />
              <button className="w-full bg-white text-green-600 font-bold py-3 rounded-xl hover:bg-gray-100 transition-colors">
                Subscribe Now
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Events;
