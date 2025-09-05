import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import http from "../utls/http";

const useGenericEdit = () => {
  async function updateData({ url, body }) {
    try {
      const res = await http.put(url, body);
      toast.success(res.data.message);
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
  }
  return useMutation({
    mutationFn: updateData,
  });
};

export default useGenericEdit;
