import React from "react";

const Home = () => {
  return (
    <div className="flex justify-center items-center max-auto box-border md:h-[81vh] h-[86vh]">
      <div className="bg-[#EFEFEF] dark:text-[#FFFFFF] dark:bg-[#363636] w-[80%] h-full grid grid-cols-1 md:grid-cols-2 items-center shadow-lg rounded-md p-10">
        <div className="flex flex-col items-center leading-[-10vw]">
          <img
            src="https://png.pngtree.com/png-vector/20230902/ourmid/pngtree-teenage-doing-discussion-using-laptop-3d-character-illustration-png-image_9238704.png"
            alt="Illustration"
            className="object-cover w-20 mb-4"
          />
          <h1 className="md:text-[4rem] dark:text-[#0230ff] text-[3rem] text-center font-bold">
            Welcome to
          </h1>
          <p className="text-[2rem] font-bold   text-[#878484] text-center">
            SITE NOTES
          </p>
          <p className="w-full dark:text-[#d2cbcb] text-pretty text-lg text-gray-700  leading-relaxed">
            Download all previous semester papers for every branch and year
            easily. Our platform provides access to materials for study and
            collaboration, helping you stay organized.
          </p>

          <button className="bg-[#FFFFFF] dark:bg-[#0F3BFE] text-[#fffff] px-4 py-2 rounded-xl ">
            View{" "}
          </button>
        </div>
        <div className="flex justify-center items-center">
          <img
            src="https://r2.erweima.ai/imgcompressed/img/compressed_6a91ef87563da7bf0eba917d6848f0e4.webp"
            alt="Notes Illustration"
            className="object-cover h-[50vh] md:block hidden rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
