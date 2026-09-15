import { useDebounce } from "@/shared/hooks/useDebounce";
import { useSearchParams } from "react-router-dom";

export const useRoomsSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") ?? "";

  const debouncedSearch = useDebounce(search.trim());

  const handleSearchChange = (value: string) => {
    setSearchParams(
      (currentParams) => {
        const nextParams = new URLSearchParams(currentParams);

        if (value) {
          nextParams.set("search", value);
        } else {
          nextParams.delete("search");
        }

        nextParams.set("page", "1");

        return nextParams;
      },
      {
        replace: true,
      },
    );
  };

  return {
    search,
    debouncedSearch,
    handleSearchChange,
  };
};
