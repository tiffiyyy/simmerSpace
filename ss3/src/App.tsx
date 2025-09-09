import "./App.css";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { initScene } from "@webspatial/react-sdk";

// import recipe steps for che bap below
import Steps from "./steps";
import Ingredients from "./ingredients";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/recipe/:recipeId/ingredients" element={<Ingredients />} />
          <Route path="/recipe/:recipeId/step/:stepNumber" element={<Steps />} />
          <Route
            path="/"
            element={
              <>
                <div>{/*new code for main menu here*/}</div>
                <div className="card" style={{ marginTop: "0px" }}>
                  <h2>Simmer Space</h2>
                  <div>
                    {/* Clicking a link will open a new scene each time */}
                  </div>
                  <button
                    onClick={() => {
                      // before scene opens, resize the secondScene window
                      initScene("ingredients", (prevConfig) => {
                        return {
                          ...prevConfig,
                          defaultSize: {
                            width: 500,
                            height: 500,
                          },
                        };
                      });
                      window.open("/recipe/che-bap/ingredients", "ingredientsCB");
                    }}
                  >
                    Chè Bắp 🌽
                  </button>
                  <button
                    onClick={() => {
                      // before scene opens, resize the secondScene window
                      initScene("ingredients", (prevConfig) => {
                        return {
                          ...prevConfig,
                          defaultSize: {
                            width: 500,
                            height: 500,
                          },
                        };
                      });
                      window.open("/recipe/pho-bo/ingredients", "ingredientsPho");
                    }}
                  >
                    Phở Bò 🍜
                  </button>
                  <button
                    onClick={() => {
                      // before scene opens, resize the secondScene window
                      initScene("ingredients", (prevConfig) => {
                        return {
                          ...prevConfig,
                          defaultSize: {
                            width: 500,
                            height: 500,
                          },
                        };
                      });
                      window.open("/recipe/cha-gio/ingredients", "ingredientsChaGio");
                    }}
                  >
                    Chả Giò 🥟
                  </button>
                  <button
                    onClick={() => {
                      // before scene opens, resize the secondScene window
                      initScene("ingredients", (prevConfig) => {
                        return {
                          ...prevConfig,
                          defaultSize: {
                            width: 500,
                            height: 500,
                          },
                        };
                      });
                      window.open("/recipe/goi-cuon/ingredients", "ingredientsGoiCuon");
                    }}
                  >
                    Gỏi Cuốn 🌯
                  </button>
                  <button
                    onClick={() => {
                      // before scene opens, resize the secondScene window
                      initScene("ingredients", (prevConfig) => {
                        return {
                          ...prevConfig,
                          defaultSize: {
                            width: 500,
                            height: 500,
                          },
                        };
                      });
                      window.open("/recipe/banh-beo/ingredients", "ingredientsBanhBeo");
                    }}
                  >
                    Bánh Bèo 🥧
                  </button>
                  <button
                    onClick={() => {
                      // before scene opens, resize the secondScene window
                      initScene("ingredients", (prevConfig) => {
                        return {
                          ...prevConfig,
                          defaultSize: {
                            width: 500,
                            height: 500,
                          },
                        };
                      });
                      window.open("/recipe/banh-xeo/ingredients", "ingredientsBanhXeo");
                    }}
                  >
                    Bánh Xèo 🥞
                  </button>
                  <button
                    onClick={() => {
                      // before scene opens, resize the secondScene window
                      initScene("ingredients", (prevConfig) => {
                        return {
                          ...prevConfig,
                          defaultSize: {
                            width: 500,
                            height: 500,
                          },
                        };
                      });
                      window.open("/recipe/banh-chung/ingredients", "ingredientsBanhChung");
                    }}
                  >
                    Bánh Chưng 🥮
                  </button>
                  <button
                    onClick={() => {
                      // before scene opens, resize the secondScene window
                      initScene("ingredients", (prevConfig) => {
                        return {
                          ...prevConfig,
                          defaultSize: {
                            width: 500,
                            height: 500,
                          },
                        };
                      });
                      window.open("/recipe/banh-xanh/ingredients", "ingredientsBanhXanh");
                    }}
                  >
                    Bánh Xanh 🍃
                  </button>
                  <button
                    onClick={() => {
                      // before scene opens, resize the secondScene window
                      initScene("ingredients", (prevConfig) => {
                        return {
                          ...prevConfig,
                          defaultSize: {
                            width: 500,
                            height: 500,
                          },
                        };
                      });
                      window.open("/recipe/banh-cam/ingredients", "ingredientsBanhCam");
                    }}
                  >
                    Bánh Cam 🟡
                  </button>
                  <button
                    onClick={() => {
                      // before scene opens, resize the secondScene window
                      initScene("ingredients", (prevConfig) => {
                        return {
                          ...prevConfig,
                          defaultSize: {
                            width: 500,
                            height: 500,
                          },
                        };
                      });
                      window.open("/recipe/mi-hoanh-thanh/ingredients", "ingredientsMiHoanhThanh");
                    }}
                  >
                    Mì Hoành Thánh 🍜
                  </button>
                  <button
                    onClick={() => {
                      // before scene opens, resize the secondScene window
                      initScene("ingredients", (prevConfig) => {
                        return {
                          ...prevConfig,
                          defaultSize: {
                            width: 500,
                            height: 500,
                          },
                        };
                      });
                      window.open("/recipe/thit-nuong/ingredients", "ingredientsThitNuong");
                    }}
                  >
                    Thịt Nướng 🥩
                  </button>
                  <button
                    onClick={() => {
                      // before scene opens, resize the secondScene window
                      initScene("ingredients", (prevConfig) => {
                        return {
                          ...prevConfig,
                          defaultSize: {
                            width: 500,
                            height: 500,
                          },
                        };
                      });
                      window.open("/recipe/thit-kho-trung/ingredients", "ingredientsThitKhoTrung");
                    }}
                  >
                    Thịt Kho Trứng 🥚
                  </button>
                  <button
                    onClick={() => {
                      // before scene opens, resize the secondScene window
                      initScene("ingredients", (prevConfig) => {
                        return {
                          ...prevConfig,
                          defaultSize: {
                            width: 500,
                            height: 500,
                          },
                        };
                      });
                      window.open("/recipe/hu-tieu/ingredients", "ingredientsHuTieu");
                    }}
                  >
                    Hủ Tiếu 🍲
                  </button>
                  <button
                    onClick={() => {
                      // before scene opens, resize the secondScene window
                      initScene("ingredients", (prevConfig) => {
                        return {
                          ...prevConfig,
                          defaultSize: {
                            width: 500,
                            height: 500,
                          },
                        };
                      });
                      window.open("/recipe/banh-mi/ingredients", "ingredientsBanhMi");
                    }}
                  >
                    Bánh Mì 🥖
                  </button>
                  <button
                    onClick={() => {
                      // before scene opens, resize the secondScene window
                      initScene("ingredients", (prevConfig) => {
                        return {
                          ...prevConfig,
                          defaultSize: {
                            width: 500,
                            height: 500,
                          },
                        };
                      });
                      window.open("/recipe/bun-bo-hue/ingredients", "ingredientsBunBoHue");
                    }}
                  >
                    Bún Bò Huế 🌶️
                  </button>
                  {/* <button
                    onClick={() => {
                      // Navigate to the first step of Chè Bắp recipe
                      window.location.href = "/recipe/che-bap/step/1";
                    }}
                  >
                    Chè Bắp Recipe Steps 🌽
                  </button> */}
                  {/* <p>
                    <Link to="/icb" target="_blank">
                      Chè Bắp Recipe 🌽
                    </Link>
                  </p> */}
                </div>
              </>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
