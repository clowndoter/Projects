import axios from "axios"
import React, { FC, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import cl from "./AboutPizza.module.scss"

const AboutPizza: FC = () => {
  const navigate = useNavigate()
  const [pizzaInfo, setPizzaInfo] = useState<{
    imageUrl: string
    title: string
  }>()
  const { id } = useParams()

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const { data } = await axios.get(
          "https://6435379583a30bc9ad5aeaf1.mockapi.io/items/" + id
        )
        setPizzaInfo(data)
      } catch (error) {
        alert(error)
        navigate("/")
      }
    }

    fetchPizza()
  }, [])

  return (
    <div className={cl.root}>
      <img className={cl.pizza__img} src={pizzaInfo?.imageUrl} />
      <div>
        <h2 className={cl.pizza__title}>{pizzaInfo?.title}</h2>
        <p className={cl.pizza__description}>
          Пицца {pizzaInfo?.title} – это прекрасный выбор для любителей
          классических итальянских блюд. Она представляет собой тонкое хрустящее
          тесто, щедро залитое томатным соусом и нежной моцареллой. Также на
          этой пицце присутствуют кусочки свежих помидоров и ароматный базилик,
          что придает ей неповторимый вкус.
        </p>
        <p className={cl.pizza__description}>
          Наши повара используют только свежие и качественные ингредиенты, чтобы
          создать вам самую вкусную пиццу Маргариту. Мы готовим каждую пиццу на
          заказ, чтобы убедиться, что она свежая и соответствует вашим
          предпочтениям.
        </p>
      </div>
    </div>
  )
}

export default AboutPizza
