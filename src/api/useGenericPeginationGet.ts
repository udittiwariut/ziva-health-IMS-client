// import { keepPreviousData, useQuery } from "@tanstack/react-query";
// import http from "../../utlis/http";
// import { ARTIST } from "../../utlis/APIEndPoints";

// async function fetchData(url) {
//   const { data } = await http.get(url);
//   return data;
// }
// const useGenericPaginationGet = ({ url, staleTime = Infinity }) => {
//   return useQuery({
//     queryKey: [url],
//     queryFn: () => fetchData(url),
//     staleTime: staleTime,
//     placeholderData: keepPreviousData,
//   });
// };

// export default useGenericPaginationGet;
