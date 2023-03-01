import { useState } from 'react';
import { Key } from '../interface';

function useEditData() {
  const [isOpenModalEdit, setIsOpenModalEdit] = useState<Key | null>(null);

  const handleOpenEditModal = (data: any) => {
    setIsOpenModalEdit(data);
  };

  const handleCloseEditModal = () => {
    setIsOpenModalEdit(null);
  };

  return {
    isOpenModalEdit,
    handleOpenEditModal,
    handleCloseEditModal,
  };
}

export default useEditData;
