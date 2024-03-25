import React, { useEffect, useState } from "react";
import httpService from "../service/http.service";
import UserProducts from "./product";
import HomeProduct from "../Admin/productAPI/get-product";
import './index.css'
import '../../img/z4815540120478_0c12c358ffeb3fd46e8d9cd93b71ba7c.jpg';
import storageService from "../service/storage.service";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Slideshow from './slider/SideEffectSlider';
import FadeSlideshow from "./slider/FadeEffectSlider";
import UserProductsNew from "./productnews";
import UserProductSale from "./productsale";
import Timer from "../Admin/statis/time";


const User = () => { 
  const [product, setProduct] = useState([])
  const navigate = useNavigate();
  const [account, setAccount] = useState([]);
  const [cateBig, setCateBig] = useState([]);
  useEffect(() => {
    httpService.get("/api/categoryBig", {isIndex:true}).then(data => {
      setCateBig(data?.data)
    })
  }, [])

  useEffect(() => {
    httpService.get("/api/accounts", {isIndex:true}).then(data => {
      setAccount(data?.data)
    })
  }, [])
  const handleShowInfor = () => {
    navigate(`/information/${storageService.get("account_id")}`)
  }


  useEffect(() => {
    httpService.get("/api/products/", {isIndex:true})
      .then((data) => {
        setProduct(data?.data)
      })
  }, [])

  return (<>
    <div className="Sum_index">
      <div className="header_index">
        <div className="menu_header">

          <div className="item_productt">
            <h5><Link className="auth" to='/login'>Đăng Nhập</Link></h5>
          </div>
          <div className="item_productt" >
            <h5><Link className="auth" to='/register'>Đăng Ký</Link></h5>
          </div>
          <div className="item_auth">
            {
              storageService.get("role") &&
              <button onClick={handleShowInfor}>Thông Tin</button>
            }
          </div>
        </div>
        <div className="menu_header2">
          <div className="item_product"><a>message</a></div>
          <div className="item_product"><a>Email</a></div>
          <div className="item_product"><a>Phone</a></div>
        </div>
      </div>
      <div className="menu_index">
        <img
          className="logo_index"
          width={"190px"}
          src="https://goldidea.vn/upload/123/thiet-ke-logo-the-face-shop.png"
          alt=""
        />

        <div>
          {cateBig && cateBig.length > 0 &&(
            <div className="cateBig">
          {cateBig.map((item)=>(
              <ul>
                <li><Link className="item_cate" to={item.link}>{item.name}</Link></li>
              </ul>
              ))}
              </div>
              )}
        </div>
        <Link className="cart" to='/cart'><img
          width={"50px"}
          height={"50px"}
          src="https://cdn.pixabay.com/photo/2017/03/29/04/09/shopping-icon-2184065_1280.png"
          alt=""
        /></Link>
      </div>
      <div className="menu_detail">
        <FadeSlideshow />
      </div>
      <h2 className="tieude"> <img
      className="tieude_img"
          src="https://banner2.cleanpng.com/20180612/tlb/kisspng-arrow-computer-icons-forward-5b202017b03ae9.7539254715288320237219.jpg"
          alt=""
        />  SẢN PHẨM NỔI BẬT</h2>
      <div className="nav_index">
        {<UserProducts />}
      </div>
      <h2 className="tieude"><img
      className="tieude_img"
          src="https://banner2.cleanpng.com/20180612/tlb/kisspng-arrow-computer-icons-forward-5b202017b03ae9.7539254715288320237219.jpg"
          alt=""
        />SẢN PHẨM MỚI NHẤT</h2>-
      <div className="nav_index">
        {<UserProductsNew />}
      </div>
      <h2 className="tieude"> <img
      className="tieude_img"
          src="https://banner2.cleanpng.com/20180612/tlb/kisspng-arrow-computer-icons-forward-5b202017b03ae9.7539254715288320237219.jpg"
          alt=""
        />  SẢN PHẨM SALE</h2>
        <div className="nav_index">
        {<UserProductSale />}
      </div>
      <br></br>
      <div className="tintuc">
        <div className="tintuc_top">
          <h1>Tin Tức</h1>
        </div>
        <div className="tintuc_bottom">
          <div className="item_tintuc"><iframe width="100%" height="100%" src="https://www.youtube.com/embed/8bMZUNEiGLI?si=gUsV8uNdrtuLVUvq" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>
          <div className="item_tintuc"><iframe width="100%" height="100%" src="https://www.youtube.com/embed/XY-TVcmCGYw?si=ZmG1eewfWneYuYeJ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>
          <div className="item_tintuc"><iframe width="100%" height="100%" src="https://www.youtube.com/embed/afcAr_alvpA?si=OVtHyG5-lw5bgzAY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>
        </div>
      </div>
      <h2 className="tieude"> <img
      className="tieude_img"
          src="https://banner2.cleanpng.com/20180612/tlb/kisspng-arrow-computer-icons-forward-5b202017b03ae9.7539254715288320237219.jpg"
          alt=""
        /> ĐỐI TÁC</h2>
      <div className="doitac">
        <div className="menu_doitac">
          <img
            width={"150px"}
            src="https://png.pngtree.com/png-clipart/20200727/original/pngtree-abstract-modern-floral-cosmetics-logo-template-vector-logo-for-business-and-png-image_5375383.jpg"
            alt=""
          />
        </div>
        <div className="menu_doitac">
          <img
            width={"150px"}
            src="https://png.pngtree.com/png-clipart/20231001/original/pngtree-luxury-perfume-cosmetic-logo-for-business-and-shops-vector-png-image_12930249.png"
            alt=""
          />
        </div>
        <div className="menu_doitac">
          <img
            width={"150px"}
            src="https://png.pngtree.com/png-vector/20190927/ourmid/pngtree-abstract-flowers-garden-logo-png-image_1753053.jpg"
            alt=""
          />
        </div>
        <div className="menu_doitac">
          <img
            width={"150px"}
            src="https://thegioibienquangcao.com/wp-content/uploads/2018/10/logo-my-pham-9.jpg"
            alt=""
          />
        </div>
        <div className="menu_doitac">
          <img
            width={"150px"}
            src="https://inbienquangcao.vn/wp-content/uploads/2021/11/thiet-ke-logo-my-pham-12_1584438209.jpg"
            alt=""
          />
        </div>

      </div>
      <br></br>
      <div className="hover_logo">
        <ul>
          <li><Link to="https://www.facebook.com/profile.php?id=100054721666294">   <img
            width={"35px"}
            src="https://i.pinimg.com/474x/16/b8/22/16b82240a640db6fb6c18297fc1dcfd3.jpg"
            alt=""
          /></Link></li>
          <li><Link to="https://www.facebook.com/profile.php?id=100054721666294">   <img
            width={"35px"}
            src="https://thumbs.dreamstime.com/z/youtube-logo-icon-voronezh-russia-november-square-black-color-164586300.jpg?w=768"
            alt=""
          /></Link></li>
          <li><Link to="https://www.facebook.com/profile.php?id=100054721666294">   <img
            width={"35px"}
            src="https://thumbs.dreamstime.com/z/twitter-logo-bird-isolated-over-white-background-social-media-networking-communications-symbol-breaking-news-130861855.jpg?w=768"
            alt=""
          /></Link></li>
          <li><Link to="https://www.facebook.com/profile.php?id=100054721666294">   <img
            width={"35px"}
            src="https://brasol.vn/wp-content/uploads/2022/09/logo-instagram-vector.jpg"
            alt=""
          /></Link></li>
        </ul>
      </div>
      <div className="footer_index">
        <div className="logo">
          <img
            width={"280px"}
            src="https://goldidea.vn/upload/123/thiet-ke-logo-the-face-shop.png"
            alt=""
          />
          <h4>Địa Chỉ : <span>219/7 Trần Hưng Đạo TP.Đà Nẵng</span></h4>
          <h4>Số Điện Thoại: <span>0349090947</span></h4>
          <h4>Email : <span>Huynhngocphuqs@gmai.com</span></h4>
          <h4>Mở cửa từ 8:00 AM đến 9:00 PM tất cả các ngày trong tuần</h4>

        </div>
        <div className="menu">
          <h3>MENU</h3>
          <ul>
            <li><Link to ="" className="menu_li">Trang chủ</Link></li>
            <li><Link to ="/Product" className="menu_li">Sản Phẩm</Link></li>
            <li><Link className="menu_li">Tin Tức</Link></li>
            <li><Link className="menu_li">Liên Hệ</Link></li>
            <li><Link className="menu_li">Đơn Hàng</Link></li>
          </ul>
        </div>
        <div className="menu">
        <h3>TIN TỨC</h3>
        <ul>
            <li><Link className="menu_li">Sale 30%</Link></li>
            <li><Link className="menu_li">Sản Phẩm Mới</Link></li>
            <li><Link className="menu_li">Sản Phẩm Hot</Link></li>
            <li><Link className="menu_li">Sản Phẩm Lỗi</Link></li>
           
          </ul>
        </div>
        <div className="menu"><h3>DỊCH VỤ</h3>
        <ul>
            <li><Link className="menu_li">ZaloPay</Link></li>
            <li><Link className="menu_li">Hoàn Trả</Link></li>
            <li><Link className="menu_li">Chăm Sóc KH</Link></li>
            <li><Link className="menu_li">Trao Đổi TT</Link></li>
          </ul></div>
      </div>
      <div className="footer_hover">
        <p>Coppy.@huynhngocphuqs@gmail.com <Timer /></p>
      </div>
    </div>



  </>)
}
export default User;