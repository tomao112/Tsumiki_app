import { useState, useDeferredValue } from "react";
import type {
  CategoryFilter,
  LearningStatusFilter,
  SortOrder,
} from "../types/tech-card";

export default function useTechCardFilter() {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>("すべて");

  const [selectedStatus, setSelectedStatus] =
    useState<LearningStatusFilter>("すべて");

  const [searchText, setSearchText] = useState("");

  const [sort, setSort] = useState<SortOrder>("title");

  const deferredSearchText = useDeferredValue(searchText);

  const resetFilters = () => {
    setSelectedCategory("すべて");
    setSelectedStatus("すべて");
    setSearchText("");
    setSort("title");
  };

  return {
    selectedCategory,
    setSelectedCategory,
    selectedStatus,
    setSelectedStatus,
    searchText,
    setSearchText,
    deferredSearchText,
    sort,
    setSort,
    resetFilters,
  };
}
