import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function MainHelpTopics({ language }) {
  const content = {
    vi: {
      title: "Chủ đề trợ giúp chính",
      topics: [
        {
          title: "Bắt đầu",
          content:
            "Hướng dẫn cách tạo tài khoản, đăng nhập và thiết lập hồ sơ cá nhân trên DokeShop.",
        },
        {
          title: "Hướng dẫn mua sắm",
          content:
            "Cách tìm kiếm sản phẩm, thêm vào giỏ hàng và hoàn tất đơn hàng trên DokeShop.",
        },
        {
          title: "Quản lý đơn hàng",
          content:
            "Hướng dẫn theo dõi, hủy hoặc đặt lại đơn hàng trên DokeShop.",
        },
        {
          title: "Thanh toán",
          content:
            "Thông tin về các phương thức thanh toán, chính sách hoàn tiền và bảo mật trên DokeShop.",
        },
        {
          title: "Dành cho người bán",
          content:
            "Hướng d��n thêm sản phẩm, quản lý kho hàng và xử lý đơn hàng cho người bán trên DokeShop.",
        },
      ],
    },
    en: {
      title: "Main Help Topics",
      topics: [
        {
          title: "Getting Started",
          content:
            "Learn how to create an account, log in, and set up your profile on DokeShop.",
        },
        {
          title: "Shopping Guide",
          content:
            "How to search for products, add them to your cart, and complete purchases on DokeShop.",
        },
        {
          title: "Order Management",
          content:
            "Instructions on how to track, cancel, or reorder items on DokeShop.",
        },
        {
          title: "Payments",
          content:
            "Information about payment methods, refund policies, and security on DokeShop.",
        },
        {
          title: "For Sellers",
          content:
            "Guidelines for adding products, managing inventory, and handling orders as a seller on DokeShop.",
        },
      ],
    },
  };

  const { title, topics } = content[language];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <Accordion type="single" collapsible className="w-full">
        {topics.map((topic, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{topic.title}</AccordionTrigger>
            <AccordionContent>{topic.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
