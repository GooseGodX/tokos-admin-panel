import { useToast } from "@/components/ui/use-toast";
import { completeOrder } from "@/lib/actions/orderActions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCompleteOrderMutation = (options = {} as any) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (order) => completeOrder(order),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getCompletedOrdersForUserHistory"],
        refetchType: "all",
      });
      queryClient.invalidateQueries({
        queryKey: ["orders"],
        refetchType: "all",
      });
      toast({
        title: "Porudzbina je predata",
        description: "Porudzbina je uspešno predata",
      });
      if (options.onSuccess) {
        options.onSuccess();
      }
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: "Failed to complete order",
      });
      console.log("error: ", error);
    },
  });
};
