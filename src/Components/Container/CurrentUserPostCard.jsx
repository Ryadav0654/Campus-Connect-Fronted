import React from 'react'

import HeartSvg from "/src/assets/heart.svg";
import CommentSvg from "/src/assets/comment.svg";
import repostSvg from "/src/assets/repost.svg";


const CurrentUserPostCard = ({post = undefined}) => {
    
    return (
        <div className="bg-[#f6f3ef] flex flex-wrap py-4 px-5 rounded-[1.2rem] w-[46%] m-2 shadow-lg border-none ">
         
          <div className="w-full ">
            <div className="mb-5 px-2 text-black">
              <p className="text-justify  overflow-clip">{post?.description}</p>
            </div>
            <div className="">
              {post?.MediaFile.url && (
                <div className="w-full h-[35vh] overflow-hidden">
                  <img
                    className="w-full h-[35vh] rounded-2xl overflow-hidden"
                    src={post?.MediaFile.url}
                    alt="post"
                  />
                </div>
              )}
            </div>
    
            <div className="flex gap-10 px-5 mt-5">
              <p className='flex gap-3'> <img src={HeartSvg} />{post?.likesCount}</p>
              <p className='flex gap-3'> <img src={CommentSvg}/>{post?.commentsCount}</p>
              <p className='flex gap-3'> <img src={repostSvg}/>{0}</p>
    
            </div>
          </div>
        </div>
      );
  
}

export default CurrentUserPostCard