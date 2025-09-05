import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import http from "../utls/http";

const useGenericEdit = () => {
  async function updateData({ url, body }) {
    try {
      await http.put(url, body);
    } catch (error) {
      toast.error(error.response.data.message);

      // throw new Error(error);
    }
  }
  return useMutation({
    mutationFn: updateData,
  });
};

export default useGenericEdit;
