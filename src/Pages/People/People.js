import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { ActingAndProduction } from "../../Components";
import { getPeopleCredits, getPeopleDetail } from "../../Services";
import { getImageUrl } from "../../Shared";
import { actions } from "../../Store";

function People() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [peopleDetail, setPeopleDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [peopleCredits, setPeopleCredits] = useState(null);

  useEffect(() => {
    setLoading(true);
    getPeopleDetail(id).then((res) => {
      setPeopleDetail(res);
      setLoading(false);
    });
    getPeopleCredits(id).then((res) => {
      setPeopleCredits(res);
    });
  }, [id]);

  useEffect(() => {
    dispatch(actions.setBgHeader(true));
  }, []);

  if (loading) {
    return (
      <div className="">
        <h2>loading</h2>
      </div>
    );
  }
  const {
    profile_path: img,
    name,
    biography,
    known_for_department: knownFor,
    birthday,
    place_of_birth: placeBirth,
    also_known_as: alsoKnow,
  } = peopleDetail;
  return (
    <div className="h-screen w-full pt-16 overflow-auto scroll-list">
      <div className="px-5 py-5">
        <div className="lgg:flex">
          <div className="lgg:block smm2:flex  lg:w-1/3   w-full">
            <div className="smm2:w-1/3 lgg:w-full ">
              <img
                src={getImageUrl(img, "w500")}
                alt=""
                className="w-full object-contain rounded-lg"
              />
            </div>
            <div className="smm2:w-2/3 smm2:ml-8 smm2:mt-0 mt-5 lgg:w-full lgg:ml-0 lgg:mt-10   text-gray-800 dark:text-white ">
              <h5 className="capitalize font-semibold text-xl mb-2">
                Personal Info
              </h5>
              <div className="mb-4">
                <span className="capitalize font-medium text-base">
                  Known For
                </span>
                <p className="font-thin text-sm">{knownFor}</p>
              </div>
              {birthday && (
                <div className="mb-4">
                  <span className="capitalize font-medium text-base">
                    Birthdate
                  </span>
                  <p className="font-thin text-sm">{birthday}</p>
                </div>
              )}

              {placeBirth && (
                <div className="mb-4">
                  <span className="capitalize font-medium text-base">
                    Place of Birth
                  </span>
                  <p className="font-thin text-sm">{placeBirth}</p>
                </div>
              )}
              {alsoKnow.length > 0 && (
                <div className="mb-4">
                  <span className="capitalize font-medium text-base">
                    Also Known As
                  </span>
                  {alsoKnow.map((item, index) => {
                    return (
                      <p key={index} className="font-thin text-sm">
                        {item}
                      </p>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <div className="lgg:w-2/3 lgg:mt-0 mt-10 w-full lgg:ml-5 text-gray-800 dark:text-white">
            <h2 className=" text-3xl font-bold">{name}</h2>
            {biography && (
              <div className="mt-10">
                <span className="capitalize font-semibold text-xl">
                  biography
                </span>
                <p className="mt-2 text-gray-800  dark:text-gray-100">
                  {biography.length > 800
                    ? `${
                        !showMore
                          ? `${biography.substring(0, 800)}...`
                          : biography
                      }`
                    : biography}
                  {biography.length > 800 && (
                    <button
                      onClick={() => setShowMore(!showMore)}
                      className="ml-2 uppercase text-lg font-bold hover:text-blue-600 transition-all duration-300 ease-linear"
                    >
                      {!showMore ? "read more" : "read less"}
                    </button>
                  )}
                </p>
              </div>
            )}
            {peopleCredits && <ActingAndProduction data={peopleCredits} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default People;
