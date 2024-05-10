import axios from "axios";

import { useEffect, useState } from "react";
const FormData = require('form-data');

const steps = [
    { name: 'Step 1', href: '#', status: 'complete' },
    { name: 'Step 2', href: '#', status: 'current' },
    { name: 'Step 3', href: '#', status: 'upcoming' },
    { name: 'Step 4', href: '#', status: 'upcoming' },
]

export default function Quiz() {

    const [quiz, setQuiz] = useState([]);
    const [current, setCurrent] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [finished, setFinished] = useState(false);

    const [result, setResult] = useState({})

    useEffect(() => {
        const getQuiz = async () => {
            const response = await axios.get("https://sandbox.practical.me/api/common/quiz?average_meals_day=2&average_snacks_day=3")
            console.log(response.data.data)
            setQuiz(response.data.data)
        }
        getQuiz();
        console.log("hello")
    }, [])

    const handleSubmit = async () => {

        let data = new FormData();
        data.append('gender', 'Male');
        data.append('main_goal', 'Gain muscle');
        data.append('average_daily_activity_level', 'High');
        data.append('age', '60');
        data.append('weight', '81');
        data.append('average_meals_day', '3');
        data.append('average_snacks_day', '5');
        data.append('meals_deliver_per_day', answers[0]);
        data.append('snacks_deliver_per_day', answers[1]);
        data.append('meal_days_per_week', answers[2]);
        data.append('meal_plan_require_weeks', answers[3]);
        data.append('quiz_type', 'quiz_a');

        const response = await axios.post("https://sandbox.practical.me/api/quiz", data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            }
        })
        console.log(response.data.data)
        setResult(response.data.data)
    }

    const handleClick = (option) => {
        setCurrent(current + 1 < quiz.length ? current + 1 : current)
        setFinished(current + 1 === quiz.length ? true : false)
        setAnswers([...answers, answers[current] = option])
    }

    useEffect(() => {
        if (finished) {
            console.log("Quiz finished")
            handleSubmit()
        }
    }, [finished])
    return (
        <>
            {!finished && quiz && quiz.length > 0 && <QuestionBox key={quiz[current].id} id={quiz[current].id} question={quiz[current].question} options={quiz[current].options} handleClick={handleClick} />}
            {finished && (
                <div>
                    Hello world
                </div>
            )}
        </>
    )
}


const notificationMethods = [
    { id: 'email', title: 'Email' },
    { id: 'sms', title: 'Phone (SMS)' },
    { id: 'push', title: 'Push notification' },
]

function QuestionBox({ id, question, options, handleClick }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-1/2 bg-white p-6 rounded shadow">
                {/* <label className="text-base font-semibold text-gray-900">Notifications</label> */}
                <p className="text-sm text-gray-500">{question}</p>
                <fieldset className="mt-4">
                    <legend className="sr-only">Notification method</legend>
                    <div className="space-y-4">
                        {options.map((opt, i) => (
                            <div key={id} className="flex items-center">
                                <input
                                    id={id}
                                    value={opt}
                                    name="notification-method"
                                    type="radio"
                                    onClick={() => {
                                        handleClick(opt)
                                    }}
                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                                <label htmlFor={id} className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                                    {opt}
                                </label>
                            </div>
                        ))}
                    </div>
                </fieldset>
            </div>
        </div>
    )
}

