import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'gatsby'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

// The GraphQL query that will be sent to Apollo.
const SEARCH_POSTS_QUERY = gql`
  query SearchPostsQuery($searchTerm: String!) {
    posts(where: { search: $searchTerm }) {
      nodes {
        databaseId
        title
        slug
        excerpt
      }
    }
  }
`

// The main Search Component.
const Search = () => {
  // Taking a reference to the input element.
  const inputEl = useRef(null)

  // Storing the search term, and the two show states.
  const [searchKey, setSearchKey] = useState('')
  const [showSearchBar, setShowSearchBar] = useState(false)
  const [showSearchResults, setShowSearchResults] = useState(false)

  // To ensure the input element is in focus when the search bar appears.
  useEffect(() => {
    if (showSearchBar) {
      inputEl.current.focus()
    }
  })

  // Show/hide the search form.
  const toggleSearchForm = () => {
    setShowSearchBar(!showSearchBar)
  }

  // Show/hide the search results.
  const toggleShowSearchResults = () => {
    setSearchKey(inputEl.current.value)
    setShowSearchResults(() => (searchKey.length > 0 ? true : false))
  }

  // Event when the close x button is clicked.
  const onCloseSearchBar = () => {
    inputEl.current.value = ''
    setShowSearchResults(false)
    setShowSearchBar(false)
  }

  return (
    <>
      <button className="search-btn" onClick={() => toggleSearchForm()}>
        <span role="img" aria-label="search">
          🔍
        </span>
      </button>
      <form
        onSubmit={(e) => e.preventDefault()}
        className={`search-form ${showSearchBar ? 'show' : ''}`}
      >
        <input
          ref={inputEl}
          type="text"
          onChange={(event) => toggleShowSearchResults(event)}
        />
        <button className="search-x-btn" onClick={() => onCloseSearchBar()}>
          ✕
        </button>
      </form>
      {!!showSearchResults && (
        <SearchResults
          showSearchResults={showSearchResults}
          searchKey={searchKey}
        />
      )}
    </>
  )
}

// The Search Results component.
const SearchResults = ({ showSearchResults, searchKey }) => {
  // Fetching the search data from WPGraphQL via Apollo.
  const { data: queriedData } = useQuery(SEARCH_POSTS_QUERY, {
    variables: { searchTerm: searchKey },
  })

  return (
    <div
      className={`search-results-container ${showSearchResults ? 'show' : ''}`}
    >
      <div className="search-results">
        <h3>Search results</h3>
        <div>
          {!!searchKey &&
            queriedData?.posts?.nodes &&
            queriedData.posts.nodes.map((post) => (
              <Link
                data-id={`post-${post.databaseId}`}
                key={`post-${post.databaseId}`}
                to={`/blog/${post.slug}`}
              >
                <h4 dangerouslySetInnerHTML={{ __html: post.title }} />
                <p dangerouslySetInnerHTML={{ __html: post.excerpt }} />
              </Link>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Search
