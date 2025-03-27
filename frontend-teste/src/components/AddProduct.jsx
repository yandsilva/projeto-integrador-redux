import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addNewProduct,
  clearAllProductSliceErrors,
  getAllProduct,
  resetProductSlice,
} from "../store/slice/productSlice";
import { toast } from "react-toastify";

const schema = z.object({
  name: z.string().min(1, "Informe um nome válido!"),
  description: z.string().min(1, "Informe uma descrição válida!"),
  price: z.string().min(1, "Informe um preço válido!"),
  mark: z.string().min(1, "Informe uma marca válida!"),
  category: z.string().min(1, "Informe uma categoria válida!"),
});

export default function AddProduct() {
  const [imagePreview, setImagePreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      category: "",
    },
  });
  const { loading, error, message } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
      setValue("image", reader.result, { shouldValidate: true });
    };
    reader.readAsDataURL(file);
  };

  const handleAddProduct = async (data) => {
    const productData = {
      ...data,
      image: data.imagePreview,
      price: Number(data.price),
      category: categories.find((category) => category.name === data.category)
        ._id,
    };
    dispatch(addNewProduct(productData));
    console.log(productData);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/category/getall"
        );
        setCategories(response.data.categories);
      } catch (error) {
        toast.error("Erro ao carregar categorias", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllProductSliceErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetProductSlice());
      dispatch(getAllProduct());
    }
  }, [error, message, dispatch, loading]);

  return (
    <form onSubmit={handleSubmit(handleAddProduct)}>
      <div className="flex flex-col gap-10 mt-16 mb-20">
        <div className="flex flex-col gap-10 justify-center items-center">
          <label className="text-sm font-medium text-white">
            IMAGEM DO PRODUTO
          </label>
          <img
            src={imagePreview ? `${imagePreview}` : `./vite.svg`}
            alt="avatar"
            className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl"
          />
          <input
            accept="image/*"
            {...register("image")}
            type="file"
            className="avatar-update-btn text-sm"
            onChange={handleImageUpload}
          />
        </div>

        <div className="w-[40%] m-auto">
          <div className="flex flex-col">
            <label className="text-xl text-white font-medium">
              Nome do Produto
            </label>
            <div className="flex items-center w-full justify-center bg-[#424242] rounded-sm">
              <input
                {...register("name")}
                className="bg-transparent p-3 w-full text-white outline-none"
                type="text"
                placeholder="Nome do Produto"
              />
            </div>
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="text-xl text-white font-medium">Categorias</label>
            <select
              {...register("category")}
              className="bg-[#424242] rounded-sm p-3 text-white outline-none"
            >
              <option value="">Selecione uma categoria</option>
              {categories.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500">{errors.category.message}</p>
            )}
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col">
              <label className="text-xl text-white font-medium">Marca</label>
              <div className="flex items-center w-full justify-center bg-[#424242] rounded-sm">
                <input
                  {...register("mark")}
                  className="bg-transparent p-3 w-full text-white outline-none"
                  type="text"
                  placeholder="Nome do Produto"
                />
              </div>
              {errors.mark && (
                <p className="text-red-500">{errors.mark.message}</p>
              )}
            </div>
            <div>
              <label className="text-xl text-white font-medium">Preço</label>
              <div className="flex items-center w-full justify-center bg-[#424242] rounded-sm">
                <input
                  {...register("price")}
                  className="bg-transparent p-3 w-full text-white outline-none"
                  type="number"
                  placeholder="Nome do Produto"
                />
              </div>
              {errors.price && (
                <p className="text-red-500">{errors.price.message}</p>
              )}
            </div>
          </div>
          <div>
            <label className="text-xl text-white font-medium">Descrição</label>
            <div className="flex items-center w-full justify-center bg-[#424242] rounded-sm">
              <textarea
                {...register("description")}
                className="bg-transparent p-3 w-full h-28 text-white outline-none"
                type="text"
                placeholder="Nome do Produto"
              />
            </div>
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>
        </div>
      </div>
      <div className="w-[40%] m-auto mb-20">
        <button
          type="submit"
          className="w-full p-3 bg-[#e90313] rounded-lg text-white
         font-medium hover:bg-transparent hover:text-[#e90313] border 
         border-[#e90313]"
        >
          Adicionar Produto
        </button>
      </div>
    </form>
  );
}
