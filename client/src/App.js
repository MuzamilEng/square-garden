import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './app/pages/Home'
// import UserForm from './app/Component/UserForm'
// import Login from './app/pages/Login'
// import SignUp from './app/pages/SignUp'
// import BuildingSurvey from './app/pages/BuildingSurvey'
// import ProjectManagement from './app/pages/ProjectManagement'
// import IndependentMonitering from './app/pages/IndependentMonitering'
// import PublicSector from './app/pages/PublicSector'
// import CostManagement from './app/pages/CostManagement'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        {/* <Route path='/buildingSurvey' element={<BuildingSurvey />} />
        <Route path='/projectManagement' element={<ProjectManagement />} />
        <Route path='/independentMonitering' element={<IndependentMonitering />} />
        <Route path='/publicSector' element={<PublicSector />} />
        <Route path='/:id' element={<CostManagement />} />
        <Route path='/add' element={<UserForm />} />
        <Route path='/edit/:id' element={<UserForm />}/>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} /> */}
      </Routes>
    </>
  )
}

export default App