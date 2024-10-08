import React, { useEffect, useState } from "react";
import ProfileImage from "../ProfileImage";
import HeartSvg from "/src/assets/heart.svg";
import CommentSvg from "/src/assets/comment.svg";
import repostSvg from "/src/assets/repost.svg";
import sendSvg from "/src/assets/send.svg";
import LikeBtn from "./LikeBtn";

import PostTime from "../../PostTime";
import { apiClient } from "../../lib/api-client";
import { COMMENT_ROUTE } from "../../utils/constants";
import CommentBtn from "./CommentBtn";
import RepostBtn from "./RepostBtn";
import ShowComment from "./ShowComment";

import ReactPlayer from "react-player";

function ShowPostCard({ post = undefined }) {
  const [commentMsg, setCommentMsg] = useState("");
  const [allComment, setAllComment] = useState([]);
  // const [likes, setLikes]= useState('0')
  const [showComments, setShowComments] = useState(false);

  const commentHandler = async () => {
    if (commentMsg.length > 0) {
      try {
        const response = await apiClient.post(
          `${COMMENT_ROUTE}${post._id}`,
          { content: commentMsg, postId: post._id },
          { withCredentials: true }
        );
        setCommentMsg("");
        console.log("comment", response.data.data);
      } catch (error) {
        console.log("comment_error", error);
      }
    }
    return;
  };

  useEffect(() => {
    try {
      (async () => {
        const getAllComment = await apiClient.get(
          `${COMMENT_ROUTE}${post._id}`,
          { withCredentials: true }
        );
        console.log("getAllComment", getAllComment.data.data);
        if (getAllComment.data.data) {
          setAllComment(getAllComment.data.data);
        }
      })();
    } catch (error) {
      console.log("comment_error", error);
    }
  }, [commentMsg]);

  const time = new Date(post?.createdAt);
  // console.log(time);
  return (
    <div className="bg-white flex flex-col py-5 px-8 rounded-[1.5rem] w-full h-34 my-6 shadow-md border-2 border-white">
      <div className="w-full mr-7 flex  ">
        <ProfileImage
          className="w-16 border-2 h-16"
          imgUrl={post?.owner.avatar}
        />
        <div className="flex flex-col">
          <div className="flex justify-center items-center">
            <p className="font-semibold text-xl ml-6 mr-4 mt-2 mb-1 text-black">
              {post?.owner.fullName}
            </p>
            {/* <p className="my-2 text-gray-700">@{post?.owner.username}</p> */}
          </div>
          <PostTime date={time} />
        </div>
      </div>
      <div className="w-full mt-3 pl-16">
        <div className="mb-5 px-5 text-black">
          <p className="text-justify">{post?.description}</p>
        </div>
        <div className="px-5">
          {post?.MediaFile.url && (
            <div className="w-full ">
              {post?.resourceType === "video" ? (
                <video
                  src={post?.MediaFile.url}
                  controls
                  muted
                  
                  preload="auto"
                  className="w-full  rounded-2xl overflow-hidden"
                ></video>
                //  <ReactPlayer url={post?.MediaFile.url} playing={true}  muted={false} width={"100%"} height={"100%"} className="w-full  rounded-2xl overflow-hidden" style={{ borderRadius: '30px',   overflow: 'hidden'}} /> 
              ) : (
                <img
                  className="w-full rounded-2xl overflow-hidden"
                  src={post?.MediaFile.url}
                  alt="post"
                />
              )}
            </div>
          )}
        </div>

        <div className="flex gap-10 pl-3 mt-5">
          <LikeBtn svg={HeartSvg} post={post} />
          <CommentBtn
            svg={CommentSvg}
            post={post}
            onClick={() => setShowComments(!showComments)}
          />
          <RepostBtn svg={repostSvg} />
        </div>
        <div className="flex gap-5 mt-5">
          <ProfileImage
            imgUrl={post?.owner.avatar}
            className="w-11 h-11 ml-5"
          />
          <input
            placeholder="write your commet..."
            className="px-5 py-3 bg-gray-300 w-full rounded-2xl border-none  outline-none text-black"
            value={commentMsg}
            onChange={(e) => {
              setCommentMsg(e.target.value);
            }}
          />
          <button className=" bg-blue-500 px-3 py-2 rounded-full w-14 h-11">
            <img
              src={sendSvg}
              className=""
              alt="post"
              onClick={commentHandler}
            />
          </button>
        </div>
        {/* show all comments  */}
        {showComments && allComment.length > 0 && (
          <div
            className={`w-full overflow-y-scroll ${
              allComment.length <= 2 ? "h-[10vh]" : "h-[30vh]"
            } no-scrollbar relative top-3`}
          >
            {allComment?.map((comment) => (
              <ShowComment comment={comment} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ShowPostCard;
