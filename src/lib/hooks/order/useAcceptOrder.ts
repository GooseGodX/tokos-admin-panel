import { useToast } from "@/components/ui/use-toast";
import { acceptOrder } from "@/lib/actions/orderActions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAcceptOrderMutation = (options = {} as any) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (order) => acceptOrder(order),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
        refetchType: "all",
      });
      toast({
        title: "Order Accepted",
        description: "Order Successfully Accepted",
      });
      if (options.onSuccess) {
        options.onSuccess();
      }
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: "Failed to accept order",
      });
      console.log("error: ", error);
    },
  });
};
