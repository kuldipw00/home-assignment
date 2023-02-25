import React from 'react'
//import './App.css';
import Logo from '../../logo.svg'
function PostDetail({PostDetail,backButtonClick}) {
  return (
    <div>
    <div style={{textAlign:'center',display:'flex',justifyContent:'center'}}>
    <button onClick={backButtonClick} style={{margin:'1.5rem',height:'30px',}}>{`< Back`}</button>

        <div className='post-detail'>
            <label style={{fontWeight:'bold'}}>{PostDetail.title}</label>
            <p>{PostDetail.body}</p>
            <img style={{width:'300px'}} alt='' src={Logo}/>
        </div>
    </div>
    </div>
  )
}

export default PostDetail