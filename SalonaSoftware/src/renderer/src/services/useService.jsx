import React from 'react'
import useRequest from '../utils/useRequest'

const useService = () => {
    const { Request } = useRequest()
  return (
    <div>useService</div>
  )
}

export default useService