import { useForm } from "react-hook-form";
import banner_account from "../assets/banner_account.jpg";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAllForgotPasswordErrors,
  resetPassword,
} from "../store/slice/forgotResetPasswordSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { getUser } from "../store/slice/userSlice";

const schema = z
  .object({
    newPassword: z.string().min(1, "Informe um email valido!"),
    confirmPassword: z.string(),
  })
  .refine((fields) => fields.newPassword === fields.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas não conferem",
  });

export default function ResetPassword() {
  const { token } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "all",
    resolver: zodResolver(schema),
  });
  const { loading, error, message } = useSelector(
    (state) => state.forgotPassword
  );
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleResetPassword = (data) => {
    dispatch(resetPassword(token, data.newPassword));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllForgotPasswordErrors());
    }
    if (isAuthenticated) {
      navigateTo("/");
    }
    if (message) {
      toast.success(message);
      dispatch(getUser());
    }
  }, [dispatch, error, isAuthenticated, loading]);

  return (
    <div>
      <div className="flex text-white bg-[#101014] h-screen">
        {/* IMAGEM */}
        <div className="flex flex-1 items-center justify-center ">
          <img src={banner_account} alt="" />
        </div>

        {/* FORMULARIO */}
        <form
          onSubmit={handleSubmit(handleResetPassword)}
          className="flex flex-col flex-1 items-center justify-center rounded-3xl border border-gray-500 bg-[#202025] mx-4 my-10"
        >
          <div className="flex flex-col gap-2 mb-7">
            <h2 className="text-4xl">Redefinir Sua Senha</h2>
          </div>

          <div className="flex flex-col gap-7 w-[65%]">
            <div className="flex flex-col">
              <label className="text-gray-300 mb-1">Nova Senha</label>
              <input
                {...register("newPassword")}
                className="p-3 h-12 rounded-md border border-gray-500 bg-[#242428]"
                type="text"
              />
              {errors.newPassword?.message && (
                <p className="text-red-500">{errors.newPassword.message}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label className="text-gray-300 mb-1">Confirma Senha</label>
              <input
                {...register("confirmPassword")}
                className="p-3 h-12 rounded-md border border-gray-500 bg-[#242428]"
                type="text"
              />
              {errors.confirmPassword?.message && (
                <p className="text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>

            <button
              disabled={isSubmitting}
              className="bg-[#26bbff] h-12 rounded-md text-black font-medium hover:bg-[#61ccff] transition"
            >
              {isSubmitting ? "Enviando..." : "Enviar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
