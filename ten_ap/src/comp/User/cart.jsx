import React, { useEffect, useState } from "react";
import httpService from "../service/http.service";
import { toast } from "react-toastify";
import { set } from "react-hook-form";
import "./cart.css";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import storageService from "../service/storage.service";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Sweetpagination from "sweetpagination";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CartUse = () => {
  const [products, setProducts] = useState([]);
  const [profile, setProfile] = useState({});
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isReload, setisReload] = useState(false);
  const [cartId, setCartId] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [cateBig, setCateBig] = useState([]);
  const [payment, setPayment] = useState("cod");
  const [currentPageData, setCurrentPageData] = useState([]);

  const navigate = useNavigate();
  const handleClose = () => setOpen(false);
  const handleOpen = () => {
    httpService.get("/api/accounts/profile", {}).then((data) => {
      setProfile(data.data);
    });
    setOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    httpService
      .post("/api/oders", {
        body: {
          customer_name: profile.fullname,
          phone: profile.phone,
          address: profile.address,
          payment: 0, 
          is_payment: "Browsing",
          accounts: storageService.get("account_id"),
          cart: cartId,
          payment: payment,
          totalPrice: totalPrice,
        },
      })
      .then((data) => {
        if (payment === "zalopay") {
          window.location.href = data.data;
          return;
        }

        setProfile({ customer_name: "", phone: "", address: "" });
        handleClose();
        setisReload(!isReload);
        toast.success("Đặt hàng Thành Công");
        navigate("/");
      });
  };

  const handleDeleteProducts = (id) => {
    console.log(id);
    httpService
      .delete(`/api/carts/${id}`)
      .then((data) => {
        toast.success("Thành Công");
        setisReload(!isReload);
      })
      .catch((error) => {
        toast.error("Không Thành Công");
      });
  };
  // useEffect(()=>{
  //     httpService.get("/api/carts").then(data =>{
  //         console.log(data)
  //     })
  // },[])
  useEffect(() => {
    httpService.get("/api/carts", {}).then((data) => {
      if (data || data?.data) {
        setProducts(data?.data?.items);
        const listProduct = data?.data?.items;
        let prices = 0;
        setCartId(data?.data?._id);
        let total = 0;
        for (let i = 0; i < listProduct?.length; i++) {
          total += listProduct[i]?.quantity;
          prices += +listProduct[i]?.product?.price;
        }
        setTotalPrice(prices);
        setTotalProducts(total);
      }
    });
  }, [isReload]);
  useEffect(() => {
    httpService.get("/api/categoryBig", {}).then((data) => {
      setCateBig(data.data);
    });
  }, []);

  const handleChangeOption = ({ target: { value } }) => {
    setPayment(value);
  };

  return (
    <>
      <div className="Sum_index">
        <div className="header_index">
          <div className="menu_header">
            <div className="item_productt">
              <h5>
                <Link className="auth" to="/login">
                  Login
                </Link>
              </h5>
            </div>
            <div className="item_productt">
              <h5>
                <Link className="auth" to="/register">
                  Register
                </Link>
              </h5>
            </div>
            <div className="item_productt">
              {/* {
                            storageService.get("role") &&
                            <h5 onClick={handleLogOut}>logout</h5>
                        } */}
            </div>
          </div>
          <div className="menu_header2">
            <div className="item_product">
              <a>message</a>
            </div>
            <div className="item_product">
              <a>Email</a>
            </div>
            <div className="item_product">
              <a>Phone</a>
            </div>
          </div>
        </div>
        <div className="menu_index">
        <Link to="/">
        <img
          className="logo_index"
          width={"190px"}
          src="https://goldidea.vn/upload/123/thiet-ke-logo-the-face-shop.png"
          alt=""
        />
        </Link>
          <div>
            {cateBig && cateBig.length > 0 && (
              <div className="cateBig">
                {cateBig.map((item) => (
                  <ul>
                    <li>
                      <Link className="item_cate" to={item.link}>
                        {item.name}
                      </Link>
                    </li>
                  </ul>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="cartdetail">
          <div className="ClearCart">
            <img src="https://bizweb.dktcdn.net/100/360/190/themes/729071/assets/empty-cart.png?1700797574469"></img>
          </div>

          <div className="sum_cart">
            {products && products.length > 0 && (
              <div className="item_cart">
                <div className="Sum">
                  <h1>GIỎ HÀNG</h1>
                </div>
                <div className="Name_Cart">
                  <h4>Tên Sản Phẩm</h4>
                  <span>Hình Ảnh</span>
                  <h4>Giá Tiền</h4>
                  <h4>Số Lượng</h4>
                </div>
                {currentPageData.map((item) => (
                  <div className="product_cart" key={item._id}>
                    <h4>{item?.product?.name}</h4>
                    <span>
                      {" "}
                      <img className="img_cart" src={item?.product?.img} alt="" />
                    </span>
                    <h4>{item?.product?.price}.đ</h4>
                    <h4>{item?.quantity}</h4>
                    <button
                      className="delete_cart"
                      onClick={() => handleDeleteProducts(item?.product?._id)}
                    >
                      Xóa Khỏi Giỏ Hàng
                    </button>
                  </div>
                ))}
                <Sweetpagination
                currentPageData={setCurrentPageData}
                getData={products}
                dataPerPage={3}
                navigation={true}
                getStyle={"style-1"}
              />
                <h4 className="Sum_product_item">Bạn Đang Có : {totalProducts} SP Trong Giỏ Hàng</h4>

                <button className="OnclickOder" onClick={() => handleOpen()}>
                  Thanh Toán
                </button>
              </div>
            )}
          </div>
          <div>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={open}
              onClose={handleClose}
              closeAfterTransition
              slots={{ backdrop: Backdrop }}
              slotProps={{
                backdrop: {
                  timeout: 500,
                },
              }}
            >
              <Fade
                style={{ width: "800px", height: "450px", border: "0px", borderRadius: "5px" }}
                in={open}
              >
                <Box sx={style}>
                  <button style={{ margin: "0px" }} onClick={() => setOpen(false)}>
                    x
                  </button>
                  <div className="slog">
                    <h1 className="dis">Oder</h1>
                  </div>{" "}
                  <br />
                  <div className="Sum_cartOder">
                    <form className="formOder" onSubmit={handleSubmit}>
                      <label className="lableOder">CUSTOMER_NAME:</label> <br />
                      <input
                        className="inpOder"
                        type="text"
                        value={profile?.fullname}
                        onChange={(e) => setProfile({ ...profile, fullname: e.target.value })}
                      />
                      <br />
                      <label className="lableOder">PHONE:</label>
                      <br />
                      <input
                        className="inpOder"
                        type="text"
                        value={profile?.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      />
                      <br />
                      <label className="lableOder">ADDRESS:</label>
                      <br />
                      <input
                        className="inpOder"
                        type="text"
                        value={profile?.address}
                        onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                      />
                      <br />
                      <select className="payment" name="payment" id="" onChange={handleChangeOption} value={payment}>
                        <option value="cod">Tiền Mặt</option>
                        <option value="zalopay">ZaloPay</option>
                      </select>
                      <br />
                      <button className="payment1" type="submit">
                        Xác Nhận
                      </button>
                    </form>
                    <div className="sum_oder">
                      <div className="cart_name">
                        <h4>Name</h4>
                        <h3>Price</h3>
                        <h3>Quantity</h3>
                      </div>
                      {products && products.length > 0 && (
                        <div item_oders>
                          {products.map((item) => (
                            <div className="cart_oder" key={item._id}>
                              <h4>{item?.product?.name}</h4>
                              <h3>{item?.product?.price}.đ</h3>
                              <h3>{item?.quantity}</h3>
                            </div>
                          ))}
                        </div>
                      )}

                      <h1>Tổng : {totalPrice} đ</h1>
                    </div>
                  </div>
                </Box>
              </Fade>
            </Modal>
          </div>
        </div>

        <br></br>
        <div className="footer_index">
          <div className="logo">
            <img
              width={"280px"}
              src="https://goldidea.vn/upload/123/thiet-ke-logo-the-face-shop.png"
              alt=""
            />
            <h4>
              Địa Chỉ : <span>219/7 Trần Hưng Đạo TP.Đà Nẵng</span>
            </h4>
            <h4>
              Số Điện Thoại: <span>0349090947</span>
            </h4>
            <h4>
              Email : <span>Huynhngocphuqs@gmai.com</span>
            </h4>
            <h4>Mở cửa từ 8:00 AM đến 9:00 PM tất cả các ngày trong tuần</h4>
          </div>
          <div className="menu">
            <h3>MENU</h3>
            <ul>
              <li>
                <Link className="menu_li">Trang chủ</Link>
              </li>
              <li>
                <Link className="menu_li">Sản Phẩm</Link>
              </li>
              <li>
                <Link className="menu_li">Tin Tức</Link>
              </li>
              <li>
                <Link className="menu_li">Liên Hệ</Link>
              </li>
            </ul>
          </div>
          <div className="menu">
            <h3>DANH MỤC</h3>
          </div>
          <div className="menu">
            <h3>DỊCH VỤ</h3>
          </div>
        </div>
        <div className="footer_hover">
          <p>Coppy.@huynhngocphuqs@gmail.com</p>
        </div>
      </div>
    </>
  );
};
export default CartUse;
