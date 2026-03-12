import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

function useProcessedData(data) {
  const [searchParams] = useSearchParams();

  // Filtering
  const filterValue = searchParams.get("status") || "all";

  const filteredData = useMemo(() => {
    if (filterValue === "all") return data;

    return data.filter((item) => {
      if (!item.status) return false;
      const statusKey = item.status.name.toLowerCase().replace(" ", "-");
      return statusKey === filterValue;
    });
  }, [data, filterValue]);

  // Sorting
  const sortBy = searchParams.get("sortBy") || "task-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      let valueA, valueB;

      // Handle different field types
      if (field === "status") {
        valueA = a.status?.id || 0;
        valueB = b.status?.id || 0;
        return (valueA - valueB) * modifier;
      }

      if (field === "due") {
        valueA = a.due ? new Date(a.due).getTime() : 0;
        valueB = b.due ? new Date(b.due).getTime() : 0;
        return (valueA - valueB) * modifier;
      }

      if (field === "task") {
        valueA = String(a[field] || "").toLowerCase();
        valueB = String(b[field] || "").toLowerCase();

        if (valueA < valueB) return -1 * modifier;
        if (valueA > valueB) return 1 * modifier;
        return 0;
      }

      // Default numeric comparison for other fields
      valueA = a[field] || 0;
      valueB = b[field] || 0;
      return (valueA - valueB) * modifier;
    });
  }, [filteredData, field, direction, modifier]);

  return sortedData;
}

export default useProcessedData;
