import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function InteractiveTutorials({ language }) {
  const [currentStep, setCurrentStep] = useState(0);

  const content = {
    vi: {
      title: "Hướng dẫn tương tác",
      tutorials: [
        {
          title: "Cách đặt hàng",
          description: "Hướng dẫn từng bước cách đặt hàng trên DokeShop",
          steps: [
            "Tìm kiếm sản phẩm bạn muốn mua",
            "Thêm sản phẩm vào giỏ hàng",
            "Kiểm tra giỏ hàng và tiến hành thanh toán",
            "Điền thông tin giao hàng",
            "Chọn phương thức thanh toán",
            "Xác nhận đơn hàng",
          ],
        },
        {
          title: "Cách sử dụng mã giảm giá",
          description: "Hướng dẫn áp dụng mã giảm giá khi mua hàng",
          steps: [
            "Chọn sản phẩm và thêm vào giỏ hàng",
            "Vào trang giỏ hàng",
            "Tìm ô nhập mã giảm giá",
            "Nhập mã giảm giá của bạn",
            'Nhấn "Áp dụng" để kích hoạt mã giảm giá',
            "Tiến hành thanh toán với giá đã giảm",
          ],
        },
      ],
      next: "Tiếp theo",
      previous: "Trước đó",
      start: "Bắt đầu",
      close: "Đóng",
    },
    en: {
      title: "Interactive Tutorials",
      tutorials: [
        {
          title: "How to Place an Order",
          description:
            "Step-by-step guide on how to place an order on DokeShop",
          steps: [
            "Search for the product you want to buy",
            "Add the product to your cart",
            "Review your cart and proceed to checkout",
            "Fill in your shipping information",
            "Choose your payment method",
            "Confirm your order",
          ],
        },
        {
          title: "How to Use a Discount Code",
          description: "Guide on applying a discount code to your purchase",
          steps: [
            "Select your items and add them to your cart",
            "Go to your cart page",
            "Locate the discount code field",
            "Enter your discount code",
            'Click "Apply" to activate the discount',
            "Proceed to checkout with the discounted price",
          ],
        },
      ],
      next: "Next",
      previous: "Previous",
      start: "Start",
      close: "Close",
    },
  };

  const { title, tutorials, next, previous, start, close } = content[language];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tutorials.map((tutorial, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{tutorial.title}</CardTitle>
              <CardDescription>{tutorial.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>{start}</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{tutorial.title}</DialogTitle>
                    <DialogDescription>
                      {tutorial.description}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-4">
                    <p className="font-semibold mb-2">
                      {language === "vi" ? "Bước" : "Step"} {currentStep + 1} of{" "}
                      {tutorial.steps.length}
                    </p>
                    <p>{tutorial.steps[currentStep]}</p>
                  </div>
                  <div className="flex justify-between mt-4">
                    <Button
                      onClick={() =>
                        setCurrentStep((prev) => Math.max(0, prev - 1))
                      }
                      disabled={currentStep === 0}
                    >
                      {previous}
                    </Button>
                    {currentStep < tutorial.steps.length - 1 ? (
                      <Button
                        onClick={() =>
                          setCurrentStep((prev) =>
                            Math.min(tutorial.steps.length - 1, prev + 1)
                          )
                        }
                      >
                        {next}
                      </Button>
                    ) : (
                      <Button onClick={() => setCurrentStep(0)}>{close}</Button>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
