import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import banner_account from "@/assets/banner_account.jpg";
import { MoveLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/store/slice/userSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { clearAllUserErrors } from "@/store/slice/userSlice";

const schema = z.object({
  email: z.string().min(1, "Informe um email válido!"),
  password: z.string().min(6, "A senha precisa ter pelo menos 6 caracteres"),
});

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: zodResolver(schema),
    defaultValues: {
      email: "saogamestv@gmail.com",
      password: "12345678",
    },
  });
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.user,
  );

  const dispatch = useDispatch();

  const navigateTo = useNavigate();

  const handleLogin = (data) => {
    dispatch(login(data.email, data.password));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [error, isAuthenticated, dispatch, loading]);

  return (
    <>
      <div className="flex h-screen bg-[#101014] text-white">
        {/* IMAGEM */}
        <div className="hidden flex-1 items-center justify-center lg:flex">
          <img src={banner_account} alt="" />
        </div>

        {/* FORMULARIO */}
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="relative mx-10 my-10 flex flex-1 flex-col items-center justify-center rounded-3xl border border-gray-500 bg-[#202025] sm:mx-32 lg:mx-4"
        >
          <a
            href="/"
            className="absolute top-3 left-3 flex items-center gap-2 rounded-lg border px-2 py-1"
          >
            <MoveLeft size={20} />
            <p>Inicio</p>
          </a>
          <div className="mb-7 flex flex-col gap-2">
            <h2 className="text-5xl">Entrar</h2>
          </div>
          <div className="flex w-[65%] flex-col gap-3">
            <div className="flex flex-col">
              <label className="mb-1 text-gray-300">Endereço de E-mail</label>
              <input
                {...register("email")}
                className="h-12 rounded-md border border-gray-500 bg-[#242428] p-3"
                type="email"
              />
              {errors.email?.message && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label className="mb-1 text-gray-300">Senha</label>
              <input
                {...register("password")}
                className="h-12 rounded-md border border-gray-500 bg-[#242428] p-3"
                type="password"
              />
              {errors.password?.message && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            <Link
              to="/password/forgot"
              className="mb-3 text-end text-blue-400 underline"
            >
              Esqueceu sua senha?
            </Link>
            <button
              disabled={loading}
              className="h-12 rounded-md bg-[#26bbff] font-medium text-black transition hover:bg-[#61ccff]"
            >
              {loading ? "Enviando..." : "Entrar"}
            </button>

            <div className="flex items-center justify-center">
              <div className="h-0.5 w-full bg-gray-400"></div>
              <p className="w-[150%] text-center text-gray-400">
                ou faça login com
              </p>
              <div className="h-0.5 w-full bg-gray-400"></div>
            </div>
            <button className="flex h-12 items-center justify-center gap-3 rounded-md border border-gray-500 p-3">
              <FcGoogle size={30} />
              <div className="text-white">Google</div>
            </button>
          </div>
          <Link className="mt-10 mb-3 text-blue-400 underline" to="/signup">
            Criar Conta
          </Link>
        </form>
      </div>
    </>
  );
}
