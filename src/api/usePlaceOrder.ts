import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import http from "../utls/http";
import { USER_ID } from "../utls/const";
import { API_ENDPOINTS } from "../utls/ApiEndPoints";

const pollJobStatus = async (id: string) => {
  let jobCompleted = false;
  while (!jobCompleted) {
    const response = await http.get(`${API_ENDPOINTS.ORDER}/${id}/order-status`);
    const { status: jobStatus, message, orderId } = response.data;
    if (jobStatus === "completed") {
      jobCompleted = true;
      return { message, orderId };
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
};

const usePlaceOrder = ({ onSuccess = (p: any) => {}, onError = (p: any) => {} }) => {
  let toastId: string | undefined;
  const queryClient = useQueryClient();

  async function sendData() {
    try {
      toastId = toast.loading("Processing your order");
      const url = API_ENDPOINTS.ORDER + "/" + USER_ID;
      const res = await http.post(url);
      const orderStatus = await pollJobStatus(res.data.jobId);
      toast.success(orderStatus.message, {
        id: toastId,
      });

      onSuccess(orderStatus);
      queryClient.invalidateQueries([`${API_ENDPOINTS.CART}/${USER_ID}`] as any);
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong!";
      toast.error(message, {
        id: toastId,
      });
      onError(null);
    }
  }

  return useMutation({ mutationFn: sendData });
};

export default usePlaceOrder;
