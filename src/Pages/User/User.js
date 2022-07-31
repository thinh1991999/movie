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
          toast.success("Upload thành công");
          setLoadingBtnImg(false);
        })
        .catch(() => {
          toast.error("Có lỗi xảy ra");
          setLoadingBtnImg(false);
        });
    } else {
      toast.error("File được chọn phải là ảnh");
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
        setInfoValues(data);
        setLoadingInit(false);
      });
    } else {
      navigate("/");
      toast.error("Bạn chưa đăng nhập");
    }
  }, [user]);

  useEffect(() => {
    document.title = language.profile;
  }, [language]);

  if (loadingInit) {
    return (
      <div className="h-screen pt-16 pb-20 px-5 w-full overflow-y-scroll scroll-list t">
        <div className="h-full flex justify-center items-center">
          <CircleLoading />
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen pt-16 pb-20 px-5 w-full overflow-y-scroll scroll-list text-gray-800 dark:text-white">
      <div className="flex">
        <div className="w-1/3 flex flex-col justify-center items-center min-h-[450px]">
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
                title="upload avatar"
                id="image"
              />
            </div>
          </div>
        </div>
        <div className="w-2/3 ">
          <h3 className="text-3xl font-extrabold">Edit profile</h3>
          <ul className="flex border-b-[1px] border-gray-500 mt-2">
            {navData.map((item, index) => {
              return (
                <li
                  className="px-5 py-3 cursor-pointer relative text-2xl"
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
