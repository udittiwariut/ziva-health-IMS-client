import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import http from "../utls/http";

const useGenericDelete = () => {
  async function updateData({ url }) {
    try {
      const res = await http.delete(url);

      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  return useMutation({
    mutationFn: updateData,
  });
};

export default useGenericDelete;
