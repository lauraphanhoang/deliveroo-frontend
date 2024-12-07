import { useState, useEffect } from "react";
import Header from "./Components/Header";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://site--deliveroo-backend--8ds5rm7hfbhl.code.run/"
      );
      // console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  let total = 0;

  for (let i = 0; i < cart.length; i++) {
    total = total + cart[i].price * cart[i].quantity;
  }

  return (
    <>
      <Header />
      <div>
        {isLoading ? (
          <span>En cours de chargement... </span>
        ) : (
          <>
            <div className="container-1">
              <div className="restaurant">
                <h1>{data.restaurant.name}</h1>
                <p>{data.restaurant.description}</p>
              </div>
              <img src={data.restaurant.picture} />
            </div>

            <div className="content">
              <div className="center">
                <div className="main-left">
                  {data.categories.map((elem, index) => {
                    if (elem.meals.length !== 0)
                      return (
                        <section key={index}>
                          <h2>{elem.name}</h2>
                          <div className="menus">
                            {elem.meals.map((meal) => {
                              return (
                                <div
                                  key={meal.id}
                                  onClick={() => {
                                    const newCart = [...cart]; // on fait une copie de cart
                                    const mealInCart = newCart.find(
                                      (elem) => elem.id === meal.id
                                    );
                                    // console.log(mealInCart);
                                    // si mon plat n'est pas encore dans le panier, je le push (en lui ajoutant une clef quantity qui vaut 1)
                                    if (!mealInCart) {
                                      newCart.push({ ...meal, quantity: 1 });
                                    } else {
                                      //si mon plat est déjà dans le panier, je vais incrémenter sa clef quantity
                                      mealInCart.quantity++;
                                    }
                                    setCart(newCart);
                                    // setCounter(counter + 1);
                                    // console.log(elem.title, elem.price);
                                  }}
                                >
                                  <div className="menu-items" key={meal.id}>
                                    <div className="left">
                                      <h3>{meal.title}</h3>
                                      <p className="description">
                                        {meal.description}
                                      </p>
                                      <div>
                                        <span className="price">
                                          {meal.price} €
                                        </span>

                                        {meal.popular && (
                                          <span className="popularity">
                                            <i className="fa-solid fa-star"></i>
                                            Populaire
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                    <div className="right"></div>
                                    {meal.picture && (
                                      <img
                                        key={meal.id}
                                        src={meal.picture}
                                        alt="miam"
                                      />
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </section>
                      );
                  })}
                </div>

                <div className="main-right">
                  <div className="cart-element">
                    <button className="valider">Valider mon panier</button>
                    {cart.length === 0 ? (
                      <div className="empty-cart">Votre panier est vide</div>
                    ) : (
                      <div className="full-cart">
                        {cart.map((meal, index) => {
                          return (
                            <div key={meal.id} className="quantity">
                              <button
                                onClick={() => {
                                  const newCart = [...cart];
                                  if (newCart[index].quantity === 1) {
                                    newCart.splice(index, 1);
                                  } else {
                                    newCart[index].quantity--;
                                  }
                                  setCart(newCart);
                                }}
                              >
                                -
                              </button>
                              <p>{meal.quantity}</p>
                              <button
                                onClick={() => {
                                  const newCart = [...cart];
                                  const mealInCart = newCart.find(
                                    (elem) => elem.id === meal.id
                                  );
                                  if (!mealInCart) {
                                    newCart.push({ ...meal, quantity: 1 });
                                  } else {
                                    mealInCart.quantity++;
                                  }
                                  setCart(newCart);
                                }}
                              >
                                +
                              </button>
                              <div className="commande">
                                <p key={meal.id}>{meal.title}</p>
                                <p>
                                  {(Number(meal.price) * meal.quantity).toFixed(
                                    2
                                  )}
                                  €
                                </p>
                              </div>
                            </div>
                          );
                        })}
                        <p>Total : {total.toFixed(2)}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
