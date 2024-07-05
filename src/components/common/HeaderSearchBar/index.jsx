import React from 'react'

const index = () => {
  return (
    <form action="#" className="float-left header-search">
        <div className="form-group mb-0 icon-input">
          <i className="feather-search font-lg text-grey-400"></i>
          <input
            type="text"
            placeholder="Start typing to search.."
            className="bg-grey border-0 lh-32 pt-2 pb-2 pl-5 pr-3 ml-2 font-xsss fw-500 rounded-xl w350"
          />
        </div>
      </form>
  )
}

export default index