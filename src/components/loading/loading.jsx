import React, { useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners'
import  ClipLoader from 'react-spinners/ClipLoader'

function Loading() {
    const [load,setLoading] = useState(false)
    useEffect(() =>{
        setLoading(true)
        setTimeout(() =>{
            setLoading(false)
        },2000)
    },[])

  return (
    <>
    {
            load?
            <ClipLoader color={'#D00218'} loading={BeatLoader} size={150}/>
            :
            <></>
        }
     </>
  )
}

export default Loading