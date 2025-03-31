import { useForm } from "react-hook-form";
import banner_account from "../assets/banner_account.jpg";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAllForgotPasswordErrors,
  forgotPassword,
} from "../store/slice/forgotResetPasswordSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";

const schema = z.object({
  email: z.string().min(1, "Informe um email valido!"),
});

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });
  const { loading, error, message } = useSelector(
    (state) => state.forgotPassword
  );
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleForgotPassword = (data) => {
    dispatch(forgotPassword(data.email));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllForgotPasswordErrors());
    }
    if (message) {
      toast.success(message);
    }
    if (isAuthenticated) {
      navigateTo("/");
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
          onSubmit={handleSubmit(handleForgotPassword)}
          className="flex flex-col flex-1 items-center justify-center rounded-3xl border border-gray-500 bg-[#202025] mx-4 my-10"
        >
          <div className="flex flex-col gap-2 mb-7">
            <h2 className="text-4xl">Redefinir Sua Senha</h2>
          </div>
          <p className="flex w-[65%] mb-7">
            Digite seu endereço de e-mail e lhe enviaremos um link para
            redefinir sua senha.
          </p>

          <div className="flex flex-col gap-7 w-[65%]">
            <div className="flex flex-col">
              <label className="text-gray-300 mb-1">Endereço de E-mail</label>
              <input
                {...register("email")}
                className="p-3 h-12 rounded-md border border-gray-500 bg-[#242428]"
                type="email"
              />
              {errors.email?.message && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>

            <button
              disabled={loading}
              className="bg-[#26bbff] h-12 rounded-md text-black font-medium hover:bg-[#61ccff] transition"
            >
              {loading ? "Enviando..." : "Enviar"}
            </button>
          </div>
          <Link className="text-blue-400 mb-3 underline mt-10" to="/login">
            Login
          </Link>
        </form>
      </div>
    </div>
  );
}
