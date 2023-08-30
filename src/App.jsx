import React, { useEffect, useState } from 'react'
import './fireabase.js'
import { db } from './fireabase.js'
import { doc, addDoc, collection, deleteDoc, onSnapshot, query, orderBy } from 'firebase/firestore'

export default function App() {
  const [cafes, setCafes] = useState([])
  const cafeList = cafes.map((cafe) => {
    const remove = async (event) => {
      await deleteDoc(doc(db, 'cafes', event.target.parentElement.getAttribute('id')))
    }

    return (
      <li key={cafe.id} id={cafe.id}>
        <span>{cafe.name}</span>
        <span>{cafe.city}</span>
        <div onClick={remove}>x</div>
      </li>
    )
  })

  useEffect(() => {
    const q = query(collection(db, 'cafes'), orderBy('name'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setCafes(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      )
    })
    return unsubscribe
  }, [])

  const submmit = async (event) => {
    event.preventDefault()
    await addDoc(collection(db, 'cafes'), {
      name: event.target.name.value,
      city: event.target.city.value,
    })
    event.target.name.value = ''
    event.target.city.value = ''
  }

  return (
    <div>
      <h1>Cloud Cafe</h1>
      <div className='content'>
        <form id='add-cafe-form' onSubmit={submmit}>
          <input type='text' name='name' placeholder='Cafe Name' />
          <input type='text' name='city' placeholder='Cafe City' />
          <button>Add Cafe</button>
        </form>
        <ul id='cafe-list'>{cafeList}</ul>
      </div>
    </div>
  )
}
