'use client'
import React, { useEffect, useState } from 'react'

import useQuizStore from '../store'
import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import { Player, Controls } from '@lottiefiles/react-lottie-player'

export default function Quiz() {
  const [questions, setQuestions] = useState<any>([])
  const [answear, setAnswear] = useState('')
  const [loading, setLoading] = useState(false)

  const config = useQuizStore((state: any) => state.config)
  const addScore = useQuizStore((state: any) => state.addScore)
  const { numberOfQuestion, category, level, type, status, score } = config

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const quizFetch = async () => {
    setLoading(true)
    const { results } = await (
      await fetch(
        `https://opentdb.com/api.php?amount=${config.numberOfQuestion}&category=${config.category.id}&difficulty=${config.level}&type=${config.type}`,
      )
    ).json()
    let shuffleResults = results.map((result: any) => {
      let value = [...result.incorrect_answers, result.correct_answer]
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
      result.answers = [...value]

      return result
    })

    setTimeout(() => {
      setQuestions([...shuffleResults])
      setLoading(false)
    }, 300)
  }

  useEffect(() => {
    quizFetch()
  }, [numberOfQuestion, category, level, type, status])

  const handleNext = () => {
    let remaningQuestions = [...questions]
    remaningQuestions.shift()
    setQuestions([...remaningQuestions])
    setAnswear('')
  }
  const checkAnswer = (answer: string) => {
    if (answer === questions[0]?.correct_answer) {
      addScore(0)
    }

    setAnswear(questions[0]?.correct_answer)
  }

  return (
    <section className="flex flex-col items-center justify-center mt-10">
      {questions.length ? (
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Question Number{' '}
          <span className="text-blue-600 dark:text-blue-500">
            #{config.numberOfQuestion - questions?.length + 1}
          </span>{' '}
          CRM.
        </h1>
      ) : null}
      {!loading && questions.length ? <p className="text-2xl ">Score: {config.score}</p> : null}
      <section className="shadow-2xl my-10 p-10 w-[90%] rounded-lg flex flex-col justify-center items-center shadow-blue-200 ">
        <h4 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-center text-blue-600 md:text-2xl lg:text-3xl dark:text-blue-500">
          {questions[0]?.question}
        </h4>

        {loading && !questions.length && (
          <div className="flex items-center justify-center gap-5">
            <Skeleton className="w-[400px] h-[50px] rounded-lg" />
            <Skeleton className="w-[400px] h-[500px] rounded-lg" />
          </div>
        )}
        {!loading && !questions.length && (
          <div className="flex flex-col items-center justify-center">
            <Player
              src="https://assets9.lottiefiles.com/packages/lf20_touohxv0.json"
              className="player"
              loop
              autoplay
              style={{ width: '400px', height: '400px' }}
            />
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              Your SCORE: {config?.score}
            </h1>

            <button
              onClick={() => window.location.reload()}
              type="button"
              className={` w-[33%] py-3.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-blue-600  hover:text-white  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700`}>
              Return
            </button>
          </div>
        )}
        <div className="flex justify-evenly items-center my-10 flex-wrap  w-[90%]">
          {questions[0]?.answers.map((el: any, i: number) => (
            <button
              key={i}
              onClick={() => checkAnswer(el)}
              type="button"
              className={cn(
                'w-[33%] py-3.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-blue-600 hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 shadow-blue-200  shadow-2xl',
                {
                  'bg-red-900': el !== answear && answear,
                  'bg-green-700': el === answear && answear,
                  'hover:bg-red-900': el !== answear && answear,
                  'hover:bg-green-700': el === answear && answear,

                  'text-white': answear,
                },
              )}>
              {el}
            </button>
          ))}
        </div>
        {questions.length ? (
          <button
            disabled={answear === ''}
            onClick={handleNext}
            type="button"
            className={` w-[33%] py-3.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200  ${
              answear === '' ? 'text-gray-90 bg-white' : 'hover:bg-blue-600  hover:text-white'
            }  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700`}>
            Next
          </button>
        ) : null}
      </section>
    </section>
  )
}
