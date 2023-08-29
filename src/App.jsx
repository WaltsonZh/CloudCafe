import React, { useEffect, useState } from 'react'
import './fireabase.js'
import { db } from './fireabase.js'
import { collection, onSnapshot } from 'firebase/firestore'

export default function App() {
  const [cafes, setCafes] = useState([])
  const cafeList = cafes.map((cafe) => {
    return (
      <li key={cafe.id}>
        <span>{cafe.name}</span>
        <span>{cafe.city}</span>
      </li>
    )
  })

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'cafes'), (snapshot) => {
      setCafes(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      )
    })
    return unsubscribe
  }, [])

  return (
    <div>
      <h1>Cloud Cafe</h1>
      <div className='content'>
        <form id='add-cafe-form'></form>
        <ul id='cafe-list'>{cafeList}</ul>
      </div>
    </div>
  )
}
