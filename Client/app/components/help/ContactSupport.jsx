import { Button } from "@/components/ui/button";
import { Mail, Phone, MessageCircle } from "lucide-react";

export default function ContactSupport({ language }) {
  const content = {
    vi: {
      title: "Liên hệ hỗ trợ",
      description:
        "Nếu bạn không tìm thấy câu trả lời cho câu hỏi của mình, đừng ngần ngại liên hệ với đội ngũ hỗ trợ của chúng tôi.",
      email: "Email hỗ trợ",
      phone: "Điện thoại hỗ trợ",
      chat: "Chat trực tuyến",
    },
    en: {
      title: "Contact Support",
      description:
        "If you couldn't find an answer to your question, don`t hesitate to contact our support team.",
      email: "Support Email",
      phone: "Support Phone",
      chat: "Live Chat",
    },
  };

  const { title, description, email, phone, chat } = content[language];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <p className="mb-6">{description}</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button variant="outline" className="flex items-center justify-center">
          <Mail className="mr-2" />
          {email}
        </Button>
        <Button variant="outline" className="flex items-center justify-center">
          <Phone className="mr-2" />
          {phone}
        </Button>
        <Button variant="outline" className="flex items-center justify-center">
          <MessageCircle className="mr-2" />
          {chat}
        </Button>
      </div>
    </div>
  );
}
