import React from "react";
import ExploreImg from "../../../asset/image/ExploreImg.png";
import rootedLogo from "../../../asset/image/rootedLogo.png";

const Explore = () => {
  return (
    <div className="xl:max-w-[1400px] mx-auto max-w-[96%] my-20 xl:grid xl:grid-cols-2 ">
      <div className="mt-10 xl:mt-0">
        <img
          className="w-[80%] h-auto mx-auto xl:ml-0"
          src={ExploreImg}
          alt=""
        ></img>
      </div>
      <div className="mt-10 xl:mt-0">
        <h4 className="flex flex-wrap">
          <span className="text-2xl text-gray-400 border-r pr-3">
            Kay Kim, Co-Founder
          </span>
          <span className="pl-3 ">
            <img src={rootedLogo} alt="" className="h-9" />
          </span>
        </h4>
        <p className="pt-10 font-serif text-4xl italic text-[#003912]">
          "It's extremely exciting that Fiverr has freelancers from all over the
          world — it broadens the talent pool. One of the best things about
          Fiverr is that while we're sleeping, someone's working."
        </p>
      </div>
    </div>
  );
};

export default Explore;
