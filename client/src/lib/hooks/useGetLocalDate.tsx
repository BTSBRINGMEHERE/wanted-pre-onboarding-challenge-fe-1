import { create } from "domain";
import React from "react";

const useGetLocalDate = () => {
  const handleUTCTimeToLocalTime = (date: string) => {
    const createDate = new Date(date);
    const createDateToTime = createDate.getTime();
    const now = Date.now();
    const fromNow = now - createDateToTime;
    const fromNowToSecond = fromNow / 1000;

    const time = {
      minute: Math.floor((fromNowToSecond % 3600) / 60),
      hour: Math.floor(fromNowToSecond / 3600),
      day: Math.floor(fromNowToSecond / (3600 * 24)),
    };

    if (time.hour < 1) {
      return `${time.minute}분 전`;
    }

    if (time.day < 1) {
      return `${time.hour}시간 전`;
    }

    if (time.day > 1 && time.day <= 7) {
      return `${time.day}일 전`;
    }

    const year = createDate.getFullYear();
    const month = createDate.getMonth();
    const day = createDate.getDate();

    return `${year}년 ${month + 1}월 ${day}일`;
  };

  return { handleUTCTimeToLocalTime };
};

export default useGetLocalDate;
