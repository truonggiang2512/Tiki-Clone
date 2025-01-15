// interface Specification {
//   name: string
//   value: string
// }

// interface ProductSpecificationsProps {
//   specifications: Specification[]
// }

export default function ProductSpecifications({ specifications }) {
  return (
    <div className="border-t border-gray-200 mt-10 pt-10">
      <h3 className="text-sm font-medium text-gray-900">Specifications</h3>
      <div className="mt-4">
        <ul role="list" className="pl-4 list-disc text-sm space-y-2">
          {specifications.map((spec, index) => (
            <li key={index} className="text-gray-600">
              <span className="font-medium text-gray-900">{spec.name}:</span>{" "}
              {spec.value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
