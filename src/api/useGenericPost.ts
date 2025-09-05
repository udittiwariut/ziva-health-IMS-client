import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import http from "../utls/http";

const useGenericPost = ({ onSuccess = (p: any) => {}, onError = (p: any) => {}, invalidateUrl = undefined }) => {
  const queryClient = useQueryClient();

  async function sendData({ url, body }) {
    try {
      const res = await http.post(url, body);
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
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  return useMutation({ mutationFn: sendData });
};

export default useGenericPost;
