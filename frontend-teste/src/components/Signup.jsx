import { MoveLeft } from "lucide-react";
import banner_account from "../assets/banner_account.jpg";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { clearAllUserErrors } from "../store/slice/userSlice";
import { createAccount } from "../store/slice/userSlice";

const schema = z
  .object({
    name: z.string().min(1, "Informe um nome completo"),
    email: z.string().min(1, "Informe um email válido!"),
    password: z.string().min(6, "A senha precisa ter pelo menos 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((fields) => fields.password === fields.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas precisam ser iguais",
  });

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "all",
    resolver: zodResolver(schema),
    defaultValues: {
      name: "Yan",
      email: "yan@gmail.com",
      password: "12345678",
      confirmPassword: "12345678",
    },
  });
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const hadleSubmitData = (data) => {
    dispatch(createAccount(data.name, data.email, data.password));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isAuthenticated) {
      navigateTo("/");
      console.log(isAuthenticated);
    }
  }, [error, isAuthenticated, dispatch, loading]);

  return (
    <>
      <div className="flex text-white bg-[#101014] h-screen">
        {/* IMAGEM */}
        <div className="flex flex-1 items-center justify-center ">
          <img src={banner_account} alt="" />
        </div>

        {/* FORMULARIO */}
        <form
          onSubmit={handleSubmit(hadleSubmitData)}
          className="flex flex-col flex-1 items-center relative justify-center rounded-3xl border border-gray-500 bg-[#202025] mx-4 my-10"
        >
          <a
            href="/"
            className="flex items-center gap-2 border px-2 py-1 rounded-lg absolute top-3 left-3"
          >
            <MoveLeft size={20} />
            <p>Inicio</p>
          </a>
          <div className="flex flex-col gap-2 mb-7">
            <h2 className="text-5xl">Criar Conta</h2>
          </div>
          <div className="flex flex-col gap-3 w-[65%]">
            <div className="flex flex-col">
              <label className="text-gray-300 mb-1">Nome Completo</label>
              <input
                {...register("name")}
                className="p-3 h-12 rounded-md border border-gray-500 bg-[#242428]"
                type="text"
              />
              {errors.name?.message && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
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
            <div className="flex flex-col">
              <label className="text-gray-300 mb-1">Senha</label>
              <input
                {...register("password")}
                className="p-3 h-12 rounded-md border border-gray-500 bg-[#242428]"
                type="password"
              />
              {errors.password?.message && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label className="text-gray-300 mb-1">Confirmar a Senha</label>
              <input
                {...register("confirmPassword")}
                className="p-3 h-12 rounded-md border border-gray-500 bg-[#242428]"
                type="password"
              />
              {errors.confirmPassword?.message && (
                <p className="text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>
            <div className="flex gap-2">
              <input type="checkbox" required />
              <p className="text-gray-400 text-sm">
                Você Concorda com os{" "}
                <a className="text-white" href="#">
                  Termos & Condições?
                </a>
              </p>
            </div>
            <button
              disabled={isSubmitting}
              className="bg-[#26bbff] mt-6 h-12 rounded-md text-black font-medium hover:bg-[#61ccff] transition"
            >
              {isSubmitting ? "Aguarde..." : "Criar Conta"}
            </button>

            <div className="flex items-center justify-center">
              <div className="w-full h-0.5 bg-gray-400"></div>
              <p className="w-[150%] text-center text-gray-400">
                ou faça login com
              </p>
              <div className="w-full h-0.5 bg-gray-400"></div>
            </div>
            <button className=" flex items-center justify-center gap-3 p-3 h-12 rounded-md border border-gray-500">
              <FcGoogle size={30} />
              <div className="text-white ">Google</div>
            </button>
          </div>
          <Link className="text-blue-400 mb-3 underline mt-10" to="/login">
            Logar
          </Link>
        </form>
      </div>
    </>
  );
}
