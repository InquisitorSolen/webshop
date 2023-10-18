/* import { IconButton } from "@mui/material"; */
import { useSelector } from "react-redux";
import Loader from "../../UtilPages/Loader";
/* import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove"; */

export default function ProductsMobile({ handleSelectChange, categoryName }) {
  const productCategory = useSelector((state) => state.productCategoryReducer);
  const productItems = useSelector((state) => state.productReducer);

  const productsArray = Object.values(productItems.product);

  return (
    <div className="md:hidden flex justify-center items-center mt-6 flex-col">
      <div className="text-center">
        <h1 className="font-bold mb-3 text-xl">Termékkategóriák</h1>
        <select
          onChange={handleSelectChange}
          defaultValue={categoryName}
          className="py-2 px-6 rounded-lg"
        >
          {productCategory.categories.map((category) => (
            <option
              key={category}
              value={category}
              className="text-center text-sm"
            >
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="text-center border border-black rounded-xl bg-white mt-6 w-[80%] h-[70vh]">
        {Object.keys(productItems.product).length === 0 ? (
          <Loader />
        ) : (
          <div>
            <div>
              {productsArray.map((product) => (
                <div key={product.name} className="flex justify-between m-4">
                  <p>{product.name}</p>
                  <div>
                    <p>{product.number}</p>
                    {/*                     <IconButton size="small">
                      <AddIcon />
                    </IconButton> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
