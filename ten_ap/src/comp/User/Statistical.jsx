import React, { useEffect, useState } from "react";
import httpService from "../service/http.service";
import UserProducts from "./product";
import HomeProduct from "../Admin/productAPI/get-product";
import './index.css'
import './Statistical.css'
import '../../img/z4815540120478_0c12c358ffeb3fd46e8d9cd93b71ba7c.jpg';
import storageService from "../service/storage.service";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Slideshow from './slider/SideEffectSlider';
import FadeSlideshow from "./slider/FadeEffectSlider";
import Statistical from "./Statistical-iteam";


const StatisticalLayout = () => {
  const [product, setProduct] = useState([])
  const navigate = useNavigate();
  const [cateBig, setCateBig] = useState([]);

  useEffect(() => {
    httpService.get("/api/categoryBig", {}).then(data => {
      setCateBig(data.data)
    })
  }, [])

  const handleLogOut = () => {
    storageService.remove("role")
    storageService.remove("access_token")
    navigate('/login')

  }

  useEffect(() => {
    httpService.get("/api/products/", {})
      .then((data) => {
        setProduct(data.data)
      })
  }, [])

  return (<>
    <div className="Sum_index">
      <div className="header_index">
        <div className="menu_header">
          <div className="item_productt">
            <h5><Link className="auth" to='/login'>Login</Link></h5>
          </div>
          <div className="item_productt" >
            <h5><Link className="auth" to='/register'>Register</Link></h5>
          </div>
          <div className="item_productt">
            {
              storageService.get("role") &&
              <h5 onClick={handleLogOut}>logout</h5>
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
          {cateBig && cateBig.length > 0 && (
            <div className="cateBig">
              {cateBig.map((item) => (
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
      <hr />
      <h1 className="name_statis">Giới Thiệu The FaceShop</h1>
      <div className="nav_statis">
        <div className="des_left">
          <p><h2>The Face Shop hay THEFACESHOP</h2>là một công ty sản xuất, phân phối bán lẻ và nhượng quyền kinh doanh các sản phẩm chăm sóc da và mỹ phẩm thiên nhiên có trụ sở tại Hàn Quốc.
            Đây là một công ty con của LG Household & Health Care thuộc Tập đoàn LG.</p>
          <br></br>
          <p><h2>Lịch Sử</h2>The Face Shop được thành lập vào tháng 12 năm 2003 với một cửa hàng ở Myeong dong với CEO của TheFaceShop Co., Ltd. là Jeong Un-ho (Tiếng Hàn: 정운호). Cửa hàng thứ 100 được mở vào tháng 6 năm 2004, trở thành công ty mỹ phẩm lớn thứ 3 tại Hàn Quốc vào tháng 12 năm 2005. Từ đó tiếp tục được mở rộng và tiến vào thị trường nước ngoài trong tháng 4 năm 2006 và một cửa hàng ở Bắc Kinh vào tháng 3 năm 2008.

            Hiện nay, công ty có các cửa hàng tại Úc, Brunei, Canada, Trung Quốc, Cộng hòa Dominican, Indonesia, Nhật Bản, Jordan, Malaysia, Mông Cổ, Philippines, Singapore, Đài Loan, Thái Lan, UAE, United States, Costa Rica, và Việt Nam. Tính đến tháng 4 năm 2012, công ty đã mở 930 cửa hàng tại 22 quốc gia.[1]

            Tháng 11 năm 2009, công ty được LG Household & Health Care mua lại và trở thành công ty con vào tháng 9 năm 2010. Tại thời điểm mua lại The Face Shop có doanh thu hằng năm đạt 250 tỉ ₩ với biên độ hoạt động là 19%. LG đã mua lại 90 cổ phần với 70.2% từ cổ đông lớn nhất, Shepherd Detachering B.V. và 19.8% trong 29.8% cổ phần của nhà sáng lập kiêm chủ tịch là Jung Woon-ho.</p>
          <p><h2>Sản Phẩm</h2>Các sản phẩm của thương hiệu rất đa dạng trải rộng từ trang điểm, dưỡng da như Hydro Splash BB Cream, Extreme Volume Mascara-Lash Stretch,[3] Gel Eyeliner,[4] và Natural Sun SPF 45.[5]</p>
          <img
            className="logo_des1"
            width={"500px"}
            src="https://mauwebsite.vn/template/images/about/taisaochon2.png"
            alt=""
          />
        </div>
        <div className="des_right">
          <img
            className="logo_des"
            width={"350px"}
            src="https://gocreview.vn/wp-content/uploads/2020/01/S%E1%BB%B1-h%C3%ACnh-th%C3%A0nh-THE-FACE-SHOP.jpg"
            alt=""
          />
          <img
            className="logo_des2"
            width={"350px"}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Hapcheon_faceshop.jpg/1200px-Hapcheon_faceshop.jpg"
            alt=""
          />
          <p><h2>MeKong Capital</h2>ập Đoàn HSV là công ty thứ ba quỹ Mekong Enterprise Fund IV công bố.

            Thành lập năm 2001, Mekong Capital là công ty có bề dày thành tích sâu rộng nhất về tư vấn đầu tư vốn cổ phần tư nhân Việt Nam. Các quỹ của Mekong Capital đã hoàn tất 38 khoản đầu tư vốn cổ phần chưa niêm yết, trong đó có 27 khoản thoái vốn hoàn toàn. Mekong Capital tư vấn quản lý 5 quỹ, hai trong số đó đang hoạt động.
            Các công ty đã và đang thuộc danh mục đầu tư của Mekong Capital đều nằm trong số những công ty phát triển nhanh nhất và dẫn đầu thị trường trong ngành hàng tiêu dùng tại Việt Nam như bán lẻ, nhà hàng, hàng tiêu dùng, phân phối và giáo dục.
            Với cách tiếp cận Đầu tư vốn cổ phần tư nhân mang tính bản thể học và mô hình Đầu Tư Lấy Tầm Nhìn Làm Định Hướng, MEF IV hướng đến thực hiện cam kết đồng hành cùng các công ty hiện thực hóa tầm nhìn của họ.  </p>
            <img
            className="logo_des3"
            width={"400px"}
            src="https://file.hstatic.net/200000223113/file/759676c7310fc5519c1e_3b959f3ef72e455595327c0a4b9a92c9.jpg"
            alt=""
          />     
        </div>
      </div>
      <hr />
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
            <li><Link className="menu_li">Trang chủ</Link></li>
            <li><Link className="menu_li">Sản Phẩm</Link></li>
            <li><Link className="menu_li">Tin Tức</Link></li>
            <li><Link className="menu_li">Liên Hệ</Link></li>
          </ul>
        </div>
        <div className="menu"><h3>DANH MỤC</h3></div>
        <div className="menu"><h3>DỊCH VỤ</h3></div>
      </div>
      <div className="footer_hover">
        <p>Coppy.@huynhngocphuqs@gmail.com</p>
      </div>
    </div>



  </>)
}
export default StatisticalLayout;