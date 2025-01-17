import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQs({ language }) {
  const content = {
    vi: {
      title: "Câu hỏi thường gặp",
      faqs: [
        {
          question: "Làm thế nào để theo dõi đơn hàng của tôi?",
          answer:
            'Bạn có thể theo dõi đơn hàng bằng cách đăng nhập vào tài khoản của mình, vào mục "Đơn hàng của tôi" và nhấp vào số đơn hàng tương ứng.',
        },
        {
          question: "Chính sách đổi trả của DokeShop như thế nào?",
          answer:
            "DokeShop cho phép đổi trả trong vòng 30 ngày kể từ ngày nhận hàng, miễn là sản phẩm còn nguyên vẹn và có đầy đủ bao bì.",
        },
        {
          question: "Tôi có thể hủy đơn hàng sau khi đã đặt không?",
          answer:
            "Bạn có thể hủy đơn hàng trong vòng 24 giờ sau khi đặt hàng, hoặc trước khi đơn hàng được xử lý. Vui lòng liên hệ với bộ phận hỗ trợ khách hàng để được giúp đỡ.",
        },
        {
          question: "DokeShop có ship hàng quốc tế không?",
          answer:
            "Hiện tại, DokeShop chỉ giao hàng trong nội địa Việt Nam. Chúng tôi đang xem xét mở rộng dịch vụ giao hàng quốc tế trong tương lai.",
        },
        {
          question:
            "Làm thế nào để tôi có thể liên hệ với bộ phận hỗ trợ khách hàng?",
          answer:
            "Bạn có thể liên hệ với bộ phận hỗ trợ khách hàng qua email support@dokeshop.com, số điện thoại 1900 xxxx, hoặc chat trực tuyến trên website của chúng tôi.",
        },
      ],
    },
    en: {
      title: "Frequently Asked Questions",
      faqs: [
        {
          question: "How can I track my order?",
          answer:
            'You can track your order by logging into your account, going to "My Orders" and clicking on the corresponding order number.',
        },
        {
          question: "What is DokeShop's return policy?",
          answer:
            "DokeShop allows returns within 30 days of receiving the item, provided the product is in its original condition and packaging.",
        },
        {
          question: "Can I cancel my order after placing it?",
          answer:
            "You can cancel your order within 24 hours of placing it, or before it has been processed. Please contact customer support for assistance.",
        },
        {
          question: "Does DokeShop offer international shipping?",
          answer:
            "Currently, DokeShop only ships within Vietnam. We are considering expanding to international shipping in the future.",
        },
        {
          question: "How can I contact customer support?",
          answer:
            "You can contact our customer support team via email at support@dokeshop.com, phone at 1900 xxxx, or through the live chat on our website.",
        },
      ],
    },
  };

  const { title, faqs } = content[language];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
