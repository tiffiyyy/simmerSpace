import "./App.css";
// import routing components
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import webspatial SDK
import { initScene } from "@webspatial/react-sdk";

// import recipe steps and ingredients below
import Steps from "./steps";
import Ingredients from "./ingredients";

function App() {
  return (
    <>
      <Router basename={__XR_ENV_BASE__}>
        <Routes>
          {/* route to ingredients page */}
          <Route
            path={`/recipe/:recipeId/ingredients`}
            element={<Ingredients />}
          />
          {/* route to recipe page */}
          <Route
            path={`/recipe/:recipeId/step/:stepNumber`}
            element={<Steps />}
          />
          {/* route to main menu */}
          <Route
            path="/"
            element={
              <>
                {/* new code for main menu here */}
                <div className="card" style={{ marginTop: "0px" }}>
                  <h2>Simmer Space</h2>
                  {/* Clicking a link will open a new scene each time */}

                  {/* button to "Chè Bắp 🌽" page */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
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
                      // Use setTimeout to ensure the new window opens without affecting current window
                      setTimeout(() => {
                        window.open(
                          `${__XR_ENV_BASE__}/recipe/che-bap/ingredients`,
                          "ingredientsCB"
                        );
                      }, 0);
                    }}
                  >
                    Chè Bắp 🌽
                  </button>

                  {/* button to "Phở Bò 🍜" page */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      initScene("ingredients", (prevConfig) => {
                        return {
                          ...prevConfig,
                          defaultSize: {
                            width: 500,
                            height: 500,
                          },
                        };
                      });
                      setTimeout(() => {
                        window.open(
                          `${__XR_ENV_BASE__}/recipe/pho-bo/ingredients`,
                          "ingredientsPho"
                        );
                      }, 0);
                    }}
                  >
                    Phở Bò 🍜
                  </button>

                  {/* button to "Chả Giò 🥟" page */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      initScene("ingredients", (prevConfig) => {
                        return {
                          ...prevConfig,
                          defaultSize: {
                            width: 500,
                            height: 500,
                          },
                        };
                      });
                      setTimeout(() => {
                        window.open(
                          `${__XR_ENV_BASE__}/recipe/cha-gio/ingredients`,
                          "ingredientsChaGio"
                        );
                      }, 0);
                    }}
                  >
                    Chả Giò 🥟
                  </button>

                  {/* button to "Gỏi Cuốn 🌯" page */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      initScene("ingredients", (prevConfig) => {
                        return {
                          ...prevConfig,
                          defaultSize: {
                            width: 500,
                            height: 500,
                          },
                        };
                      });
                      setTimeout(() => {
                        window.open(
                          `${__XR_ENV_BASE__}/recipe/goi-cuon/ingredients`,
                          "ingredientsGoiCuon"
                        );
                      }, 0);
                    }}
                  >
                    Gỏi Cuốn 🌯
                  </button>

                  {/* button to "Bánh Bèo 🥧" page */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      initScene("ingredients", (prevConfig) => {
                        return {
                          ...prevConfig,
                          defaultSize: {
                            width: 500,
                            height: 500,
                          },
                        };
                      });
                      setTimeout(() => {
                        window.open(
                          `${__XR_ENV_BASE__}/recipe/banh-beo/ingredients`,
                          "ingredientsBanhBeo"
                        );
                      }, 0);
                    }}
                  >
                    Bánh Bèo 🥧
                  </button>

                  {/* button to "Bánh Xèo 🥞" page */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      initScene("ingredients", (prevConfig) => {
                        return {
                          ...prevConfig,
                          defaultSize: {
                            width: 500,
                            height: 500,
                          },
                        };
                      });
                      setTimeout(() => {
                        window.open(
                          `${__XR_ENV_BASE__}/recipe/banh-xeo/ingredients`,
                          "ingredientsBanhXeo"
                        );
                      }, 0);
                    }}
                  >
                    Bánh Xèo 🥞
                  </button>

                  {/* button to "Bánh Chưng 🥮" page */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      initScene("ingredients", (prevConfig) => {
                        return {
                          ...prevConfig,
                          defaultSize: {
                            width: 500,
                            height: 500,
                          },
                        };
                      });
                      setTimeout(() => {
                        window.open(
                          `${__XR_ENV_BASE__}/recipe/banh-chung/ingredients`,
                          "ingredientsBanhChung"
                        );
                      }, 0);
                    }}
                  >
                    Bánh Chưng 🥮
                  </button>

                  {/* button to "Bánh Xanh 🍃" page */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
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
                      setTimeout(() => {
                        window.open(
                          `${__XR_ENV_BASE__}/recipe/banh-xanh/ingredients`,
                          "ingredientsBanhXanh"
                        );
                      }, 0);
                    }}
                  >
                    Bánh Xanh 🍃
                  </button>

                  {/* button to "Bánh Cam 🟡" page */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      initScene("ingredients", (prevConfig) => {
                        return {
                          ...prevConfig,
                          defaultSize: {
                            width: 500,
                            height: 500,
                          },
                        };
                      });
                      setTimeout(() => {
                        window.open(
                          `${__XR_ENV_BASE__}/recipe/banh-cam/ingredients`,
                          "ingredientsBanhCam"
                        );
                      }, 0);
                    }}
                  >
                    Bánh Cam 🟡
                  </button>

                  {/* button to "Mì Hoành Thánh 🍜" page */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      initScene("ingredients", (prevConfig) => {
                        return {
                          ...prevConfig,
                          defaultSize: {
                            width: 500,
                            height: 500,
                          },
                        };
                      });
                      setTimeout(() => {
                        window.open(
                          `${__XR_ENV_BASE__}/recipe/mi-hoanh-thanh/ingredients`,
                          "ingredientsMiHoanhThanh"
                        );
                      }, 0);
                    }}
                  >
                    Mì Hoành Thánh 🍜
                  </button>

                  {/* button to "Thịt Nướng 🥩" page */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      initScene("ingredients", (prevConfig) => {
                        return {
                          ...prevConfig,
                          defaultSize: {
                            width: 500,
                            height: 500,
                          },
                        };
                      });
                      setTimeout(() => {
                        window.open(
                          `${__XR_ENV_BASE__}/recipe/thit-nuong/ingredients`,
                          "ingredientsThitNuong"
                        );
                      }, 0);
                    }}
                  >
                    Thịt Nướng 🥩
                  </button>

                  {/* button to "Thịt Kho Trứng 🥚" page */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      initScene("ingredients", (prevConfig) => {
                        return {
                          ...prevConfig,
                          defaultSize: {
                            width: 500,
                            height: 500,
                          },
                        };
                      });
                      setTimeout(() => {
                        window.open(
                          `${__XR_ENV_BASE__}/recipe/thit-kho-trung/ingredients`,
                          "ingredientsThitKhoTrung"
                        );
                      }, 0);
                    }}
                  >
                    Thịt Kho Trứng 🥚
                  </button>

                  {/* button to "Hủ Tiếu 🍲" page */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      initScene("ingredients", (prevConfig) => {
                        return {
                          ...prevConfig,
                          defaultSize: {
                            width: 500,
                            height: 500,
                          },
                        };
                      });
                      setTimeout(() => {
                        window.open(
                          `${__XR_ENV_BASE__}/recipe/hu-tieu/ingredients`,
                          "ingredientsHuTieu"
                        );
                      }, 0);
                    }}
                  >
                    Hủ Tiếu 🍲
                  </button>

                  {/* button to "Bánh Mì 🥖" page */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      initScene("ingredients", (prevConfig) => {
                        return {
                          ...prevConfig,
                          defaultSize: {
                            width: 500,
                            height: 500,
                          },
                        };
                      });
                      setTimeout(() => {
                        window.open(
                          `${__XR_ENV_BASE__}/recipe/banh-mi/ingredients`,
                          "ingredientsBanhMi"
                        );
                      }, 0);
                    }}
                  >
                    Bánh Mì 🥖
                  </button>

                  {/* button to "Bún Bò Huế 🌶️" page */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      initScene("ingredients", (prevConfig) => {
                        return {
                          ...prevConfig,
                          defaultSize: {
                            width: 500,
                            height: 500,
                          },
                        };
                      });
                      setTimeout(() => {
                        window.open(
                          `${__XR_ENV_BASE__}/recipe/bun-bo-hue/ingredients`,
                          "ingredientsBunBoHue"
                        );
                      }, 0);
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
