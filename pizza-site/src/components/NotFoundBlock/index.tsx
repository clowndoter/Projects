import React, { FC } from "react"

import cl from "./NotFoundModule.module.scss"

const NotFoundBlock: FC = () => {
  return (
    <div className={cl.root}>
      <h1>Ничего не найдено</h1>
    </div>
  )
}

export default NotFoundBlock
