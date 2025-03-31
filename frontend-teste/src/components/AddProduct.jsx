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
    }
  }, [error, message, isAuthenticated, dispatch, loading]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-10 mt-16 mb-20">
        <div className="flex flex-col gap-10 justify-center items-center">
          <label className="text-sm font-medium text-white">
            IMAGEM DO PRODUTO
          </label>
          <img
            src={image ? URL.createObjectURL(image) : `./vite.svg`}
            alt="avatar"
            className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl"
          />
          <input
            accept="image/*"
            type="file"
            id="image"
            className="avatar-update-btn text-sm"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <div className="w-[40%] m-auto">
          <div className="flex flex-col">
            <label className="text-xl text-white font-medium">
              Nome do Produto
            </label>
            <div className="flex items-center w-full justify-center bg-[#424242] rounded-sm">
              <input
                className="bg-transparent p-3 w-full text-white outline-none"
                type="text"
                placeholder="Nome do Produto"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-xl text-white font-medium">Categorias</label>
            <select
              value={categoriesId}
              onChange={(e) => setCategoriesId(e.target.value)}
              className="bg-[#424242] rounded-sm p-3 text-white outline-none"
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
              <label className="text-xl text-white font-medium">Marca</label>
              <div className="flex items-center w-full justify-center bg-[#424242] rounded-sm">
                <input
                  className="bg-transparent p-3 w-full text-white outline-none"
                  type="text"
                  placeholder="Nome do Produto"
                  value={mark}
                  onChange={(e) => setMark(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="text-xl text-white font-medium">Preço</label>
              <div className="flex items-center w-full justify-center bg-[#424242] rounded-sm">
                <input
                  className="bg-transparent p-3 w-full text-white outline-none"
                  type="number"
                  placeholder="Nome do Produto"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div>
            <label className="text-xl text-white font-medium">Descrição</label>
            <div className="flex items-center w-full justify-center bg-[#424242] rounded-sm">
              <textarea
                className="bg-transparent p-3 w-full h-28 text-white outline-none"
                type="text"
                placeholder="Nome do Produto"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
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
