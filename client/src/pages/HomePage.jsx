import Main from 'templates/Main'
import Sidebar from 'templates/Sidebar'
import { useQuery } from '@tanstack/react-query'
import { getAllPosts } from 'services/user'
import Loader from 'components/modules/Loader'
import { getCategories } from 'services/admin'

const style = {
  display: "flex"
}

function HomePage() {

  const { data : posts , isLoading : isLoadingPosts } = useQuery(["post-list"], getAllPosts)
  const { data : categories  , isLoading : isLoadingCategories} = useQuery(["get-categories"], getCategories)

  return (
    <>
      {
        isLoadingPosts || isLoadingCategories ? (
          <Loader />
        ) : (
          <div style={style}>
            <Sidebar data={categories} />
            <Main posts={posts} />
          </div>
        )
      }
    </>
  )
}

export default HomePage