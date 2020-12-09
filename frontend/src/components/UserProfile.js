import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ReactPlayer from 'react-player'
import { isCreator } from '../lib/authentication'
import { Link } from 'react-router-dom'


const UserProfile = (props) => {
  console.log(props.match.params)
  const userId = props.match.params.userId
  const [user, updateUser] = useState({})

  useEffect(() => {
    axios.get(`/api/users/${userId}`)
      .then(resp => {
        console.log(resp.data)
        updateUser(resp.data)
      })
  }, [])

  if (!user.genres) {
    return <div>
      <h2>Loading...</h2>
    </div>
  }

  return <main className="profileMain">
    {isCreator(user.id) && <div>
      <Link to={`/edit-user/${userId}`}>Edit Profile</Link>
    </div>}
    <h1>{user.username}</h1>
    <div className="bio">
      <div className="bioContainer">
        <h4>Interests:</h4>
        {console.log(user.genres)}
        <div className="interests">
          {user.genres.map((genre, index) => {
            return <div key={index}>
              <p>{genre.name}</p>
            </div>
          })}
        </div>
      </div>
    </div>
    <div className="headerVids">
      <h2>{user.username}'s videos</h2>
      <div className="userVideos">
        {user.videos.map((video, index) => {
          return <div className="videoCard" key={index}>
            <Link to={`/videos/${video.id}`}>{video.title}</Link>
            <ReactPlayer className="singleThumbnail"
              url={video.vid_url}
              width={250}
              height={150}
            />
            <p>{video.description}</p>

          </div>
        })}
      </div>
    </div>
  </main>

}

export default UserProfile