import InfoFooter from "./InfoFooter";
import LinksFooter from "./LinksFooter";

export default function Footer() {
  return (
    <div className="bg-[#444444] flex flex-col gap-20 py-10">
      <div className="">
        <InfoFooter />
      </div>
      <div className="">
        <LinksFooter />
      </div>
    </div>
  );
}
