export function SkeletonTable({ rows }: { rows: number }) {
    return (
      <>
        {Array.from({ length: rows }).map((_, index) => (
          <tr key={index} className="animate-pulse border-b border-gray-700">
            <td className="py-4 px-4">
              <div className="h-4 w-32 bg-gray-600 rounded"></div>
            </td>
            <td className="py-4 px-4">
              <div className="h-4 w-40 bg-gray-600 rounded"></div>
            </td>
            <td className="py-4 px-4">
              <div className="h-4 w-48 bg-gray-600 rounded"></div>
            </td>
            <td className="py-4 px-4">
              <div className="h-8 w-20 bg-gray-600 rounded"></div>
            </td>
          </tr>
        ))}
      </>
    );
  }
  