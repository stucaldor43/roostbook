import React from 'react';
import './../../stylesheets/components/Pagination/styles.css';

const Pagination = ({url, page, maxPages, goToPage}) => {
    const previousPage = (page > 1) ? <span className="pagination-previousPageLink pagination-link" 
                                         onClick={() => goToPage(page - 1)}>&#9668;</span> : null;
    const nextPage = ((page + 1) <= maxPages) ? <span className="pagination-nextPageLink pagination-link" 
                                                   onClick={() => goToPage(page + 1)}>&#9658;</span> : null;
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
    .filter((el, i, arr) => arr.length === 1 ? false : true)
    .map((text) => (typeof text === "number") ? <span className={`pagination-specificPageLink pagination-link ${text === page ? 'pagination-currentPageLink' : ''} ?`} 
                                                   onClick={() => goToPage(text)}>{ text }</span> : <span className="pagination-ellipsis">{ text }</span>);
    
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