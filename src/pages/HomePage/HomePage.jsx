import React from "react";
import facebookLogo from "../../asset/image/facebook.png";
import googleLogo from "../../asset/image/google.png";
import netflixLogo from "../../asset/image/netflix.png";
import paypalLogo from "../../asset/image/paypal.png";
import pgLogo from "../../asset/image/pg.png";
import serviceImg from "../../asset/image/selling.png";
import SerCarousel from "./SerCarousel/SerCarousel";
import Explore from "./Explore/Explore";
import Categories from "./Caregories/Categories";
const HomePage = () => {
  return (
    <div>
      <div className="relative">
        <img
          className="block w-full h-[50vh] md:h-[80vh] object-cover object-left-top"
          src="https://demo5.cybersoft.edu.vn/img/5.png"
          alt="First slide"
        ></img>
        <div className=" absolute  top-1/2 left-[10vw] xl:left-0 xl:translate-x-1/2 -translate-y-1/2">
          <div className="hidden xl:block">
            <h3 className="text-6xl font-semibold text-white">
              Find the right <span className="italic">freelance</span>
            </h3>
            <h3 className="text-6xl font-semibold text-white">
              service, right away
            </h3>
          </div>

          <form action="" className="flex flex-wrap mt-4">
            <input
              type="text"
              id="first_name"
              className="xl:w-[550px] md:w-[450px] w-[250px] border border-gray-300 text-gray-900 text-base font-medium rounded-l-[5px] block px-4 py-3 focus:border-red-600 "
              placeholder="What service aur you looking for today ?"
              required
            />
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 rounded-r-md text-white w-24 cursor-pointer text-lg font-bold"
            >
              Search
            </button>
          </form>
          <div className="mt-4 hidden xl:block">
            <h4 className="font-semibold text-lg text-white inline">
              Popular:
            </h4>
            <span className="cursor-pointer ml-4 border-2 rounded-3xl text-white hover:bg-white hover:text-slate-950 px-3 py-1 font-semibold">
              Web Design
            </span>
            <span className="cursor-pointer ml-4 border-2 rounded-3xl text-white hover:bg-white hover:text-slate-950 px-3 py-1 font-semibold">
              WordPress
            </span>
            <span className="cursor-pointer ml-4 border-2 rounded-3xl text-white hover:bg-white hover:text-slate-950 px-3 py-1 font-semibold">
              Logo Design
            </span>
            <span className="cursor-pointer ml-4 border-2 rounded-3xl text-white hover:bg-white hover:text-slate-950 px-3 py-1 font-semibold">
              Video Editing
            </span>
          </div>
        </div>
      </div>
      <div className="bg-slate-200">
        <div className="xl:max-w-[1000px] mx-auto max-w-[80%] flex flex-wrap items-center justify-between">
          <h3 className="font-semibold text-lg text-gray-400 hidden md:inline">
            Trusted by:
          </h3>
          <img className="md:h-16 h-10" src={facebookLogo} alt=""></img>
          <img className="md:h-16 h-10" src={googleLogo} alt=""></img>
          <img className="md:h-16 h-10" src={netflixLogo} alt=""></img>
          <img className="md:h-16 h-10" src={pgLogo} alt=""></img>
          <img className="md:h-16 h-10" src={paypalLogo} alt=""></img>
        </div>
      </div>
      <div className="xl:max-w-[1400px] mx-auto max-w-[96%] my-6">
        <h3 className="text-2xl font-semibold">
          Popular Professional Services
        </h3>
        <SerCarousel></SerCarousel>
      </div>
      <div className="bg-[#f1fdf7] py-20">
        <div className="xl:max-w-[1400px] mx-auto max-w-[96%] my-6 xl:grid xl:grid-cols-2 ">
          <div className="">
            <h3 className="text-3xl font-semibold">
              A whole world of freelance talent at your fingertips
            </h3>
            <ul className="space-y-7 mt-7">
              <li>
                <h4 className="flex flex-wrap items-center text-xl font-semibold">
                  <span className="text-gray-400 fill-gray-400 mr-3">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M8 1.75C4.54822 1.75 1.75 4.54822 1.75 8C1.75 11.4518 4.54822 14.25 8 14.25C11.4518 14.25 14.25 11.4518 14.25 8C14.25 4.54822 11.4518 1.75 8 1.75ZM0.25 8C0.25 3.71979 3.71979 0.25 8 0.25C12.2802 0.25 15.75 3.71979 15.75 8C15.75 12.2802 12.2802 15.75 8 15.75C3.71979 15.75 0.25 12.2802 0.25 8Z"></path>
                      <path d="M11.5303 5.46967C11.8232 5.76256 11.8232 6.23744 11.5303 6.53033L7.53033 10.5303C7.23744 10.8232 6.76256 10.8232 6.46967 10.5303L4.46967 8.53033C4.17678 8.23744 4.17678 7.76256 4.46967 7.46967C4.76256 7.17678 5.23744 7.17678 5.53033 7.46967L7 8.93934L10.4697 5.46967C10.7626 5.17678 11.2374 5.17678 11.5303 5.46967Z"></path>
                    </svg>
                  </span>
                  The best for every budget
                </h4>
                <p className=" text-gray-400 font-light">
                  Find high-quality services at every price point. No hourly
                  rates, just project-based pricing.
                </p>
              </li>
              <li>
                <h4 className="flex flex-wrap items-center text-xl font-semibold">
                  <span className="text-gray-400 fill-gray-400 mr-3">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M8 1.75C4.54822 1.75 1.75 4.54822 1.75 8C1.75 11.4518 4.54822 14.25 8 14.25C11.4518 14.25 14.25 11.4518 14.25 8C14.25 4.54822 11.4518 1.75 8 1.75ZM0.25 8C0.25 3.71979 3.71979 0.25 8 0.25C12.2802 0.25 15.75 3.71979 15.75 8C15.75 12.2802 12.2802 15.75 8 15.75C3.71979 15.75 0.25 12.2802 0.25 8Z"></path>
                      <path d="M11.5303 5.46967C11.8232 5.76256 11.8232 6.23744 11.5303 6.53033L7.53033 10.5303C7.23744 10.8232 6.76256 10.8232 6.46967 10.5303L4.46967 8.53033C4.17678 8.23744 4.17678 7.76256 4.46967 7.46967C4.76256 7.17678 5.23744 7.17678 5.53033 7.46967L7 8.93934L10.4697 5.46967C10.7626 5.17678 11.2374 5.17678 11.5303 5.46967Z"></path>
                    </svg>
                  </span>
                  Quality work done quickly
                </h4>
                <p className=" text-gray-400 font-light">
                  Find the right freelancer to begin working on your project
                  within minutes.
                </p>
              </li>
              <li>
                <h4 className="flex flex-wrap items-center text-xl font-semibold">
                  <span className="text-gray-400 fill-gray-400 mr-3">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M8 1.75C4.54822 1.75 1.75 4.54822 1.75 8C1.75 11.4518 4.54822 14.25 8 14.25C11.4518 14.25 14.25 11.4518 14.25 8C14.25 4.54822 11.4518 1.75 8 1.75ZM0.25 8C0.25 3.71979 3.71979 0.25 8 0.25C12.2802 0.25 15.75 3.71979 15.75 8C15.75 12.2802 12.2802 15.75 8 15.75C3.71979 15.75 0.25 12.2802 0.25 8Z"></path>
                      <path d="M11.5303 5.46967C11.8232 5.76256 11.8232 6.23744 11.5303 6.53033L7.53033 10.5303C7.23744 10.8232 6.76256 10.8232 6.46967 10.5303L4.46967 8.53033C4.17678 8.23744 4.17678 7.76256 4.46967 7.46967C4.76256 7.17678 5.23744 7.17678 5.53033 7.46967L7 8.93934L10.4697 5.46967C10.7626 5.17678 11.2374 5.17678 11.5303 5.46967Z"></path>
                    </svg>
                  </span>
                  Protected payments, every time
                </h4>
                <p className=" text-gray-400 font-light">
                  Always know what you'll pay upfront. Your payment isn't
                  released until you approve the work.
                </p>
              </li>
              <li>
                <h4 className="flex flex-wrap items-center text-xl font-semibold">
                  <span className="text-gray-400 fill-gray-400 mr-3">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M8 1.75C4.54822 1.75 1.75 4.54822 1.75 8C1.75 11.4518 4.54822 14.25 8 14.25C11.4518 14.25 14.25 11.4518 14.25 8C14.25 4.54822 11.4518 1.75 8 1.75ZM0.25 8C0.25 3.71979 3.71979 0.25 8 0.25C12.2802 0.25 15.75 3.71979 15.75 8C15.75 12.2802 12.2802 15.75 8 15.75C3.71979 15.75 0.25 12.2802 0.25 8Z"></path>
                      <path d="M11.5303 5.46967C11.8232 5.76256 11.8232 6.23744 11.5303 6.53033L7.53033 10.5303C7.23744 10.8232 6.76256 10.8232 6.46967 10.5303L4.46967 8.53033C4.17678 8.23744 4.17678 7.76256 4.46967 7.46967C4.76256 7.17678 5.23744 7.17678 5.53033 7.46967L7 8.93934L10.4697 5.46967C10.7626 5.17678 11.2374 5.17678 11.5303 5.46967Z"></path>
                    </svg>
                  </span>
                  24/7 support
                </h4>
                <p className=" text-gray-400 font-light">
                  Questions? Our round-the-clock support team is available to
                  help anytime, anywhere.
                </p>
              </li>
            </ul>
          </div>
          <div className="mt-10 xl:mt-0">
            <img
              className="w-[80%] h-auto mx-auto"
              src={serviceImg}
              alt=""
            ></img>
          </div>
        </div>
      </div>
      <div>
        <Explore></Explore>
      </div>
      <div className="xl:max-w-[1400px] mx-auto max-w-[96%] my-20">
        <h3 className="text-3xl font-semibold">Explore the market</h3>
        <Categories></Categories>
      </div>
    </div>
  );
};

export default HomePage;
