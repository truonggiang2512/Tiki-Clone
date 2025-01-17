// interface IntroductionProps {
//   language: "vi" | "en";
// }

export default function Introduction({ language }) {
  const content = {
    vi: {
      title: "Chào mừng đến với Trung tâm trợ giúp DokeShop",
      description:
        "DokeShop là nền tảng mua sắm trực tuyến hàng đầu, cung cấp đa dạng sản phẩm chất lượng cao với giá cả cạnh tranh.",
      benefits: [
        "Dễ dàng mua sắm",
        "Giao hàng nhanh chóng",
        "Hỗ trợ tận tình",
        "Thanh toán an toàn",
        "Chính sách đổi trả linh hoạt",
      ],
    },
    en: {
      title: "Welcome to DokeShop Help Center",
      description:
        "DokeShop is a leading online shopping platform, offering a wide range of high-quality products at competitive prices.",
      benefits: [
        "Easy shopping experience",
        "Fast delivery",
        "Dedicated support",
        "Secure payments",
        "Flexible return policy",
      ],
    },
  };

  const { title, description, benefits } = content[language];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <p className="mb-4">{description}</p>
      <h3 className="text-lg font-semibold mb-2">
        {language === "vi" ? "Lợi ích chính:" : "Key Benefits:"}
      </h3>
      <ul className="list-disc pl-6">
        {benefits.map((benefit, index) => (
          <li key={index} className="mb-1">
            {benefit}
          </li>
        ))}
      </ul>
    </div>
  );
}
