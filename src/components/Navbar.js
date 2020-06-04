import React from "react"
import { Link } from "gatsby"

import navStyles from "../css/nav.module.css"

export default function Navbar({ pages }) {
  return (
    <nav className={navStyles.navbar}>
      {pages.map(page => {
        return (
          <Link
            activeClassName={navStyles.nav__item__active}
            partiallyActive={page.path !== "/" ? true : false}
            className={navStyles.nav__item}
            key={page.path}
            to={page.path}
          >
            {page.title}
          </Link>
        )
      })}
    </nav>
  )
}
