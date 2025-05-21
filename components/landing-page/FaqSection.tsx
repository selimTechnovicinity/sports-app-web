"use client";
import { useState } from "react";
import { PiArrowCircleDownThin, PiArrowCircleUpThin } from "react-icons/pi";

const faqData = [
  {
    question: "Who can watch the live streamed games?",
    answer:
      "The staff member streaming the game can choose to allow either only family members and players (if the players are old enough to have their own account) to watch the live stream, or they can also include team fans in the audience, along with family members and players.",
  },
  {
    question: "Who can live stream a game from Lorem?",
    answer:
      "The staff member streaming the game can choose to allow either only family members and players (if the players are old enough to have their own account) to watch the live stream, or they can also include team fans in the audience, along with family members and players.",
  },
  {
    question:
      "Can I edit plays or player attribution while I’m scoring a game?",
    answer:
      "Yes, you can edit plays and player attribution while scoring a game.",
  },
  {
    question:
      "Can I update the box score or edit plays after a game is finished?",
    answer:
      "Yes, you can update the box score and edit plays after a game is finished.",
  },
  {
    question: "How do I keep score for the opposing team?",
    answer:
      "You can keep score for the opposing team by selecting their players and recording their actions during the game.",
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index: number) => {
    setOpenIndex(index === openIndex ? -1 : index);
  };

  return (
    <section className="max-w-3xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center text-[#1C1C29] mb-10">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqData.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`rounded-xl bg-[#F1F8F8] px-6 py-4 transition-all duration-300 shadow-sm`}
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggle(index)}
              >
                <p
                  className={`font-semibold text-[16px] text-[#1C1C29] ${
                    isOpen ? "text-black" : ""
                  }`}
                >
                  {item.question}
                </p>
                {isOpen ? (
                  <PiArrowCircleUpThin size={24} />
                ) : (
                  <PiArrowCircleDownThin size={24} />
                )}
              </div>
              {isOpen && item.answer && (
                <p className="mt-3 text-sm text-[#3F3F3F] leading-relaxed">
                  {item.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FaqSection;
