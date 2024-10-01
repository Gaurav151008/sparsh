import React, { Fragment, useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { getGroupedProduct } from "../../admin/products/FetchApi";
import { HomeContext } from "./index";
import { isWishReq, unWishReq, isWish } from "./Mixins";

const apiURL = "http://localhost:8000";

const SingleProduct = (props) => {
  const { data, dispatch } = useContext(HomeContext);
  const history = useHistory();

  /* WhisList State */
  const [wList, setWlist] = useState(
    JSON.parse(localStorage.getItem("wishList"))
  );

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    dispatch({ type: "loading", payload: true });
    try {
      let responseData = await getGroupedProduct();
      setTimeout(() => {
        if (responseData && responseData.categorizedProducts) {
          dispatch({
            type: "setProducts",
            payload: responseData.categorizedProducts,
          });
          dispatch({ type: "loading", payload: false });
        }
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2, // Display 2 slides on mobile devices
        },
      },
    ],
  };

  if (data.loading) {
    return (
      <div className="col-span-2 md:col-span-3 lg:col-span-4 flex items-center justify-center py-24">
        <svg
          className="w-12 h-12 animate-spin text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          ></path>
        </svg>
      </div>
    );
  }

  return (
    <Fragment>
      {data.products && Object.keys(data.products).length > 0 ? (
        Object.keys(data.products).map((category, catIndex) => {
          return (
            <Fragment key={catIndex}>
              <h2 className="col-span-2 md:col-span-3 lg:col-span-4 text-center text-2xl font-semibold my-6">
                {category}
              </h2>
              <div className="col-span-2 md:col-span-3 lg:col-span-4">
                <Slider {...settings}>
                  {data.products[category].map((product, prodIndex) => (
                    <div key={prodIndex} className="p-4">
                      <div
                        onClick={() => history.push(`/products/${product._id}`)}
                        className="group border border-gray-200 rounded-lg overflow-hidden"
                      >
                        <img
                          src={`${apiURL}/uploads/products/${product.pImages[0]}`}
                          alt={product.pName}
                          className="w-full h-96 object-cover group-hover:opacity-75"
                        />
                        <div className="p-4">
                          <h3 className="text-lg font-medium">{product.pName}</h3>
                          <p className="mt-4 text-lg font-medium text-gray-900">
                            Rs. {product.pPrice}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </Fragment>
          );
        })
      ) : (
        <div className="col-span-2 md:col-span-3 lg:col-span-4">
          <p>No products available.</p>
        </div>
      )}
    </Fragment>
  );
};

export default SingleProduct;
