import React from 'react'

const Modal = props => {
   if(!props.show) {
      return <></>
   }
   return (
      <div onClick={e => e.stopPropagation()} className="modal">
         {props.children}
      </div>
   )
}

export default Modal
