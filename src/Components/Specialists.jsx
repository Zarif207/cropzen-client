import React from "react";

const Specialists = () => {
  const specialists = [
    {
      name: "Daisy Wilkerson",
      title: "Environmentalist",
      image: "https://orga.wpengine.com/wp-content/uploads/2018/03/team5.jpg", 
      description:
        "Ut enim admin ima quis nostrum exercitationem ullammas corporis suscipit laboriosam.",
    },
    {
      name: "Roger Hansen",
      title: "Soil Fertility Specialist",
      image: "https://orga.wpengine.com/wp-content/uploads/2018/03/team6.jpg", 
      description:
        "Ut enim admin ima quis nostrum exercitationem ullammas corporis suscipit laboriosam.",
    },
    {
      name: "Lynn Harrison",
      title: "Livestock Farmer",
      image: "https://orga.wpengine.com/wp-content/uploads/2018/03/team7.jpg", 
      description:
        "Ut enim admin ima quis nostrum exercitationem ullammas corporis suscipit laboriosam.",
    },
    {
      name: "Andrea Hopkins",
      title: "Botanist",
      image: "https://orga.wpengine.com/wp-content/uploads/2018/03/team8.jpg", 
      description:
        "Ut enim admin ima quis nostrum exercitationem ullammas corporis suscipit laboriosam.",
    },
  ];

  return (
    <div className="py-20 bg-[#d8d8d8aa] text-center">
      {/* Header */}
      <p className="text-gray-500 mb-2 text-sm tracking-wide">
        They work Relentlessly
      </p>
      <h2 className="text-4xl font-bold mb-12 text-[#2c4a3e]">
        Our Farming <span className="text-green-600">Specialists</span> 
      </h2>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-4">
        {specialists.map((person, index) => (
          <div
            key={index}
            className="bg-gray-100 p-8 rounded-lg shadow-sm hover:shadow-lg transition duration-300"
          >
            <div className="flex justify-center mb-6">
              <img
                src={person.image}
                alt={person.name}
                className="w-28 h-28 object-cover rounded-full"
              />
            </div>
            <h3 className="font-bold text-lg mb-1">{person.name}</h3>
            <p className="text-gray-700 font-medium text-sm mb-3">
              {person.title}
            </p>
            <div className="w-10 h-[2px] bg-green-500 mx-auto mb-4"></div>
            <p className="text-gray-500 text-sm leading-relaxed">
              {person.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Specialists;