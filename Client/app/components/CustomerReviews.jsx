import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    title: "Amazing sound quality!",
    rating: 5,
    content: `I'm blown away by the sound quality of these earbuds. The noise cancellation is top-notch, and they're incredibly comfortable to wear for long periods.`,
    author: "Emily Johnson",
    date: "July 14, 2023",
  },
  {
    id: 2,
    title: "Good, but battery life could be better",
    rating: 4,
    content: `The sound is great and they're very comfortable, but I wish the battery lasted a bit longer. Still, I'm happy with my purchase overall.`,
    author: "Michael Lee",
    date: "July 10, 2023",
  },
  {
    id: 3,
    title: "Excellent value for money",
    rating: 5,
    content: `These earbuds offer features that you'd expect from much more expensive brands. They're a steal at this price point!`,
    author: "Sarah Thompson",
    date: "July 5, 2023",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function CustomerReviews() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-lg font-medium text-gray-900">Recent reviews</h2>
        <div className="mt-6 space-y-10 divide-y divide-gray-200 border-b border-t border-gray-200 pb-10">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="pt-10 lg:grid lg:grid-cols-12 lg:gap-x-8"
            >
              <div className="lg:col-span-8 lg:col-start-5 xl:col-span-9 xl:col-start-4 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:items-start">
                <div className="flex items-center xl:col-span-1">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <Star
                        key={rating}
                        className={classNames(
                          review.rating > rating
                            ? "text-yellow-400"
                            : "text-gray-200",
                          "h-5 w-5 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="ml-3 text-sm text-gray-700">
                    {review.rating}
                    <span className="sr-only"> out of 5 stars</span>
                  </p>
                </div>

                <div className="mt-4 lg:mt-6 xl:col-span-2 xl:mt-0">
                  <h3 className="text-sm font-medium text-gray-900">
                    {review.title}
                  </h3>

                  <div className="mt-3 space-y-6 text-sm text-gray-500">
                    <p>{review.content}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center text-sm lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:flex-col lg:items-start xl:col-span-3">
                <p className="font-medium text-gray-900">{review.author}</p>
                <time
                  dateTime={review.date}
                  className="ml-4 border-l border-gray-200 pl-4 text-gray-500 lg:ml-0 lg:mt-2 lg:border-0 lg:pl-0"
                >
                  {review.date}
                </time>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
