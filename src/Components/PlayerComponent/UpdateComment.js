import { ref, update } from "firebase/database";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { MdOutlineSendAndArchive } from "react-icons/md";
import { useSelector } from "react-redux";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { db, unKnowUserUrl } from "../../Shared";
import { BsEmojiSmile } from "react-icons/bs";

export default function UpdateComment({
  setUpdateId,
  idPlayer,
  idComment,
  comment,
}) {
  const userInfo = useSelector((state) => state.user.userInfo);
  const theme = useSelector((state) => state.root.theme);

  const emoijRef = useRef(null);
  const updateRef = useRef(null);
  const [updateValue, setUpdateValue] = useState(comment);
  const [showEmoji, setShowEmoji] = useState(false);
  const [perLine, setPerLine] = useState(9);

  const handleSubmitUpdate = (e) => {
    e.preventDefault();
    if (updateValue.trim().length > 0) {
      const path = "/comments/" + idPlayer + "/" + idComment + "/comment/";
      const updates = {};
      updates[path] = updateValue;
      update(ref(db), updates)
        .then(() => {
          setUpdateId(null);
        })
        .catch(() => {
          setUpdateId(null);
        });
    }
  };
  const handleCancerUpdate = () => {
    setUpdateId(null);
  };
  const setPerLineEmoji = useCallback((size) => {
    if (size <= 400) {
      setPerLine(7);
    } else {
      setPerLine(9);
    }
  }, []);

  const onEmojiSelect = (e) => {
    if (updateValue.length > 198) return;
    const cursor = updateRef.current.selectionStart;
    const text =
      updateValue.slice(0, cursor) + e.native + updateValue.slice(cursor);
    setUpdateValue(text);
    updateRef.current.focus();
    updateRef.current.selectionStart = cursor + 2;
    updateRef.current.selectionEnd = cursor + 2;
  };

  useEffect(() => {
    const clickEvent = (e) => {
      if (!emoijRef.current.contains(e.target)) {
        setShowEmoji(false);
      }
    };
    const resizeEvent = (e) => {
      setPerLineEmoji(e.target.innerWidth);
    };
    if (showEmoji) {
      window.addEventListener("click", clickEvent);
      window.addEventListener("resize", resizeEvent);
    }
    return () => {
      window.removeEventListener("click", clickEvent);
      window.addEventListener("resize", resizeEvent);
    };
  }, [showEmoji, setPerLineEmoji]);

  useEffect(() => {
    setPerLineEmoji(window.innerWidth);
  }, [setPerLineEmoji]);

  useEffect(() => {
    const eventKeyPress = (e) => {
      if (e.keyCode === 27) {
        setUpdateId(null);
      }
    };
    window.addEventListener("keydown", eventKeyPress);
    return () => {
      window.removeEventListener("keydown", eventKeyPress);
    };
  }, [setUpdateId]);

  useEffect(() => {
    updateRef.current.focus();
  }, []);

  return (
    <>
      <div className="flex justify-end my-2">
        <span className="text-sm">{updateValue.length}/200</span>
      </div>
      <form
        className="w-full py-2 px-4 border-2 border-gray-600 dark:border-gray-200 rounded-full mt-5"
        onSubmit={handleSubmitUpdate}
      >
        <div className="flex items-center">
          <img
            src={userInfo?.avatar || unKnowUserUrl}
            alt=""
            className="h-[40px] w-[40px] bg-white rounded-full mr-2"
          />
          <input
            ref={updateRef}
            type="text"
            placeholder="Your comment..."
            className="w-full bg-transparent outline-none"
            value={updateValue}
            onChange={(e) => setUpdateValue(e.target.value)}
          />
          <div className="flex justify-center items-center mx-2 relative">
            <button
              type="button"
              onClick={() => setShowEmoji(!showEmoji)}
              className="text-3xl hover:opacity-50"
            >
              <BsEmojiSmile />
            </button>
            {showEmoji && (
              <div
                ref={emoijRef}
                className="absolute bottom-full md:right-0 right-[-70px]"
              >
                <Picker
                  data={data}
                  onEmojiSelect={(e) => onEmojiSelect(e)}
                  theme={theme}
                  emojiSize={24}
                  perLine={perLine}
                />
              </div>
            )}
          </div>
          <button type="submit" className="text-3xl">
            <MdOutlineSendAndArchive />
          </button>
        </div>
      </form>
      <span className="ml-[calc(50px_+_1rem)] mt-1 block text-sm">
        Nhấn Esc để{" "}
        <button className="text-blue-600" onClick={handleCancerUpdate}>
          Hủy
        </button>
      </span>
    </>
  );
}
