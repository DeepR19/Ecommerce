import React from 'react'
import {Rating} from "@material-ui/lab";

export default function ReviewCard({review}) {
      // style of the rating stars
      const options = {
        size: "large",
        value: review.rating,
        readOnly: true,
        precision: 0.5
      }

  return (
    <>
        <div className="reviewCard">
            <img src="" alt="User" />
            <p>{review.name}</p>
            <Rating {...options}/>
            <span>{review.comment}</span>
        </div>
    </>
  )
}
