import React from 'react';

const Pagination = ({url, page, maxPages}) => {
    const previousPage = (page > 1) ? <a className="pagination-previousPageLink pagination-link" 
                                         href="">&#9668;</a> : null;
    const nextPage = ((page + 1) <= maxPages) ? <a className="pagination-nextPageLink pagination-link" 
                                                   href="">&#9658;</a> : null;
    const pages = [];
    pages.push(1, '..', page - 1, page, page + 1, '..', maxPages);
    const links = pages.reduce((acc, curr, index, arr) => {
      if (typeof curr === "string") {
        return (Math.abs(arr[index - 1] - arr[index + 1]) === 1 || Math.abs(arr[index - 1] - arr[index + 1]) === 0) ? acc : acc.concat([curr]); 
      }
      else {
        return (acc.indexOf(curr) < 0 && curr <= maxPages) ? acc.concat([curr]): acc;   
      }
    }, [])
    .filter((n) => typeof(n) === "string" || n >= 1)
    .map((text) => (typeof text === "number") ? <a className="pagination-specificPageLink pagination-link" 
                                                   href="">{ text }</a> : <span className="pagination-ellipsis">{ text }</span>);
    
    return (
        <div className="pagination">
            { previousPage }
            { links }
            { nextPage }
        </div>
    );
}

Pagination.defaultProps = {
    page: 48,
    maxPages: 80
};

export default Pagination;