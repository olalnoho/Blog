import { useState } from 'react'
const useEditModal = () => {
   const [showEditModal, setShowEditModal] = useState(false)
   const [selectedPost, setSelectedPost] = useState(null)
   return {
      showEditModal,
      setShowEditModal,
      selectedPost,
      setSelectedPost
   }
}

export default useEditModal