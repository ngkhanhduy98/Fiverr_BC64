import React from "react";
import businessItem from "../../../asset/image/CategoriesItem/business.fabc3a7.svg";
import dataItem from "../../../asset/image/CategoriesItem/data.855fe95.svg";
import graphicDesignItem from "../../../asset/image/CategoriesItem/graphics-design.91dfe44.svg";
import lifestyleItem from "../../../asset/image/CategoriesItem/lifestyle.112b348.svg";
import musicAudioItem from "../../../asset/image/CategoriesItem/music-audio.ede4c90.svg";
import onlineMakertingItem from "../../../asset/image/CategoriesItem/online-marketing.a3e9794.svg";
import photographyItem from "../../../asset/image/CategoriesItem/photography.0cf5a3f.svg";
import programingItem from "../../../asset/image/CategoriesItem/programming.6ee5a90.svg";
import videoAnimationItem from "../../../asset/image/CategoriesItem/video-animation.1356999.svg";
import writingItem from "../../../asset/image/CategoriesItem/writing-translation.a787f2f.svg";

const Categories = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
      <div className="inline pt-20">
        <div className="cursor-pointer pb-4 mx-auto border-b-2 border-gray-400 w-1/3 hover:w-1/2 hover:border-green-500 duration-300">
          <img
            className=" mx-auto block w-[48px] h-[48px]"
            src={graphicDesignItem}
            alt=""
          />
        </div>
        <h4 className="text-center mt-3 text-xl">Graphics & Design</h4>
      </div>
      <div className="inline pt-20">
        <div className="cursor-pointer pb-4 mx-auto border-b-2 border-gray-400 w-1/3 hover:w-1/2 hover:border-green-500 duration-300">
          <img
            className=" mx-auto block w-[48px] h-[48px]"
            src={onlineMakertingItem}
            alt=""
          />
        </div>
        <h4 className="text-center mt-3 text-xl">Digital Marketing</h4>
      </div>
      <div className="inline pt-20">
        <div className="cursor-pointer pb-4 mx-auto border-b-2 border-gray-400 w-1/3 hover:w-1/2 hover:border-green-500 duration-300">
          <img
            className=" mx-auto block w-[48px] h-[48px]"
            src={writingItem}
            alt=""
          />
        </div>
        <h4 className="text-center mt-3 text-xl">Writing & Translation</h4>
      </div>
      <div className="inline pt-20">
        <div className="cursor-pointer pb-4 mx-auto border-b-2 border-gray-400 w-1/3 hover:w-1/2 hover:border-green-500 duration-300">
          <img
            className=" mx-auto block w-[48px] h-[48px]"
            src={videoAnimationItem}
            alt=""
          />
        </div>
        <h4 className="text-center mt-3 text-xl">Video & Animation</h4>
      </div>
      <div className="inline pt-20">
        <div className="cursor-pointer pb-4 mx-auto border-b-2 border-gray-400 w-1/3 hover:w-1/2 hover:border-green-500 duration-300">
          <img
            className=" mx-auto block w-[48px] h-[48px]"
            src={musicAudioItem}
            alt=""
          />
        </div>
        <h4 className="text-center mt-3 text-xl">Music & Audio</h4>
      </div>
      <div className="inline pt-20">
        <div className="cursor-pointer pb-4 mx-auto border-b-2 border-gray-400 w-1/3 hover:w-1/2 hover:border-green-500 duration-300">
          <img
            className=" mx-auto block w-[48px] h-[48px]"
            src={programingItem}
            alt=""
          />
        </div>
        <h4 className="text-center mt-3 text-xl">Programming & Tech</h4>
      </div>
      <div className="inline pt-20">
        <div className="cursor-pointer pb-4 mx-auto border-b-2 border-gray-400 w-1/3 hover:w-1/2 hover:border-green-500 duration-300">
          <img
            className=" mx-auto block w-[48px] h-[48px]"
            src={businessItem}
            alt=""
          />
        </div>
        <h4 className="text-center mt-3 text-xl">Business</h4>
      </div>
      <div className="inline pt-20">
        <div className="cursor-pointer pb-4 mx-auto border-b-2 border-gray-400 w-1/3 hover:w-1/2 hover:border-green-500 duration-300">
          <img
            className=" mx-auto block w-[48px] h-[48px]"
            src={lifestyleItem}
            alt=""
          />
        </div>
        <h4 className="text-center mt-3 text-xl">Lifestyle</h4>
      </div>
      <div className="inline pt-20">
        <div className="cursor-pointer pb-4 mx-auto border-b-2 border-gray-400 w-1/3 hover:w-1/2 hover:border-green-500 duration-300">
          <img
            className=" mx-auto block w-[48px] h-[48px]"
            src={dataItem}
            alt=""
          />
        </div>
        <h4 className="text-center mt-3 text-xl">Data</h4>
      </div>
      <div className="inline pt-20">
        <div className="cursor-pointer pb-4 mx-auto border-b-2 border-gray-400 w-1/3 hover:w-1/2 hover:border-green-500 duration-300">
          <img
            className=" mx-auto block w-[48px] h-[48px]"
            src={photographyItem}
            alt=""
          />
        </div>
        <h4 className="text-center mt-3 text-xl">Photography</h4>
      </div>
    </div>
  );
};

export default Categories;
