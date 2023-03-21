import { useState } from "react";
import { useNavigate } from "react-router-dom";

type IKey = {
  [key: string]: string;
}

type IDataTable = {
  [key: string]: string | number | IKey
}

const useHandleDataTable = ({ dataTable }: { dataTable: IDataTable[] }) => {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState<number[]>([])

  const selectAllTable = () => {
    if (dataTable.length === selectedItems.length) {
      setSelectedItems([])
    }
    else {
      const all = dataTable.map((item) => +item.id)
      setSelectedItems(all)
    }
  }

  const selectItemTable = (value: number) => {
    if (selectedItems.includes(value)) return setSelectedItems(selectedItems.filter((item: any) => item !== value))
    setSelectedItems([...selectedItems, value])
  }

  const handleEdit = (path: string, value: number) => {
    navigate(`${path}/${value}`)
  }

  return {
    selectAllTable,
    selectItemTable,
    handleEdit,
    selectedItems,
    setSelectedItems
  }

}

export default useHandleDataTable