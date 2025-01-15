import Image from "next/image";
import { CartItem } from "./CartItems";

export default function SelectedItems({ items }) {
  return (
    <ul role="list" className="divide-y divide-gray-200">
      {items.map((item) => (
        <li key={item.id} className="flex py-6 sm:py-10">
          <div className="flex-shrink-0">
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              width={100}
              height={100}
              className="h-24 w-24 rounded-md object-cover object-center sm:h-32 sm:w-32"
            />
          </div>

          <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
            <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
              <div>
                <div className="flex justify-between">
                  <h3 className="text-sm">
                    <span className="font-medium text-gray-700 hover:text-gray-800">
                      {item.name}
                    </span>
                  </h3>
                </div>
                <p className="mt-1 text-sm font-medium text-gray-900">
                  ${item.price.toFixed(2)}
                </p>
              </div>

              <div className="mt-4 sm:mt-0 sm:pr-9">
                <p className="mt-1 text-sm font-medium text-gray-900">
                  Quantity: {item.quantity}
                </p>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
