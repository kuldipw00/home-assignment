import React, { useState, useEffect } from 'react';
import Pagination from 'react-js-pagination'
import _ from 'lodash'
import PostDetail from './PostDetail';
//import {TextField} from "@mui/material"
//import "bootstrap/less/bootstrap.less";

function RecordsGrid() {
  const [postData,setPostData] = useState([])
  const [LimitedPostRecord,setLimitedPostRecord] = useState([])
  const [postDetails,setPostDetail] = useState({})
  const [isPostDetail,setIsPostDetail] = useState(false)
  const [activePage,setActivePage] = useState(1)
  const [totalCount,setTotalCount] = useState()

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((json) => {
        console.log("JSON",json)
        setPostData(json);
        setLimitedPostRecord(json.slice(0,10))
        setTotalCount(json.length)
      });
      
  },[]);
  const handlePostSearch = (val) =>{
    const filteredData = postData.filter(item=>{
      return item.title.includes(val)
    })
    setLimitedPostRecord(filteredData.slice(0,10))
    setTotalCount(filteredData.length)
  }
  const handleSearch = (e) =>{
    _.debounce(handlePostSearch(e.target.value),500)
  }
  //handlePostSearch = _.debounce(handlePostSearch,500)
  const backButtonClick = () => {
    setIsPostDetail(false)
  }
  const handlePageChange = (pageNumber) =>{
    console.log("pageNumber",pageNumber)
    let offset = (pageNumber-1) * 10
    const limit = pageNumber * 10
    console.log("offset",offset,limit)

    setLimitedPostRecord(postData.slice(offset,limit))
    console.log("postLimit",postData.slice(offset,limit))
    setActivePage(pageNumber)

  }

  const handleOnClick = (e,item) =>{
    
    setPostDetail(item)
    setIsPostDetail(true)

  }
  const handleSortBy = (e) => {
    if (e.target.value == "asc") {
      let data = postData.sort((a, b) => {
        return a.title > b.title ? 1 : b.title > a.title ? -1 : 0;
      });
      setLimitedPostRecord(data.slice(0, 10));
    } else if (e.target.value == "dsc") {
      let data = postData.sort((a, b) => {
        return b.title > a.title ? 1 : a.title > b.title ? -1 : 0;
      });
      setLimitedPostRecord(data.slice(0, 10));
    } else{
        setLimitedPostRecord(postData.slice(0, 10));
    }
  }
  return (
    <div className="">
      {!isPostDetail && (
        <div>
          <div>
            <input
              placeholder="Search Post by Title"
              className="post-div"
              onChange={handleSearch}
            />
             <label>
                Sort by Title:
              <select
              className='sort-select'
                name="SelectedSort" 
                defaultValue="select"
                onChange={handleSortBy}
                >
                <option value="select">--Select--</option>
                <option value="asc">A-Z</option>
                <option value="dsc">Z-A</option>
              </select>
            </label>
          </div>
          <label style={{margin:'20px'}}> Note : Click on cards to view detail</label>
          <div>
           
          </div>
          <div className="post-card-container">
            {LimitedPostRecord.map((item) => (
              <div
                onClick={(e) => handleOnClick(e, item)}
                className="post-card"
              >
                <label style={{ fontWeight: "bold" }}>{item.title}</label>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
          <div className="pagination-container">
            <Pagination
              activePage={activePage}
              itemsCountPerPage={10}
              totalItemsCount={totalCount}
              pageRangeDisplayed={5}
              onChange={handlePageChange}
            />
          </div>
        </div>
      )}
      {isPostDetail && (
        <PostDetail
          backButtonClick={backButtonClick}
          PostDetail={postDetails}
        ></PostDetail>
      )}
    </div>
  );
}

export default RecordsGrid;
