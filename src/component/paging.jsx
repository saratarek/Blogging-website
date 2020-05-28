import React, { useState } from 'react';
import {AiOutlineArrowRight} from "react-icons/ai";
import _ from "lodash";


const Paging=props=>{
  const [pages]=useState(_.range(1,props.pageCount+1))
  return (<React.Fragment>
       <div className="paging">
            <div className="paging__arrow">
                <i className="fas fa-angle-left"></i>
            </div>
             {pages.map(page => ( 
               
                <div
                 key={page} 
                className={props.activePage==page?"paging__number active" :"paging__number"}
                onClick={() =>props.onPageChange(page)}
                >
              {page}
            </div>
             ))}
            
               <div className="paging__arrow">
               <AiOutlineArrowRight/>
            </div>
            </div>
      </React.Fragment>
      )
}
export default Paging;