import AddPost from 'templates/AddPost'
import React from 'react'
import PostList from 'components/templates/PostList'

function DashboardPage() {
  return (
    <div>
      <AddPost />
      <PostList />
    </div>
  )
}

export default DashboardPage