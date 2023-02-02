import { onValue, ref, update } from "firebase/database";
import { getDownloadURL, ref as refStorage } from "firebase/storage";
import { uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CircleLoading, Info, Password } from "../../Components";
import SubmitButton from "../../Components/SubmitButton";
import { checkImage, db, storage, unKnowUserUrl } from "../../Shared";

export default function User() {
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);
  const loginCreateAcc = useSelector((state) => state.user.loginCreateAcc);

  const language = useSelector((state) => state.root.language);

  const [currentNav, setCurrentNav] = useState(0);
  const [infoValues, setInfoValues] = useState({});
  const [loadingBtnImg, setLoadingBtnImg] = useState(false);
  const [loadingInit, setLoadingInit] = useState(true);
  const [navData, setNavData] = useState([
    {
      title: "User info",
    },
    {
      title: "Password",
    },
  ]);

  const handleChangeImage = async (e) => {
    const file = e.target.files[0];
    const checkValidImg = checkImage(file.name);
    if (checkValidImg) {
      setLoadingBtnImg(true);
      const nameFile = user.uid + ".png";
      const storageRef = refStorage(storage, nameFile);
      await uploadBytes(storageRef, file).then(() => {});
      await getDownloadURL(storageRef, nameFile)
        .then((url) => {
          const xhr = new XMLHttpRequest();
          xhr.responseType = "blob";
          xhr.onload = () => {};
          xhr.open("GET", url);
          xhr.send();
          infoValues.avatar = url;
          handleUpdateInfo();
          toast.success(language.successChange);
          setLoadingBtnImg(false);
        })
        .catch(() => {
          toast.error(language.someErr);
          setLoadingBtnImg(false);
        });
    } else {
      toast.error(language.imageRequire);
    }
    e.target.value = null;
  };

  const handleUpdateInfo = async () => {
    const updates = {};
    updates["/users/" + user.uid] = infoValues;
    await update(ref(db), updates);
  };
  useEffect(() => {
    if (user) {
      onValue(ref(db, "/users/" + user.uid), (snapshot) => {
        const data = snapshot.val();
        if (!data) {
          setInfoValues({
            email: user.email,
          });
        } else {
          setInfoValues(data);
        }
        setLoadingInit(false);
      });
    } else {
      navigate("/");
      toast.error(language.notLogin);
    }
  }, [user, language, navigate]);

  useEffect(() => {
    document.title = language.profile;
    if (loginCreateAcc) {
      setNavData([
        {
          title: language.userInfo,
        },
        {
          title: language.userPassword,
        },
      ]);
    } else {
      setNavData([
        {
          title: language.userInfo,
        },
      ]);
    }
  }, [language, loginCreateAcc]);

  if (loadingInit) {
    return (
      <div className="pb-20 px-5 w-full">
        <div className="h-full flex justify-center items-center">
          <CircleLoading />
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20 px-5 w-full  text-gray-800 dark:text-white">
      <div className="flex flex-wrap">
        <div className="w-full lg:w-1/3 flex flex-col justify-center items-center min-h-[450px]">
          <img
            src={infoValues?.avatar || unKnowUserUrl}
            alt=""
            className="rounded-full w-[250px] h-[250px]"
          />
          <div className="">
            <input
              type="file"
              id="image"
              className="hidden"
              onChange={handleChangeImage}
            />
            <div className="min-w-[150px]">
              <SubmitButton
                label={true}
                loading={loadingBtnImg}
                title={language.userChangeAvatar}
                id="image"
              />
            </div>
          </div>
        </div>
        <div className="w-full lg:w-2/3 ">
          <h3 className="text-center lg:text-left text-3xl font-extrabold ">
            {language.userEditProfile}
          </h3>
          <ul className="justify-center lg:justify-start flex border-b-[1px] border-gray-500 mt-2">
            {navData.map((item, index) => {
              return (
                <li
                  className={`${
                    index === currentNav && "text-blue-600"
                  } mx-5 py-3 cursor-pointer text-2xl relative`}
                  key={index}
                  onClick={() => setCurrentNav(index)}
                >
                  {item.title}
                  {index === currentNav ? (
                    <span className="absolute left-0 right-0 bottom-[-1px] h-[4px] bg-blue-600 rounded-sm"></span>
                  ) : null}
                </li>
              );
            })}
          </ul>
          <div className="mt-5">
            {currentNav === 0 ? (
              <Info
                infoValues={infoValues}
                setInfoValues={setInfoValues}
                handleUpdateInfo={handleUpdateInfo}
              />
            ) : (
              <Password />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
