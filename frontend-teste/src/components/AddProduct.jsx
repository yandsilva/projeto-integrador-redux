import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProduct,
  clearAllProductSliceErrors,
} from "../store/slice/productSlice";
import { toast } from "react-toastify";

export default function AddProduct() {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoriesId, setCategoriesId] = useState("");
  const [mark, setMark] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const { loading, error, message } = useSelector((state) => state.product);
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("images", image);
    data.append("name", name);
    data.append("mark", mark);
    data.append("price", price);
    data.append("description", description);
    data.append("categoryId", categoriesId);
    dispatch(addNewProduct(data));
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/category/getall",
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
    }
  }, [error, message, isAuthenticated, dispatch, loading]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-16 mb-20 flex flex-col gap-10">
        <div className="flex flex-col items-center justify-center gap-10">
          <label className="text-sm font-medium text-white">
            IMAGEM DO PRODUTO
          </label>
          <img
            src={image ? URL.createObjectURL(image) : `./vite.svg`}
            alt="avatar"
            className="h-auto w-full rounded-2xl sm:h-72 sm:w-72"
          />
          <input
            accept="image/*"
            type="file"
            id="image"
            className="avatar-update-btn text-sm"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <div className="m-auto w-[40%]">
          <div className="flex flex-col">
            <label className="text-xl font-medium text-white">
              Nome do Produto
            </label>
            <div className="flex w-full items-center justify-center rounded-sm bg-[#424242]">
              <input
                className="w-full bg-transparent p-3 text-white outline-none"
                type="text"
                placeholder="Nome do Produto"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-xl font-medium text-white">Categorias</label>
            <select
              value={categoriesId}
              onChange={(e) => setCategoriesId(e.target.value)}
              className="rounded-sm bg-[#424242] p-3 text-white outline-none"
            >
              <option>Selecione uma categoria</option>
              {categories.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col">
              <label className="text-xl font-medium text-white">Marca</label>
              <div className="flex w-full items-center justify-center rounded-sm bg-[#424242]">
                <input
                  className="w-full bg-transparent p-3 text-white outline-none"
                  type="text"
                  placeholder="Nome do Produto"
                  value={mark}
                  onChange={(e) => setMark(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="text-xl font-medium text-white">Preço</label>
              <div className="flex w-full items-center justify-center rounded-sm bg-[#424242]">
                <input
                  className="w-full bg-transparent p-3 text-white outline-none"
                  type="number"
                  placeholder="Nome do Produto"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div>
            <label className="text-xl font-medium text-white">Descrição</label>
            <div className="flex w-full items-center justify-center rounded-sm bg-[#424242]">
              <textarea
                className="h-28 w-full bg-transparent p-3 text-white outline-none"
                type="text"
                placeholder="Nome do Produto"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="m-auto mb-20 w-[40%]">
        <button
          type="submit"
          className="w-full rounded-lg border border-[#e90313] bg-[#e90313] p-3 font-medium text-white hover:bg-transparent hover:text-[#e90313]"
        >
          Adicionar Produto
        </button>
      </div>
    </form>
  );
}
