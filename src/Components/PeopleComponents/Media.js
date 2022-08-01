import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import httpService from "../../Services/http.service";
import { getImageUrl, IMAGE_CARD_SIZE } from "../../Shared";
import { getImageUrlOriginal } from "../../Shared/ultils";
import LoadingCard from "../LoadingCard";
import ScoreCard from "../ScoreCard";

export default function Media({ id }) {
  const [loading, setLoading] = useState(true);
  const [peopleProfiles, setPeopleProfiles] = useState(null);

  useEffect(() => {
    setLoading(true);
    const call1 = httpService.getPeopleImages(id).then((res) => {
      return res.data;
    });
    Promise.all([call1]).then((res) => {
      setPeopleProfiles(res[0]);
      setLoading(false);
    });
  }, [id]);
  if (loading) {
    return (
      <div className="h-screen w-full pt-16 overflow-auto scroll-list">
        <div className="px-5 py-5">
          <LoadingCard />
        </div>
      </div>
    );
  }
  const { profiles } = peopleProfiles;

  return (
    <div className="flex flex-wrap -ml-2 -mr-2">
      {profiles.map((profile, index) => {
        const {
          file_path,
          height,
          width,
          vote_count,
          vote_average: score,
        } = profile;
        return (
          <div
            key={index}
            className="w-full smm2:w-1/2 smm:w-1/3 mdd:w-1/4  lgg:w-1/5 xll:w-1/6 p-2"
          >
            <div className="relative flex flex-col rounded-md overflow-hidden card-shadow hover:translate-y-[-10px] animation-global">
              <a
                href={getImageUrlOriginal(file_path)}
                target="_blank"
                rel="noreferrer noopener"
              >
                <LazyLoadImage
                  style={{
                    height: IMAGE_CARD_SIZE[0].height,
                  }}
                  src={getImageUrl(file_path, "w220_and_h330_face")}
                  alt=""
                  className="w-full bg-gray-50  object-cover"
                  effect="opacity"
                />
              </a>
              <div className="border-b-[1px] border-l-[1px] border-r-[1px] rounded-bl-md rounded-br-md dark:bg-gray-900 ">
                <div className="p-2">
                  <span>Size</span>
                  <a
                    href={getImageUrlOriginal(file_path)}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="font-thin text-sm block hover:text-blue-600 animation-global"
                  >
                    {width}x{height}
                  </a>
                  <span className="block mt-2">Vote count</span>
                  <p className="font-thin text-sm">{vote_count}</p>
                </div>
              </div>
              {typeof score === "number" && <ScoreCard score={score} />}
            </div>
          </div>
        );
      })}
    </div>
  );
}
