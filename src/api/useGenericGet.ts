import { useQuery } from "@tanstack/react-query";
import http from "../utls/http";

async function fetchData(url) {
  const { data } = await http.get(url);
  return data;
}
const useGenericGet = ({ url, staleTime = Infinity }) => {
  return useQuery({
    queryKey: [url],
    queryFn: () => fetchData(url),
    staleTime: staleTime,
  });
};

export default useGenericGet;
