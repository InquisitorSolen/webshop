import { Link } from "react-router-dom";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { useSelector } from "react-redux";

export default function NavLinks({
  showMobilesublinks,
  setShowMobileSunlinks,
  setMobileNavOpen,
}) {
  const productCategory = useSelector((state) => state.productCategoryReducer);
  const categoriesSublinks = productCategory.productCategoriesNames.map(
    (product, key) => {
      return {
        name: product,
        link: `/product/${productCategory.productCategoriesKeys[key]}`,
      };
    }
  );

  const links = [
    {
      name: "Kategóriák",
      submenu: true,
      sublinks: categoriesSublinks,
    },
  ];

  return (
    <>
      {links.map((link) => (
        <div key={link.name}>
          <div className="px-3 text-left md:cursor-pointer group">
            <h1
              className="py-6 font-bold flex justify-between items-center md:pr-0 pr-5"
              onClick={() => {
                showMobilesublinks !== link.name
                  ? setShowMobileSunlinks(link.name)
                  : setShowMobileSunlinks("");
              }}
            >
              {link.name}
              <span className="md:hidden inline">
                {showMobilesublinks === "" ? (
                  <BsChevronDown />
                ) : (
                  <BsChevronUp />
                )}
              </span>
              <span className="hidden md:block mt-1 ml-2 group-hover:rotate-180">
                <BsChevronDown />
              </span>
            </h1>
            {link.submenu && (
              <div>
                <div className="absolute hidden group-hover:md:block hover:md:block">
                  <div className="bg-white p-2.5 border rounded-lg">
                    {link.sublinks.map((sublink) => (
                      <div key={sublink.name}>
                        <li className=" my-2.5">
                          <Link
                            to={sublink.link}
                            className="hover:text-primary"
                          >
                            {sublink.name}
                          </Link>
                        </li>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Mobile menu mapping*/}
          <div
            className={`${
              showMobilesublinks === link.name ? "md:hidden" : "hidden"
            }`}
          >
            {link.sublinks.map((sublink) => (
              <div key={sublink.name}>
                <div>
                  <li className="py-4 pl-7 font-semibold md:pr-0 pr-5">
                    <Link
                      to={sublink.link}
                      className="hover:text-primary"
                      onClick={() => {
                        setShowMobileSunlinks("");
                        setMobileNavOpen(false);
                      }}
                    >
                      {sublink.name}
                    </Link>
                  </li>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
