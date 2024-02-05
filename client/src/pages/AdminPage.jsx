import CategoryForm from 'templates/CategoryForm'
import CategoryList from 'templates/CategoryList'
import React from 'react'

function AdminPage() {
  return (
    <div>
      <CategoryForm />
      <CategoryList />
    </div>
  )
}

export default AdminPage