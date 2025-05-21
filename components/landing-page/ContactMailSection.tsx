"use client";
import { useState } from "react";
import CustomInput from "@/components/form/CustomInput";
import CustomButton from "@/components/button/CustomButton";
import CustomForm from "@/components/form/CustomForm";
import { FieldValues } from "react-hook-form";

const ContactMailSection = () => {
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);
  console.log(submittedMessage);
  const handleSend = (values: FieldValues) => {
    const message = values?.message?.trim();
    if (message) {
      console.log("Message sent:", message);
      setSubmittedMessage(message);
    }
  };

  return (
    <section className="max-w-3xl mx-auto px-4 py-16 text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-[#1C1C29] mb-2">
        Send Us A Mail
      </h2>
      <p className="text-sm text-gray-600 mb-8">
        Your feedback matter to us! We value reviews and <br />
        strive to deliver an exceptional experience.
      </p>

      <CustomForm onSubmit={handleSend} defaultValues={{ message: "" }}>
        <div className="bg-[#F2FDF9] rounded-xl p-2 flex items-center gap-2 max-w-xl mx-auto">
          <CustomInput
            name="message"
            placeholder="Write your message"
            fullWidth
            sx={{
              "& input": {
                padding: "10px 14px",
              },
            }}
          />
          <CustomButton type="submit" sx={{ px: 3, whiteSpace: "nowrap" }}>
            Send
          </CustomButton>
        </div>
      </CustomForm>
    </section>
  );
};

export default ContactMailSection;
