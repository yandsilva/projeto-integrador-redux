import { MapPin } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import {
  clearAllAddressSliceErrors,
  deleteAddress,
} from "../store/slice/addressSlice";
import Address from "./Address";
import { useNavigate } from "react-router-dom";

export default function AddressDisplay() {
  const { address, error, message, loading } = useSelector(
    (state) => state.address
  );

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handleDeleteAddress = (id) => {
    dispatch(deleteAddress(id));
    navigateTo("/account");
    console.log(id);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllAddressSliceErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(clearAllAddressSliceErrors());
    }
  }, [dispatch, error, message, loading]);

  return (
    <>
      <div className="text-white w-[75%] mt-10 m-auto">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <MapPin color="#E90313" size={30} />
              <p className="text-2xl">Endereços Cadastrados</p>
            </div>
            <div className="border border-[#E90313] w-32 mt-2"></div>
          </div>
          <button className="text-xl font-extralight bg-[#009E2A] rounded-md py-1 px-2 cursor-pointer">
            Adicionar Novo Endereço
          </button>
        </div>
        <div className="flex flex-wrap gap-4">
          {address && address.length > 0 ? (
            address.map((item) => {
              return (
                <Address
                  key={item.id}
                  street={item.street}
                  neighborhood={item.neighborhood}
                  number={item.number}
                  city={item.city}
                  state={item.state}
                  zip={item.zip}
                  handleDeleteAddress={() => handleDeleteAddress(item.id)}
                />
              );
            })
          ) : (
            <div className="flex justify-center items-center mt-4">
              <p className="text-xl font-extralight">
                Você ainda não possui endereços cadastrados
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
