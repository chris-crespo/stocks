import React, { useState } from "react"

const useSelectedItems = <T>(items: T[]) => {
  const [selectedItems, setSelectedItems] = useState<T[]>(items)

  const selectItem = (item: T) => {
    if (!isItemSelected(item)) {
      setSelectedItems(prev => [...prev, item])
    }
  }

  const unselectItem = (item: T) => {
    setSelectedItems(prev => prev.filter(selectedItem => selectedItem !== item))
  }

  const toggleItem = React.useCallback((item: T) => {
    if (isItemSelected(item)) unselectItem(item)
    else selectItem(item)
  }, [selectedItems])

  const isItemSelected = React.useCallback((item: T): boolean => {
    return selectedItems.includes(item)
  }, [selectedItems])

  return {
    selectedItems,
    toggleItem,
    isItemSelected
  }
}

export default useSelectedItems
