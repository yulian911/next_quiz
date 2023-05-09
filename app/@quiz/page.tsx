'use client'
import React, { useEffect, useState } from 'react'
import useQuizStore from '../store'

export default function Quiz() {
  const [questions, setQuestions] = useState([])
  const [answear, setAnswear] = useState('')
  const [loading, setLoading] = useState(false)

  const config = useQuizStore(state => state.config)
  const addScore = useQuizStore(state => state.addScore)

  const quizFetch = async () => {
    const { results } = await (
      await fetch(
        `https://opentdb.com/api.php?amount=${config.numberOfQuestion}&category=${config.category.id}&difficulty=${config.level}&type=${config.type}`,
      )
    ).json()
    setQuestions(results)
  }

  useEffect(() => {
    quizFetch()
  }, [])

  console.log(questions)

  return (
    <section className="flex flex-col justify-center items-center mt-10">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Question Number <span className="text-blue-600 dark:text-blue-500">#1</span> CRM.
      </h1>
      <p className="text-2xl ">Score: 0</p>
      <section className="shadow-2xl my-10 p-10 w-[90%] rounded-lg flex flex-col justify-center items-center shadow-blue-200 ">
        <h4 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-blue-600 md:text-2xl lg:text-3xl dark:text-blue-500">
          Question Number CRM.
        </h4>
        <div className="flex justify-evenly items-center my-10 flex-wrap  w-[90%]">
          {[...Array(4)].map((el, i) => (
            <button
              key={i}
              type="button"
              className=" w-[33%] py-3.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-blue-600 hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 shadow-blue-200  shadow-2xl">
              Alternative
            </button>
          ))}
        </div>
        <button
          type="button"
          className=" w-[33%] py-3.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-blue-600 hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
          Next
        </button>
      </section>
    </section>
  )
}
