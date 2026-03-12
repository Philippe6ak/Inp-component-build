import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  // for edit
  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: ({ password, fullname, avatar }) =>
      updateCurrentUser({ password, fullname, avatar }),
    onSuccess: ({ user }) => {
      toast.success("User account successfully updated");
      queryClient.setQueryData(["user"], user);
      //   reset();
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateUser, isUpdating };
}
