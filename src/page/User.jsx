import React, {useEffect, useState} from 'react'
import { firestore } from '../firebase/clientApp'
import { collection, DocumentData, query, getDocs } from 'firebase/firestore'

const User = () => {
    
    const [favoriteList, setFavoriteList] = useState([])
    const favoriteCollection = collection(firestore, 'favorite')

    const getFavoriteList = async() => {
        const favoriteListQuery = query(favoriteCollection)
        const querySnapshot = await getDocs(favoriteListQuery)
        const result = []
        querySnapshot.forEach((snapshot) => result.push(snapshot))
        setFavoriteList(result)
    }


    useEffect( () => {
        getFavoriteList()
    }, [])

    return (
    <div className='flex gap-8'>
        {favoriteList.map((listItem, index) => (
            <div className='text-white text-lg ' key={index} >
                {listItem.data().title}
            </div>
            )
        )}
    </div>
  )
}

export default User