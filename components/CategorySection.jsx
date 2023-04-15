import { API } from "@/config/axiosConfig";
import { useQuery } from "react-query";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from "next/router";
const Categories = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 3,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
  };
  const router = useRouter();

  const { data, isLoading, isError } = useQuery(
    "category",
    async () => {
      const response = await API.get("/category");
      return response.data.filter((item) => item.cat_status === "active"); // Filter data by status
    },
    {
      cacheTime: 1000 * 60 * 5, // Cache for 5 minutes
    }
  );
  console.log("Category",data);

  const handleSearch = (cat_name)=>{
    router.push(
      `/search?searchQuery=${encodeURIComponent(
        cat_name
      )}`
    )

  }
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error fetching images</p>;
  }
  // console.log("Data for Category : ", data);

  return (
    <div className="w-full lg:w-2/3 justify-center  mx-auto">
      <Slider {...settings}>
        {data?.map((item) => (
          <div
            className="px-2 "
            key={item._id}

          >
            <div className="border bg-indigo-50  border-gray-200 px-2 py-1 rounded-md items-center text-center "
            onClick={()=>handleSearch(item?.cat_name)}>
              <h3 className="text-lg font-normal ">{item?.cat_name}</h3>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Categories;
