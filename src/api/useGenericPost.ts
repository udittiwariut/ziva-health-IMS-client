import { useMutation, useQueryClient } from "react-query";
import http from "../../utlis/http";
import toast from "react-hot-toast";

const useGenericPost = ({ onSuccess = (p: any) => {}, onError = (p: any) => {}, invalidateUrl = undefined, isPut = false }) => {
  const queryClient = useQueryClient();

  async function sendData({ url, body }) {
    if (isPut) return http.put(url, body);
    else return http.post(url, body);
  }

  return useMutation(sendData, {
    onSuccess: (res, input) => {
      if (invalidateUrl) {
        invalidateUrl.forEach((element) => {
          queryClient.invalidateQueries([element], {
            inactive: true,
            refetchInactive: true,
            stale: true,
            active: true,
          });
        });
      }
      onSuccess(res.data);
      toast.success(res.data.message);
    },
    onError: (res) => {
      toast.error(res.response.data.message);
      onError(res.response.data);
    },
  });
};

export default useGenericPost;
