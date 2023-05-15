/* eslint-disable @next/next/no-img-element */
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { Box, ImageList, ImageListItem } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { useMediaQuery } from "@mui/material";

const ImageCard = ({ image }) => {
  const handleContextMenu = (event) => {
    event.preventDefault();
  };
  const router = useRouter();
  // const handleClick = () => {
  //   router.push(`/photos/${image?._id}`);
  // };
  const handleClick = () => {
    window.open(`/photos/${image?._id}`, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div
      onContextMenu={handleContextMenu}
      className="border w-full rounded-md shadow-md transition-shadow duration-400 transform hover:bg-gray-400 hover:shadow-gray-500 hover:cursor-pointer"
      whileHover={{ scale: 1.05, boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.3)" }}
      transition={{ duration: 0.2 }}
      onClick={handleClick}
    >
      <motion.div className="relative hover:bg-gray-200 hover:shadow-md" 
        whileHover={{ opacity: 0.8 }}
          transition={{ duration: 0.2 }}>
        <div
          className="fixed inset-0"
          style={{
            backgroundImage: `url('/backgroundImage.jpg')`,
            backgroundSize: "contain",
            backgroundPosition: "center",
          }}
          
        ></div>
        <Image
          className="relative inset-0 mt-10 w-full h-auto"
          src={`${image?.imageUrl}?248&fit=crop&auto=format`}
          srcSet={`${image.imageUrl}?248&fit=crop&auto=format&dpr=2 2x`}
          alt={image?.imageName}
          loading="lazy"
          width={200}
          height={200}
        />
        <div className="relative bg-white hover:shadow-lg hover:shadow-gray-200  hover:bg-slate-50 text-gray-800 font-sans  text-[13px] flex items-center justify-center py-2 px-2 mt-3">
          <h5 className="h-10 overflow-hidden">
            {image?.imageName.slice(0, 65) + " .."}
          </h5>
        </div>
      </motion.div>
    </motion.div>

    
  );
};

const ImageCardList = ({ images }) => {
  const matchesMd = useMediaQuery("(max-width:960px)");
  const matchesSm = useMediaQuery("(max-width:600px)");

  const cols = matchesSm ? 3 : matchesMd ? 4 : 7;
  return (
    <ImageList variant="masonry" cols={cols} gap={12}>
      {images?.map((image) => (
        <ImageListItem key={image?._id}>
          <Box className="relative" sx={{ width: "100%", overflowX: "hidden" }}>
            <ImageCard image={image} />
          </Box>
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default ImageCardList;
