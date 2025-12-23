import { useMutation } from "@tanstack/react-query";
import { addStudent as addStudentApi } from "../../services/apiServices";
import toast from "react-hot-toast";

export function useAddStudent() {
  const {
    isError,
    isLoading,
    mutate: addStudent,
  } = useMutation({
    mutationFn: addStudentApi,
    onError: (error: unknown) => {
      console.log(error)
      const formattedError = (error as any)?.errors?.map((e: unknown) =>
        `${e}`.endsWith('.') ? `${e}`.slice(0, -1) : `${e}`
      );
      toast.error(`
        ${formattedError}`);
    },
  });

  return { isError, isLoading, addStudent };
}
