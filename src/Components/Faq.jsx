import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    question: "What is Cropzen and how does it work?",
    answer:
      "Cropzen is a smart agriculture platform designed to connect farmers, buyers, and agricultural experts in one place. Farmers can list crops, manage production, track sales, and connect directly with buyers. The platform removes middlemen, ensures transparency, and helps farmers grow sustainably while maximizing profit.",
  },
  {
    question: "Who can use Cropzen?",
    answer:
      "Cropzen is built for farmers, wholesalers, retailers, agricultural consultants, and anyone involved in crop trading. Whether you are a small-scale farmer or a large buyer, Cropzen provides tools tailored to your needs.",
  },
  {
    question: "Is Cropzen completely free?",
    answer:
      "Yes, Cropzen is free to join and use for basic features such as account creation, crop listing, and browsing. In the future, we may introduce optional premium tools like advanced analytics, featured listings, and marketing support.",
  },
  {
    question: "How does Cropzen ensure fair pricing?",
    answer:
      "Cropzen promotes fair pricing by allowing direct communication between farmers and buyers. Farmers set their own prices based on market demand, crop quality, and seasonality, ensuring transparency and fairness for both parties.",
  },
  {
    question: "Can I sell crops directly without middlemen?",
    answer:
      "Absolutely. Cropzen is designed to eliminate unnecessary intermediaries. You can negotiate directly with buyers, manage orders, and build long-term business relationships without extra commissions.",
  },
  {
    question: "Is my personal and business data secure?",
    answer:
      "Yes. We use modern security practices to protect your data. Your personal information, transaction details, and business insights are kept confidential and are never shared without your permission.",
  },
  {
    question: "How can I get support if I face an issue?",
    answer:
      "Our support team is always available to assist you. You can contact us via email, WhatsApp, or the contact form on the website. We aim to respond quickly and resolve issues efficiently.",
  },
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-gradient-to-b from-[#f4f7f3] to-white py-24 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-green-700 font-semibold italic mb-3 tracking-wide">
            Knowledge Base
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Find clear answers to common questions about Cropzen, our platform,
            and how we help farmers grow smarter and trade better.
          </p>
        </div>

        {/* FAQ Cards */}
        <div className="space-y-7">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-green-100 shadow-md hover:shadow-lg transition-shadow"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between px-7 py-6 text-left"
              >
                <span className="text-lg md:text-xl font-semibold text-gray-800">
                  {faq.question}
                </span>

                <span
                  className={`w-10 h-10 rounded-full flex items-center justify-center 
                    bg-green-100 text-green-700 transition-transform duration-300
                    ${activeIndex === index ? "rotate-180" : ""}`}
                >
                  <FaChevronDown />
                </span>
              </button>

              {activeIndex === index && (
                <div className="px-7 pb-6 text-gray-600 leading-relaxed text-base md:text-lg">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6">
            Still have questions? We’re here to help you anytime.
          </p>
          <button className="inline-flex items-center gap-3 bg-green-700 text-white px-8 py-4 rounded-full hover:bg-green-800 transition font-medium">
            Contact Support
            <span className="bg-yellow-400 text-green-900 w-9 h-9 rounded-full flex items-center justify-center font-bold">
              →
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Faq;