import React from "react"
import Header from "../components/Header"
import "../css/main.css"

export default function Layout({ children, pages, title }) {
  return (
    <div>
      <Header pages={pages} />
      <div className="container">{children}</div>
    </div>
  )
}
