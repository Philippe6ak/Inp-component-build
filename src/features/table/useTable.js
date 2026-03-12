import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

const defaultState = {
  columnSizing: {},
};

async function loadState() {
  const saved = localStorage.getItem("table-state");
  return saved ? JSON.parse(saved) : defaultState;
}

async function saveState(state) {
  localStorage.setItem("table-state", JSON.stringify(state));
}

export function useTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const queryKey = ["table-state"];

  const { data: uiState = defaultState } = useQuery({
    queryKey,
    queryFn: loadState,
    staleTime: Infinity,
  });

  const updateColumnSizing = (sizing) => {
    const newState = { ...uiState, columnSizing: sizing };
    queryClient.setQueryData(queryKey, newState);
    saveState(newState);
  };

  const sortBy = searchParams.get("sortBy") || "";
  const statusFilter = searchParams.get("status") || "all";

  const setSortBy = (value) => {
    if (value) {
      searchParams.set("sortBy", value);
    } else {
      searchParams.delete("sortBy");
    }
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  };

  const setStatusFilter = (value) => {
    if (value && value !== "all") {
      searchParams.set("status", value);
    } else {
      searchParams.delete("status");
    }
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  };

  return {
    columnSizing: uiState.columnSizing,
    updateColumnSizing,

    sortBy,
    statusFilter,
    setSortBy,
    setStatusFilter,
  };
}
