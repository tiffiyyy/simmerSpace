import "./App.css";
// import routing components  
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
// import webspatial SDK 
import { initScene } from "@webspatial/react-sdk";

// import recipe steps and ingredients below
import Steps from "./steps";
import Ingredients from "./ingredients";


function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* route to ingredients page */}
          <Route path={`${__XR_ENV_BASE__}/recipe/:recipeId/ingredients`} element={<Ingredients />} />
          {/* route to recipe page */}
          <Route path={`${__XR_ENV_BASE__}/recipe/:recipeId/step/:stepNumber`} element={<Steps />} />
          {/* route to main menu */}
          <Route
            path="/"
            element={
              <>
                {/*new code for main menu here*/}
                <div className="card" style={{ marginTop: "0px" }}>
                  <h2>Simmer Space</h2>
                  {/* Clicking a link will open a new scene each time */}

                  {/* button to "Chè Bắp 🌽" page */}
                  <button
                    onClick={() => {
                      // before scene opens, resize the window
                      initScene("ingredients", (prevConfig) => {
                        return {
                          ...prevConfig,
                          defaultSize: {
                            width: 500,
                            height: 500,
                          },
                        };
                      });
                      window.open(`${__XR_ENV_BASE__}/recipe/che-bap/ingredients`, "ingredientsCB");
                    }}
                  >
                    Chè Bắp 🌽
                  </button>

                  {/* button to "Phở Bò 🍜" page */}
                  <button
                    onClick={() => {
                      initScene("ingredients", (prevConfig) => {
                        return {
                          ...prevConfig,
                          defaultSize: {
                            width: 500,
                            height: 500,
                          },
                        };
                      });
                      window.open(`${__XR_ENV_BASE__}/recipe/pho-bo/ingredients`, "ingredientsPho");
                    }}
                  >
                    Phở Bò 🍜
                  </button>

                  {/* button to "Chả Giò 🥟" page */}
                  <button
                    onClick={() => {
                      initScene("ingredients", (prevConfig) => {
                        return {
                          ...prevConfig,
                          defaultSize: {
                            width: 500,
                            height: 500,
                          },
                        };
                      });
                      window.open(`${__XR_ENV_BASE__}/recipe/cha-gio/ingredients`, "ingredientsChaGio");
                    }}
                  >
                    Chả Giò 🥟
                  </button>

                  {/* button to "Gỏi Cuốn 🌯" page */}
                  <button
                    onClick={() => {
                      initScene("ingredients", (prevConfig) => {
                        return {
                          ...prevConfig,
                          defaultSize: {
                            width: 500,
                            height: 500,
                          },
                        };
                      });
                      window.open(`${__XR_ENV_BASE__}/recipe/goi-cuon/ingredients`, "ingredientsGoiCuon");
                    }}
                  >
                    Gỏi Cuốn 🌯
                  </button>

                  {/* button to "Bánh Bèo 🥧" page */}
                  <button
                    onClick={() => {
                      initScene("ingredients", (prevConfig) => {
                        return {
                          ...prevConfig,
                          defaultSize: {
                            width: 500,
                            height: 500,
                          },
                        };
                      });
                      window.open(`${__XR_ENV_BASE__}/recipe/banh-beo/ingredients`, "ingredientsBanhBeo");
                    }}
                  >
                    Bánh Bèo 🥧
                  </button>

                  {/* button to "Bánh Xèo 🥞" page */}
                  <button
                    onClick={() => {
                      initScene("ingredients", (prevConfig) => {
                        return {
                          ...prevConfig,
                          defaultSize: {
                            width: 500,
                            height: 500,
                          },
                        };
                      });
                      window.open(`${__XR_ENV_BASE__}/recipe/banh-xeo/ingredients`, "ingredientsBanhXeo");
                    }}
                  >
                    Bánh Xèo 🥞
                  </button>

                  {/* button to "Bánh Chưng 🥮" page */}
                  <button
                    onClick={() => {
                      initScene("ingredients", (prevConfig) => {
                        return {
                          ...prevConfig,
                          defaultSize: {
                            width: 500,
                            height: 500,
                          },
                        };
                      });
                      window.open(`${__XR_ENV_BASE__}/recipe/banh-chung/ingredients`, "ingredientsBanhChung");
                    }}
                  >
                    Bánh Chưng 🥮
                  </button>

                  {/* button to "Bánh Xanh 🍃" page */}
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
                      window.open(`${__XR_ENV_BASE__}/recipe/banh-xanh/ingredients`, "ingredientsBanhXanh");
                    }}
                  >
                    Bánh Xanh 🍃
                  </button>

                  {/* button to "Bánh Cam 🟡" page */}
                  <button
                    onClick={() => {
                      initScene("ingredients", (prevConfig) => {
                        return {
                          ...prevConfig,
                          defaultSize: {
                            width: 500,
                            height: 500,
                          },
                        };
                      });
                      window.open(`${__XR_ENV_BASE__}/recipe/banh-cam/ingredients`, "ingredientsBanhCam");
                    }}
                  >
                    Bánh Cam 🟡
                  </button>

                  {/* button to "Mì Hoành Thánh 🍜" page */}
                  <button
                    onClick={() => {
                      initScene("ingredients", (prevConfig) => {
                        return {
                          ...prevConfig,
                          defaultSize: {
                            width: 500,
                            height: 500,
                          },
                        };
                      });
                      window.open(`${__XR_ENV_BASE__}/recipe/mi-hoanh-thanh/ingredients`, "ingredientsMiHoanhThanh");
                    }}
                  >
                    Mì Hoành Thánh 🍜
                  </button>

                  {/* button to "Thịt Nướng 🥩" page */}
                  <button
                    onClick={() => {
                      initScene("ingredients", (prevConfig) => {
                        return {
                          ...prevConfig,
                          defaultSize: {
                            width: 500,
                            height: 500,
                          },
                        };
                      });
                      window.open(`${__XR_ENV_BASE__}/recipe/thit-nuong/ingredients`, "ingredientsThitNuong");
                    }}
                  >
                    Thịt Nướng 🥩
                  </button>

                  {/* button to "Thịt Kho Trứng 🥚" page */}
                  <button
                    onClick={() => {
                      initScene("ingredients", (prevConfig) => {
                        return {
                          ...prevConfig,
                          defaultSize: {
                            width: 500,
                            height: 500,
                          },
                        };
                      });
                      window.open(`${__XR_ENV_BASE__}/recipe/thit-kho-trung/ingredients`, "ingredientsThitKhoTrung");
                    }}
                  >
                    Thịt Kho Trứng 🥚
                  </button>

                  {/* button to "Hủ Tiếu 🍲" page */}
                  <button
                    onClick={() => {
                      initScene("ingredients", (prevConfig) => {
                        return {
                          ...prevConfig,
                          defaultSize: {
                            width: 500,
                            height: 500,
                          },
                        };
                      });
                      window.open(`${__XR_ENV_BASE__}/recipe/hu-tieu/ingredients`, "ingredientsHuTieu");
                    }}
                  >
                    Hủ Tiếu 🍲
                  </button>

                  {/* button to "Bánh Mì 🥖" page */}
                  <button
                    onClick={() => {
                      initScene("ingredients", (prevConfig) => {
                        return {
                          ...prevConfig,
                          defaultSize: {
                            width: 500,
                            height: 500,
                          },
                        };
                      });
                      window.open(`${__XR_ENV_BASE__}/recipe/banh-mi/ingredients`, "ingredientsBanhMi");
                    }}
                  >
                    Bánh Mì 🥖
                  </button>
                  
                  {/* button to "Bún Bò Huế 🌶️" page */}
                  <button
                    onClick={() => {
                      initScene("ingredients", (prevConfig) => {
                        return {
                          ...prevConfig,
                          defaultSize: {
                            width: 500,
                            height: 500,
                          },
                        };
                      });
                      window.open(`${__XR_ENV_BASE__}/recipe/bun-bo-hue/ingredients`, "ingredientsBunBoHue");
                    }}
                  >
                    Bún Bò Huế 🌶️
                  </button>
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
