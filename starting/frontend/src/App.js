import React, { useState, useEffect } from 'react'
import api from './services/api'

import './App.css'

import Header from './components/Header'

function App() {
    const [projects, setProjects] = useState([])
    // useState returns an array with two positions
    // 1. variable with its initial value
    // 2. function to att this value

    useEffect(() => {
        api.get('projects').then(response => {
            setProjects(response.data)
        })
    }, [])
    // useEffect we will use to trigger function always that we have change information or 
    // when we want to trigger a function when the component is displayed on screen
    // 1 parameter -> what function i want to trigger
    // 2 -> when i want to trigger this function

    async function handleAddProject() {
        // setProjects([...projects, `Novo Projeto ${Date.now()}`])

        const response = await api.post('projects', {
            title: `Novo Projeto ${Date.now()}`,
            owner: "Paulo A. S Müller"
        })

        const project = response.data

        setProjects([...projects, project])
    }

    return (
        <>
            <Header title='Projects' />

            <ul>
                {projects.map(project => <li key={project.id}>{project.title}</li>)} {/* key must by informed in the first element */}
            </ul>

            <button type="button" onClick={handleAddProject}>Adicionar Projeto</button>
        </>
    )
}

export default App