import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import Search from "./search"

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `#205D86`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      className="title-menu-container"
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>

      <ul className="nav-items">
        <li className="nav-item">
          <Link
            to="/blog"
          >
            Blog
          </Link>
        </li>

        <li className="nav-item nav-item--search">
          <Search />
        </li>
      </ul>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
